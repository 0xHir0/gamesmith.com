/*
 * Recruiter reducer
 */

import { fromJS, setIn } from 'immutable';
import {
  RECRUITER_REQUEST,
  RECRUITER_SUCCESS,
  RECRUITER_ERROR,
  RECRUITER_CONNECTIONS_REQUEST,
  RECRUITER_CONNECTIONS_SUCCESS,
  RECRUITER_CONNECTIONS_ERROR,
  POSTED_JOBS_REQUEST,
  POSTED_JOBS_SUCCESS,
  POSTED_JOBS_ERROR,
  ADD_JOBS_REQUEST,
  ADD_JOBS_SUCCESS,
  ADD_JOBS_ERROR,
  EDIT_JOBS_REQUEST,
  EDIT_JOBS_SUCCESS,
  EDIT_JOBS_ERROR,
  DELETE_JOBS_REQUEST,
  DELETE_JOBS_SUCCESS,
  DELETE_JOBS_ERROR,
  JOB_APPLICANTS_REQUEST,
  JOB_APPLICANTS_SUCCESS,
  JOB_APPLICANTS_ERROR,
  GLOBAL_APPLICANTS_REQUEST,
  GLOBAL_APPLICANTS_SUCCESS,
  GLOBAL_APPLICANTS_ERROR,
  UPGRADE_TO_STUDIO_REQUEST,
  UPGRADE_TO_STUDIO_SUCCESS,
  UPGRADE_TO_STUDIO_ERROR,
  REJECT_APPLICANT_REQUEST,
  REJECT_APPLICANT_SUCCESS,
  REJECT_APPLICANT_ERROR,
  EDIT_STUDIO_REQUEST,
  EDIT_STUDIO_SUCCESS,
  EDIT_STUDIO_ERROR,
  GET_RECRUITER_STUDIO_REQUEST_SUCCESS,
  GET_RECRUITER_STUDIO_REQUEST,
  GET_RECRUITER_STUDIO_REQUEST_ERROR,
  DELETE_GAME_REQUEST,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_ERROR,
  MOVE_APPLICANT_REQUEST,
  MOVE_APPLICANT_SUCCESS,
  MOVE_APPLICANT_ERROR,
  MOVE_GLOBAL_APPLICANT_REQUEST,
  MOVE_GLOBAL_APPLICANT_SUCCESS,
  MOVE_GLOBAL_APPLICANT_ERROR,
  TOGGLE_VIEW,
  NEXT_PAGE_ERROR,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_REQUEST, GT_PLUS_REQUEST,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  isStudioFetching: false,
  isJobApplicantFetching: false,
  isGlobalFetching: false,
  isGlobalView: false,
  isLastPage: false,
  message: '',
  recruiter: {},
  jobs: [],
  studio: {},
  jobApplicants: [],
  globalApplicants: [],
  isStudioPaying: null,
});

