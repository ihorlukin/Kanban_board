import axios from 'axios';
import queryString from 'query-string';

const baseUrl = 'http://localhost:3333';
const getAccessToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');
const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: params => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`
    }
  };
});

axiosClient.interceptors.response.use(
  response => response.data,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const [newAccessToken, newRefreshToken] = await refreshAccessToken(getRefreshToken());
        localStorage.setItem('access_token', newAccessToken);
        localStorage.setItem('refresh_token', newRefreshToken);

      
        return axiosClient(originalRequest);
      } catch (refreshError) {
        
        console.error('Failed to refresh access token:', refreshError);
        throw refreshError;
      }
    }

    // Если не 401 или не удалось обновить токен, прокидываем ошибку дальше
    throw error;
  }
);

export default axiosClient;

async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/refresh`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        }
      }
    );
    return [response.data.access_token, response.data.refresh_token];
  } catch (error) {
    // Обработка ошибок при обновлении токена
    console.error('Failed to refresh access token:', error);
    throw error;
  }
}