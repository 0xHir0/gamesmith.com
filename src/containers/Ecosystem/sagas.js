/*
 * Ecosystem sagas
 */

import { take, call, put } from "redux-saga/effects";
import { push, replace } from "react-router-redux";

import {
  makeRequest,
  removeUserData,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
} from "utils";
import { gamesRequest } from "containers/Games/actions";
import {
  STUDIO_REQUEST,
  SEARCH_STUDIO_REQUEST,
  NEXT_PAGE_REQUEST,
  CHECK_PARTNER,
  PARTNER_REQUEST,
} from "./constants";

import { openMessage } from "containers/Modals/actions";
import {
  studiosSuccess,
  studiosError,
  studioSearchError,
  nextPageSuccess,
  nextPageError,
  updatePartners,
} from "./actions";

// watcher for studios requests
function* studiosRequestWatcher() {
  while (yield take(STUDIO_REQUEST)) {
    try {
      if (checkAuthToken()) {
        // studios list if user logged in
        const { token } = yield call(getAuthToken);

        // request studios data
        const req = yield call(
          makeRequest,
          "GET",
          {},
          "browse/nonstudiocompanies",
          {
            "X-Auth-Token": token,
            Pragma: "no-cache",
          }
        );
        yield put(studiosSuccess(req.data));
      } else {
        // request studios list - no auth token required
        // request studios data
        const req = yield call(
          makeRequest,
          "GET",
          {},
          "browse/nonstudiocompanies",
          {}
        );
        yield put(studiosSuccess(req.data));
      }
    } catch (e) {
      // console.log(e.toString());
      yield put(studiosError(e.toString()));
      yield put(openMessage());
      yield put(push("/"));
    }
  }
}

function* searchStudioWatcher() {
  while (true) {
    const {
      payload: { query },
    } = yield take(SEARCH_STUDIO_REQUEST);
    try {
      if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        // check for empty query strings to prevent bad server requests
        if (!query.trim()) {
          // request game data
          yield put(gamesRequest());
        } else {
          // request user data
          // const req = yield call(makeRequest, 'GET', {}, `searchstudio?q=${query}`, {
          //   'X-Auth-Token': token,
          // });
          // yield put(studioSearchSuccess(req.data));
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(studiosError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // console.log(e.toString());
      yield put(studioSearchError(e.toString()));
      yield put(openMessage());
      yield put(push("/games"));
    }
  }
}

// watcher for next page requests
function* nextPageRequestWatcher() {
  while (true) {
    const {
      payload: { url, offset, query },
    } = yield take(NEXT_PAGE_REQUEST);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(
          makeRequest,
          "GET",
          {},
          `${url}?${query && `q=${query}&`}offset=${offset}`,
          {
            "X-Auth-Token": token,
          }
        );
        yield put(nextPageSuccess(req.data));
      } else {
        const req = yield call(
          makeRequest,
          "GET",
          {},
          `${url}?${query && `q=${query}&`}offset=${offset}`,
          {}
        );
        yield put(nextPageSuccess(req.data));
      }
    } catch (e) {
      // console.log(e);
      yield put(nextPageError(e.toString()));
      yield put(openMessage());
      yield put(push("/"));
    }
  }
}

// watcher for partners request

function* partnerRequestWatcher() {
  while (true) {
    const {
      payload: { partnerName },
    } = yield take(PARTNER_REQUEST);
    let req = "";
    if (partnerName === "PR/Marketing") {
      const partner = "PRMarketing";
      let req = yield call(makeRequest, "GET", {}, `partnerName/${partner}`, {
        Pragma: "no-cache",
      });
      // yield put(push(`/ecosystem/${partner}`));
      req = yield call(
        makeRequest,
        "GET",
        {},
        `browse/partners/${partner}`,
        {}
      );
      yield put(studiosSuccess(req.data));
    } else {
      req = yield call(makeRequest, "GET", {}, `partnerName/${partnerName}`, {
        Pragma: "no-cache",
      });
      // if(req.data === null){
      //   req.data = partnerName;
      // }
      req = yield call(
        makeRequest,
        "GET",
        {},
        `browse/partners/${partnerName}`,
        {}
      );
      yield put(studiosSuccess(req.data));
      // yield put(push(`/ecosystem/${req.data}`));
    }
  }
}

//  watcher for checking the categories that exist in db

function* checkPartnerWatcher() {
  while (yield take(CHECK_PARTNER)) {
    const req = yield call(makeRequest, "GET", {}, "categoriesName", {});
    yield put(updatePartners(req.data));
  }
}

export default [
  studiosRequestWatcher,
  searchStudioWatcher,
  nextPageRequestWatcher,
  checkPartnerWatcher,
  partnerRequestWatcher,
];
