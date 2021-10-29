/*
 * App sagas
 */

import { take, call, put } from "redux-saga/effects";
import { push, replace } from "react-router-redux";
import { isEmpty, isEqual, indexOf, find, trim } from "lodash";
import moment from "moment";
import ReactPixel from "react-facebook-pixel";

import {
  makeRequest,
  getUserData,
  setUserData,
  removeUserData,
  setAuthToken,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
  getReturnUrl,
  removeReturnUrl,
  BACKEND_URL,
  FORUM_URL,
  makeRailApiRequest,
} from "utils";

import {
  DIRECT_SIGNUP_REQUEST,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  LOGOUT_REQUEST,
  USER_REQUEST,
  PENDING_REQUEST,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
  MESSAGE_REQUEST,
  APPLICANT_MESSAGE_REQUEST,
  STUDIO_MESSAGE_REQUEST,
  INVITE_REQUEST,
  INVITE_MEMBER_REQUEST,
  CONNECT_REQUEST,
  ADD_EXP_REQUEST,
  EDIT_EXP_REQUEST,
  DELETE_EXP_REQUEST,
  APPLY_SMS_REQUEST,
  CONFIRM_CODE_REQUEST,
  CREDITS_REQUEST,
  GET_AUTOCOMPLETE_REQUEST,
  UPDATE_DETAILS_REQUEST,
  UPDATE_EDUCATION_REQUEST,
  AVAILABILITY_REQUEST,
  PASSWORD_LINK_REQUEST,
  UPDATE_PASSWORD_REQUEST,
  LOCATION_REQUEST,
  UPDATE_OPPORTUNITIES_REQUEST,
  GET_UNIVERSITIES_REQUEST,
  GET_COUNTRIES_REQUEST,
  GET_STATES_REQUEST,
  GET_CITIES_REQUEST,
  PENDING_TEAM_REQUEST,
  ACCEPT_TEAM_REQUEST,
  REJECT_TEAM_REQUEST,
  INVITE_MAKER_REQUEST,
  CLAIM_PROFILE_REQUEST,
  STUDIO_HUB_REQUEST,
  VALIDATE_TOKEN_REQUEST,
  SET_PASSWORD_REQUEST,
  SEND_JOB_TO_FRIEND_REQUEST,
  SAVE_JOB_FOR_LATER,
  CONFIRM_JOB_REPOST,
  DELETE_CV_REQUEST,
  GET_MAKER_CV_INFO,
  GET_COMPANY_INFO,
  ADD_SUBSCRIBER_REQUEST,
  ADD_PASSION_REQUEST,
  ADD_APPLOZIC_COUNT_REQUEST,
  GET_APPLOZIC_COUNT_REQUEST,
  GET_APPLOZIC_RECRUITER_REQUEST,
  PROFILE_VIEW_COUNT_REQUEST,
  CHECK_PHONE_NUMBER_REQUEST,
  GAME_MAKER_REQEUST,
  SEARCH_GAME_MAKERS_REQEUST,
  SEND_INVITE_REQUEST,
  VERIFY_CREDIT_TOKEN_REQUEST,
  IGNORE_VERIFICATION_REQUEST,
  USER_GAME_AND_MAKERS_REQUEST,
  MORE_MAKER_REQUEST,
  GET_JWT_TOKEN_REQUEST,
  GET_ACCOUNT_ID_BY_NAME,
  SAVE_SLUG_REQUEST,
} from "./constants";

import {
  loginSuccess,
  loginError,
  directSignupSuccess,
  directSignupError,
  signupSuccess,
  signupError,
  logoutSuccess,
  logoutError,
  userRequest,
  userSuccess,
  userError,
  pendingRequest,
  pendingSuccess,
  pendingError,
  acceptSuccess,
  acceptError,
  rejectSuccess,
  rejectError,
  messageSuccess,
  messageError,
  applicantMessageError,
  studioMessageError,
  inviteSuccess,
  inviteError,
  connectSuccess,
  connectError,
  addExpSuccess,
  addExpError,
  editExpSuccess,
  editExpError,
  deleteExpSuccess,
  deleteExpError,
  applySmsSuccess,
  applySmsError,
  confirmCodeSuccess,
  confirmCodeError,
  // updateCreditsRequest,
  updateCreditsSuccess,
  updateCreditsError,
  getAutocompleteSuccess,
  getAutocompleteError,
  updateDetailsSuccess,
  updateDetailsError,
  updateEducationSuccess,
  updateEducationError,
  availabilitySuccess,
  availabilityError,
  locationSuccess,
  locationError,
  updateOpportunitiesSuccess,
  updateOpportunitiesError,
  passwordLinkSuccess,
  passwordLinkError,
  updatePasswordSuccess,
  updatePasswordError,
  getUniversitiesSuccess,
  getUniversitiesError,
  getCountriesSuccess,
  getCountriesError,
  getStatesSuccess,
  getStatesError,
  getCitiesSuccess,
  getStateCitiesSuccess,
  getCitiesError,
  pendingTeamSuccess,
  pendingTeamError,
  acceptTeamRequest,
  acceptTeamError,
  rejectTeamRequest,
  rejectTeamError,
  teamRequestSuccess,
  inviteMemberError,
  claimProfileError,
  makerCVSuccess,
  companyInfoSuccess,
  addApplozicCountSuccess,
  connectRequest,
  getProfileViewCountRequest,
  getProfileViewCountSuccess,
  checkPhoneNumberRequest,
  applySmsRequest,
  loginRequest,
  gameMakersSuccess,
  gameMakersError,
  searchGameMakersSuccess,
  searchGameMakersError,
  sendInviteSuccess,
  sendInviteError,
  verifyCreditTokenSuccess,
  verifyCreditTokenError,
  verifyCreditTokenRequest,
  getUserGamesAndMakersSuccess,
  getUserGamesAndMakersError,
  getUserGamesAndMakersRequest,
  getMoreMakerSuccess,
  getMoreMakerError,
  getJwtTokenSuccess,
  getJwtTokenError,
} from "./actions";

import {
  openCustomSignIn,
  closeModal,
  openMessage,
  openDirectSIgnUpMessage,
  openConfirmCode,
  openCheckDetails,
  openAvailability,
  openOpportunities,
  openAddExp,
  openOnBoarding,
  openLocation,
  openEducation,
  openAddGameGuide,
  openApplicationReceived,
  openSetPassword,
  openAddPassion,
  openApplySms,
  openExceedRecruiterSearchLimit,
} from "containers/Modals/actions";

import {
  connectGameSuccess,
  gameMakersRequest,
  gameRequest,
} from "containers/Game/actions";

import {
  makerRequest,
  addMakerCreditSuccess,
  editMakerCreditSuccess,
  deleteMakerCreditSuccess,
  deleteCVSuccess,
} from "containers/Maker/actions";
import { peopleRequest } from "containers/People/actions";
import { applyJobRequest } from "containers/Job/actions";
import { makerGamesAdd, makerGamesDelete } from "containers/Games/actions";
import { applyStudioJobRequest } from "containers/Studio/actions";
import warrior from "data/images/warrior.png";
import invitationSent from "data/icons/invitation_success.png";
import {
  getUserPendingRequests,
  getUserReceivedRequests,
} from "../VerificationRequests/actions";

// import {SAVE_JOB_FOR_LATER} from "../Job/constants";
// import {SAVE_JOB_FOR_LATER, SEND_JOB_TO_FRIEND_REQUEST} from "../Job/constants";

// watcher for user login requests
function* loginRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { email, password },
        resolve,
        reject,
        returnUrl,
        nonce,
      },
    } = yield take(LOGIN_REQUEST);
    try {
      // remove previous token and  user data from local storage if  does not remove on logout due to some reason
      yield call(removeAuthToken);
      yield call(removeUserData);
      // request the login api
      const req = yield call(
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
      yield call(setAuthToken, req.data);
      yield put(loginSuccess(req.statusText));
      // yield put(userRequest(req.data, returnUrl, nonce));
      // yield put(userRequest(req.data, returnUrl ?  returnUrl : req.data.recruiter ? '/recruiter' : '/maker/me', nonce)); //sent return url along with based on user type.

      const { token } = yield call(getAuthToken);
      const api = "me";
      const user = yield call(makeRequest, "GET", {}, api, {
        "X-Auth-Token": token,
        Pragma: "no-cache",
      });

      const url = yield call(getReturnUrl);
      // if(localStorage.getItem('onboarding') == 'true'){
      //   yield call(setUserData, user.data);
      //   yield put(openCheckDetails(user.data));
      //   // localStorage.removeItem('onboarding');
      //   yield put(push('/'));
      // } else{
      if (localStorage.getItem("jobUrl")) {
        const jobUrl = localStorage.getItem("jobUrl");
        yield put(
          userRequest(
            req.data,
            jobUrl
              ? jobUrl
              : returnUrl
              ? returnUrl
              : url
              ? url
              : user.data.recruiter
              ? "/recruiter"
              : `${jobUrl}`,
            nonce
          )
        ); // sent return url along with based on user type.
        if (localStorage.getItem("jobUrl")) localStorage.removeItem("jobUrl");
      } else if (localStorage.getItem("verifyUrl")) {
        yield put(
          userRequest(req.data, localStorage.getItem("verifyUrl"), nonce)
        );
        localStorage.removeItem("verifyUrl");
      } else if (window.location.pathname === "/signin") {
        const path =
          user && user.data && user.data.maker ? "/maker/me" : "/recruiter";
        yield put(
          userRequest(req.data, returnUrl ? returnUrl : url ? url : path, nonce)
        ); // sent return url along with based on user type.
      } else {
        const path =
          window.location.pathname === "/" &&
          !localStorage.getItem("onboarding")
            ? "/home"
            : window.location.pathname;
        // eslint-disable-next-line no-unneeded-ternary
        yield put(
          userRequest(req.data, returnUrl ? returnUrl : url ? url : path, nonce)
        ); // sent return url along with based on user type.
      }
      yield put(closeModal());
      yield call(removeReturnUrl);
      // }
    } catch (e) {
      // if unauthorized reject the form and pass an error message
      yield call(reject, { password: "Wrong login credentials" });
      yield put(loginError(e));
    }
  }
}

function* signupRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: {
          firstName,
          lastName,
          email,
          password = "",
          currCompany = "",
          currRole = "",
          currGame = "",
        },
        resolve,
        reject,
      },
    } = yield take(SIGNUP_REQUEST);
    try {
      const req = yield call(
        makeRequest,
        "POST",
        {
          // id: 0,
          firstName: trim(firstName),
          lastName: trim(lastName),
          email: email.toLowerCase(),
          password,
          currCompany: trim(currCompany),
          currRole: trim(currRole),
          currGame: trim(currGame),
        },
        "createrequest/signup"
      );
      yield call(resolve);
      yield put(signupSuccess(req.statusText));
      yield put(closeModal());
      // yield put(openMessage('Application Received!', 'Thank you for your interest. All applications are vetted and responded to within 24 hours. We will send you an email once your account has been activated.'));

      /* CUSTOM BACKEND - LAMBDA FUNCTION BEGIN */
      const retrievedObject = localStorage.getItem("onboardingObj");

      console.log("SEND_TO_SERVER: ", JSON.parse(retrievedObject));
      fetch(
        "https://b5pzxfr6a9.execute-api.us-west-2.amazonaws.com/signupAttributes",
        {
          method: "POST",
          body: JSON.stringify({
            user_id: email,
            data: [retrievedObject],
          }),
        }
      )
        .then((response) => {
          response.text().then((result) => {
            console.log(result);
          });
        })
        .catch((err) => {
          console.error(err);
        });
      /* CUSTOM BACKEND - LAMBDA FUNCTION END */

      yield put(openApplicationReceived());

      yield call(ReactPixel.track("RegistrationComplete"));
      window.gtag("event", "conversion", {
        send_to: "AW-667973581/EV-9CI_Og8QBEM3vwb4C",
      });
      // yield call(gtag('event', 'conversion', {'send_to': 'AW-667973581/EV-9CI_Og8QBEM3vwb4C'}))
    } catch (e) {
      if (e.response.data.join) {
        yield call(reject, { email: e.response.data.join });
      } else if (e.response.data.registered) {
        yield call(reject, { email: e.response.data.registered });
      } else if (e.response.data.error) {
        yield call(reject, { email: e.response.data.error });
      }
      yield put(signupError(e));
    }
  }
}

function* directSignupRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { email, password },
        resolve,
        reject,
      },
    } = yield take(DIRECT_SIGNUP_REQUEST);
    try {
      const req = yield call(
        makeRequest,
        "POST",
        {
          email: email.toLowerCase(),
          password,
        },
        "profile/signup"
      );
      yield call(resolve);
      yield put(directSignupSuccess(req.statusText));
      yield put(closeModal());
      yield put(openCustomSignIn());
    } catch (e) {
      yield call(reject, { email: e.response.data.error });
      yield put(directSignupError(e));
    }
  }
}

// watcher for use logout requests
function* logoutRequestWatcher() {
  while (yield take(LOGOUT_REQUEST)) {
    try {
      // remove token and user data from local storage
      yield call(removeAuthToken);
      yield call(removeUserData);
      yield call(removeReturnUrl);
      yield put(logoutSuccess());
      // redirect to the home screen
      // yield put(push('/'));
      yield put(
        window.location.replace(
          `https://gamesmith.tribe.so/api/v1/logout?redirect=${window.location.origin}`
        )
      );
    } catch (e) {
      yield put(logoutError(e));
    }
  }
}

// watcher for user data requests
function* userRequestWatcher() {
  while (true) {
    try {
      const {
        payload: { profile, returnUrl, nonce },
      } = yield take(USER_REQUEST);
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        yield call(removeReturnUrl);
        let api = "me";
        const req = yield call(makeRequest, "GET", {}, api, {
          "X-Auth-Token": token,
          Pragma: "no-cache",
        });

        if (req.data) {
          yield call(setUserData, req.data);
        }

        if (nonce && nonce.length > 0) {
          api = `me?${nonce}`;
          const forumData = yield call(makeRequest, "GET", {}, api, {
            "X-Auth-Token": token,
          });
          const data = forumData.data;
          const payload = data.payload;
          const newSig = data.sig;
          const forumURL = FORUM_URL ? FORUM_URL : "http://forum.gamesmith.com";
          const forumRedirect = `${forumURL}/session/sso_login`;
          window.location = `${forumRedirect}?sso=${payload}&sig=${newSig}`;
        } else if (
          !nonce &&
          returnUrl &&
          returnUrl.length > 0 &&
          !req.data.isSuperuser &&
          req.data.id !== 1
        ) {
          // patced for super admin users only.
          window.location = returnUrl;
        } else if (req.data.isSuperuser || req.data.id === 1) {
          // if superuser, redirect to admin panel
          yield call(removeAuthToken);
          yield call(removeUserData);
          window.location = BACKEND_URL;
        } else {
          // else load the people
          yield call(setUserData, req.data);
          yield put(userSuccess(req.data));

          if (window.opener) {
            window.opener.location = profile
              ? "/maker/me?updated"
              : localStorage.getItem("jobUrl")
              ? localStorage.getItem("jobUrl")
              : "/makers";
            if (localStorage.getItem("jobUrl"))
              localStorage.removeItem("jobUrl");
            window.close();
          } else if (profile) {
            // only used for profile update.
            // const user = getUserData();
            if (returnUrl) {
              window.location = req.data.recruiter
                ? "/recruiter"
                : "/maker/me?updated";
            }
          } else {
            yield put(push("/makers"));
          }
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        yield call(removeReturnUrl);
        // redirect user to Home and show the unauthorized message
        yield put(userError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // console.log(e);
      yield put(userError(e));
      // if the current window is a popup close it
      // and redirect the parent window to error messsage
      if (window.opener) {
        window.opener.location = "/?error";
        window.close();
      } else {
        yield put(openMessage());
        yield put(push("/"));
      }
    }
  }
}

// watcher for pending connection requests
function* pendingRequestWatcher() {
  while (yield take(PENDING_REQUEST)) {
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, "GET", {}, "connections/pending", {
          "X-Auth-Token": token,
        });
        yield put(pendingSuccess(req.data));
      }
    } catch (e) {
      // console.log(e);
      yield put(pendingError(e));
    }
  }
}

// watcher for pending connection requests
function* pendingTeamRequestWatcher() {
  while (yield take(PENDING_TEAM_REQUEST)) {
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, "GET", {}, "teamrequests/pending", {
          "X-Auth-Token": token,
        });
        yield put(pendingTeamSuccess(req.data));
      }
    } catch (e) {
      // console.log(e);
      yield put(pendingTeamError(e));
    }
  }
}

// watcher for connection accept requests
function* acceptRequestWatcher() {
  while (true) {
    try {
      const {
        payload: { id },
      } = yield take(ACCEPT_REQUEST);
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(
          makeRequest,
          "POST",
          {},
          `connections/approve/${id}`,
          {
            "X-Auth-Token": token,
          }
        );
        yield put(pendingRequest());
        yield put(acceptSuccess(req.statusText));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(acceptError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // console.log(e);
      yield put(acceptError(e));
      yield put(openMessage());
    }
  }
}

// watcher for connection reject requests
function* rejectRequestWatcher() {
  while (true) {
    try {
      const {
        payload: { id },
      } = yield take(REJECT_REQUEST);
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(
          makeRequest,
          "POST",
          {},
          `connections/reject/${id}`,
          {
            "X-Auth-Token": token,
          }
        );
        yield put(pendingRequest());
        yield put(rejectSuccess(req.statusText));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(rejectError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // console.log(e);
      yield put(rejectError(e));
      yield put(openMessage());
    }
  }
}

// watcher for message send requests
function* messageRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { subject, message },
        receiverID,
        resolve,
        reject,
      },
    } = yield take(MESSAGE_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the message api
        const req = yield call(
          makeRequest,
          "POST",
          {
            receiverId: receiverID,
            subject,
            message,
          },
          "message",
          {
            "X-Auth-Token": token,
          }
        );
        // if successful resolve the form and show confirmation
        yield call(resolve);
        yield put(messageSuccess(req.statusText));
        yield put(openMessage("Your Message Was Sent", "blank"));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(messageError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      yield call(reject, { message: "Could not send message." });
      yield put(messageError(e));
    }
  }
}

