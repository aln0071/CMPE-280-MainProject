import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

import AuthService from '../services/auth.service';
import { MESSAGE } from './messages';
import { getErrorMessage } from '../utils/utils';

export const register = (username, email, password) => (dispatch) => AuthService.register(username, email, password).then(
  (response) => {
    dispatch({
      type: REGISTER_SUCCESS
    });

    dispatch(MESSAGE.success("User registered successfully"))

    return Promise.resolve();
  },
  (error) => {
    const message = getErrorMessage(error);

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
    const message = getErrorMessage(error);

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
