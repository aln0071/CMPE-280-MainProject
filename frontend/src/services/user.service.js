import axios from 'axios';

const API_URL = 'http://localhost:3001/';

export const getUser = (username) => axios.get(`${API_URL}user/${username}`);

export const updateUser = (userId, name, aboutme, city, phone, imgKey) => 
  axios.put(`${API_URL}updateprofile/${userId}`, {
    name,
    aboutme,
    city,
    phone,
    imgKey
  });
