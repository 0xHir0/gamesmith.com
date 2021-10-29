/*
 * Jobs sagas
 */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  makeRequest,
  getAuthToken,
  checkAuthToken,
} from 'utils';

import {
  JOBS_REQUEST,
  SEARCH_JOBS_REQUEST,
  NEXT_PAGE_REQUEST,
  GEO_LOCATION_REQUEST,
  GET_JOBS_DATA_TYPE_REQUEST,
} from './constants';
import workCategories from '../../data/workCategories';
import {
  openMessage,
} from 'containers/Modals/actions';

import {
  jobsRequest,
  jobsSuccess,
  jobsError,
  searchJobsSuccess,
  searchJobsError,
  nextPageSuccess,
  nextPageError,
  geoLocationSuccess,
  geoLocationError,
  getJobsDataTypeSuccess,
} from './actions';

import JobFamilyData from '../../data/jobPassions';


// watcher for people requests
function* jobsRequestWatcher() {
  while (yield take(JOBS_REQUEST)) {
    try {
      // jobs list if user logged in
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'GET', {}, 'browse/jobs', {
          'X-Auth-Token': token,
        });
        const jobs = req.data ? req.data.map((data) => {
          const jobEmployment = [];
          workCategories.map(i => (data.workCategories.includes(i.id) ? jobEmployment.push(i.label) : ''));
          data.jobEmployment = jobEmployment;
          data.jobEmployments = data.jobEmployment.length > 0 ? data.jobEmployment.join(', ').replace('/', '/ ') : 'Full Time';
          data.jobFamilies = data.jobFamilyId ? JobFamilyData.filter(x => x.id === data.jobFamilyId)[0].label : data.jobCardDetails.normalizedJobFamily ? data.jobCardDetails.normalizedJobFamily : 'Not Available';
          return data;
        }) : '';
        yield put(jobsSuccess(jobs));
      } else {
        // request job list - no auth token required
        const req = yield call(makeRequest, 'GET', {}, 'browse/jobs', {});
        const jobs = req.data ? req.data.map((data) => {
          const jobEmployment = [];
          workCategories.map(i => (data.workCategories.includes(i.id) ? jobEmployment.push(i.label) : ''));
          data.jobEmployment = jobEmployment;
          data.jobEmployments = data.jobEmployment.length > 0 ? data.jobEmployment.join(', ').replace('/', '/ ') : 'Full Time';
          data.jobFamilies = data.jobFamilyId ? JobFamilyData.filter(x => x.id === data.jobFamilyId)[0].label : data.jobCardDetails.normalizedJobFamily ? data.jobCardDetails.normalizedJobFamily : 'Not Available';
          return data;
        }) : '';
        yield put(jobsSuccess(jobs));
      }
    } catch (e) {
      // console.log(e);
      yield put(jobsError(e));
      yield put(openMessage());
      yield put(push('/jobs'));
    }
  }
}

