import axios from 'axios';
import  {useLoadingStore}  from '../store/loadingStore';

const api = axios.create({
  baseURL: "https://hotelmanagement20250304171928.azurewebsites.net/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  useLoadingStore.getState().setLoading(true); 
  return config;
});

api.interceptors.response.use(
  (response) => {
    useLoadingStore.getState().setLoading(false); 
    return response;
  },
  (error) => {
    useLoadingStore.getState().setLoading(false); 
    return Promise.reject(error);
  }
);

export default api;