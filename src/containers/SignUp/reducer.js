/*
 * Sign Up reducer
 */

import { fromJS } from 'immutable';

import {
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_ERROR,
  SAVE_CV_URL,
  DELETE_CV_URL,
} from './constants';

// The initial state of the Sign Up
const initialState = fromJS({
  message: '',
  isError: false,
  cvUrl: '',
});

function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_EMAIL_REQUEST:
      return state
        .set('isError', false)
        .set('message', '');
    case CHECK_EMAIL_SUCCESS:
      return state
        .set('isError', false);
    case CHECK_EMAIL_ERROR:
      return state
        .set('isError', true);
    case SAVE_CV_URL:
      return state
        .set('cvUrl', action.data);
    case DELETE_CV_URL:
      return state
        .set('cvUrl', '');
    default:
      return state;
  }
}

export default signUpReducer;
