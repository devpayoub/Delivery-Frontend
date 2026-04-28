const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

let currentUser = null;

export const getUser = () => currentUser;

export const setUser = (user) => {
  currentUser = user;
};

export const apiFetch = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const fetchOptions = {
    method: (options.method || 'GET').toUpperCase(),
    headers,
    credentials: 'include',
  };

  if (options.body && typeof options.body === 'string') {
    fetchOptions.body = options.body;
  }

  const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
};

export default { API_URL, getUser, setUser, apiFetch };