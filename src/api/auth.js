import { apiFetch } from './config';

export const authApi = {
  register: async (name, email, password) => {
    return await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  login: async (identifier, password) => {
    return await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });
  },

  logout: async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch {
      // Clear state even if server call fails
    }
  },

  me: async () => {
    return await apiFetch('/auth/me');
  },
};

export default authApi;