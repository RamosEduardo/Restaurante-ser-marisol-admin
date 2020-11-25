import axios from 'axios';

const api = axios.create({
    baseURL: 'https://restaurante-ser-marisol-api.herokuapp.com',
});

export default api;