// watcher for applicant message send requests
function* applicantMessageRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { applicantId, jobId, message },
        resolve,
        reject,
      },
    } = yield take(APPLICANT_MESSAGE_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the message api

        const req = yield call(
          makeRequest,
          "POST",
          {
            jobId,
            message,
          },
          `applicant/${applicantId}/message`,
          {
            "X-Auth-Token": token,
          }
        );
        // if successful resolve the form and show confirmation
        yield call(resolve);
        yield put(openMessage("Your Message was Successfully Sent", "blank"));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(applicantMessageError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      yield call(reject, { message: "Could not send message." });
      yield put(applicantMessageError(e));
    }
  }
}

// watcher for studio message send requests
function* studioMessageRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { studioId, name, jobTitle, email, telephone, message },
        resolve,
        reject,
      },
    } = yield take(STUDIO_MESSAGE_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the message api

        const req = yield call(
          makeRequest,
          "POST",
          {
            name: trim(name),
            jobTitle: trim(jobTitle),
            email,
            telephone,
            message: trim(message),
          },
          `studio/${studioId}/message`,
          {
            "X-Auth-Token": token,
          }
        );
        // if successful resolve the form and show confirmation
        yield call(resolve);
        yield put(openMessage("Your Message was Successfully Sent", "blank"));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(studioMessageError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      yield call(reject, { telephone: "Could not send message." });
      yield put(studioMessageError(e));
    }
  }
}

// watcher for invitation requests
function* inviteRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { email },
        receiverID,
        resolve,
        reject,
      },
    } = yield take(INVITE_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the message api
        const req = yield call(
          makeRequest,
          "POST",
          {
            makerid: receiverID,
            email,
          },
          "inviteMakerColleague",
          {
            "X-Auth-Token": token,
          }
        );
        // if successful resolve the form and show confirmation
        yield call(resolve);
        yield put(inviteSuccess(req.statusText));
        yield put(
          openMessage(
            "Invitation Sent",
            `An invitation was emailed to ${email}`
          )
        );
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(inviteError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      yield call(reject, { email: e.response.data.error });
      yield put(inviteError(e));
    }
  }
}

// watcher for game member invitation requests
function* inviteMemberRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { firstName, lastName, email },
        userId,
        gameId,
        game,
        company,
        role,
        resolve,
        reject,
      },
    } = yield take(INVITE_MEMBER_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the message api
        const req = yield call(
          makeRequest,
          "POST",
          {
            recuriterid: userId,
            gameid: gameId,
            game: trim(game),
            company: trim(company),
            role: trim(role),
            firstName: trim(firstName),
            lastName: trim(lastName),
            email,
          },
          "inviteTeamMember",
          {
            "X-Auth-Token": token,
          }
        );
        // if successful resolve the form and show confirmation
        // yield call(resolve);
        // yield put(inviteSuccess(req.statusText));
        yield put(openMessage("invite", req.data.statusText, invitationSent));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(inviteMemberError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      yield put(inviteMemberError(e.response.data.error));
      yield call(reject, { email: e.response.data.error });
      // yield put(openMessage(e.response.data.error))
    }
  }
}

// watcher for connection requests
function* connectRequestWatcher() {
  while (true) {
    const {
      payload: { id, page, gameID },
    } = yield take(CONNECT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the message api
        const req = yield call(
          makeRequest,
          "POST",
          {
            id,
          },
          `connections/request/${id}`,
          {
            "X-Auth-Token": token,
          }
        );
        // if successful refresh views and show confirmation
        if (page && page === "people") {
          yield put(peopleRequest());
        } else if (page && page === "maker") {
          yield put(makerRequest(id));
        } else if (page && page === "game") {
          yield put(connectGameSuccess(id));
          yield put(gameRequest(gameID));
          yield put(gameMakersRequest(gameID));
        }
        yield put(connectSuccess(req.statusText));
        yield put(openMessage("Connection Request Sent", "blank"));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(connectError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      yield put(openMessage("Error Requesting Connection", "blank"));
      yield put(messageError(e));
    }
  }
}

// watcher for add experience requests
function* addExpRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: {
          currRole,
          currGame,
          company,
          platforms,
          underNda = false,
          startYear,
          endYear,
          accomplishments,
          softwareUsed,
          location = "",
        },
        page,
        gameId,
        isNewGame = false,
        searchQuery,
        resolve,
        reject,
      },
    } = yield take(ADD_EXP_REQUEST);
    try {
      if (platforms.length < 1) {
        yield call(reject, { _error: "Platforms are required" });
      } else if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
        let url = "";
        if (localStorage.getItem("onboardingProcess") === "true") {
          url = `profile/onboardingprocess/${id}?step=5&addVerification=true`;
        } else if (localStorage.getItem("onboarding") === "true") {
          url = `gamemaker/updatecredits/${id}?addVerification=true`;
        } else if (page === "games") {
          url = `gamemaker/updatecredits/${id}?page=${page}&isNewGame=${isNewGame}`;
        } else {
          url = `gamemaker/updatecredits/${id}`;
        }
        // update credits request
        const req = yield call(
          makeRequest,
          "POST",
          JSON.stringify([
            {
              id: 0,
              score: 0,
              role: {
                id: -1,
                name: currRole,
              },
              game: {
                id: -1,
                name: currGame,
                platforms: [],
              },
              company: trim(company),
              platforms,
              underNda,
              accomplishments: trim(accomplishments),
              softwareUsed: trim(softwareUsed),
              location,
              startDate:
                !underNda && startYear
                  ? {
                      year: parseInt(startYear, 10),
                      month: 1,
                    }
                  : null,
              endDate:
                !underNda && endYear
                  ? {
                      year: parseInt(endYear, 10),
                      month: 1,
                    }
                  : null,
            },
          ]),
          url,
          {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
          }
        );
        yield call(resolve);
        // aqui
        // yield put(addExpSuccess(req.statusText));
        if (
          localStorage.getItem("onboarding") == "true" ||
          localStorage.getItem("onboardingProcess") == "true" ||
          localStorage.getItem("onboardingProcess") == true
        ) {
          // yield put(openAvailability());       //Existing onboarding screen
          // yield put(openAddGameGuide()); // New onboarding screen
          if (localStorage.getItem("onboarding") == "true") {
            localStorage.removeItem("onboarding");
          }
          if (localStorage.getItem("onboardingProcess") == "true") {
            localStorage.removeItem("onboardingProcess");
          }
          if (localStorage.getItem("onboardingProcess") == true) {
            localStorage.removeItem("onboardingProcess");
          }
          if (localStorage.getItem("resetpassword") == "true") {
            localStorage.removeItem("resetpassword");
          }
          const req = yield call(makeRequest, "GET", {}, "me", {
            "X-Auth-Token": token,
          });
          // aqui 4
          yield put(openSetPassword());
          /*  yield call(setUserData, req.data); */
          /*     yield call(setUserData, req.data);
          yield put(push('/maker/me')); */
        } else {
          yield put(makerGamesAdd(req.data));
          // yield put(addMakerCreditSuccess(req.data));
          // this is just a generic modal used for displaying system messages
          if (isNewGame) {
            yield put(
              openMessage(
                "The glory is all yours!",
                `You are the first member of ${req.data[0].name}`,
                warrior
              )
            );
            yield put(push(`/game/${req.data[0].id}`));
          } else if (!searchQuery) {
            yield put(
              openMessage(
                `${currGame} has been added to your profile!`,
                "blank"
              )
            );
            if (!isEqual(gameId, -1)) {
              yield put(acceptTeamRequest(gameId));
            }
            if (page === "game") {
              yield put(gameMakersRequest(req.data[0].game.id));
            } else if (!isEqual(page, "teamRequest")) {
              yield put(push("/games"));
            }
          } else {
            yield put(closeModal());
          }
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(addExpError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      if (e.response.data.error === "Game Already Exist") {
        yield call(reject, { location: e.response.data.error });
      } else {
        yield call(reject, { location: "Could not add experience." });
      }
      // console.log(e.response.data.error)
      yield put(addExpError(e));
    }
  }
}

