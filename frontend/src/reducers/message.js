import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

const initialState = {};

export const MESSAGE_TYPE = {
  SUCCESS: 'SUCCESS',
  INFO: 'INFO',
  ERROR: 'ERROR',
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      const messageType = payload.type || MESSAGE_TYPE.INFO;
      const message = payload.message || payload;
      return {
        type: messageType,
        message
      };

    case CLEAR_MESSAGE:
      return { ...initialState };

    default:
      return state;
  }
}
