import React, { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/auth';
import employerApi from '../api/employers';
import driverApi from '../api/drivers';
import cityApi from '../api/cities';
import productTypeApi from '../api/productTypes';
import deliveryApi from '../api/deliveries';
import logApi from '../api/logs';
import { setUser } from '../api/config';

const AppDataContext = createContext();

export function useAppData() {
  return useContext(AppDataContext);
}

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

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await authApi.me();
        if (data.user) {
          setUser(data.user);
          setState(prev => ({ ...prev, currentUser: data.user }));
          loadAll();
        }
      } catch {
        // No valid session — stay logged out
      }
    };
    checkSession();
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
      setUser(data.user);
      setState(prev => ({ ...prev, currentUser: data.user, isLoading: false }));
      await loadAll();
      return data.user;
    } catch (err) {
      setState(prev => ({ ...prev, isLoading: false, error: err.message }));
      throw err;
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
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
      await loadAll();
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