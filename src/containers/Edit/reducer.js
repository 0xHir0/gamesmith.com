/*
 * Update profile reducer
 */

import { fromJS } from 'immutable';
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_EMAIL_REQUEST,
  UPDATE_LINKEDIN_EMAIL_REQUEST,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  message: '',
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    // update actions
    case UPDATE_PROFILE_REQUEST:
      return state
        .set('message', '');
    case UPDATE_PROFILE_SUCCESS:
      return state
        .set('message', action.message);
    case UPDATE_PROFILE_ERROR:
      return state
        .set('message', action.message);
    default:
      return state;
    case UPDATE_EMAIL_REQUEST:
      return state
        .set('message', '');
    case UPDATE_LINKEDIN_EMAIL_REQUEST:
      return state
        .set('message', '');
  }
}

export default profileReducer;
