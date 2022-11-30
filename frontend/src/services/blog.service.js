import axios from 'axios';

const API_URL = 'http://localhost:3001/';

export const getBlog = (blogId) => axios.get(`${API_URL}getBlog/${blogId}`);

export const getBlogsByUser = (username) => axios.get(`${API_URL}getRecentBlogs/${username}`)

export const toggleBookmark = (blogId) => axios.get(`${API_URL}toggleBookmark/${blogId}`)

export const getBookmarkedBlogs = (username) => axios.get(`${API_URL}getBookmarkedBlogs/${username}`)