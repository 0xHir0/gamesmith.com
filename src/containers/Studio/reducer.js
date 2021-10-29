/*
 * Studio reducer
 */

import { fromJS } from 'immutable';
import {
  STUDIO_REQUEST,
  STUDIO_SUCCESS,
  STUDIO_ERROR,
  EDIT_STUDIO_JOB_REQUEST,
  EDIT_STUDIO_JOB_SUCCESS,
  EDIT_STUDIO_JOB_ERROR,
  APPLY_STUDIO_JOB_REQUEST,
  APPLY_STUDIO_JOB_SUCCESS,
  APPLY_STUDIO_JOB_ERROR,
  SCROLL_TO_JOBS,
  GET_STUDIO_RECRUITER_REQUEST,
  GET_STUDIO_RECRUITER_SUCCESS,
  GET_STUDIO_RECRUITER_ERROR,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  studio: {},
  jobs: [],
  message: '',
  isNumberOfJobsclicked: false,
  recruiter: [],
});

function studioReducer(state = initialState, action) {
  switch (action.type) {
    case STUDIO_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', 'Loading');
    case STUDIO_SUCCESS:
      return state
        .set('isFetching', false)
        .set('studio', fromJS(action.data))
        .set('jobs', fromJS(action.data.jobs))
        .set('message', '');
    case STUDIO_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case EDIT_STUDIO_JOB_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case EDIT_STUDIO_JOB_SUCCESS:
      return state
        .set('isFetching', false)
        .set('jobs', fromJS(action.data))
        .set('message', 'test');
    case EDIT_STUDIO_JOB_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case APPLY_STUDIO_JOB_REQUEST:
      return state
        .set('isFetching', false)
        .set('message', 'Applying');
    case APPLY_STUDIO_JOB_SUCCESS:
      const updatedJobs = state.get('jobs').update(
        state.get('jobs').findIndex(function(item) {
          return item.get('id') ===  action.data;
        }), function(item) {
          return item.set("applied", true);
        }
      );
      return state
        .set('isFetching', false)
        .set('jobs' , updatedJobs)
        .set('message', '');
    case APPLY_STUDIO_JOB_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case SCROLL_TO_JOBS:
      return state
        .set('isNumberOfJobsclicked', true);
    case GET_STUDIO_RECRUITER_REQUEST:
      return state
        .set('recruiter', []);
    case GET_STUDIO_RECRUITER_SUCCESS:
      return state
        .set('recruiter', action.data);
    case GET_STUDIO_RECRUITER_ERROR:
      return state
        .set('message', action.message);
    default:
      return state;
  }
}

export default studioReducer;
