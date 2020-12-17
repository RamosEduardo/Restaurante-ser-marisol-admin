import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
    // baseURL: 'https://restaurante-ser-marisol-api.herokuapp.com',
});

export default api;