/*
 * Games actions
 */

import {
  GAMES_REQUEST,
  GAMES_SUCCESS,
  GAMES_ERROR,
  SEARCH_GAMES_REQUEST,
  SEARCH_GAMES_SUCCESS,
  SEARCH_GAMES_ERROR,
  TOGGLE_SEARCH,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  START_SPINNER,
  MAKER_GAMES_REQUEST,
  MAKER_GAMES_SUCCESS,
  MAKER_GAMES_ERROR,
  MAKER_GAMES_ADD,
  MAKER_GAMES_DELETE,
  MAKER_EXPERIENCE_REQUEST,
  MAKER_EXPERIENCE_ERROR,
  PARTNER_REQUEST,
  CHECK_PARTNER,
  UPDATE_PARTNERS,
  TOGGLE_PARTNER,
} from './constants';

export function gamesRequest() {
  return {
    type: GAMES_REQUEST,
  };
}

export function gamesSuccess(data) {
  return {
    type: GAMES_SUCCESS,
    data,
  };
}

export function gamesError(message) {
  return {
    type: GAMES_ERROR,
    message,
  };
}

export function gamesSearch(query) {
  return {
    type: SEARCH_GAMES_REQUEST,
    payload: {
      query,
    },
  };
}
export function gameSearchSuccess(data) {
  return {
    type: SEARCH_GAMES_SUCCESS,
    data,
  };
}

export function gameSearchError(message) {
  return {
    type: SEARCH_GAMES_ERROR,
    message,
  };
}

export function toggleSearch() {
  return {
    type: TOGGLE_SEARCH,
  };
}

export function nextPageRequest(url, offset, query) {
  return {
    type: NEXT_PAGE_REQUEST,
    payload: {
      url,
      offset,
      query,
    },
  };
}

export function nextPageSuccess(data) {
  return {
    type: NEXT_PAGE_SUCCESS,
    data,
  };
}

export function nextPageError(message) {
  return {
    type: NEXT_PAGE_ERROR,
    message,
  };
}

export function startSpinner() {
  return {
    type: START_SPINNER,
  };
}

export function makerGamesRequest(id) {
  return {
    type: MAKER_GAMES_REQUEST,
    payload: {
      id,
    },
  };
}

export function makerGamesSuccess(data) {
  return {
    type: MAKER_GAMES_SUCCESS,
    data,
  };
}

export function makerGamesError(message) {
  return {
    type: MAKER_GAMES_ERROR,
    message,
  };
}

export function makerGamesAdd(data) {
  return {
    type: MAKER_GAMES_ADD,
    data,
  };
}

export function makerGamesDelete(gameId, makerId) {
  return {
    type: MAKER_GAMES_DELETE,
    gameId,
    makerId,
  };
}

export function makerExpRequest(id, gameID) {
  return {
    type: MAKER_EXPERIENCE_REQUEST,
    payload: {
      id,
      gameID,
    },
  };
}

export function makerExpError(message) {
  return {
    type: MAKER_EXPERIENCE_ERROR,
    message,
  };
}
