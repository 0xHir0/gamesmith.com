/*
 * Game sagas
 */

import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars
import { replace } from 'react-router-redux';
import { isEmpty } from 'lodash';

import {
  makeRequest,
  removeUserData,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
  makeRailApiRequest,
} from 'utils';

import {
  GAME_REQUEST,
  GAME_MAKERS_REQUEST,
  NEXT_PAGE_REQUEST,
  MAKER_EXPERIENCE_REQUEST,
  SEARCH_GAME_MAKER_REQUEST, GAME_INFORMATION_REQUEST,
} from './constants';

import {
  gameSuccess,
  gameError,
  gameMakersSuccess,
  gameInformationSuccess,
  gameMakersError,
  nextPageSuccess,
  nextPageError,
  makerExpSuccess,
  makerExpError,
  gameMakerSearchSuccess,
  gameMakersRequest,
  gameRequest,
  gameMakerSearchError,
} from './actions';

import {
  openEditExp,
} from 'containers/Modals/actions';

// watcher for maker data requests
function* gameRequestWatcher() {
  const { payload: { id, offset } } = yield take(GAME_REQUEST);
  try {
    // check auth token for expiration
    if (checkAuthToken()) {
      const { token } = yield call(getAuthToken);
      // request maker data
      const req = yield call(makeRequest, 'GET', {}, `game/${id}/gamemakers`, {
        'X-Auth-Token': token,
      });
      yield put(gameSuccess(req.data));
    } else {
      const req = yield call(makeRequest, 'GET', {}, `game/${id}/gamemakers`, {});
      yield put(gameSuccess(req.data));

      // // if expired remove token and user data
      // yield call(removeAuthToken);
      // yield call(removeUserData);
      // // redirect user to Home and show the unauthorized message
      // yield put(gameError('Login credentials have expired'));
      // yield put(replace('/?unauthorized'));
    }
  } catch (e) {
    // console.log(e);
    yield put(gameError(e));
    // TODO:30 find a way to keep the url but still display the error page
    yield put(replace('/error'));
  }
}

function* gameInformationRequestWatcher() {
  const { payload: { id } } = yield take(GAME_INFORMATION_REQUEST);
  try {
    const req = yield call(makeRailApiRequest, 'GET', {}, `games/get_game_data?id=${id}`, {});
    const gameInfo = {
      developers: req.data.igdb && req.data.igdb[0] ? req.data.igdb[0].developers : '',
      publisher: req.data.igdb && req.data.igdb[0] ? req.data.igdb[0].publisher : '',
      rating: req.data.igdb && req.data.igdb[0] ? req.data.igdb[0].rating : 0,
      ratingCritics: req.data.igdb && req.data.igdb[0] ? req.data.igdb[0].ratingcritics : 0,
      totalDev: req.data.data[0].maker_ids_count,
      ReleaseDate: req.data.igdb && req.data.igdb[0] ? req.data.igdb[0].releasedate : '',
      backgroundImg: req.data.igdb && req.data.igdb[0] ? req.data.igdb[0].backgroundimg : '',
      genres: req.data.igdb && req.data.igdb[0] ? req.data.igdb[0].genres : '',
      platform: req.data.igdb && req.data.igdb[0] ? req.data.igdb[0].platforms : '',
      isIgdbArt: req.data.igdb && req.data.igdb[0] ? true : false,
      boxArt: req.data.data[0].box_art
    }

    yield put(gameInformationSuccess(gameInfo));
  } catch (e) {
    // console.log(e);
    yield put(makerExpError(e));
    // TODO:30 find a way to keep the url but still display the error page
    yield put(replace('/error'));
  }
}

function* gameMakersRequestWatcher() {
  const { payload: { id, offset } } = yield take(GAME_MAKERS_REQUEST);

  try {
    // check auth token for expiration
    if (checkAuthToken()) {
      const { token } = yield call(getAuthToken);
      // request maker data
      const req = yield call(makeRequest, 'GET', {}, `game/${id}/makers?offset=${offset}`, {
        'X-Auth-Token': token,
      });

      yield put(gameMakersSuccess(req.data));
    } else {
      const req = yield call(makeRequest, 'GET', {}, `game/${id}/basicmakers?offset=${offset}`, {});
      yield put(gameMakersSuccess(req.data));
      // // if expired remove token and user data
      // yield call(removeAuthToken);
      // yield call(removeUserData);
      // // redirect user to Home and show the unauthorized message
      // yield put(gameMakersError('Login credentials have expired'));
      // yield put(replace('/?unauthorized'));
    }
  } catch (e) {
    // console.log(e);
    yield put(gameMakersError(e));
    // TODO:30 find a way to keep the url but still display the error page
    yield put(replace('/error'));
  }
}

function* nextPageRequestWatcher() {
  const { payload: { url, offset } } = yield take(NEXT_PAGE_REQUEST);
  try {
    // check auth token for expiration
    if (checkAuthToken()) {
      const { token } = yield call(getAuthToken);
      // request maker data
      const req = yield call(makeRequest, 'GET', {}, `${url}?offset=${offset}`, {
        'X-Auth-Token': token,
      });
      yield put(nextPageSuccess(req.data));
    } else {
      const req = yield call(makeRequest, 'GET', {}, `${url}?offset=${offset}`, {});
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
    yield put(nextPageError(e));
    // TODO:30 find a way to keep the url but still display the error page
    yield put(replace('/error'));
  }
}

function* makerExpRequestWatcher() {
  const { payload: { id, gameID } } = yield take(MAKER_EXPERIENCE_REQUEST);
  try {
    // check auth token for expiration
    if (checkAuthToken()) {
      const { token } = yield call(getAuthToken);
      // request maker data
      const req = yield call(makeRequest, 'GET', {}, `gamemaker/${id}/getExperience/${gameID}`, {
        'X-Auth-Token': token,
      });
      yield put(openEditExp(req.data[0], 'game'));
      // yield put(makerExpSuccess(req.data));
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

function *gameMakerSearchWatcher() {
  const { payload: { query, gameId } } = yield take(SEARCH_GAME_MAKER_REQUEST);
  try {
    if(!query.trim()){
      yield put(gameRequest(gameId));
    }else {
      const req = yield call(makeRequest, 'GET', {}, `searchmember/${gameId}/${query}`, {});
      yield put(gameMakerSearchSuccess(req.data));
    }
  } catch (e) {
    yield put(gameMakerSearchError(e))
    yield put(replace('/error'));
  }
}

export default [
  gameRequestWatcher,
  gameMakersRequestWatcher,
  nextPageRequestWatcher,
  makerExpRequestWatcher,
  gameMakerSearchWatcher,
  gameInformationRequestWatcher,
];
