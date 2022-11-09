import { MESSAGE_TYPE } from '../reducers/message';
import { SET_MESSAGE, CLEAR_MESSAGE } from './types';

const makeMessage = (message, type) => ({
  type: SET_MESSAGE,
  payload: {
    message,
    type,
  }
})

export const MESSAGE = {
  error: message => makeMessage(message, MESSAGE_TYPE.ERROR),
  info: message => makeMessage(message, MESSAGE_TYPE.INFO),
  success: message => makeMessage(message, MESSAGE_TYPE.SUCCESS),
}

export const clearMessage = () => ({
  type: CLEAR_MESSAGE
});
