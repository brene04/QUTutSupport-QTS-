import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.106.115.104:5001/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
