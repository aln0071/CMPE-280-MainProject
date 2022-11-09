import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/';

const getUserDetail = () => axios.get(`${API_URL}user`, { headers: authHeader() });

const setUserDetail = () => axios.post(`${API_URL}register`, { headers: authHeader() });

export default {
  getUserDetail,
  setUserDetail
};
