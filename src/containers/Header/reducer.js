/*
 * Header reducer
 */

import { fromJS } from 'immutable';
import {
  OPEN_MENU,
  CLOSE_MENU,

} from './constants';

const initialState = fromJS({
  isOpen: false,
});

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MENU:
      return state
        .set('isOpen', true);
    case CLOSE_MENU:
      return state
        .set('isOpen', false);
    default:
      return state;
  }
}

export default headerReducer;
