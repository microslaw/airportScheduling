import apiClient from './apiClient.js';

export const getFlights = () => apiClient.get('/flights');
export const createFlight = (flightData) => apiClient.post('/flights', flightData);