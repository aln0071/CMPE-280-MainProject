import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
} from './types';

import AuthService from '../services/auth.service';
import { MESSAGE_TYPE } from '../reducers/message';
import { MESSAGE } from './messages';
export const register = (username, email, password) => (dispatch) => AuthService.register(username, email, password).then(
  (response) => {
    console.log(response)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user: response }

    });

    dispatch(MESSAGE.success("User registered successfully"))

    return Promise.resolve();
  },
  (error) => {
    const message = error?.response?.data?.message || error?.response?.data || error?.message || error?.toString() || '';

    dispatch({
      type: REGISTER_FAIL
    });

    dispatch(MESSAGE.error(message));

    return Promise.reject();
  }
);

export const login = (username, password) => (dispatch) => AuthService.login(username, password).then(
  (data) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data }
    });

    return Promise.resolve();
  },
  (error) => {
    const message = error?.response?.data?.message || error?.response?.data || error?.message || error?.toString() || '';

    dispatch({
      type: LOGIN_FAIL
    });

    dispatch(MESSAGE.error(message));

    return Promise.reject();
  }
);

export const logout = () => (dispatch) => {
  console.log("inside logout")
  AuthService.logout();

  dispatch({
    type: LOGOUT
  });
};

export const addBookmarkAction = bookmark => ({
  type: ADD_BOOKMARK,
  payload: {
    bookmark
  }
})

export const removeBookmarkAction = bookmark => ({
  type: REMOVE_BOOKMARK,
  payload: {
    bookmark
  }
})
