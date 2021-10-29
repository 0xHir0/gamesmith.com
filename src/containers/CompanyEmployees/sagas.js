/*
 * CompanyEmployees sagas
 */

import { take, call, put } from 'redux-saga/effects';
import {
  GET_COMPANY_EMPLOYEES_REQUEST,
} from './constants';

import { getCompanyMakersSuccess, getCompanyMakersError } from './actions';

import { makeRailApiRequest, checkAuthToken, getAuthToken } from '../../utils';

// Individual exports for testing
function* getCompanyMakersRequestWatcher() {
  while (true) {
    const { payload: { companyName, offset } } = yield take(GET_COMPANY_EMPLOYEES_REQUEST);
    try {
      if (checkAuthToken()) {
        const { token } = getAuthToken();
        const req = yield call(makeRailApiRequest, 'GET', {},
          `game_makers?currCompany=${companyName}&offset=${offset}`,
          { 'X-Auth-Token': token });
        yield put(getCompanyMakersSuccess(req.data));
      }
    } catch (e) {
      // console.log('error ::', e);
      yield put(getCompanyMakersError('Error while loading makers.'));
    }
  }
}

// All sagas to be loaded
export default [
  getCompanyMakersRequestWatcher,
];
