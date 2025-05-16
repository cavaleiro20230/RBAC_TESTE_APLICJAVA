import api from './api';
import jwtDecode from 'jwt-decode';

const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    return jwtDecode(response.data.token);
  }
  return null;
};

const logout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  } catch (error) {
    return null;
  }
};

const authService = {
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
};

export default authService;