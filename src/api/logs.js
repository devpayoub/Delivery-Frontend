import { apiFetch } from './config';

export const logApi = {
  getAll: () => apiFetch('/logs'),
};

export default logApi;