function recruiterReducer(state = initialState, action) {
  switch (action.type) {
    case RECRUITER_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case RECRUITER_SUCCESS:
      return state
        .set('isFetching', false)
        .set('recruiter', fromJS(action.data))
        .set('message', 'test');
    case RECRUITER_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case RECRUITER_CONNECTIONS_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case RECRUITER_CONNECTIONS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('recruiter', fromJS(action.data))
        .set('message', 'test');
    case RECRUITER_CONNECTIONS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case POSTED_JOBS_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case POSTED_JOBS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('jobs', fromJS(action.data))
        .set('message', 'jobs');
    case POSTED_JOBS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case ADD_JOBS_REQUEST:
      return state
        .set('isFetching', false)
        .set('message', '');
    case ADD_JOBS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('jobs', state.get('jobs').concat([action.job]))
        .set('message', 'test');
    case ADD_JOBS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case EDIT_JOBS_REQUEST:
      return state
        .set('isStudioFetching', false)
        .set('message', '');
    case EDIT_JOBS_SUCCESS:
      return state
        .set('isStudioFetching', false)
        .set('jobs', fromJS(action.data))
        .set('message', 'test');
    case EDIT_JOBS_ERROR:
      return state
        .set('isStudioFetching', false)
        .set('message', action.message);
    case DELETE_JOBS_REQUEST:
      return state
        .set('isFetching', false)
        .set('message', 'deleting');
    case DELETE_JOBS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('jobs', fromJS(action.data))
        .set('message', 'test');
    case DELETE_JOBS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case JOB_APPLICANTS_REQUEST:
      return state
        .set('isJobApplicantFetching', true)
        .set('message', 'applicants');
    case JOB_APPLICANTS_SUCCESS:
      return state
        .set('isJobApplicantFetching', false)
        .set('jobApplicants', fromJS(action.data))
        .set('isLastPage', action.data.length < 2)
        .set('message', 'test');
    case JOB_APPLICANTS_ERROR:
      return state
        .set('isJobApplicantFetching', false)
        .set('message', action.message);
    case GLOBAL_APPLICANTS_REQUEST:
      return state
        .set('isGlobalFetching', true)
        .set('message', 'applicants');
    case GLOBAL_APPLICANTS_SUCCESS:
      return state
        .set('isGlobalFetching', false)
        .set('globalApplicants', fromJS(action.data))
        .set('message', 'globalApplicants');
    case GLOBAL_APPLICANTS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case UPGRADE_TO_STUDIO_REQUEST:
      return state
        .set('isFetching', false)
        .set('message', 'upgradeToStudio');
    case UPGRADE_TO_STUDIO_SUCCESS:
      return state
        .set('isFetching', false)
        .set('studio', fromJS(action.data))
        .set('message', 'upgradeToStudio');
    case UPGRADE_TO_STUDIO_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case REJECT_APPLICANT_REQUEST:
      return state
        .set('message', 'rejected');
    case REJECT_APPLICANT_SUCCESS:
      let updatedApplicants = state.get('jobApplicants').update(
        state.get('jobApplicants').findIndex((item) => {
          return item.get('jobId') === action.data.jobId && item.get('applicantId') == action.data.applicantId;
        }), (item) => {
        return item.set('isRejected', true);
      }
      );
      const jobs = state.get('jobs').update(
       state.get('jobs').findIndex((item) => {
         return item.get('id') === action.data.jobId;
       }), (item) => {
        const rejectedApplicantCount = item.toJS().rejectedApplicantCount + 1;
        return item.set('rejectedApplicantCount', rejectedApplicantCount);
      }
      );
      updatedApplicants = updatedApplicants.toJS().filter(up => !up.isRejected);
      return state
        .set('jobApplicants', fromJS(updatedApplicants))
        .set('jobs', fromJS(jobs))
        .set('message', 'test');
    case REJECT_APPLICANT_ERROR:
      return state
        .set('message', action.message);
    case EDIT_STUDIO_REQUEST:
      return state
        .set('message', '');
    case EDIT_STUDIO_SUCCESS:
      return state
        .set('message', '')
        .set('studio', fromJS(action.data));
    case EDIT_STUDIO_ERROR:
      return state
        .set('message', action.message);
    case GET_RECRUITER_STUDIO_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', 'Loading');
    case GET_RECRUITER_STUDIO_REQUEST_SUCCESS:
      const studioPaying = action.data.licenseType === 'basic' ? 'no' : 'yes';
      return state
        .set('isFetching', false)
        .set('studio', fromJS(action.data))
        .set('jobs', fromJS(action.data.jobs))
        .set('message', '')
        .set('isStudioPaying', studioPaying);
    case GET_RECRUITER_STUDIO_REQUEST_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case DELETE_GAME_REQUEST:
      return state
        .set('isFetching', false)
        .set('message', '');
    case DELETE_GAME_SUCCESS:
      return state
        .set('isFetching', false)
        .set('message', '');
    case DELETE_GAME_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case MOVE_APPLICANT_REQUEST:
      return state
        .set('isFetching', false)
        .set('message', '');
    case MOVE_APPLICANT_SUCCESS:
      const checkRejected = (state.get('jobApplicants').toJS().filter(ja => ja.applicantId == action.data.applicantId && ja.isRejected == true));
      let updatedJobs = state.get('jobs').update(
        state.get('jobs').findIndex((item) => {
          return item.get('id') === action.data.currentJobId;
        }), (item) => {
        const applicantCount = item.toJS().applicantCount - 1;
        return item.set('applicantCount', applicantCount);
      }
      );
      updatedJobs = updatedJobs.update(
        updatedJobs.findIndex((item) => {
          return item.get('id') === action.data.movedJobId;
        }), (item) => {
        const applicantCount = item.toJS().applicantCount + 1;
        return item.set('applicantCount', applicantCount);
      }
      );
      if (fromJS(checkRejected).toJS().length > 0) {
        updatedJobs = updatedJobs.update(
          updatedJobs.findIndex((item) => {
            return item.get('id') === action.data.currentJobId;
          }), (item) => {
          const rejectedApplicantCount = item.toJS().rejectedApplicantCount - 1;
          return item.set('rejectedApplicantCount', rejectedApplicantCount);
        }
        );
        updatedJobs = updatedJobs.update(
          updatedJobs.findIndex((item) => {
            return item.get('id') === action.data.movedJobId;
          }), (item) => {
          const rejectedApplicantCount = item.toJS().rejectedApplicantCount + 1;
          return item.set('rejectedApplicantCount', rejectedApplicantCount);
        }
        );
      }
      return state
        .set('isFetching', false)
        .set('jobApplicants', fromJS(state.get('jobApplicants').toJS().filter(ja => ja.applicantId != action.data.applicantId)))
        .set('jobs', fromJS(updatedJobs))
        .set('message', '');
    case MOVE_APPLICANT_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case MOVE_GLOBAL_APPLICANT_REQUEST:
      return state
        .set('isGlobalFetching', false)
        .set('message', '');
    case MOVE_GLOBAL_APPLICANT_SUCCESS:
      const currentJobs = state.get('jobs').update(
        state.get('jobs').findIndex((item) => {
          return item.get('id') === action.data.movedJobId;
        }), (item) => {
        const count = item.toJS().applicantCount + 1;
        return item.set('applicantCount', count);
      }
      );
      return state
        .set('isGlobalFetching', false)
        .set('globalApplicants', fromJS(action.data.applicants))
        .set('jobs', fromJS(currentJobs))
        .set('message', '');
    case MOVE_GLOBAL_APPLICANT_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case TOGGLE_VIEW:
      return state
        .set('isGlobalView', !state.get('isGlobalView'));
    case NEXT_PAGE_REQUEST:
      return state
        .set('isJobApplicantFetching', false)
        .set('message', '');
    case NEXT_PAGE_SUCCESS: {
      // const data = state.get('data');
      // const target = state.get('isSearching') ? 'search' : 'games';
      return state
        .set('isJobApplicantFetching', false)
        .set('jobApplicants', state.get('jobApplicants').concat(action.data))
        .set('isLastPage', action.data.length < 2)
        .set('message', '');
    }
    case NEXT_PAGE_ERROR:
      return state
        .set('isJobApplicantFetching', false)
        .set('message', action.message);
    case GT_PLUS_REQUEST:
      return state
        .set('message', '');
    default:
      return state;
  }
}

export default recruiterReducer;
