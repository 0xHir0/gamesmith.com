/*
 * Verification Requests sagas
 */

import { take, call, put } from "redux-saga/effects";
import { push, replace } from "react-router-redux";
import { isEmpty, trim } from "lodash";

import {
  makeRequest,
  makeRailApiRequest,
  getAuthToken,
  checkAuthToken,
} from "utils";

import {
  USER_GAMES_REQUEST,
  GAME_MAKERS_REQUEST,
  WITHDRAW_VERIFICATION_REQUEST,
  USER_RECEIVED_REQUESTS,
  USER_PENDING_REQUESTS,
  USER_VERIFICATIONS_REQUEST,
  NEXT_PAGE_GAME_MAKERS_REQUEST,
} from "./constants";

import {
  getUserGamesSuccess,
  getUserGamesError,
  getGameMakersRequest,
  getGameMakersSuccess,
  getGameMakersError,
  nextPageGetGameMakersSuccess,
  nextPageGetGameMakersError,
  withdrawVerificationSuccess,
  withdrawVerificationError,
  getUserReceivedRequests,
  getUserReceivedRequestsSuccess,
  getUserReceivedRequestsError,
  getUserPendingRequests,
  getUserPendingRequestsSuccess,
  getUserPendingRequestsError,
  getUserVerificationsSuccess,
  getUserVerificationsError,
  verificationCount,
} from "./actions";

// watcher for user games Requests
function* getUserGamesRequestsWatcher() {
  while (true) {
    const { id, verifyGame } = yield take(USER_GAMES_REQUEST);
    try {
      if (checkAuthToken()) {
        let gameId;
        let gameTitle;
        let creditId;
        const { token } = yield call(getAuthToken);
        const req = yield call(
          makeRailApiRequest,
          "GET",
          { id },
          `game_makers/${id}/games`,
          { "X-Auth-Token": token, Pragma: "no-cache" }
        );
        if (req.data && req.data.length > 0) {
          if (verifyGame)
            req.data.map((i) => {
              if (i.id == verifyGame) {
                gameTitle = i.name;
                gameId = i.id;
                creditId = i.credit_id;
              }
            });
          else {
            gameId = req.data[0].id;
            gameTitle = req.data[0].name;
            creditId = req.data[0].credit_id;
          }

          yield put(getGameMakersRequest(id, gameId, "", gameTitle, creditId));
        }
        yield put(getUserGamesSuccess(req.data));
      }
    } catch (e) {
      yield put(getUserGamesError("Error"));
    }
  }
}

// watcher for user game maker request
function* getGameMakersRequestWatcher() {
  while (true) {
    const {
      payload: {
        userId,
        gameId,
        searchTerm,
        gameTitle,
        creditId,
        resolve,
        reject,
      },
    } = yield take(GAME_MAKERS_REQUEST);
    try {
      if (checkAuthToken()) {
        let counter = 0;
        const { token } = yield call(getAuthToken);
        const req = yield call(
          makeRailApiRequest,
          "GET",
          { userId, gameId, searchTerm },
          `game_makers/${userId}/games/${gameId}/game_credits`,
          { "X-Auth-Token": token, Pragma: "no-cache" }
        );
        req.data.length > 0 && req.data.map((i) => (counter = i.total_count));
        req.data = req.data.map((i) =>
          i.game_maker && i.game_maker.profile
            ? {
                gameTitle,
                gameId,
                creditId: i.id,
                makerId: i.maker_id,
                firstName: i.game_maker.profile.first_name,
                lastName: i.game_maker.profile.last_name,
                role: i.game_maker.curr_role ? i.game_maker.curr_role : "",
                imgUrl: i.game_maker.profile.img_url,
                verified: i.verified,
                requested: i.requested,
              }
            : ""
        );
        yield put(getGameMakersSuccess(req.data, counter - 1));
        if (resolve) {
          yield call(resolve);
        }
      }
    } catch (e) {
      yield put(getGameMakersError("Error"));
    }
  }
}
// watcher for next page game maker request
function* nextPageGameMakersRequestWatcher() {
  while (true) {
    const {
      payload: { userId, gameId, searchTerm, gameTitle, creditId, page },
    } = yield take(NEXT_PAGE_GAME_MAKERS_REQUEST);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(
          makeRailApiRequest,
          "GET",
          { userId, gameId, searchTerm },
          `game_makers/${userId}/games/${gameId}/game_credits?page=${page}`,
          { "X-Auth-Token": token, Pragma: "no-cache" }
        );
        req.data =
          req.data && req.data.length > 0
            ? req.data.map((i) =>
                i.game_maker && i.game_maker.profile
                  ? {
                      gameTitle,
                      gameId,
                      creditId: i.id,
                      makerId: i.maker_id,
                      firstName: i.game_maker.profile.first_name,
                      lastName: i.game_maker.profile.last_name,
                      role: i.game_maker.curr_role
                        ? i.game_maker.curr_role
                        : "",
                      imgUrl: i.game_maker.profile.img_url,
                      verified: i.verified,
                      requested: i.requested,
                    }
                  : ""
              )
            : "";
        yield put(nextPageGetGameMakersSuccess(req.data ? req.data : ""));
      }
    } catch (e) {
      yield put(nextPageGetGameMakersError("Error"));
    }
  }
}

