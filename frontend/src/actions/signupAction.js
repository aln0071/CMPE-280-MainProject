/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { USER_SIGNUP } from './types';
import backendServer from '../webConfig.js';

export const signup = (userData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios
    .post(`${backendServer}/signup`, userData)
    .then((response) => dispatch({
        type: USER_SIGNUP,
        payload: response.data
      })
    )
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: USER_SIGNUP,
          payload: error.response.data
        });
      }
    });
};
