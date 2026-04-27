import { apiFetch } from './config';

export const deliveryApi = {
  getAll: () => apiFetch('/deliveries'),

  getById: (id) => apiFetch(`/deliveries/${id}`),

  create: async (data) => {
    return apiFetch('/deliveries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return apiFetch(`/deliveries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return apiFetch(`/deliveries/${id}`, {
      method: 'DELETE',
    });
  },
};

export default deliveryApi;