import axios from 'axios';
import URLS from './urls'

export const  getComments = (blogId) => axios.get(URLS.GET_COMMENTS.replace('{blogId}', blogId))

export const postComment = (blogId, comment, isAnonymous) => 
  axios.post(URLS.POST_COMMENTS.replace('{blogId}', blogId), {
    comment,
    isAnonymous
  })
