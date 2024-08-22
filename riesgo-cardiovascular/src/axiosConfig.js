// src/services/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://rcv-production.up.railway.app', // Asegúrate de que esta URL sea correcta
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default axiosInstance;
