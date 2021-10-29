/*
 * Jobs reducer
 */

import { fromJS } from 'immutable';
import {
  EMPLOYER_APPLY_REQUEST
} from './constants';

const initialState = fromJS({
  isWorking: false
});

function employersReducer(state = initialState, action) {
  switch (action.type) {
    case EMPLOYER_APPLY_REQUEST:
      return state
        .set('isWorking', true);
    default:
      return state;
  }
}

export default employersReducer;
