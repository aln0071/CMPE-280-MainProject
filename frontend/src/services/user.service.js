import axios from 'axios';

const API_URL = 'http://localhost:3001/';

const getUserDetail = () => axios.get(`${API_URL}user`);

const setUserDetail = () => axios.post(`${API_URL}register`);

export default {
  getUserDetail,
  setUserDetail
};
