/*
* salary calculator sagas
* */

import { take, call, put } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';
import { round, isEmpty } from 'lodash';
import {
  GET_JOBTITLE_REQUEST,
  SEARCH_SALARY_REQUEST,
  GET_JOBS_REQUEST,
  GET_JOBS_BYNAME_REQUEST,
} from './constants';

import { searchSalarySuccess, getJobsByNameSuccess, getJobsByNameRequest, saveTitles } from './actions';
import { closeModal, openMessage } from '../Modals/actions';
import { makeRequest, checkAuthToken, getAuthToken, removeAuthToken, removeUserData } from '../../utils';


function* getJobTitleRequestWatcher() {
  while (true) {
    const { payload: { query, url, cb } } = yield take(GET_JOBTITLE_REQUEST);
    try {
      // check for empty query strings to prevent bad server requests
      if (!query.trim()) {
        yield call(cb, null, { options: [] });
        // yield put(getAutocompleteSuccess('Empty query string submitted.'));
      } else {
        // const { token } = yield call(getAuthToken);
        // request autocomplete data
        const req = yield call(makeRequest, 'GET', {}, `autocomplete/${url}?q=${query}`);
        const mydata = req.data ? req.data.map((key, idx) => (
            { id: idx, name: key }
          )) : '';
        const title = mydata !== null && mydata.map((key, idx) => (
          key.name
        ));
        if(title.length > 0 ) {
          yield put(saveTitles(title));
        }

        yield call(cb, null, { options: mydata });
        // yield put(getAutocompleteSuccess('Successfully fetched suggestions!'));
      }
    } catch (e) {
      yield call(cb, { _error: 'Error fetching suggestions.' });
      // yield put(getAutocompleteError(e));
    }
  }
}

// watcher for reset password requests
function* searchSalaryRequestWatcher() {
  while (true) {
    const { payload: { data } } = yield take(SEARCH_SALARY_REQUEST);
    try {
      const salaryAmount = parseInt(data.salary.replace(',', '').replace('$', ''), 10);
      const req = yield call(makeRequest, 'POST', {
        salary: salaryAmount,
        title: data.title,
        age: data.age,
        sex: data.sex,
        level: data.level,
      }, 'comparesalary', {});
      const dataSalary = req.data ? req.data : 1;
      const computedSalary = (salaryAmount / dataSalary) * 100;
      const salaryPercent = computedSalary > 100 ? computedSalary - 100 : 100 - computedSalary;
      const flag = salaryAmount > dataSalary ? 'above' : 'below';
      yield put(searchSalarySuccess(req.data, data.title, round(salaryPercent, 2), flag));
      yield put(getJobsByNameRequest(data.title));
      yield put(closeModal());
    } catch (e) {
      yield put(closeModal());
      // console.log(e); // eslint-disable-line no-console
      yield put(openMessage());

      // yield put(push('/'));
    }
  }
}

function* getJobsByNameRequestWatcher() {
  while (true) {
    const { payload: { title } } = yield take(GET_JOBS_BYNAME_REQUEST);
    try {
      // if (checkAuthToken()) {
      if (!isEmpty(title)) {
        const req = yield call(makeRequest, 'GET', {}, `getJobsByName/${title}`, {});
        yield put(getJobsByNameSuccess(req.data));
      } else {
        const req = yield call(makeRequest, 'GET', {}, 'browse/jobs', {});
        yield put(getJobsByNameSuccess(req.data));
      }
      yield put(closeModal());
      // } else {
      //   yield put(closeModal());
      //
      //   yield call(removeAuthToken);
      //   yield call(removeUserData);
      //   yield put(replace('/?unauthorized'));
      // }
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
      // yield put(push('/'));
      yield put(closeModal());
      yield put(openMessage());
    }
  }
}
function* getJobsRequestWatcher() {
  while (yield take(GET_JOBS_REQUEST)) {
    try {
      // jobs list if user logged in
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'GET', {}, 'browse/jobs', {
          'X-Auth-Token': token,
        });
        yield put(getJobsByNameSuccess(req.data));
      } else {
        // request job list - no auth token required
        const req = yield call(makeRequest, 'GET', {}, 'browse/jobs', {});
        yield put(getJobsByNameSuccess(req.data));
      }
    } catch (e) {
      console.log(e);
      yield put(openMessage());
      // yield put(push('/'));
    }
  }
}

export default [
  getJobTitleRequestWatcher,
  searchSalaryRequestWatcher,
  getJobsRequestWatcher,
  getJobsByNameRequestWatcher,
];
