import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.107.27.130:5001/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
