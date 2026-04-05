import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://16.176.231.168:5001/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
