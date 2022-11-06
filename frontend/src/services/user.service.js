import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

const getUserDetail = () => axios.get(`${API_URL}user`, { headers: authHeader() });

const setUserDetail = () => axios.post(`${API_URL}user`, { headers: authHeader() });

export default {
  getUserDetail,
  setUserDetail
};
