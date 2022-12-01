import axios from 'axios';
import URLS from './urls';

const register = (username, email, password) => {
  return axios.post(URLS.REGISTER, {
    username,
    email,
    password
  }).then((response) => {
    return response.data;
  });
}

const login = (username, password) =>
  axios
    .post(URLS.LOGIN, {
      username,
      password
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout
};