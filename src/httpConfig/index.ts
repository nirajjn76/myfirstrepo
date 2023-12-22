import axios from 'axios';
import { API_URL } from '../utils/apiConstants';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosInstance;
