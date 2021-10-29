/*
 * Sign up sagas
 */

import { take, call, put } from "redux-saga/effects";
import { trim } from "lodash";

import {
  makeRequest,
  setAuthToken,
  getReturnUrl,
  removeReturnUrl,
  removeUserData,
  getAuthToken,
  removeAuthToken,
} from "utils";

import { CREATE_ACCOUNT_REQUEST, CHECK_EMAIL_REQUEST } from "./constants";

import { checkEmailSuccess, checkEmailError } from "./actions";
import { userRequest, loginSuccess } from "../App/actions";
import { openAddGameGuide } from "containers/Modals/actions";

// watcher for checking email validity
function* checkEmailRequestWatcher() {
  while (true) {
    const {
      payload: { email, resolve, reject },
    } = yield take(CHECK_EMAIL_REQUEST);
    try {
      const req = yield call(
        makeRequest,
        "POST",
        {
          email: email.toLowerCase(),
        },
        `email/${email}`
      );
      yield call(resolve);
      yield put(checkEmailSuccess("Success"));
    } catch (e) {
      if (e.response.data.registered) {
        yield call(reject, { email: e.response.data.registered });
        yield put(checkEmailError(e.response.data.registered));
      }
    }
  }
}

// watcher for signUp request requests
function* createAccountRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: {
          firstName,
          lastName,
          email,
          password,
          currRole,
          currCompany,
          country,
          state,
          city,
          degree,
          university,
          workCategories,
          phoneNumber,
          cvUrl,
          currGame,
          gameRole,
          platforms,
          startYear,
          endYear,
          accomplishments,
          softwareUsed,
          location,
        },
        resolve,
        reject,
        returnUrl,
        nonce,
      },
    } = yield take(CREATE_ACCOUNT_REQUEST);

    try {
      const platformsArray = [];
      const workCategoriesArray = [];
      if (platforms) {
        platforms.map((id) => platformsArray.push(id.id));
      }
      if (workCategories) {
        workCategories.map((id) => workCategoriesArray.push(id.id));
      }
      const isObj = (e) => (
        typeof e === 'object' && e !== null
      )
      const req = yield call(
        makeRequest,
        "POST",
        {
          firstName: trim(firstName),
          lastName: trim(lastName),
          email: email.toLowerCase(),
          password,
          currCompany: trim(currCompany),
          currRole: trim(currRole),
          currGame: trim(currGame),
          country: isObj(country) ? country.label : country,
          state: isObj(state) ? state.label : state,
          city: isObj(city) ? city.label : city,
          degree: trim(degree),
          university,
          workCategories: workCategoriesArray,
          phoneNumber,
          cvUrl,
          platforms: platformsArray,
          gameRole,
          startYear,
          endYear,
          accomplishments: trim(accomplishments),
          softwareUsed: trim(softwareUsed),
          location,
        },
        "direct/signup ",
        {}
      );
      yield call(resolve);
      localStorage.setItem("signUp", "true");
      yield call(removeAuthToken);
      yield call(removeUserData);
      // request the login api
      const req1 = yield call(
        makeRequest,
        "POST",
        {
          identifier: email,
          password,
        },
        "login"
      );
      // if successful resolve the form and set token
      yield call(resolve);
      yield call(setAuthToken, req1.data);
      yield put(loginSuccess(req1.statusText));

      const { token } = yield call(getAuthToken);
      const api = "me";
      const user = yield call(makeRequest, "GET", {}, api, {
        "X-Auth-Token": token,
        Pragma: "no-cache",
      });

      yield put(openAddGameGuide());

      const url = yield call(getReturnUrl);
      if (localStorage.getItem("jobID")) {
        const jobID = localStorage.getItem("jobID");
        yield put(
          userRequest(
            req1.data,
            jobID
              ? jobID
              : returnUrl
              ? returnUrl
              : url
              ? url
              : user.data.recruiter
              ? "/recruiter"
              : `${jobID}`,
            nonce
          )
        ); // sent return url along with based on user type.
        if (localStorage.getItem("jobID")) localStorage.removeItem("jobID");
        localStorage.setItem("apply", "yes");
      } else {
        yield put(
          userRequest(
            req1.data,
            returnUrl ? returnUrl : url ? url : "/home",
            nonce
          )
        );
      }
      yield call(removeReturnUrl);
    } catch (e) {
      yield call(reject);
    }
  }
}

export default [createAccountRequestWatcher, checkEmailRequestWatcher];
