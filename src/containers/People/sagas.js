/*
 * People sagas
 */

import { take, call, put } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';

import {
  makeRequest,
  makeRailsRequest,
  removeUserData,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
  getUserData,
  getFilter,
} from 'utils';

import {
  PEOPLE_REQUEST,
  SEARCH_PEOPLE_REQUEST,
  NEXT_PAGE_REQUEST,
  CONNECT_REQUEST,
} from './constants';

import {
  openMessage,
} from 'containers/Modals/actions';

import {
  peopleRequest,
  peopleSuccess,
  peopleError,
  searchPeopleSuccess,
  searchPeopleError,
  nextPageSuccess,
  nextPageError,
  connectSuccess,
  connectError,
  totalCount,
} from './actions';


// watcher for people requests
function* peopleRequestWatcher() {
  while (yield take(PEOPLE_REQUEST)) {
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        // TODO:10 how do I query the user given the input?
        const req = yield call(makeRailsRequest, 'GET', {}, 'browse_game_makers', {
          'X-Auth-Token': token,
        });

        yield put(peopleSuccess(req.data));
      } else {
        const req = yield call(makeRailsRequest, 'GET', {}, 'browse_game_makers');
        yield put(peopleSuccess(req.data));
      }
    } catch (e) {
      // console.log(e);
      yield put(peopleError(e));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}


// watcher for people search requests
function* searchPeopleRequestWatcher() {
  while (true) {
    const { payload: { query: { name, filterBy, currCompany, pastCompany, opportunity, city, country, state, platform, jobTitle, gameTitle, language, verificationFilter, term, location, rate, geoCountryId }, isRecruiter } } = yield take(SEARCH_PEOPLE_REQUEST);
    try {
      const makerId = getUserData().id;
      if (checkAuthToken()) {
        if (!jobTitle) {
          yield put(peopleRequest());
          if (isRecruiter && window.location.pathname == '/recruitermaker') {
            yield put(push('/recruitermaker'));
          } else {
            yield put(push('/makers'));
          }

        } else {
          const req = yield call(makeRailsRequest, 'GET', {}, `by_term?term=${jobTitle}&maker_id=${makerId}&page_size=10&filter_by=${getFilter(filterBy)}`);
          const count = req.data && req.data.length > 0 ? req.data[0].total_count : '';
          yield put(totalCount(count));
          yield put(searchPeopleSuccess(req.data));
          if (isRecruiter && window.location.pathname == '/recruitermaker') {
            yield put(push(`/recruitermaker?search=true${jobTitle ? `&term=${jobTitle}` : ''}${filterBy ? `&filterBy=${filterBy}` : ''}${currCompany ? `&currCompany=${currCompany}` : ''}${pastCompany ? `&pastCompany=${pastCompany}` : ''}${country ? `&country=${country}` : ''}${location ? `&location=${location}` : ''}${language ? `&language=${language}` : ''}${gameTitle ? `&gameTitle=${gameTitle}` : ''}`));
          } else {
            yield put(push(`/makers?search=true${jobTitle ? `&term=${jobTitle}` : ''}${filterBy ? `&filterBy=${filterBy}` : ''}${currCompany ? `&currCompany=${currCompany}` : ''}${pastCompany ? `&pastCompany=${pastCompany}` : ''}${country ? `&country=${country}` : ''}${location ? `&location=${location}` : ''}${language ? `&language=${language}` : ''}${gameTitle ? `&gameTitle=${gameTitle}` : ''}`));

          }
        }
      }
    } catch (e) {
      yield put(searchPeopleError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

// watcher for next page requests
function* nextPageRequestWatcher() {
  while (true) {
    const { payload: { url, offset, query } } = yield take(NEXT_PAGE_REQUEST);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRailsRequest, 'GET', {}, `${url}?${query && `q=${query}&`}page=${offset}`, {
          'X-Auth-Token': token,
        });
        yield put(nextPageSuccess(req.data));
      } else {
        const req = yield call(makeRailsRequest, 'GET', {}, `${url}?${query && `q=${query}&`}page=${offset}`, {});
        yield put(nextPageSuccess(req.data));
      }
    } catch (e) {
      // console.log(e);
      yield put(nextPageError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

// watcher for connection requests
function* connectRequestWatcher() {
  while (true) {
    const { payload: { id, query } } = yield take(CONNECT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the message api
        const req = yield call(makeRequest, 'POST', {
          id,
        }, `connections/request/${id}`, {
          'X-Auth-Token': token,
        });
        yield put(connectSuccess(id));
        if (!query) {
          yield put(openMessage('Connection Request Sent', 'blank'));
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(connectError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield put(openMessage('Error Requesting Connection', 'blank'));
      // yield put(messageError(e));
    }
  }
}

export default [
  peopleRequestWatcher,
  searchPeopleRequestWatcher,
  nextPageRequestWatcher,
  connectRequestWatcher,
];
