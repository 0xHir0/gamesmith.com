/*
 * Games sagas
 */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';

import {
  makeRequest,
  removeUserData,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
} from 'utils';

import {
  GAMES_REQUEST,
  MAKER_GAMES_REQUEST,
  SEARCH_GAMES_REQUEST,
  NEXT_PAGE_REQUEST,
  MAKER_EXPERIENCE_REQUEST,
  PARTNER_REQUEST,
  CHECK_PARTNER,
  UPDATE_PARTNERS,
} from './constants';

import {
  openMessage,
  openEditExp,
} from 'containers/Modals/actions';
import {
  checkPartners
} from "../Header/actions";
import {
  gamesSuccess,
  gamesError,
  gamesRequest,
  gameSearchSuccess,
  gameSearchError,
  nextPageSuccess,
  nextPageError,
  makerGamesSuccess,
  makerGamesError,
  makerExpError,
  updatePartners,
} from './actions';


// watcher for games requests
function* gamesRequestWatcher() {
  while (yield take(GAMES_REQUEST)) {
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'GET', {}, 'browse/games', {
          'X-Auth-Token': token,
        });
        yield put(gamesSuccess(req.data));
      } else {
          // request job list - no auth token required
          const req = yield call(makeRequest, 'GET', {}, 'browse/games', {});
          yield put(gamesSuccess(req.data));

        // // if expired remove token and user data
        // yield call(removeAuthToken);
        // yield call(removeUserData);
        // // redirect user to Home and show the unauthorized message
        // yield put(gamesError('Login credentials have expired'));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e.toString());
      yield put(gamesError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

function* makerGamesRequestWatcher() {
  while (true) {
    const { payload: { id } } = yield take(MAKER_GAMES_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'GET', {}, `makerGameIds/${id}`, {
          'X-Auth-Token': token,
          'Pragma': 'no-cache',
        });
        yield put(makerGamesSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);

        const req = yield call(makeRequest, 'GET', {}, `makerGameIds/${id}`, {
          'Pragma': 'no-cache',
        });
        yield put(makerGamesSuccess(req.data));
        // redirect user to Home and show the unauthorized message
        // yield put(makerGamesError('Login credentials have expired'));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(makerGamesError(e));
      // TODO:40 find a way to keep the url but still display the error page
      yield put(replace('/error'));
    }
  }
}


function* searchGamesWatcher() {
  let task
  while (true) {
    const { payload: { query } } = yield take(SEARCH_GAMES_REQUEST);
    try {
      if (checkAuthToken()) { // check auth token for expiration
        const { token } = yield call(getAuthToken);
        // check for empty query strings to prevent bad server requests
        if (!query.trim()) {
          // request game data
          yield put(gamesRequest());
        } else {
          // request user data
          if (task) {
            yield cancel(task);
          }
          task = yield fork(handleSearch, 'GET', {}, `searchgame?q=${query}`, {
            'X-Auth-Token': token,
          });
        }
      }
      else {
        if (!query.trim()) {
          // request game data
          yield put(gamesRequest());
        } else {
          // request user data
          if (task) {
            yield cancel(task);
          }
          task = yield fork(handleSearch, 'GET', {}, `searchgame?q=${query}`, {});
          // yield put(gameSearchSuccess(req.data));
          // // if expired remove token and user data
          // yield call(removeAuthToken);
          // yield call(removeUserData);
          // // redirect user to Home and show the unauthorized message
          // yield put(gamesError('Login credentials have expired'));
          // yield put(replace('/?unauthorized'));
        }
      }
    } catch (e) {
      // console.log(e.toString());
      yield put(gameSearchError(e.toString()));
      yield put(openMessage());
      yield put(push('/games'));
    }
  }
}

function* handleSearch(method, data, query, token) {
  try {
    const req = yield call(makeRequest, method, data, query, token);
    yield put(gameSearchSuccess(req.data));
  } catch (e) {
    yield put(gameSearchError(e.toString()));
    yield put(openMessage());
    yield put(push('/games'));
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
        const req = yield call(makeRequest, 'GET', {}, `${url}?${query && `q=${query}&`}offset=${offset}`, {
          'X-Auth-Token': token,
        });
        yield put(nextPageSuccess(req.data));
      } else {
        // request job list - no auth token required
        const req = yield call(makeRequest, 'GET', {}, `${url}?${query && `q=${query}&`}offset=${offset}`, {});
        yield put(nextPageSuccess(req.data));

        // if expired remove token and user data
        // yield call(removeAuthToken);
        // yield call(removeUserData);
        // // redirect user to Home and show the unauthorized message
        // yield put(nextPageError('Login credentials have expired'));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(nextPageError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}
function* makerExpRequestWatcher() {
  while (true) {
    const { payload: { id, gameID } } = yield take(MAKER_EXPERIENCE_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'GET', {}, `gamemaker/${id}/getExperience/${gameID}`, {
          'X-Auth-Token': token,
        });
        yield put(openEditExp(req.data[0], 'games'));
        //yield put(makerExpSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(makerExpError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(makerExpError(e));
      // TODO:30 find a way to keep the url but still display the error page
      yield put(replace('/error'));
    }
  }
}


export default [
  gamesRequestWatcher,
  searchGamesWatcher,
  nextPageRequestWatcher,
  makerGamesRequestWatcher,
  makerExpRequestWatcher,
];
