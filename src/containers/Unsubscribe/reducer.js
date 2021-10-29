/*
 * Unsubscribe reducer
 */

import { fromJS } from 'immutable';
import {
  UNSUBSCRIBE_REQUEST,
  UNSUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_ERROR,
} from './constants';

// The initial state of Unsubscribe
const initialState = fromJS({
  message: '',
});

function unsubscribeReducer(state = initialState, action) {
  switch (action.type) {
    case UNSUBSCRIBE_REQUEST:
      return state
        .set('message', '');
    case UNSUBSCRIBE_SUCCESS:
      return state
        .set('message', action.message);
    case UNSUBSCRIBE_ERROR:
      return state
        .set('message', action.message);
    default:
      return state;
  }
}

export default unsubscribeReducer;
