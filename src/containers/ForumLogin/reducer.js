/*
 * Forum reducer
 */

import { fromJS } from 'immutable';
import {
  FORUM_LOGIN_REQUEST,
  FORUM_LOGIN_SUCCESS,
  FORUM_LOGIN_ERROR
} from './constants';

// The initial state of Forum
const initialState = fromJS({
  message: '',
});

function forumReducer(state = initialState, action) {
  switch (action.type) {
    case FORUM_LOGIN_REQUEST:
      return state
        .set('message', '');
    case FORUM_LOGIN_SUCCESS:
      return state
        .set('message', action.message);
    case FORUM_LOGIN_ERROR:
      return state
        .set('message', action.message);
    default:
      return state;
  }
}

export default forumReducer;
