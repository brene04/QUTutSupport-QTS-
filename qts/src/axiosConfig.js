import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.25.219.25:5001/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
