/*
 * Job reducer
 */

import { fromJS } from 'immutable';
import {
  JOB_REQUEST,
  JOB_SUCCESS,
  JOB_ERROR,
  APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_ERROR,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  job: {},
  message: '',
});

function jobReducer(state = initialState, action) {
  switch (action.type) {
    case JOB_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', 'Loading');
    case JOB_SUCCESS:
      return state
        .set('isFetching', false)
        .set('job', fromJS(action.data))
        .set('message', '');
    case JOB_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case APPLY_JOB_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', 'Applying');
    case APPLY_JOB_SUCCESS:
      return state
        .set('isFetching', false)
        .setIn(['job', 'applied'], true)
        .set('message', '');
    case APPLY_JOB_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    default:
      return state;
  }
}

export default jobReducer;
