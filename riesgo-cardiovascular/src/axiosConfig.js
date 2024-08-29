import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://rcv-production.up.railway.app',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});

export default axiosInstance;