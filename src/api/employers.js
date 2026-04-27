import { apiFetch } from './config';

export const employerApi = {
  getAll: () => apiFetch('/employers'),

  getById: (id) => apiFetch(`/employers/${id}`),

  create: async (data) => {
    return apiFetch('/employers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return apiFetch(`/employers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return apiFetch(`/employers/${id}`, {
      method: 'DELETE',
    });
  },
};

export default employerApi;