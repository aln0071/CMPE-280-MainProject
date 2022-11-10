import axios from 'axios';

const API_URL = 'http://localhost:3001/';

export const  getComments = (blogId) => axios.get(`${API_URL}comments/${blogId}`)

export const postComment = (blogId, comment, isAnonymous) => 
  axios.post(`${API_URL}comment/${blogId}`, {
    comment,
    isAnonymous
  })
