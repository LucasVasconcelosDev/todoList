import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {

    if (error.response && error.response.status === 401) {

      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      setTimeout(() => {
        window.location.href = '/login';
      }, 3500);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
