import { apiFetch } from './config';

export const productTypeApi = {
  getAll: () => apiFetch('/product-types'),

  getById: (id) => apiFetch(`/product-types/${id}`),

  create: async (data) => {
    return apiFetch('/product-types', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return apiFetch(`/product-types/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return apiFetch(`/product-types/${id}`, {
      method: 'DELETE',
    });
  },
};

export default productTypeApi;