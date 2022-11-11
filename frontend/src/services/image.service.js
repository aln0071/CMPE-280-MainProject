import axios from 'axios';

const API_URL = 'http://localhost:3001/';

export const uploadImage = file => {
    const formData = new FormData();
    formData.append("image", file);
    return axios.post(`${API_URL}image`, formData);
}

export const getImageStream = (key) => axios.get(`${API_URL}image/${key}`);
