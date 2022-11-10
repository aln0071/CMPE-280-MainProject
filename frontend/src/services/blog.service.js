import axios from 'axios';

const API_URL = 'http://localhost:3001/';

export const getBlog = (blogId) => axios.get(`${API_URL}getBlog/${blogId}`);
