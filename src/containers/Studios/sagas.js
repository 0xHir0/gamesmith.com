/*
 * Studios sagas
 */

import { take, call, put } from "redux-saga/effects";
import { push, replace } from "react-router-redux";
import axios from 'axios'
import request from "axios";
import {
  makeRequest,
  removeUserData,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
  getSizeId,
} from "utils";

import {
  STUDIO_REQUEST,
  SEARCH_STUDIO_REQUEST,
  NEXT_PAGE_REQUEST,
  ADD_STUDIO_REQUEST,
  ADD_STUDIO_SUCCES,
  GET_RECRUITER_STUDIO_REQUEST,
} from "./constants";

import {
  studiosSuccess,
  studiosError,
  studiosRequest,
  studioSearch,
  studioSearchSuccess,
  studioSearchError,
  nextPageSuccess,
  nextPageError,
  getRecruiterStudioSuccess,
} from "./actions";
import {
  closeModal,
  openMessage,
  openConfirmAddStudio,
} from "../Modals/actions";

// watcher for studios requests
function* studiosRequestWatcher() {
  while (yield take(STUDIO_REQUEST)) {
    try {
      if (checkAuthToken()) {
        // studios list if user logged in
        const { token } = yield call(getAuthToken);

        // request studios data
        const req = yield call(makeRequest, "GET", {}, "browse/company", {
          "X-Auth-Token": token,
        });
        yield put(studiosSuccess(req.data));
      } else {
        // request studios list - no auth token required
        // request studios data
        const req = yield call(makeRequest, "GET", {}, "browse/company", {});
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
      payload: {
        query: {
          values: { studioName, country, platform, size },
        },
      },
    } = yield take(SEARCH_STUDIO_REQUEST);
    if (!studioName && !country && !platform && !size) {
      yield put(studiosRequest());
      yield put(push("/studios"));
    } else {
      try {
        
          const req = yield call(
            makeRequest,
            "POST",
            {
             
              country: country ? country : "",
            studioName: studioName ? studioName : "",
              country: country ? country : "",
              platform: platform.length ? platform : "",
              size: size ? getSizeId(size) : "",
            },
            "searchstudio",
            {}
          );
      

        // const req = yield call(makeRequest, 'GET', {}, `searchstudio?${studioName ? 'studioName=' + studioName.toLowerCase() : ''}${country ? '&country=' + country : ''}${platform && platform.length !== 0 ? '&platform=' + platform : ''}${size ? '&size=' + size : ''}`, {});
        yield put(studioSearchSuccess(req.data));
        yield put(
          push(
            `/studios?search=true${
              studioName ? `&studioName=${studioName.toLowerCase()}` : ""
            }${country ? `&country=${country}` : ""}${
              platform && platform.length !== 0 ? `&platform=${platform}` : ""
            }${size ? `&size=${size}` : ""}`
          )
        );
      } catch (e) {
        yield put(studiosError(e.toString()));
        yield put(openMessage());
        yield put(push("/"));
      }
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
        if (query) {
          const req = yield call(
            makeRequest,
            "POST",
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
            {
              "X-Auth-Token": token,
            }
          );
          yield put(nextPageSuccess(req.data));
        }
      } else if (query) {
        const req = yield call(
          makeRequest,
          "POST",
          {},
          `${url}?${query && `q=${query}&`}offset=${offset}`,
          {}
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

// watcher for adding new studio

function* addStudioRequestWatcher() {
  while (true) {
    const {
      payload: { values, label },
    } = yield take(ADD_STUDIO_REQUEST);
    try {
      const req = yield call(
        makeRequest,
        "POST",
        {
          firstName: values.firstName,
          lastName: values.lastName,
          company: values.company,
          email: values.email,
          label,
        },
        "addstudio",
        {}
      );
      if (req.status === 200) {
        yield put(openConfirmAddStudio());
      }
    } catch (e) {
      yield put(closeModal());
      // console.log(e); // eslint-disable-line no-console
      yield put(openMessage());
    }
  }
}

// Get Recruiter Studio Watcher
function* getRecruiterStudioRequestWatcher() {
  while (true) {
    const {
      payload: { companyId },
    } = yield take(GET_RECRUITER_STUDIO_REQUEST);

    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request studios data
        const req = yield call(
          makeRequest,
          "GET",
          {},
          `getRecruiterStudio/${companyId}`,
          {
            "X-Auth-Token": token,
          }
        );
        yield put(getRecruiterStudioSuccess(req.data));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default [
  studiosRequestWatcher,
  searchStudioWatcher,
  nextPageRequestWatcher,
  addStudioRequestWatcher,
  getRecruiterStudioRequestWatcher,
];
