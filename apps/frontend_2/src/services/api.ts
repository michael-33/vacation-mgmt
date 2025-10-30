import axios from 'axios';

// axios instance configured for the api
const api = axios.create({ baseURL: '/api/v1' });

// basic user id header management for auth simulation
let currentUserId: number | null = null;

export function setUserIdHeader(userId: number) {
  currentUserId = userId;
}

api.interceptors.request.use((config) => {
  if (currentUserId) config.headers['x-user-id'] = String(currentUserId);
  return config;
});

export default api;
