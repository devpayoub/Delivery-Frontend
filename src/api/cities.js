import { apiFetch } from './config';

export const cityApi = {
  getAll: () => apiFetch('/cities'),

  getById: (id) => apiFetch(`/cities/${id}`),

  create: async (data) => {
    return apiFetch('/cities', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return apiFetch(`/cities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return apiFetch(`/cities/${id}`, {
      method: 'DELETE',
    });
  },
};

export default cityApi;