// watcher for edit experience requests
function* editExpRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: {
          creditId,
          currRole,
          currGame,
          company,
          platforms,
          underNda = false,
          startYear,
          endYear,
          accomplishments,
          softwareUsed,
          location = "",
        },
        page,
        resolve,
        reject,
      },
    } = yield take(EDIT_EXP_REQUEST);
    try {
      if (platforms.length < 1) {
        yield call(reject, { _error: "Platforms are required" });
      } else if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
        // update credits request
        const req = yield call(
          makeRequest,
          "POST",
          JSON.stringify([
            {
              id: creditId,
              score: 0,
              role: {
                id: -1,
                name: currRole,
              },
              game: {
                id: -1,
                name: currGame,
                platforms: [],
              },
              company: trim(company),
              platforms,
              accomplishments: trim(accomplishments),
              softwareUsed: trim(softwareUsed),
              location: trim(location),
              underNda,
              startDate:
                !underNda && startYear
                  ? {
                      year: parseInt(startYear, 10),
                      month: 1,
                    }
                  : null,
              endDate:
                !underNda && endYear
                  ? {
                      year: parseInt(endYear, 10),
                      month: 1,
                    }
                  : null,
            },
          ]),
          `gamemaker/updatecredits/${id}`,
          {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
          }
        );
        yield call(resolve);
        yield put(editExpSuccess(req.statusText));
        yield put(editMakerCreditSuccess(req.data));
        yield put(openMessage("Successfully Updated!", "blank"));
        if (isEqual(page, "edit")) {
          yield put(push("/maker/me"));
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(editExpError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      yield call(reject, { location: "Could not add experience." });
      yield put(editExpError(e));
    }
  }
}

// watcher for delete experience requests
function* deleteExpRequestWatcher() {
  while (true) {
    const {
      payload: { gameID, gameTitle, page, searchQuery },
    } = yield take(DELETE_EXP_REQUEST);
    try {
      if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
        // delete credits request
        const req = yield call(
          makeRequest,
          "POST",
          {},
          `gamecredit/delete/${id}/${gameID}/${page}`,
          {
            "X-Auth-Token": token,
          }
        );
        if (page == "games") {
          yield put(makerGamesDelete(gameID, id));
          // this is just a generic modal used for displaying system messages
          if (searchQuery) {
            yield put(
              openMessage(
                `${gameTitle}`,
                " has been removed from your profile!"
              )
            );
            yield put(push("/games"));
          } else {
            yield put(closeModal());
          }
        } else if (page == "game") {
          yield put(gameMakersRequest(gameID));
          if (searchQuery) {
            yield put(
              openMessage(
                `${gameTitle}`,
                " has been removed from your profile!"
              )
            );
            // yield put(push('/game/'`${gameID}`));
          } else {
            yield put(closeModal());
          }
        } else {
          // yield put(deleteExpSuccess(req.statusText));
          yield put(deleteMakerCreditSuccess(gameID));
          // this is just a generic modal used for displaying system messages
          yield put(openMessage("Experience Deleted", "blank"));
          yield put(push("/maker/me"));
          // window.location = '/maker/me';
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(deleteExpError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      yield put(deleteExpError(e));
    }
  }
}

// watcher for apply SMS requests
function* applySmsRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { phone: phoneNumber, jobId, studioId },
        resolve,
        reject,
        jobID,
      },
    } = yield take(APPLY_SMS_REQUEST);
    try {
      if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        const { id, maker } = yield call(getUserData);
        // update profile with provided phone number
        // regex formats the phone number for twilio api
        yield call(
          makeRequest,
          "POST",
          { ...maker, phoneNumber: phoneNumber.replace(/[()\s-]+/g, "") },
          `profile/update/${id}`,
          {
            "X-Auth-Token": token,
          }
        );
        // yield call(makeRequest, 'POST', {}, 'profile/sendsmsvalidationcode', { 'X-Auth-Token': token });
        // yield call(resolve);
        // yield put(applySmsSuccess('Sent sms with code'));
        // yield put(openConfirmCode(jobID ? jobID : jobId, studioId));
        if (jobID) {
          yield put(applyJobRequest(jobID, studioId));
        } else {
          // yield put(applyStudioJobRequest(jobId, studioId));
          yield put(applyJobRequest(jobId, studioId));
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(applySmsError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // yield call(reject, { location: 'Could not verify phone' });
      yield put(applySmsError(e));
      yield put(openMessage("Error Submitting Phone Number", "blank"));
    }
  }
}

// watcher for confirm code requests
function* confirmCodeRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { code: smsCode, jobId, studioId },
        resolve,
        reject,
        jobID,
      },
    } = yield take(CONFIRM_CODE_REQUEST);
    try {
      if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        yield call(
          makeRequest,
          "POST",
          { smsCode },
          "profile/validatesmscode",
          { "X-Auth-Token": token }
        );
        yield call(resolve);
        yield put(confirmCodeSuccess("phone validated"));
        if (jobID) {
          yield put(applyJobRequest(jobID, studioId));
        } else {
          yield put(applyStudioJobRequest(jobId, studioId));
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield call(reject);
        yield put(confirmCodeError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      yield call(reject, { location: "Could not verify phone" });
      yield put(confirmCodeError(e));
      yield put(
        openMessage(
          "Error Confirming Code",
          "Confirmation code is required for the message to be sent."
        )
      );
    }
  }
}

