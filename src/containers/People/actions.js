/*
 * People actions
 */

import {
  PEOPLE_REQUEST,
  PEOPLE_SUCCESS,
  PEOPLE_ERROR,
  TOGGLE_SEARCH,
  SEARCH_PEOPLE_REQUEST,
  SEARCH_PEOPLE_SUCCESS,
  SEARCH_PEOPLE_ERROR,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  CLEAR_SEARCH_PEOPLE,
  SHOW_FILTERS,
  HIDE_FILTERS,
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_ERROR,
  NEXT_PAGE_ADDITION,
  SEARCH_PEOPLE_COUNT,
  // MAKER_LOCATION_REQUEST,
  // MAKER_LOCATION_SUCCESS,
  // MAKER_LOCATION_ERROR,
  // LANGUAGES_REQUEST,
  // LANGUAGES_SUCCESS,
  // LANGUAGES_ERROR,
} from './constants';

// get people action creators
export function peopleRequest() {
  return {
    type: PEOPLE_REQUEST,
  };
}

export function peopleSuccess(data) {
  return {
    type: PEOPLE_SUCCESS,
    data,
  };
}

export function peopleError(message) {
  return {
    type: PEOPLE_ERROR,
    message,
  };
}

export function toggleSearch() {
  return {
    type: TOGGLE_SEARCH,
  };
}

export function searchPeopleRequest(query, isRecruiter) {
  return {
    type: SEARCH_PEOPLE_REQUEST,
    payload: {
      query,
      isRecruiter,
    },
  };
}

export function searchPeopleSuccess(data) {
  return {
    type: SEARCH_PEOPLE_SUCCESS,
    data,
  };
}

export function searchPeopleError(message) {
  return {
    type: SEARCH_PEOPLE_ERROR,
    message,
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
export function nextPageAddition() {
  return {
    type: NEXT_PAGE_ADDITION,
  };
}
export function clearSearchPeople() {
  return {
    type: CLEAR_SEARCH_PEOPLE,
  };
}

// export function makerLocationRequest() {
//   return {
//     type: MAKER_LOCATION_REQUEST,
//   };
// }
//
// export function makerLocationSuccess(data) {
//   return {
//     type: MAKER_LOCATION_SUCCESS,
//     data,
//   };
// }
//
// export function makerLocationError(message) {
//   return {
//     type: MAKER_LOCATION_ERROR,
//     message,
//   };
// }

// export function laguagesRequest() {
//   return {
//     type: LANGUAGES_REQUEST,
//   };
// }
//
// export function laguagesSuccess(data) {
//   return {
//     type: LANGUAGES_SUCCESS,
//     data,
//   };
// }
//
// export function laguagesError(message) {
//   return {
//     type: LANGUAGES_ERROR,
//     message,
//   };
// }

export function showFilterNav() {
  return {
    type: SHOW_FILTERS,
  };
}

export function hideFilterNav() {
  return {
    type: HIDE_FILTERS,
  };
}
// connect request action creators
export function connectRequest(data) {
  return {
    type: CONNECT_REQUEST,
    payload: data,
  };
}
export function connectSuccess(id) {
  return {
    type: CONNECT_SUCCESS,
    id,
  };
}
export function connectError(message) {
  return {
    type: CONNECT_ERROR,
    message,
  };
}

export function totalCount(count) {
  return {
    type: SEARCH_PEOPLE_COUNT,
    count,
  };
}