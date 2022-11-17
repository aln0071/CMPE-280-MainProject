import axios from 'axios';

const API_URL = 'http://localhost:3001/';

export const getUser = () => axios.get(`${API_URL}user`);

export const updateUser = (userId, name, aboutme, city, phone, photo) => 
  axios.put(`${API_URL}updateprofile/${userId}`, {
    name,
    aboutme,
    city,
    phone,
    photo
  });
