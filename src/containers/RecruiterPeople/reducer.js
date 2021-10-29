/*
 * Recruiter People reducer
 */

import { fromJS } from 'immutable';

import {
  CONTACT_DETAIL_COUNT_REQUEST,
  CONTACT_DETAIL_COUNT_SUCCESS,
} from './constants';

// The initial state of the Recruiter People Requests
const initialState = fromJS({
  contactDetailCount: false,

});

function recruiterPeopleReducer(state = initialState, action) {
  switch (action.type) {
    case CONTACT_DETAIL_COUNT_REQUEST:
      return state
        .set('contactDetailCount', false);
    case CONTACT_DETAIL_COUNT_SUCCESS:
      return state
        .set('contactDetailCount', action.data);
    default:
      return state;
  }
}

export default recruiterPeopleReducer;
