import axios from 'axios';
import URLS from './urls'

export const uploadImage = file => {
    const formData = new FormData();
    formData.append("image", file);
    return axios.post(URLS.UPLOAD_IMAGE, formData);
}

export const getImageStream = (key) => axios.get(URLS.GET_IMAGE.replace('{key}', key), {responseType: 'arraybuffer'});
