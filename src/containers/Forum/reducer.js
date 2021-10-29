/*
 * Forum reducer
 */

import { fromJS } from 'immutable';
import {
  FORUM_REQUEST,
  FORUM_SUCCESS,
  FORUM_ERROR,
} from './constants';

// The initial state of Forum
const initialState = fromJS({
  message: '',
  data: {}
});

function forumReducer(state = initialState, action) {
  switch (action.type) {
    case FORUM_REQUEST:
      return state
        .set('message', '');
    case FORUM_SUCCESS:
      return state
        .set('data', action.data);
    case FORUM_ERROR:
      return state
        .set('message', action.message);
    default:
      return state;
  }
}

export default forumReducer;
