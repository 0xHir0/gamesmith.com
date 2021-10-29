/*
 * Verify reducer
 */

import { fromJS } from 'immutable';
import {
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
} from './constants';

// The initial state of Verify
const initialState = fromJS({
  message: '',
});

function verifyReducer(state = initialState, action) {
  switch (action.type) {
    case VERIFY_REQUEST:
      return state
        .set('message', '');
    case VERIFY_SUCCESS:
      return state
        .set('message', action.message);
    case VERIFY_ERROR:
      return state
        .set('message', action.message);
    default:
      return state;
  }
}

export default verifyReducer;
