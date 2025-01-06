import apiClient from './index.js';

export const getFlights = () => apiClient.get('/flights');
export const createFlight = (flightData) => apiClient.post('/flights', flightData);