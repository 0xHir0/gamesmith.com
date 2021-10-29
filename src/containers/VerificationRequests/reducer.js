/*
 * Verification Requests reducer
 */

import { fromJS } from 'immutable';

import {
  USER_GAMES_REQUEST,
  USER_GAMES_REQUEST_SUCCESS,
  USER_GAMES_REQUEST_ERROR,
  GAME_MAKERS_REQUEST,
  GAME_MAKERS_SUCCESS,
  GAME_MAKERS_ERROR,
  NEXT_PAGE_GAME_MAKERS_REQUEST,
  NEXT_PAGE_GAME_MAKERS_SUCCESS,
  NEXT_PAGE_GAME_MAKERS_ERROR,
  USER_RECEIVED_REQUESTS,
  USER_RECEIVED_REQUESTS_SUCCESS,
  USER_RECEIVED_REQUESTS_ERROR,
  USER_PENDING_REQUESTS,
  USER_PENDING_REQUESTS_SUCCESS,
  USER_PENDING_REQUESTS_ERROR,
  USER_VERIFICATIONS_REQUEST,
  USER_VERIFICATIONS_SUCCESS,
  USER_VERIFICATIONS_ERROR,
  VERIFICATION_COUNT,
} from './constants';

// The initial state of the Verification Requests
const initialState = fromJS({
  userGames: [],
  isUserGamesFetching: false,
  gameMakers: [],
  isGameMakersFetching: false,
  receivedRequest: [],
  isReceivedRequestsFetching: false,
  pendingRequest: [],
  isPendingRequestsFetching: false,
  userVerifications: [],
  isUserVerificationsFetching: false,
  verificationCount: 0,
  counter: 0,
  isNextGamaMakersFetching: true,
  nextOffset: true,
});

function verificationRequestReducer(state = initialState, action) {
  switch (action.type) {
    case USER_GAMES_REQUEST:
      return state
        .set('userGames', [])
        .set('isUserGamesFetching', false);
    case USER_GAMES_REQUEST_SUCCESS:
      return state
        .set('userGames', action.data)
        .set('isUserGamesFetching', true);
    case USER_GAMES_REQUEST_ERROR:
      return state
        .set('userGames', [])
        .set('isUserGamesFetching', false);
    case GAME_MAKERS_REQUEST:
      return state
        .set('gameMakers', [])
        .set('isGameMakersFetching', false)
        .set('nextOffset', true);
    case GAME_MAKERS_SUCCESS:
      return state
        .set('gameMakers', action.data)
        .set('counter', action.counter)
        .set('isGameMakersFetching', true);
    case GAME_MAKERS_ERROR:
      return state
        .set('gameMakers', [])
        .set('isGameMakersFetching', false);
    case NEXT_PAGE_GAME_MAKERS_REQUEST:
      return state
        .set('isNextGamaMakersFetching', false)
    case NEXT_PAGE_GAME_MAKERS_SUCCESS: {
      if (action.data.length > 0) {
        return state
          .set('gameMakers', state.get('gameMakers').concat(action.data))
          .set('isNextGamaMakersFetching', true)
          .set('nextOffset', true);
      } else {
        return state
          .set('isNextGamaMakersFetching', true)
          .set('nextOffset', false);
      }
    }
    case NEXT_PAGE_GAME_MAKERS_ERROR:
      return state
        .set('isNextGamaMakersFetching', false)
    case USER_RECEIVED_REQUESTS:
      return state
        .set('receivedRequest', [])
        .set('isReceivedRequestsFetching', false);
    case USER_RECEIVED_REQUESTS_SUCCESS:
      return state
        .set('receivedRequest', action.data)
        .set('isReceivedRequestsFetching', true);
    case USER_RECEIVED_REQUESTS_ERROR:
      return state
        .set('receivedRequest', [])
        .set('isReceivedRequestsFetching', false);
    case USER_PENDING_REQUESTS:
      return state
        .set('pendingRequest', [])
        .set('isPendingRequestsFetching', false);
    case USER_PENDING_REQUESTS_SUCCESS:
      return state
        .set('pendingRequest', action.data)
        .set('isPendingRequestsFetching', true);
    case USER_PENDING_REQUESTS_ERROR:
      return state
        .set('pendingRequest', [])
        .set('isPendingRequestsFetching', false);
    case USER_VERIFICATIONS_REQUEST:
      return state
        .set('userVerifications', [])
        .set('isUserVerificationsFetching', false);
    case USER_VERIFICATIONS_SUCCESS:
      return state
        .set('userVerifications', action.data)
        .set('isUserVerificationsFetching', true);
    case USER_VERIFICATIONS_ERROR:
      return state
        .set('userVerifications', [])
        .set('isUserVerificationsFetching', false);
    case VERIFICATION_COUNT:
      return state
        .set('verificationCount', action.count);
    default:
      return state;
  }
}

export default verificationRequestReducer;
