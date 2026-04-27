import React, { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/auth';
import employerApi from '../api/employers';
import driverApi from '../api/drivers';
import cityApi from '../api/cities';
import productTypeApi from '../api/productTypes';
import deliveryApi from '../api/deliveries';
import logApi from '../api/logs';
import { setToken, getToken } from '../api/config';

const AppDataContext = createContext();

export function useAppData() {
  return useContext(AppDataContext);
}

// Helper to decode JWT payload without verification
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export function AppDataProvider({ children }) {
  const [state, setState] = useState({
    currentUser: null,
    employers: [],
    drivers: [],
    cities: [],
    product_types: [],
    deliveries: [],
    logs: [],
    isLoading: false,
    error: null
  });

  // Load initial data if logged in
  useEffect(() => {
    const token = getToken();
    if (token) {
      const user = decodeToken(token);
      if (user) {
        setState(prev => ({ ...prev, currentUser: user }));
      }
      loadAll();
    }
  }, []);

  const loadAll = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const [
        employers, 
        drivers, 
        cities, 
        product_types, 
        deliveries, 
        logs
      ] = await Promise.all([
        employerApi.getAll().catch(() => []),
        driverApi.getAll().catch(() => []),
        cityApi.getAll().catch(() => []),
        productTypeApi.getAll().catch(() => []),
        deliveryApi.getAll().catch(() => []),
        logApi.getAll().catch(() => [])
      ]);

      setState(prev => ({
        ...prev,
        employers,
        drivers,
        cities,
        product_types,
        deliveries,
        logs,
        isLoading: false
      }));
    } catch (err) {
      setState(prev => ({ ...prev, isLoading: false, error: err.message }));
    }
  };

  const login = async (identifier, password) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await authApi.login(identifier, password);
      // data contains { user, token }
      setToken(data.token);
      setState(prev => ({ ...prev, currentUser: data.user, isLoading: false }));
      await loadAll();
      return data.user;
    } catch (err) {
      setState(prev => ({ ...prev, isLoading: false, error: err.message }));
      throw err;
    }
  };

  const logout = () => {
    authApi.logout();
    setToken(null);
    setState({
      currentUser: null,
      employers: [],
      drivers: [],
      cities: [],
      product_types: [],
      deliveries: [],
      logs: [],
      isLoading: false,
      error: null
    });
  };

  const createEntity = async (apiModule, data) => {
    try {
      const newEntity = await apiModule.create(data);
      await loadAll(); // Refresh all data to ensure consistency
      return newEntity;
    } catch (err) {
      setState(prev => ({ ...prev, error: err.message }));
      throw err;
    }
  };

  const updateEntity = async (apiModule, id, data) => {
    try {
      const updated = await apiModule.update(id, data);
      await loadAll();
      return updated;
    } catch (err) {
      setState(prev => ({ ...prev, error: err.message }));
      throw err;
    }
  };

  const deleteEntity = async (apiModule, id) => {
    try {
      await apiModule.delete(id);
      await loadAll();
    } catch (err) {
      setState(prev => ({ ...prev, error: err.message }));
      throw err;
    }
  };

  const value = {
    state,
    login,
    logout,
    loadAll,
    createEntity,
    updateEntity,
    deleteEntity,
    employerApi,
    driverApi,
    cityApi,
    productTypeApi,
    deliveryApi,
    logApi
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
}