function* geoLocationRequestWatcher() {
  while (yield take(GEO_LOCATION_REQUEST)) {
    try {
      // jobs list if user logged in
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'GET', {}, 'location', {
          'X-Auth-Token': token,
        });
        yield put(geoLocationSuccess(req.data));
      } else {
        // request job list - no auth token required
        const req = yield call(makeRequest, 'GET', {}, 'location', {});
        yield put(geoLocationSuccess(req.data));
      }
    } catch (e) {
      // console.log(e);
      yield put(geoLocationError(e));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

// watcher for job search requests
function* searchJobsRequestWatcher() {
  let task;
  while (true) {
    const { payload: { query: { queryF, queryL, queryE, queryT } } } = yield take(SEARCH_JOBS_REQUEST);
    const familyList = queryF && Array.isArray(queryF) ? queryF.map(val => parseInt(val, 10)) : [];
    const locationList = queryL && Array.isArray(queryL) ? queryL : [];
    const employmentList = queryE && Array.isArray(queryE) ? queryE.map(val => parseInt(val, 10)) : [];
    try {
      if (checkAuthToken()) { // check auth token for expiration
        const { token } = yield call(getAuthToken);
        // check for empty query strings to prevent bad server requests
        if (familyList.length < 1 && locationList.length < 1 && employmentList.length < 1 && !queryT) {
          // request jobs data
          yield put(searchJobsSuccess([]));
          yield put(jobsRequest());
          yield put(push('/jobs'));
        } else {
          // request user data
          if (task) {
            yield cancel(task);
          }
          task = yield fork(handleJobsSearch, 'POST', {
            jobFamily: familyList,
            location: locationList,
            employment: employmentList,
            query: queryT,
          }, 'jobs/searchJobs', {
            'X-Auth-Token': token,
          });
        }
      } else if (familyList.length < 1 && locationList.length < 1 && employmentList.length < 1 && !queryT) {
          // request jobs data
        yield put(searchJobsSuccess([]));
        yield put(jobsRequest());
        yield put(push('/jobs'));
      } else {
          // request user data
        if (task) {
          yield cancel(task);
        }
        task = yield fork(handleJobsSearch, 'POST', {
          jobFamily: familyList,
          location: locationList,
          employment: employmentList,
          query: queryT,
        }, 'jobs/searchJobs', {});
      }
    } catch (e) {
      // console.log(e.toString());
      console.log(e);
      yield put(searchJobsError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

function* handleJobsSearch(method, data, query, token) {
  try {
    const req = yield call(makeRequest, method, data, query, token);
    const jobs = req.data ? req.data.map((data) => {
      const jobEmployment = [];
      workCategories.map(i => (data.workCategories.includes(i.id) ? jobEmployment.push(i.label) : ''));
      data.jobEmployment = jobEmployment;
      data.jobEmployments = data.jobEmployment.length > 0 ? data.jobEmployment.join(', ').replace('/', '/ ') : 'Full Time';
      data.jobFamilies = data.jobFamilyId ? JobFamilyData.filter(x => x.id === data.jobFamilyId)[0].label : 'Not Available';
      return data;
    }) : '';
    // eslint-disable-next-line no-unneeded-ternary
    yield put(searchJobsSuccess(jobs ? jobs : []));
  } catch (e) {
    console.log(e);
    yield put(searchJobsError(e.toString()));
    yield put(openMessage());
    yield put(push('/jobs'));
  }
}

// watcher for next page requests
function* nextPageRequestWatcher() {
  while (true) {
    const { payload: { url, offset, query } } = yield take(NEXT_PAGE_REQUEST);
    try {
        // request next page of jobs
      if (url === 'searchjob') {
        const req = yield call(makeRequest, 'POST', {
          jobFamily: query.family,
          location: query.location,
          studios: query.studio,
          offset,
        }, 'jobs/searchJobs', {});
        const jobs = req.data ? req.data.map((data) => {
          // console.log(data)
          data.jobFamilies = data.jobFamilyId ? JobFamilyData.filter(x => x.id === data.jobFamilyId)[0].label : 'Not Available';
          return data;
        }) : '';
        yield put(nextPageSuccess(jobs));
      } else {
        const req = yield call(makeRequest, 'GET', {}, `${url}?offset=${offset}`, {});
        const jobs = req.data ? req.data.map((data) => {
          const jobEmployment = [];
          // console.log(data)
          data.jobEmployment = jobEmployment;
          data.jobEmployments = data.jobEmployment.length > 0 ? data.jobEmployment.join(', ').replace('/', '/ ') : 'Full Time';
          data.jobFamilies = data.jobFamilyId ? JobFamilyData.filter(x => x.id === data.jobFamilyId)[0].label : 'Not Available';
          return data;
        }) : '';
        yield put(nextPageSuccess(jobs));
      }
    } catch (e) {
      // console.log(e);
      yield put(nextPageError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

function* getJobsDataTypeRequestWatcher() {
  while (yield take(GET_JOBS_DATA_TYPE_REQUEST)) {
    try {
      // request next page of jobs
      const req = yield call(makeRequest, 'GET', {}, 'jobs/jobsdata', {});
      yield put(getJobsDataTypeSuccess(req.data));
    } catch (e) {
      // console.log(e);
      yield put(nextPageError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

export default [
  jobsRequestWatcher,
  geoLocationRequestWatcher,
  searchJobsRequestWatcher,
  nextPageRequestWatcher,
  getJobsDataTypeRequestWatcher,
];
