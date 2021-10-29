/*
 * Game actions
 */

import {
  GAME_REQUEST,
  GAME_SUCCESS,
  GAME_ERROR,
  GAME_MAKERS_REQUEST,
  GAME_MAKERS_SUCCESS,
  GAME_MAKERS_ERROR,
  GAME_INFORMATION_REQUEST,
  GAME_INFORMATION_SUCCESS,
  GAME_INFORMATION_ERROR,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  CONNECT_SUCCESS,
  MAKER_EXPERIENCE_REQUEST,
  MAKER_EXPERIENCE_SUCCESS,
  MAKER_EXPERIENCE_ERROR,
  SEARCH_GAME_MAKER_REQUEST,
  SEARCH_GAME_MAKER_SUCCESS,
  SEARCH_GAME_MAKER_ERROR,
  TOGGLE_SEARCH,
  CLEAR_GAMES,
} from "./constants";

export function gameRequest(id) {
  return {
    type: GAME_REQUEST,
    payload: {
      id,
    },
  };
}

export function gameSuccess(data) {
  return {
    type: GAME_SUCCESS,
    data,
  };
}

export function gameError(message) {
  return {
    type: GAME_ERROR,
    message,
  };
}

export function gameInformationRequest(id) {
  return {
    type: GAME_INFORMATION_REQUEST,
    payload: {
      id,
    },
  };
}

export function gameInformationSuccess(data) {
  return {
    type: GAME_INFORMATION_SUCCESS,
    data,
  };
}

export function gameInformationError(message) {
  return {
    type: GAME_INFORMATION_ERROR,
    message,
  };
}

export function gameMakersRequest(id, offset = 0) {
  return {
    type: GAME_MAKERS_REQUEST,
    payload: {
      id,
      offset,
    },
  };
}

export function gameMakersSuccess(data) {
  return {
    type: GAME_MAKERS_SUCCESS,
    data,
  };
}

export function gameMakersError(message) {
  return {
    type: GAME_MAKERS_ERROR,
    message,
  };
}

export function nextPageRequest(url, offset) {
  return {
    type: NEXT_PAGE_REQUEST,
    payload: {
      url,
      offset,
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

// connect request action creators
export function connectGameSuccess(id) {
  return {
    type: CONNECT_SUCCESS,
    id,
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

export function gameMakerSearch(query, gameId) {
  return {
    type: SEARCH_GAME_MAKER_REQUEST,
    payload: {
      query,
      gameId,
    },
  };
}

export function gameMakerSearchSuccess(data) {
  return {
    type: SEARCH_GAME_MAKER_SUCCESS,
    data,
  };
}

export function gameMakerSearchError(message) {
  return {
    type: SEARCH_GAME_MAKER_ERROR,
    message,
  };
}

export function toggleSearch() {
  return {
    type: TOGGLE_SEARCH,
  };
}

export function clearGames() {
  return {
    type: CLEAR_GAMES,
  };
}