// watcher for pending connection requests
function* creditsRequestWatcher() {
  while (true) {
    const {
      payload: { credit, credits },
    } = yield take(CREDITS_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
        // add new credit to the credits array
        if (credit) {
          const index = indexOf(credits, find(credits, { id: credit.id }));
          credits.splice(index, 1, credit);
        }
        // update credits request
        const req = yield call(
          makeRequest,
          "POST",
          {
            credits,
          },
          `gamemaker/updatecredits/${id}`,
          {
            "X-Auth-Token": token,
          }
        );
        yield put(updateCreditsSuccess(req.statusText));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(addExpError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
      yield put(updateCreditsError(e));
    }
  }
}

// Watcher for autocomplete requests
function* autocompleteRequestWatcher() {
  while (true) {
    const {
      payload: { query, url, cb },
    } = yield take(GET_AUTOCOMPLETE_REQUEST);
    try {
      // check for empty query strings to prevent bad server requests
      if (!query.trim()) {
        yield call(cb, null, { options: [] });
        yield put(getAutocompleteSuccess("Empty query string submitted."));
        // check auth token for expiration
      } else {
        // const { token } = yield call(getAuthToken);
        // request autocomplete data
        const req = yield call(
          makeRequest,
          "GET",
          {},
          `autocomplete/${url}?q=${query}`
        );
        yield call(cb, null, { options: req.data });
        yield put(getAutocompleteSuccess("Successfully fetched suggestions!"));
      }
    } catch (e) {
      yield call(cb, { _error: "Error fetching suggestions." });
      yield put(getAutocompleteError(e));
    }
  }
}

// watcher for 'check details' requests
function* updateDetailsRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: {
          firstName,
          lastName,
          currRole,
          email,
          currCompany,
          currGame,
          language,
        },
        resolve,
        reject,
        isStudent,
      },
    } = yield take(UPDATE_DETAILS_REQUEST);
    try {
      // check auth token for expiration
      localStorage.setItem("isStudent", isStudent);
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the profile update api
        // in order for it to submit correctly we pull
        // the missing data fields from the user object
        const {
          id,
          maker: {
            phoneNumber,
            connections,
            credits,
            bio,
            availability,
            location,
            imgUrl,
            skills,
            accomplishments,
          },
        } = yield call(getUserData);
        const requ = yield call(
          makeRequest,
          "POST",
          {
            id,
            firstName: trim(firstName),
            lastName: trim(lastName),
            email,
            currRole: isStudent ? "Student" : trim(currRole),
            currCompany: trim(currCompany),
            currGame: "",
            phoneNumber,
            connections,
            credits,
            bio: trim(bio),
            availability,
            location: trim(location),
            imgUrl,
            skills: trim(skills),
            accomplishments: trim(accomplishments),
            isStudent,
            additionalInfo: [
              {
                language: isEmpty(language)
                  ? ""
                  : language
                      .map((v) => {
                        return v.value;
                      })
                      .join(", "),
                timesVerified: 0,
                availableAt: null,
                latestGameId: 0,
                loginCount: 0,
                invitationCount: 0,
              },
            ],
          },
          `profile/onboardingprocess/${id}?step=1`,
          {
            "X-Auth-Token": token,
          }
        );
        localStorage.setItem("resetEmail", requ.data.email);
        localStorage.setItem("resetCode", requ.data.code);
        // if successful resolve the form
        yield call(resolve);
        yield put(updateDetailsSuccess("Successfully updated profile!"));
        // update user data object
        const req = yield call(makeRequest, "GET", {}, "me", {
          "X-Auth-Token": token,
        });
        yield call(setUserData, req.data);
        yield put(userSuccess(req.data));
        // close modal
        yield put(closeModal());
        // if user has game credits, push to game verify page
        if (credits.length > 0) {
          yield put(push("/verify"));
        } else {
          // if(localStorage.getItem('onboarding') != 'true'){
          //   localStorage.setItem('onboarding', 'true')
          // }
          // yield put(openAddExp({gameTitle: "", studioName : ""}));
          // eslint-disable-next-line no-lonely-if
          if (isStudent !== true) {
            localStorage.getItem("resetpassword") == "true"
              ? yield put(openLocation())
              : yield put(openLocation());
          } else {
            yield put(openEducation());
          }
          // yield put(openAvailability());
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(updateDetailsError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // if unauthorized reject the form and pass an error message
      yield call(reject, { _error: "Error updating profile." });
      yield put(updateDetailsError(e));
    }
  }
}
// watcher for 'education details' requests
function* updateEducationRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { school, major },
        resolve,
        reject,
      },
    } = yield take(UPDATE_EDUCATION_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the profile update api
        // in order for it to submit correctly we pull
        // the missing data fields from the user object
        const {
          id,
          maker: {
            firstName,
            lastName,
            currRole,
            currCompany,
            currGame,
            language,
            phoneNumber,
            connections,
            credits,
            bio,
            availability,
            location,
            imgUrl,
            skills,
            accomplishments,
            isStudent,
          },
        } = yield call(getUserData);
        const requ = yield call(
          makeRequest,
          "POST",
          {
            id,
            firstName,
            lastName,
            currRole,
            currCompany: "unset",
            currGame: "",
            phoneNumber,
            connections,
            credits,
            bio,
            availability,
            location,
            imgUrl,
            skills,
            accomplishments,
            isStudent,
            school,
            major: trim(major),
            additionalInfo: [
              {
                language: isEmpty(language)
                  ? ""
                  : language
                      .map((v) => {
                        return v.value;
                      })
                      .join(", "),
                timesVerified: 0,
                availableAt: null,
                latestGameId: 0,
                loginCount: 0,
                invitationCount: 0,
              },
            ],
          },
          `profile/onboardingprocess/${id}?step=2`,
          {
            "X-Auth-Token": token,
          }
        );
        yield call(resolve);
        // update user data object
        const req = yield call(makeRequest, "GET", {}, "me", {
          "X-Auth-Token": token,
        });
        yield call(setUserData, req.data);
        yield put(updateEducationSuccess(req.data));
        yield put(closeModal());
        // if user has game credits, push to game verify page
        if (credits.length > 0) {
          yield put(push("/verify"));
        } else {
          localStorage.getItem("resetpassword") == "true"
            ? yield put(openLocation())
            : yield put(openLocation());
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(updateEducationError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // if unauthorized reject the form and pass an error message
      yield call(reject, { _error: "Error updating profile." });
      yield put(updateEducationError(e));
    }
  }
}
// watcher for availability requests
function* availabilityRequestWatcher() {
  while (true) {
    // debugger ;
    const {
      payload: {
        values: { availability },
        resolve,
        reject,
      },
    } = yield take(AVAILABILITY_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the profile update api
        // in order for it to submit correctly we pull
        // the missing data fields from the user object
        const {
          id,
          maker: {
            firstName,
            lastName,
            currRole,
            currGame,
            currCompany,
            location,
            phoneNumber,
            connections,
            credits,
            bio,
            imgUrl,
            skills,
            accomplishments,
          },
        } = yield call(getUserData);
        yield call(
          makeRequest,
          "POST",
          {
            id,
            firstName,
            lastName,
            currRole,
            currCompany,
            currGame: "",
            phoneNumber,
            connections,
            credits,
            bio,
            availability,
            location,
            imgUrl,
            skills,
            accomplishments,
            additionalInfo: [
              {
                timesVerified: 0,
                availableAt: null,
                latestGameId: 0,
                loginCount: 0,
                invitationCount: 0,
              },
            ],
          },
          `profile/onboardingprocess/${id}?step=3`,
          {
            "X-Auth-Token": token,
          }
        );
        // if successful resolve the form
        yield call(resolve);
        // update user data object
        const req = yield call(makeRequest, "GET", {}, "me", {
          "X-Auth-Token": token,
        });
        yield call(setUserData, req.data);
        yield put(availabilitySuccess(req.data));
        yield put(closeModal());
        // yield put(openLocation());   Existing onboarding process screen

        // New onboard screens remove localstorage

        // yield put(openAddExp({ gameTitle: '', studioName: '' }));  ----jamil commented this line on 30 aug 2019
        // aqui 3 abrepassbutshouldbegames
        // yield put(openAddPassion());
        yield put(openAddExp({ gameTitle: "", studioName: "" }));
        /*  yield put(openAddGameGuide()); */
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(availabilityError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // if unauthorized reject the form and pass an error message
      yield call(reject, { _error: "Error updating profile." });
      yield put(availabilityError(e));
    }
  }
}

function* locationRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { location, country, state, city },
        addressId,
        countryId,
        stateId,
        resolve,
        reject,
      },
    } = yield take(LOCATION_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the profile update api
        // in order for it to submit correctly we pull
        // the missing data fields from the user object
        const {
          id,
          maker: {
            firstName,
            lastName,
            currRole,
            currGame,
            currCompany,
            phoneNumber,
            connections,
            credits,
            bio,
            availability,
            imgUrl,
            skills,
            accomplishments,
          },
        } = yield call(getUserData);
        yield call(
          makeRequest,
          "POST",
          {
            id,
            firstName,
            lastName,
            currRole,
            currCompany,
            currGame: "",
            phoneNumber,
            connections,
            credits,
            bio,
            availability,
            location,
            imgUrl,
            skills,
            accomplishments,
            additionalInfo: [
              {
                timesVerified: 0,
                availableAt: null,
                latestGameId: 0,
                loginCount: 0,
                invitationCount: 0,
                address: {
                  id: addressId,
                  country,
                  city,
                  state,
                  // area: area,
                  countryId,
                  stateId,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              },
            ],
          },
          `profile/onboardingprocess/${id}?step=3`,
          {
            "X-Auth-Token": token,
          }
        );
        // if successful resolve the form
        yield call(resolve);
        // update user data object
        const req = yield call(makeRequest, "GET", {}, "me", {
          "X-Auth-Token": token,
        });
        yield call(setUserData, req.data);
        yield put(locationSuccess(req.data));
        // push to game verify page
        // yield put(push('/maker/me'));  //existing onboarding process
        // yield put(closeModal());
        // yield put(openAddGameGuide()); existing onboarding process screen
        yield put(openOpportunities()); // new onboarding screen
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(locationError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // if unauthorized reject the form and pass an error message
      yield call(reject, { _error: "Error updating profile." });
      yield put(availabilityError(e));
    }
  }
}

function* opportunitiesRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: {},
        resolve,
        reject,
        workCategories,
      },
    } = yield take(UPDATE_OPPORTUNITIES_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the profile update api
        // in order for it to submit correctly we pull
        // the missing data fields from the user object
        const {
          id,
          maker: {
            firstName,
            lastName,
            currRole,
            currGame,
            currCompany,
            location,
            phoneNumber,
            connections,
            credits,
            bio,
            availability,
            imgUrl,
            skills,
            accomplishments,
          },
        } = yield call(getUserData);
        yield call(
          makeRequest,
          "POST",
          {
            id,
            firstName,
            lastName,
            currRole,
            currCompany,
            currGame: "",
            phoneNumber,
            connections,
            credits,
            bio,
            availability,
            location,
            imgUrl,
            skills,
            accomplishments,
            workCategories,
            additionalInfo: [
              {
                timesVerified: 0,
                availableAt: null,
                latestGameId: 0,
                loginCount: 0,
                invitationCount: 0,
              },
            ],
          },
          `profile/onboardingprocess/${id}?step=4`,
          {
            "X-Auth-Token": token,
          }
        );
        // if successful resolve the form
        yield call(resolve);
        // update user data object
        const req = yield call(makeRequest, "GET", {}, "me", {
          "X-Auth-Token": token,
        });
        yield call(setUserData, req.data);
        yield put(updateOpportunitiesSuccess(req.data));

        const checkStudent = yield call(
          makeRequest,
          "GET",
          {},
          `checkStudent/${id}`,
          {
            "X-Auth-Token": token,
          }
        );

        if (checkStudent.data.isStudent) {
          yield put(openSetPassword());
        } else {
          yield put(openAddExp({ gameTitle: "", studioName: "" }));
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(updateOpportunitiesError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // if unauthorized reject the form and pass an error message
      yield call(reject, { _error: "Error updating profile." });
      yield put(updateOpportunitiesError(e));
    }
  }
}

function* passwordLinkRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { email },
        resolve,
        reject,
      },
    } = yield take(PASSWORD_LINK_REQUEST);
    try {
      const lowerCaseEmail = email.toLowerCase();
      const req = yield call(
        makeRequest,
        "POST",
        { email: lowerCaseEmail },
        "resetpassword"
      );
      yield call(resolve);
      yield put(passwordLinkSuccess(req.statusText));
      yield put(closeModal());
      yield put(
        openMessage(
          "Password Request Sent",
          "The Reset password link was successfully sent to your email."
        )
      );
    } catch (e) {
      yield call(reject, { email: e.response.data.error });
      yield put(passwordLinkError(e));
    }
  }
}

function* updatePasswordRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { newPassword },
        resolve,
        reject,
      },
    } = yield take(UPDATE_PASSWORD_REQUEST);
    try {
      const { token } = yield call(getAuthToken);

      if (newPassword) {
        const req = yield call(
          makeRequest,
          "POST",
          {
            oldemail: localStorage.getItem("resetEmail"),
            oldpassword: localStorage.getItem("resetCode"),
            newpassword: newPassword,
          },
          "updatepassword",
          {
            "X-Auth-Token": token,
          }
        );

        yield call(resolve);
        yield put(updatePasswordSuccess(req.statusText));
        yield put(closeModal());

        // remove temporary localstorage variable
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetCode");

        // get user data from local storage
        const user = getUserData();

        window.location = user.recruiter
          ? "/recruiter?resetpassword"
          : "/maker/me?resetpassword";
      }
    } catch (e) {
      console.log(e);
      // yield call(reject, { email: e.response.data.error });
      yield put(updatePasswordError(e));
    }
  }
}

function* getCountriesRequestWatcher() {
  while (yield take(GET_COUNTRIES_REQUEST)) {
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, "GET", {}, "browse/countriesList", {
          "X-Auth-Token": token,
        });
        yield put(getCountriesSuccess(req.data));
      } else {
        // request user data
        const req = yield call(makeRequest, "GET", {}, "browse/countriesList");
        yield put(getCountriesSuccess(req.data));
        // if expired remove token and user data
        // yield call(removeAuthToken);
        // yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        // yield put(getCountriesError('Login credentials have expired'));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e.toString());
      yield put(getCountriesError(e.toString()));
      yield put(openMessage());
      yield put(push("/"));
    }
  }
}

function* getStatesRequestWatcher() {
  while (true) {
    const {
      payload: { countryKey, hasState },
    } = yield take(GET_STATES_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        let url = "";
        if (hasState) {
          url = `browse/stateList/${countryKey}`;
        } else {
          const stateKey = "GB";
          url = `browseCityList/cID/${stateKey}/sID/${countryKey}`;
        }
        const req = yield call(makeRequest, "GET", {}, url, {
          "X-Auth-Token": token,
        });
        if (hasState) {
          yield put(getStatesSuccess(req.data));
        } else {
          yield put(getStateCitiesSuccess(req.data));
        }
      } else {
        let url = "";
        if (hasState) {
          url = `browse/stateList/${countryKey}`;
        } else {
          const stateKey = "GB";
          url = `browseCityList/cID/${stateKey}/sID/${countryKey}`;
        }
        const req = yield call(makeRequest, "GET", {}, url, {});
        if (hasState) {
          yield put(getStatesSuccess(req.data));
        } else {
          yield put(getStateCitiesSuccess(req.data));
        }
        // if expired remove token and user data
        // yield call(removeAuthToken);
        // yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        // yield put(getStatesError('Login credentials have expired'));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e.toString());
      yield put(getStatesError(e.toString()));
      yield put(openMessage());
      yield put(push("/"));
    }
  }
}
function* getCitiesRequestWatcher() {
  while (true) {
    const {
      payload: { countryKey, stateKey },
    } = yield take(GET_CITIES_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(
          makeRequest,
          "GET",
          {},
          `browseCityList/cID/${countryKey}/sID/${stateKey}`,
          {
            "X-Auth-Token": token,
          }
        );
        yield put(getCitiesSuccess(req.data));
      } else {
        // request user data
        const req = yield call(
          makeRequest,
          "GET",
          {},
          `browseCityList/cID/${countryKey}/sID/${stateKey}`,
          {}
        );
        yield put(getCitiesSuccess(req.data));
        // if expired remove token and user data
        // yield call(removeAuthToken);
        // yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        // yield put(getCitiesError('Login credentials have expired'));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e.toString());
      yield put(getCitiesError(e.toString()));
      yield put(openMessage());
      yield put(push("/"));
    }
  }
}

function* acceptTeamRequestWatcher() {
  while (true) {
    const {
      payload: { id },
    } = yield take(ACCEPT_TEAM_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(
          makeRequest,
          "POST",
          {},
          `teamRequest/accept/${id}`,
          {
            "X-Auth-Token": token,
          }
        );
        yield put(teamRequestSuccess(id));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(acceptTeamError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // console.log(e.toString());
      yield put(rejectTeamError, e.toString());
      yield put(openMessage());
      yield put(push("/"));
    }
  }
}

function* rejectTeamRequestWatcher() {
  while (true) {
    const {
      payload: { id },
    } = yield take(REJECT_TEAM_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(
          makeRequest,
          "POST",
          {},
          `teamRequest/reject/${id}`,
          {
            "X-Auth-Token": token,
          }
        );
        yield put(teamRequestSuccess(id));
        yield put(closeModal());
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(rejectTeamError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      // console.log(e.toString());
      yield put(rejectTeamError, e.toString());
      yield put(openMessage());
      yield put(push("/"));
    }
  }
}

// watcher for maker invitation requests
function* inviteMakerRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { email },
        resolve,
        reject,
      },
    } = yield take(INVITE_MAKER_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the message api
        const req = yield call(
          makeRequest,
          "POST",
          {
            email,
          },
          "inviteuser",
          {
            "X-Auth-Token": token,
          }
        );
        // if successful resolve the form and show confirmation
        yield call(resolve);
        yield put(
          openMessage("invite", "Invitation sent successfully", invitationSent)
        );
        yield put(peopleRequest());
        yield put(push("/makers"));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(inviteError("Login credentials have expired"));
        yield put(replace("/?unauthorized"));
      }
    } catch (e) {
      yield call(reject, { email: e.response.data.error });
      yield put(inviteError(e));
    }
  }
}
function* claimProfileRequestWatcher() {
  while (true) {
    const {
      payload: {
        data: { email },
        id,
        resolve,
        reject,
      },
    } = yield take(CLAIM_PROFILE_REQUEST);
    try {
      const req = yield call(
        makeRequest,
        "POST",
        { id, email },
        `claimprofile/${id}`,
        {}
      );
      yield put(closeModal());
      yield put(
        openMessage(
          "Claim Request Sent",
          "Thank you for your interest." +
            " All applications are vetted and responded to within 24 hours. We will send you " +
            "an email once your claim has been approved."
        )
      );
      yield put(peopleRequest());
      yield put(push("/makers"));
    } catch (e) {
      yield call(reject, { email: e.response.data.error });
      yield put(claimProfileError(e));
    }
  }
}
function* checkCategoriesWatcher() {
  const categExist = false;
  const req = yield call(makeRequest, "GET", {}, "categoriesName", {});
  // yield put(updatePartners(req.data));
  if (req.data != null) {
    localStorage.removeItem("categories");
    localStorage.setItem("categories", true);
  } else {
    localStorage.setItem("categories", false);
  }
}

