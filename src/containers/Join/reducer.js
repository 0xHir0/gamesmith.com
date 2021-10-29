/*
 * Join reducer
 */

import { fromJS } from 'immutable';
import {
  MAKER_JOIN_REQUEST,
  MAKER_JOIN_SUCCESS,
  MAKER_JOIN_ERROR,
} from './constants';

// The initial state of Join
const initialState = fromJS({
  message: '',
});

function makerJoinReducer(state = initialState, action) {
  switch (action.type) {
    case MAKER_JOIN_REQUEST:
      return state
        .set('message', '');
    case MAKER_JOIN_SUCCESS:
      return state
        .set('message', action.message);
    case MAKER_JOIN_ERROR:
      return state
        .set('message', action.message);
    default:
      return state;
  }
}

export default makerJoinReducer;
