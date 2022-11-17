import axios from 'axios';

const API_URL = 'http://localhost:3001/';

const register = (username, email, password) => {
  return axios.post(`${API_URL}register`, {
    username,
    email,
    password
  }).then((response) => {
    return response.data;
  });
}

const login = (username, password) =>
  axios
    .post(`${API_URL}login`, {
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