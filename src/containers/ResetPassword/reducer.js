/*
 * Reset Password reducer
 */

import { fromJS } from 'immutable';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './constants';

// The initial state of Reset Password
const initialState = fromJS({
  message: '',
});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return state
        .set('message', '');
    case RESET_PASSWORD_SUCCESS:
      return state
        .set('message', action.message);
    case RESET_PASSWORD_ERROR:
      return state
        .set('message', action.message);
    default:
      return state;
  }
}

export default resetPasswordReducer;
