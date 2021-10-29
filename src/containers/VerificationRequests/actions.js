/*
 *Verification Requests actions
 */

import {
  USER_RECEIVED_REQUESTS,
  USER_RECEIVED_REQUESTS_SUCCESS,
  USER_RECEIVED_REQUESTS_ERROR,
  USER_PENDING_REQUESTS,
  USER_PENDING_REQUESTS_SUCCESS,
  USER_PENDING_REQUESTS_ERROR,
  USER_GAMES_REQUEST,
  USER_GAMES_REQUEST_SUCCESS,
  USER_GAMES_REQUEST_ERROR,
  GAME_MAKERS_REQUEST,
  GAME_MAKERS_SUCCESS,
  GAME_MAKERS_ERROR,
  NEXT_PAGE_GAME_MAKERS_REQUEST,
  NEXT_PAGE_GAME_MAKERS_SUCCESS,
  NEXT_PAGE_GAME_MAKERS_ERROR,
  WITHDRAW_VERIFICATION_REQUEST,
  WITHDRAW_VERIFICATION_SUCCESS,
  WITHDRAW_VERIFICATION_ERROR,
  USER_VERIFICATIONS_REQUEST,
  USER_VERIFICATIONS_SUCCESS,
  USER_VERIFICATIONS_ERROR,
  VERIFICATION_COUNT,
} from './constants';


export function getUserGamesRequests(id, verifyGame) {
  return {
    type: USER_GAMES_REQUEST,
    id,
    verifyGame,
  };
}

export function getUserGamesSuccess(data) {
  return {
    type: USER_GAMES_REQUEST_SUCCESS,
    data,
  };
}

export function getUserGamesError(message) {
  return {
    type: USER_GAMES_REQUEST_ERROR,
    message,
  };
}

export function getGameMakersRequest(userId, gameId, searchTerm, gameTitle, creditId, resolve, reject) {
  return {
    type: GAME_MAKERS_REQUEST,
    payload: {
      userId,
      gameId,
      searchTerm,
      gameTitle,
      creditId,
      resolve,
      reject,
    },
  };
}

export function getGameMakersSuccess(data, counter) {
  return {
    type: GAME_MAKERS_SUCCESS,
    data,
    counter,
  };
}

export function getGameMakersError(message) {
  return {
    type: GAME_MAKERS_ERROR,
    message,
  };
}
export function nextPageGetGameMakersRequest(userId, gameId, searchTerm, gameTitle, creditId, page) {
  return {
    type: NEXT_PAGE_GAME_MAKERS_REQUEST,
    payload: {
      userId,
      gameId,
      searchTerm,
      gameTitle,
      creditId,
      page,
    },
  };
}

export function nextPageGetGameMakersSuccess(data) {
  return {
    type: NEXT_PAGE_GAME_MAKERS_SUCCESS,
    data,
  };
}

export function nextPageGetGameMakersError(message) {
  return {
    type: NEXT_PAGE_GAME_MAKERS_ERROR,
    message,
  };
}

export function withdrawVerificationRequest(userId, creditId, makerId, received) {
  return {
    type: WITHDRAW_VERIFICATION_REQUEST,
    payload: {
      userId,
      creditId,
      makerId,
      received,
    },
  };
}

export function withdrawVerificationSuccess(message) {
  return {
    type: WITHDRAW_VERIFICATION_SUCCESS,
    message,
  };
}

export function withdrawVerificationError(message) {
  return {
    type: WITHDRAW_VERIFICATION_ERROR,
    message,
  };
}

export function getUserReceivedRequests(id) {
  return {
    type: USER_RECEIVED_REQUESTS,
    id,
  };
}

export function getUserReceivedRequestsSuccess(data) {
  return {
    type: USER_RECEIVED_REQUESTS_SUCCESS,
    data,
  };
}

export function getUserReceivedRequestsError(message) {
  return {
    type: USER_RECEIVED_REQUESTS_ERROR,
    message,
  };
}

export function getUserPendingRequests(id) {
  return {
    type: USER_PENDING_REQUESTS,
    id,
  };
}

export function getUserPendingRequestsSuccess(data) {
  return {
    type: USER_PENDING_REQUESTS_SUCCESS,
    data,
  };
}

export function getUserPendingRequestsError(message) {
  return {
    type: USER_PENDING_REQUESTS_ERROR,
    message,
  };
}

export function getUserVerificationsRequest(id) {
  return {
    type: USER_VERIFICATIONS_REQUEST,
    id,
  };
}

export function getUserVerificationsSuccess(data) {
  return {
    type: USER_VERIFICATIONS_SUCCESS,
    data,
  };
}

export function getUserVerificationsError(message) {
  return {
    type: USER_VERIFICATIONS_ERROR,
    message,
  };
}

export function verificationCount(count) {
  return {
    type: VERIFICATION_COUNT,
    count,
  };
}
