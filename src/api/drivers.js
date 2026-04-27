import { apiFetch } from './config';

export const driverApi = {
  getAll: () => apiFetch('/drivers'),

  getById: (id) => apiFetch(`/drivers/${id}`),

  create: async (data) => {
    return apiFetch('/drivers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return apiFetch(`/drivers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return apiFetch(`/drivers/${id}`, {
      method: 'DELETE',
    });
  },
};

export default driverApi;