function* studioHubRequestWatcher() {
  while (true) {
    const {
      payload: {
        data: { studioName, firstName, lastName, jobTitle, email, phone },
        resolve,
        reject,
      },
    } = yield take(STUDIO_HUB_REQUEST);
    try {
      const req = yield call(
        makeRequest,
        "POST",
        {
          studioName: trim(studioName),
          firstName: trim(firstName),
          lastName: trim(lastName),
          jobTitle: trim(jobTitle),
          email,
          phone,
        },
        "calimStudioPage",
        {}
      );
      if (req.status === 204) {
        yield put(
          openMessage(
            "Claim Studio Request",
            "Claim your free studio request sent to Gamesmith successfully"
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
}

function* validateTokenRequestWatcher() {
  while (true) {
    const {
      payload: {
        token: { invitetoken },
      },
    } = yield take(VALIDATE_TOKEN_REQUEST);
    try {
      const req1 = yield call(
        makeRequest,
        "POST",
        {
          token: invitetoken,
        },
        "validatetoken",
        {}
      );
      localStorage.setItem("resetEmail", req1.data.email);
      localStorage.setItem("resetCode", req1.data.code);

      const req = yield call(
        makeRequest,
        "POST",
        {
          identifier: req1.data.email,
          password: req1.data.code,
        },
        "login"
      );

      yield call(setAuthToken, req.data);

      const { token } = yield call(getAuthToken);

      // get user data from api
      const user = yield call(makeRequest, "GET", {}, "me", {
        "X-Auth-Token": token,
      });

      // set user data to local storage
      yield call(setUserData, user.data);
      yield put(userSuccess(user.data));
      yield put(push("/?proceedonboarding"));
    } catch (e) {
      console.log(e);
      if (e.response.data.message === "Invalid credentials") {
        yield put(
          openMessage("Invalid Token!", "Your invitation token is invalid")
        );
      } else {
        yield put(
          openMessage("Token Expired!", "Your invitation token expired")
        );
      }
      yield put(push("/"));
    }
  }
}

function* setPasswordRequestWatcher() {
  while (true) {
    const {
      payload: {
        values: { password },
        resolve,
        reject,
      },
    } = yield take(SET_PASSWORD_REQUEST);
    try {
      const { token } = yield call(getAuthToken);
      if (password) {
        const req = yield call(
          makeRequest,
          "POST",
          {
            oldemail: localStorage.getItem("resetEmail"),
            oldpassword: localStorage.getItem("resetCode"),
            newpassword: password,
          },
          "updatepassword",
          {
            "X-Auth-Token": token,
          }
        );

        localStorage.removeItem("isStudent");
        yield call(resolve);
        yield put(closeModal());

        // remove temporary localstorage variable
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetCode");

        // get user data from local storage
        // yield put(openLocation());
        // aqui
        /*         yield put(openLocation()); */
        yield call(setUserData, req.data);
        yield put(openAddGameGuide());
        const user = getUserData();
        yield put(userRequest(user, window.location.pathname)); // sent return url along with based on user type.
      }
    } catch (e) {
      console.log(e);
      // yield call(reject, { email: e.response.data.error });
      yield put(updatePasswordError(e));
    }
  }
}

// watcher for sending job to friend via email
function* sendJobToFriendRequestWatcher() {
  while (true) {
    const {
      data: {
        jobDetails: { friendEmail, jobTitle, jobUrl, name },
      },
    } = yield take(SEND_JOB_TO_FRIEND_REQUEST);
    const req = yield call(
      makeRequest,
      "POST",
      { friendEmail, jobTitle, jobUrl, name },
      "sendJobToFriend",
      {}
    );
    if (req.status === 200) {
      yield put(openMessage("Thank You!", "Job details sent successfully"));
    }
  }
}

// watcher for saving job to for later as reminder
function* saveJobForLaterWatcher() {
  while (true) {
    const {
      payload: { email, jobTitle, jobUrl },
    } = yield take(SAVE_JOB_FOR_LATER);
    if (checkAuthToken()) {
      const { token } = yield call(getAuthToken);
      const req = yield call(
        makeRequest,
        "POST",
        { email, jobTitle, jobUrl },
        "saveJobForLater",
        {
          "X-Auth-Token": token,
        }
      );
      if (req.status === 200) {
        yield put(openMessage("Thank You!", "Job saved!"));
      }
    }
  }
}

// watcher for Repost Job
function* confirmJobRepostWatcher() {
  while (true) {
    const {
      payload: { id, token },
    } = yield take(CONFIRM_JOB_REPOST);
    try {
      const req = yield call(
        makeRequest,
        "POST",
        {},
        `confirmJobRepost/${token}/${id}`,
        {}
      );
      if (req.status === 200) {
        yield put(openMessage("Thank You!", "Reposted Successfully!"));
      }
    } catch (e) {
      console.log(e);
      yield put(
        openMessage(
          "Authentication Failed!",
          "Your repost token expired or invalid!"
        )
      );
    }
  }
}

// WATCHER FOR DELETE CV REQUEST ACTION
function* deleteCVRequestWatcher() {
  while (true) {
    const { makerId } = yield take(DELETE_CV_REQUEST);
    const { token } = yield call(getAuthToken);
    if (checkAuthToken()) {
      const req = yield call(makeRequest, "POST", {}, `deleteCv/${makerId}`, {
        "X-Auth-Token": token,
      });
      if (req.status === 200) {
        yield put(makerRequest(makerId));
        yield put(deleteCVSuccess());
        yield put(
          openMessage("CV Deleted", " You have successfully deleted your CV!")
        );

        // window.location.replace('/maker/me');
      }
    }
  }
}
// WATCHER FOR DELETE CV REQUEST ACTION
function* getMakerCVInfoWatcher() {
  while (true) {
    const { makerId } = yield take(GET_MAKER_CV_INFO);
    const { token } = yield call(getAuthToken);
    if (checkAuthToken()) {
      const req = yield call(
        makeRequest,
        "POST",
        {},
        `getmakercvinfo/${makerId}`,
        { "X-Auth-Token": token }
      );
      if (req.status === 200) {
        // yield put(makerRequest(makerId));
        yield put(makerCVSuccess(req.data));
        // yield put(openMessage('CV Deleted', ' You have successfully deleted your CV!'));

        // window.location.replace('/maker/me');
      }
    }
  }
}

// WATCHER FOR Company license information

function* getCompanyInfoWatcher() {
  while (true) {
    const {
      payload: { companyId },
    } = yield take(GET_COMPANY_INFO);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(
          makeRequest,
          "POST",
          {},
          `getcompanyinfo/${companyId}`,
          { "X-Auth-Token": token }
        );
        if (req.status === 200) {
          // yield put(makerRequest(makerId));
          yield put(companyInfoSuccess(req.data));
          // yield put(openMessage('CV Deleted', ' You have successfully deleted your CV!'));

          // window.location.replace('/maker/me');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

// Watcher for adding subscriber

function* addSubscriberRequestWatcher() {
  while (true) {
    const { email } = yield take(ADD_SUBSCRIBER_REQUEST);
    try {
      const req = yield call(
        makeRequest,
        "POST",
        {},
        `addsubsciber/${email}`,
        {}
      );
      yield put(
        openMessage(
          "Success!",
          " Check your inbox for your first installment of Gamesmith goodness."
        )
      );
    } catch (e) {
      console.log(e);
      yield put(
        openMessage(
          "Already Subscribed",
          " You have already subscribed to Gamesmith"
        )
      );
    }
  }
}

// Watcher for adding maker Passion while onboarding

function* addPassionRequestWatcher() {
  while (true) {
    const {
      data: {
        values: { jobFamily, makerId },
      },
    } = yield take(ADD_PASSION_REQUEST);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(
          makeRequest,
          "POST",
          {
            jobFamily,
            makerId,
          },
          "addPassion",
          { "X-Auth-Token": token }
        );
        if (req.data === "Success") {
          yield put(openAddExp({ gameTitle: "", studioName: "" }));
        } else {
          console.log("could not add passion");
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

function* addApplozicCountRequestWatcher() {
  while (true) {
    const {
      payload: { resolve, reject },
    } = yield take(ADD_APPLOZIC_COUNT_REQUEST);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(makeRequest, "GET", {}, "applozicmessagecount", {
          "X-Auth-Token": token,
        });
        yield call(resolve);
        if (req.data.status === "ok") {
          yield put(addApplozicCountSuccess(req.data.success));
        } else {
          yield put(addApplozicCountSuccess(req.data.success));
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
function* getApplozicCountRequestWatcher() {
  while (yield take(GET_APPLOZIC_COUNT_REQUEST)) {
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(makeRequest, "GET", {}, "getapplozicmsgcount", {
          "X-Auth-Token": token,
        });

        if (req.data.status === "success") {
          yield put(addApplozicCountSuccess(req.data.count));
        } else {
          console.log("could not add passion", req.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
function* getApplozicRecruiterRequestWatcher() {
  while (yield take(GET_APPLOZIC_RECRUITER_REQUEST)) {
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(makeRequest, "GET", {}, "getapplozicrecruiter", {
          "X-Auth-Token": token,
        });
        if (req.data.status === "success") {
          yield put(addApplozicCountSuccess(req.data.success));
        } else {
          yield put(addApplozicCountSuccess(req.data.success));
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

function* getProfileViewCountRequestWatcher() {
  while (yield take(PROFILE_VIEW_COUNT_REQUEST)) {
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(makeRequest, "GET", {}, "getProfileCount", {
          "X-Auth-Token": token,
        });

        if (req.data.status === "ok") {
          yield put(getProfileViewCountSuccess(req.data.success));
        } else {
          yield put(
            openExceedRecruiterSearchLimit({
              message: "Let's look at a plan that suits your business needs.",
            })
          );
        }
      }
    } catch (e) {}
  }
}

function* getPhoneNumberRequestWatcher() {
  while (true) {
    const {
      payload: { jobId, studioId },
    } = yield take(CHECK_PHONE_NUMBER_REQUEST);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(makeRequest, "GET", {}, "getPhoneNumber", {
          "X-Auth-Token": token,
        });
        req.data.jobId = jobId;
        req.data.studioId = studioId;
        if (req.data.status) {
          yield put(applyJobRequest(jobId, studioId));
        } else {
          yield put(openApplySms(jobId, studioId));
        }
      }
    } catch (e) {}
  }
}

function* gameMakersRequestWatcher() {
  while (true) {
    const {
      payload: {
        data: { makerId, gameId, creditId },
        offset,
      },
    } = yield take(GAME_MAKER_REQEUST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(
          makeRequest,
          "GET",
          {},
          `getverified/${gameId}/${creditId}/makers?offset=${offset}`,
          {
            "X-Auth-Token": token,
          }
        );
        const userData = req.data
          ? req.data.filter((x) => x.makers.id !== makerId)
          : [];
        yield put(gameMakersSuccess(userData));
      } else {
      const req = yield call(makeRequest, 'GET', {}, `game/${id}/makers?offset=${offset}`, {});
        // // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // // redirect user to Home and show the unauthorized message
        yield put(gameMakersError("Login credentials have expired"));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(gameMakersError(e));
      // TODO:30 find a way to keep the url but still display the error page
      yield put(replace("/error"));
    }
  }
}

function* searchGameMakersRequestWatcher() {
  while (true) {
    const {
      payload: {
        data: { makerId, gameId, searchTerm, creditId },
        offset,
      },
    } = yield take(SEARCH_GAME_MAKERS_REQEUST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(
          makeRequest,
          "GET",
          {},
          `searchverified/${gameId}/${searchTerm}/${creditId}?offset=${offset}`,
          {
            "X-Auth-Token": token,
          }
        );
        const userData = req.data
          ? req.data.filter((x) => x.makers.id !== makerId)
          : [];
        yield put(searchGameMakersSuccess(userData));
      } else {
        // // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // // redirect user to Home and show the unauthorized message
        yield put(searchGameMakersError("Login credentials have expired"));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(searchGameMakersError(e));
      // TODO:30 find a way to keep the url but still display the error page
      yield put(replace("/error"));
    }
  }
}

function* sendInviteRequestWatcher() {
  while (true) {
    const {
      payload: {
        data: { users, gameID, creditID, makerID, title, makerName },
        page,
      },
    } = yield take(SEND_INVITE_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);

        const req = yield call(
          makeRequest,
          "POST",
          {
            userIds: users,
            gameId: gameID,
            creditId: creditID,
            makerId: makerID,
            makerName,
            gameTitle: title,
          },
          "gamecredit/invites",
          {
            "X-Auth-Token": token,
          }
        );
        if (page === "Verification") {
          yield put(
            sendInviteSuccess(
              { userId: users[0], gameId: gameID, creditId: creditID },
              "Verification"
            )
          );
        }
        if (page !== "Verification") {
          yield put(closeModal());
          yield put(sendInviteSuccess());
        }
        yield put(getUserPendingRequests(makerID));
        // yield put(openMessage('Game Credit Verification', 'Successfully requested Game credit verification.'));
      } else {
        // // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // // redirect user to Home and show the unauthorized message
        yield put(sendInviteError("Login credentials have expired"));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(sendInviteError(e));
      // TODO:30 find a way to keep the url but still display the error page
      yield put(replace("/error"));
    }
  }
}

function* verifyCreditTokenRequestWatcher() {
  while (true) {
    const {
      payload: { code },
    } = yield take(VERIFY_CREDIT_TOKEN_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);

        const req = yield call(
          makeRequest,
          "POST",
          {
            token: code,
          },
          "gamecredit/verify_token",
          {
            "X-Auth-Token": token,
          }
        );

        if (!req.data || !req.data.reqData) {
          // yield put(openMessage('Token Expired', 'Your token is expired or invalid.'));
          yield put(
            verifyCreditTokenSuccess({ user: [], credit: "", isVerified: -1 })
          );
        } else {
          yield put(
            verifyCreditTokenSuccess({
              credit: req.data.reqData,
              user: req.data.user[0],
              isVerified: req.data.isVerified,
            })
          );
        }
      } else {
        // // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // // redirect user to Home and show the unauthorized message
        yield put(verifyCreditTokenError("Login credentials have expired"));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(verifyCreditTokenError(e));
      // TODO:30 find a way to keep the url but still display the error page
      yield put(replace("/error"));
    }
  }
}

function* ignoreVerificationRequestWatcher() {
  while (true) {
    const {
      payload: { code },
    } = yield take(IGNORE_VERIFICATION_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);

        const req = yield call(
          makeRequest,
          "POST",
          {
            token: code,
          },
          "gamecredit/delete_verify_request",
          {
            "X-Auth-Token": token,
          }
        );
        yield put(verifyCreditTokenRequest("random"));
      } else {
        // // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // // redirect user to Home and show the unauthorized message
        yield put(verifyCreditTokenError("Login credentials have expired"));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(verifyCreditTokenError(e));
      // TODO:30 find a way to keep the url but still display the error page
      yield put(replace("/error"));
    }
  }
}
function* getUserGamesAndMakersRequestWatcher() {
  while (true) {
    const {
      payload: { id },
    } = yield take(USER_GAME_AND_MAKERS_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);

        const req = yield call(
          makeRequest,
          "GET",
          {},
          `games_and_makers/${id}`,
          {
            "X-Auth-Token": token,
          }
        );

        yield put(getUserGamesAndMakersSuccess(req.data));
      } else {
        // // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // // redirect user to Home and show the unauthorized message
        yield put(getUserGamesAndMakersError("Login credentials have expired"));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(getUserGamesAndMakersError(e));
      // TODO:30 find a way to keep the url but still display the error page
      yield put(replace("/error"));
    }
  }
}

function* getMoreMakerRequestWatcher() {
  while (true) {
    const {
      payload: {
        data: { gameId, makerIds },
      },
    } = yield take(MORE_MAKER_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);

        const req = yield call(
          makeRequest,
          "POST",
          { gameId, makerIds },
          "random_makers_by_game",
          {
            "X-Auth-Token": token,
          }
        );

        yield put(getMoreMakerSuccess(req.data, gameId));
      } else {
        // // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // // redirect user to Home and show the unauthorized message
        yield put(getMoreMakerError("Login credentials have expired"));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(getMoreMakerError(e));
      // TODO:30 find a way to keep the url but still display the error page
      yield put(replace("/error"));
    }
  }
}

function* getJwtTokenRequestWatcher() {
  while (true) {
    const {
      payload: { id },
    } = yield take(GET_JWT_TOKEN_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const req = yield call(
          makeRailApiRequest,
          "POST",
          { id },
          "tokens",
          {}
        );

        yield put(getJwtTokenSuccess(req.data.token));
      } else {
        // // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // // redirect user to Home and show the unauthorized message
        yield put(getJwtTokenError("Login credentials have expired"));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(getJwtTokenError(e));
      // TODO:30 find a way to keep the url but still display the error page
      yield put(replace("/error"));
    }
  }
}

function* getAccountIdByNameRequestWatcher() {
  while (true) {
    const {
      payload: { name },
    } = yield take(GET_ACCOUNT_ID_BY_NAME);
    try {
      // check auth token for expiration
      const req = yield call(
        makeRequest,
        "GET",
        {},
        `get_accountid_by_name/${name}`,
        {}
      );
      if (req.data.slug) {
        const path = req.data.slug;
        yield put(replace(path));
      }
    } catch (e) {
      // console.log(e);
      // TODO:30 find a way to keep the url but still display the error page
      yield put(replace("/error"));
    }
  }
}

function* saveSlugRequestWatcher() {
  while (true) {
    const {
      payload: { id },
    } = yield take(SAVE_SLUG_REQUEST);
    try {
      if (checkAuthToken) {
        const req = yield call(
          makeRailApiRequest,
          "POST",
          { id },
          "accounts/tribe_slug",
          {}
        );
      }
    } catch (e) {
      // console.log(e);
      // TODO:30 find a way to keep the url but still display the error page
      yield put(replace("/error"));
    }
  }
}

export default [
  loginRequestWatcher,
  signupRequestWatcher,
  directSignupRequestWatcher,
  logoutRequestWatcher,
  userRequestWatcher,
  pendingRequestWatcher,
  pendingTeamRequestWatcher,
  acceptRequestWatcher,
  rejectRequestWatcher,
  messageRequestWatcher,
  applicantMessageRequestWatcher,
  studioMessageRequestWatcher,
  inviteRequestWatcher,
  connectRequestWatcher,
  addExpRequestWatcher,
  editExpRequestWatcher,
  deleteExpRequestWatcher,
  applySmsRequestWatcher,
  confirmCodeRequestWatcher,
  creditsRequestWatcher,
  autocompleteRequestWatcher,
  updateDetailsRequestWatcher,
  updateEducationRequestWatcher,
  availabilityRequestWatcher,
  locationRequestWatcher,
  opportunitiesRequestWatcher,
  passwordLinkRequestWatcher,
  updatePasswordRequestWatcher,
  getCountriesRequestWatcher,
  getStatesRequestWatcher,
  getCitiesRequestWatcher,
  inviteMemberRequestWatcher,
  acceptTeamRequestWatcher,
  rejectTeamRequestWatcher,
  inviteMakerRequestWatcher,
  claimProfileRequestWatcher,
  checkCategoriesWatcher,
  studioHubRequestWatcher,
  validateTokenRequestWatcher,
  setPasswordRequestWatcher,
  sendJobToFriendRequestWatcher,
  saveJobForLaterWatcher,
  confirmJobRepostWatcher,
  deleteCVRequestWatcher,
  getMakerCVInfoWatcher,
  getCompanyInfoWatcher,
  addSubscriberRequestWatcher,
  addPassionRequestWatcher,
  addApplozicCountRequestWatcher,
  getApplozicCountRequestWatcher,
  getApplozicRecruiterRequestWatcher,
  getProfileViewCountRequestWatcher,
  getPhoneNumberRequestWatcher,
  gameMakersRequestWatcher,
  searchGameMakersRequestWatcher,
  sendInviteRequestWatcher,
  verifyCreditTokenRequestWatcher,
  ignoreVerificationRequestWatcher,
  getUserGamesAndMakersRequestWatcher,
  getMoreMakerRequestWatcher,
  getJwtTokenRequestWatcher,
  getAccountIdByNameRequestWatcher,
  saveSlugRequestWatcher,
];
