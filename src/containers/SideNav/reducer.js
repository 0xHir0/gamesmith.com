/*
 * Side nav reducer
 */

import { fromJS } from 'immutable';
import {
  SHOW_NAV,
  HIDE_NAV,
} from './constants';

const initialState = fromJS({
  showNav: false,
});

function sideNavReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_NAV:
      return state
        .set('showNav', true);
    case HIDE_NAV:
      return state
        .set('showNav', false);
    default:
      return state;
  }
}

export default sideNavReducer;
