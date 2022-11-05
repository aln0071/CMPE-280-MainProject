import { USER_SIGNUP } from '../actions/types';

const initialState = {
  user: {}
};

export default function (action, state = initialState) {
  switch (action.type) {
    case USER_SIGNUP:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