// watcher for withdraw verification request
function* withdrawVerificationRequest() {
  while (true) {
    const {
      payload: { userId, creditId, makerId, received },
    } = yield take(WITHDRAW_VERIFICATION_REQUEST);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(
          makeRequest,
          "POST",
          { userId, creditId, makerId },
          `deleteVerificationRequest/${userId}/${creditId}/${makerId}`,
          { "X-Auth-Token": token, Pragma: "no-cache" }
        );
        if (received) {
          yield put(getUserReceivedRequests(makerId));
          yield put(getUserPendingRequests(makerId));
        } else {
          yield put(getUserReceivedRequests(userId));
          yield put(getUserPendingRequests(userId));
        }

        yield put(withdrawVerificationSuccess("Deleted Request"));
      }
    } catch (e) {
      yield put(withdrawVerificationError("Error"));
    }
  }
}

// watcher for Received Requests
function* userReceivedRequestsWatcher() {
  while (true) {
    const { id } = yield take(USER_RECEIVED_REQUESTS);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(
          makeRailApiRequest,
          "GET",
          { id },
          `game_makers/${id}/credit_verification_requests`,
          { "X-Auth-Token": token, Pragma: "no-cache" }
        );
        req.data = req.data.map((i) =>
          i.requester && i.requester.profile && i.game && i.credit_id
            ? {
                requestorId: i.requester.id,
                firstName: i.requester.profile.first_name,
                lastName: i.requester.profile.last_name,
                imgUrl: i.requester.profile.img_url,
                gameId: i.game.id,
                gameName: i.game.name,
                creditId: i.credit_id,
              }
            : ""
        );
        yield put(getUserReceivedRequestsSuccess(req.data));
      }
    } catch (e) {
      yield put(getUserReceivedRequestsError("Error"));
    }
  }
}

// watcher for Received Requests
function* userPendingRequestsWatcher() {
  while (true) {
    const { id } = yield take(USER_PENDING_REQUESTS);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(
          makeRailApiRequest,
          "GET",
          { id },
          `game_makers/${id}/credit_verification_requests?option=sent`,
          { "X-Auth-Token": token, Pragma: "no-cache" }
        );
        req.data = req.data.map((i) =>
          i.requestee && i.requestee.profile && i.game && i.credit_id
            ? {
                requesteeId: i.requestee.id,
                firstName: i.requestee.profile.first_name,
                lastName: i.requestee.profile.last_name,
                imgUrl: i.requestee.profile.img_url,
                gameId: i.game.id,
                gameName: i.game.name,
                creditId: i.credit_id,
              }
            : ""
        );
        yield put(getUserPendingRequestsSuccess(req.data));
      }
    } catch (e) {
      yield put(getUserPendingRequestsError("Error"));
    }
  }
}
// watcher for Received Requests
function* getUserVerificationsRequestWatcher() {
  while (true) {
    const { id } = yield take(USER_VERIFICATIONS_REQUEST);
    try {
      if (checkAuthToken()) {
        let count = 0;
        const { token } = yield call(getAuthToken);
        const req = yield call(
          makeRailApiRequest,
          "GET",
          { id },
          `game_makers/${id}/credit_verifications`,
          { "X-Auth-Token": token, Pragma: "no-cache" }
        );
        req.data.map((i) =>
          i.game_credit.game_maker.profile.id === id ? (count = count + 1) : ""
        );
        req.data = req.data.map((i) =>
          i.credit_id &&
          i.game_maker &&
          i.game_maker.profile &&
          i.game_credit.game_maker &&
          i.game_credit.game_maker.profile
            ? {
                gameName: i.game.name,
                creditId: i.credit_id,
                verifiedById: i.game_maker.id,
                verifiedByFirstName: i.game_maker.profile.first_name,
                verifiedByLastName: i.game_maker.profile.last_name,
                verifiedByImgURl: i.game_maker.profile.img_url,
                verifiedId: i.game_credit.game_maker.profile.id,
                verifiedFirstName: i.game_credit.game_maker.profile.first_name,
                verifiedLastName: i.game_credit.game_maker.profile.last_name,
                verifiedImgUrl: i.game_credit.game_maker.profile.img_url,
                createdAt: i.created_at,
              }
            : ""
        );
        yield put(getUserVerificationsSuccess(req.data));
        yield put(verificationCount(count));
      }
    } catch (e) {
      yield put(getUserVerificationsError("Error"));
    }
  }
}

export default [
  getUserGamesRequestsWatcher,
  getGameMakersRequestWatcher,
  withdrawVerificationRequest,
  userReceivedRequestsWatcher,
  userPendingRequestsWatcher,
  getUserVerificationsRequestWatcher,
  nextPageGameMakersRequestWatcher,
];
