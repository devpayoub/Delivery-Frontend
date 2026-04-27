const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const getToken = () => localStorage.getItem('delivery_token');

export const setToken = (token) => {
  if (token) {
    localStorage.setItem('delivery_token', token);
  } else {
    localStorage.removeItem('delivery_token');
  }
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchOptions = {
    method: (options.method || 'GET').toUpperCase(),
    headers,
  };

  // Handle body - ensure it's a string if present
  if (options.body && typeof options.body === 'string') {
    fetchOptions.body = options.body;
  }

  console.log('Fetch:', `${API_URL}${endpoint}`, fetchOptions);
  const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
};

export default { API_URL, getToken, setToken, apiFetch };