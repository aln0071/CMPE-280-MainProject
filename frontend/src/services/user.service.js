import axios from 'axios';
import URLS from './urls'
const API_URL = 'http://localhost:3001/';

export const getUser = (username) => axios.get(URLS.GET_USER.replace('{username}', username));

export const updateUser = (userId, name, aboutme, city, phone, imgKey) => 
  axios.put(URLS.UPDATE_PROFILE.replace('{userId}', userId), {
    name,
    aboutme,
    city,
    phone,
    imgKey
  });

export const followUser = (userId, authorId) =>
  axios.put(URLS.FOLLOW_USER.replace('{userId}', userId).replace('{authorId}', authorId));
