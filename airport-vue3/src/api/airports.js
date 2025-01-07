import apiClient from './apiClient.js';
export const getAirports = () => apiClient.get('/airports');