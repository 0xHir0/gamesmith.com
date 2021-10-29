/*
 * App reducer
 */

import { fromJS } from 'immutable';
import { checkAuthToken, getUserData } from 'utils';
import { orderBy } from 'lodash';
import {
  DIRECT_SIGNUP_REQUEST,
  DIRECT_SIGNUP_SUCCESS,
  DIRECT_SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  PENDING_REQUEST,
  PENDING_SUCCESS,
  PENDING_ERROR,
  ACCEPT_REQUEST,
  ACCEPT_SUCCESS,
  ACCEPT_ERROR,
  REJECT_REQUEST,
  REJECT_SUCCESS,
  REJECT_ERROR,
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
  APPLICANT_MESSAGE_ERROR,
  APPLICANT_MESSAGE_SUCCESS,
  APPLICANT_MESSAGE_REQUEST,
  STUDIO_MESSAGE_ERROR,
  STUDIO_MESSAGE_REQUEST,
  STUDIO_MESSAGE_SUCCESS,
  INVITE_REQUEST,
  INVITE_SUCCESS,
  INVITE_ERROR,
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_ERROR,
  ADD_EXP_REQUEST,
  ADD_EXP_SUCCESS,
  ADD_EXP_ERROR,
  EDIT_EXP_REQUEST,
  EDIT_EXP_SUCCESS,
  EDIT_EXP_ERROR,
  DELETE_EXP_REQUEST,
  DELETE_EXP_SUCCESS,
  DELETE_EXP_ERROR,
  APPLY_SMS_REQUEST,
  APPLY_SMS_SUCCESS,
  APPLY_SMS_ERROR,
  CONFIRM_CODE_REQUEST,
  CONFIRM_CODE_SUCCESS,
  CONFIRM_CODE_ERROR,
  CREDITS_REQUEST,
  CREDITS_SUCCESS,
  CREDITS_ERROR,
  GET_AUTOCOMPLETE_REQUEST,
  GET_AUTOCOMPLETE_SUCCESS,
  GET_AUTOCOMPLETE_ERROR,
  UPDATE_DETAILS_REQUEST,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_ERROR,
  AVAILABILITY_REQUEST,
  AVAILABILITY_SUCCESS,
  AVAILABILITY_ERROR,
  LOCATION_REQUEST,
  LOCATION_SUCCESS,
  LOCATION_ERROR,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR,
  GET_STATES_REQUEST,
  GET_STATES_SUCCESS,
  GET_STATES_ERROR,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_STATE_CITIES_SUCCESS,
  GET_CITIES_ERROR,
  PENDING_TEAM_REQUEST,
  PENDING_TEAM_SUCCESS,
  PENDING_TEAM_ERROR,
  ACCEPT_TEAM_REQUEST,
  ACCEPT_TEAM_ERROR,
  REJECT_TEAM_REQUEST,
  TEAM_REQUEST_SUCCESS,
  REJECT_TEAM_ERROR,
  INVITE_MEMBER_SUCCESS,
  INVITE_MEMBER_ERROR,
  CLAIM_PROFILE_ERROR,
  MAKER_CV_SUCCESS,
  COMPANY_INFO_SUCCESS,
  SELECTED_CV,
  ADD_APPLOZIC_COUNT_SUCCESS,
  PROFILE_VIEW_COUNT_REQUEST,
  PROFILE_VIEW_COUNT_SUCCESS,
  GAME_MAKER_REQEUST,
  GAME_MAKER_SUCCESS,
  GAME_MAKER_ERROR,
  SEARCH_GAME_MAKERS_REQEUST,
  SEARCH_GAME_MAKERS_SUCCESS,
  SEARCH_GAME_MAKERS_ERROR,
  SEND_INVITE_REQUEST,
  SEND_INVITE_SUCCESS,
  SEND_INVITE_ERROR,
  VERIFY_CREDIT_TOKEN_REQUEST,
  VERIFY_CREDIT_TOKEN_SUCCESS,
  VERIFY_CREDIT_TOKEN_ERROR,
  USER_GAME_AND_MAKERS_REQUEST,
  USER_GAME_AND_MAKERS_SUCCESS,
  USER_GAME_AND_MAKERS_ERROR,
  MORE_MAKER_REQUEST,
  MORE_MAKER_SUCCESS,
  MORE_MAKER_ERROR,
  REMOVE_CREDIT,
  GET_JWT_TOKEN_REQUEST,
  GET_JWT_TOKEN_SUCCESS,
  GET_JWT_TOKEN_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  checkingToken: false,
  isFetching: false,
  isFetchingCountries: false,
  authenticated: checkAuthToken(),
  message: '',
  user: getUserData() || {},
  requests: [],
  teamRequests: [],
  countries: [],
  states: [],
  cities: [],
  hasMakerCV: false,
  isPaidStudio: false,
  selectedCvOption: 'no',
  isClickedCV: false,
  applozicMsgCount: 0,
  profileViewCount: false,
  isFetchingMaker: false,
  isSearchingMaker: false,
  gameMakers: fromJS([]),
  searchMakers: fromJS([]),
  userCredit: {},
  isFetchingGames: false,
  gamesAndMakers: fromJS([]),
  jwtToken: '',
});

const MAKER_PAGE_SIZE_LIMIT = 8;

function appReducer(state = initialState, action) {
  switch (action.type) {
    // login actions
    case DIRECT_SIGNUP_REQUEST:
      return state
        .set('message', '');
    case DIRECT_SIGNUP_SUCCESS:
      return state
        .set('message', action.message);
    case DIRECT_SIGNUP_ERROR:
      return state
        .set('message', action.message);
    case SIGNUP_REQUEST:
      return state
        .set('message', '');
    case SIGNUP_SUCCESS:
      return state
        .set('message', action.message);
    case SIGNUP_ERROR:
      return state
        .set('message', action.message);
    case LOGIN_REQUEST:
      return state
        .set('message', '');
    case LOGIN_SUCCESS:
      return state
        .set('authenticated', true)
        .set('message', action.message);
    case LOGIN_ERROR:
      return state
        .set('message', action.message);
    // logout actions
    case LOGOUT_REQUEST:
      return state
        .set('authenticated', true)
        .set('message', '');
    case LOGOUT_SUCCESS:
      return state
        .set('authenticated', false)
        .set('message', action.message);
    case LOGOUT_ERROR:
      return state
        .set('message', action.message);
    // user data actions
    case USER_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case USER_SUCCESS:
      return state
        .set('isFetching', false)
        .set('authenticated', true)
        .set('user', fromJS(action.data))
        .set('message', '');
    case USER_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    // pending requests actions
    case PENDING_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case PENDING_SUCCESS:
      return state
        .set('isFetching', false)
        .set('requests', fromJS(action.data))
        .set('message', '');
    case PENDING_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case PENDING_TEAM_REQUEST:
      return state
        .set('message', '');
    case PENDING_TEAM_SUCCESS:
      return state
        .set('teamRequests', fromJS(action.data))
        .set('message', '');
    case PENDING_TEAM_ERROR:
      return state
        .set('message', action.message);
    // connection accept actions
    case ACCEPT_REQUEST:
      return state
        .set('message', '');
    case ACCEPT_SUCCESS:
      return state
        .set('message', action.message);
    case ACCEPT_ERROR:
      return state
        .set('message', action.message);
    // connection reject actions
    case REJECT_REQUEST:
      return state
        .set('message', '');
    case REJECT_SUCCESS:
      return state
        .set('message', action.message);
    case REJECT_ERROR:
      return state
        .set('message', action.message);
    // messaging actions
    case MESSAGE_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case MESSAGE_SUCCESS:
      return state
        .set('isFetching', false)
        .set('message', '');
    case MESSAGE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    // Applicant messaging actions
    case APPLICANT_MESSAGE_REQUEST:
      return state
        .set('message', '');
    case APPLICANT_MESSAGE_SUCCESS:
      return state
        .set('message', '');
    case APPLICANT_MESSAGE_ERROR:
      return state
        .set('message', action.message);
    // Studio messaging actions
    case STUDIO_MESSAGE_REQUEST:
      return state
        .set('message', '');
    case STUDIO_MESSAGE_SUCCESS:
      return state
        .set('message', '');
    case STUDIO_MESSAGE_ERROR:
      return state
        .set('message', action.message);
    // maker invite actions
    case INVITE_REQUEST:
      return state
        .set('message', '');
    case INVITE_SUCCESS:
      return state
        .set('message', action.message);
    case INVITE_ERROR:
      return state
        .set('message', action.message);
    // maker connect actions
    case CONNECT_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case CONNECT_SUCCESS:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case CONNECT_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    // add experience actions
    case ADD_EXP_REQUEST:
      return state
        .set('message', '');
    case ADD_EXP_SUCCESS:
      return state
        .set('message', action.message);
    case ADD_EXP_ERROR:
      return state
        .set('message', action.message);
    // edit experience actions
    case EDIT_EXP_REQUEST:
      return state
        .set('message', '');
    case EDIT_EXP_SUCCESS:
      return state
        .set('message', action.message);
    case EDIT_EXP_ERROR:
      return state
        .set('message', action.message);
    // delete experience actions
    case DELETE_EXP_REQUEST:
      return state
        .set('message', '');
    case DELETE_EXP_SUCCESS:
      return state
        .set('message', action.message);
    case DELETE_EXP_ERROR:
      return state
        .set('message', action.message);
    // apply SMS actions
    case APPLY_SMS_REQUEST:
      return state
        .set('message', '');
    case APPLY_SMS_SUCCESS:
      return state
        .set('message', action.message);
    case APPLY_SMS_ERROR:
      return state
        .set('message', action.message);
    // confirm code actions
    case CONFIRM_CODE_REQUEST:
      return state
        .set('message', '');
    case CONFIRM_CODE_SUCCESS:
      return state
        .set('message', action.message);
    case CONFIRM_CODE_ERROR:
      return state
        .set('message', action.message);
    // update credits actions
    case CREDITS_REQUEST:
      return state
        .set('message', '');
    case CREDITS_SUCCESS:
      return state
        .set('message', action.message);
    case CREDITS_ERROR:
      return state
        .set('message', action.message);
    // autocomplete actions
    case GET_AUTOCOMPLETE_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case GET_AUTOCOMPLETE_SUCCESS:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case GET_AUTOCOMPLETE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    // check details actions
    case UPDATE_DETAILS_REQUEST:
      return state
        .set('message', '');
    case UPDATE_DETAILS_SUCCESS:
      return state
        .set('message', action.message);
    case UPDATE_DETAILS_ERROR:
      return state
        .set('message', action.message);
    // availability actions
    case AVAILABILITY_REQUEST:
      return state
        .set('message', '');
    case AVAILABILITY_SUCCESS:
      return state
        .set('message', action.message);
    case AVAILABILITY_ERROR:
      return state
        .set('message', action.message);
    case LOCATION_REQUEST:
      return state
        .set('message', '');
    case LOCATION_SUCCESS:
      return state
        .set('message', action.message);
    case LOCATION_ERROR:
      return state
        .set('message', action.message);
    case GET_COUNTRIES_REQUEST:
      return state
        .set('isFetchingCountries', true)
        .set('message', '');
    case GET_COUNTRIES_SUCCESS:
      const sortedList = orderBy(action.data, [country => country.value.toLowerCase()]);
      return state
        .set('countries', fromJS(sortedList))
        .set('states', fromJS([]))
        .set('cities', fromJS([]))
        .set('isFetchingCountries', false)
        .set('message', action.message);
    case GET_COUNTRIES_ERROR:
      return state
        .set('message', action.message);
    case GET_STATES_REQUEST:
      return state
        .set('message', '');
    case GET_STATES_SUCCESS:
      return state
        .set('states', fromJS(action.data))
        .set('cities', fromJS([]))
        .set('message', action.message);
    case GET_STATES_ERROR:
      return state
        .set('message', action.message);
    case GET_CITIES_REQUEST:
      return state
        .set('message', '');
    case GET_CITIES_SUCCESS:
      return state
        .set('cities', fromJS(action.data))
        .set('message', action.message);
    case GET_STATE_CITIES_SUCCESS:
      return state
        .set('states', fromJS([]))
        .set('cities', fromJS(action.data))
        .set('message', action.message);
    case GET_CITIES_ERROR:
      return state
        .set('message', action.message);
    case ACCEPT_TEAM_REQUEST:
      return state
        .set('message', '');
    case TEAM_REQUEST_SUCCESS:
      var filterRequest = state.get('teamRequests').toJS().filter(request => request.id != action.data);
      return state
        .set('teamRequests', fromJS(filterRequest))
        .set('message', action.message);
    case ACCEPT_TEAM_ERROR:
      return state
        .set('message', action.message);
    case REJECT_TEAM_REQUEST:
      return state
        .set('message', '');
    case REJECT_TEAM_ERROR:
      return state
        .set('message', action.message);
    case INVITE_MEMBER_ERROR:
      return state
        .set('message', action.message);
    case CLAIM_PROFILE_ERROR:
      return state
        .set('message', action.message);
    case MAKER_CV_SUCCESS:
      return state
        .set('hasMakerCV', action.data);
    case COMPANY_INFO_SUCCESS:
      return state
        .set('isPaidStudio', action.data);
    case SELECTED_CV:
      return state
        .set('selectedCvOption', action.data)
        .set('isClickedCV', true);
    case ADD_APPLOZIC_COUNT_SUCCESS:
      return state
        .set('applozicMsgCount', action.count);
    case PROFILE_VIEW_COUNT_REQUEST:
      return state
        .set('profileViewCount', false);
    case PROFILE_VIEW_COUNT_SUCCESS:
      return state
        .set('profileViewCount', action.data);
    case GAME_MAKER_REQEUST:
      return state
        .set('isFetchingMaker', true)
        .set('isSearchingMaker', false)
        .set('gameMakers', fromJS([]));
    case GAME_MAKER_SUCCESS:
      return state
        .set('isFetchingMaker', false)
        .set('gameMakers', fromJS(action.payload.data));
    case GAME_MAKER_ERROR:
      return state
        .set('isFetchingMaker', false)
        .set('message', 'Some thing went wrong');
    case SEARCH_GAME_MAKERS_REQEUST:
      return state
        .set('isFetchingMaker', true)
        .set('isSearchingMaker', true)
        .set('searchMakers', fromJS([]));
    case SEARCH_GAME_MAKERS_SUCCESS:
      return state
        .set('isFetchingMaker', false)
        .set('isSearchingMaker', true)
        .set('searchMakers', fromJS(action.payload.data));
    case SEARCH_GAME_MAKERS_ERROR:
      return state
        .set('isFetchingMaker', false)
        .set('isSearchingMaker', true)
        .set('message', 'Some thing went wrong');
    case SEND_INVITE_REQUEST:
      return state
        .set('isFetchingMaker', true)
        .set('isInviteSuccess', 0);
    case SEND_INVITE_SUCCESS:
      const page = action.payload.page;
      if (page) {
        const { userId, gameId } = action.payload.data;
        const gameAndMaker = state.get('gamesAndMakers').toJS();
        const updaedGameAndMaker = gameAndMaker.map((x) => {
          if (x.id === gameId) {
            x.requestMakers.map((maker) => {
              if (maker.makers.id === userId) {
                maker.isRequested = 10;
              }
            });
          }
          return x;
        });
        return state
          .set('isFetchingMaker', false)
          .set('isInviteSuccess', 1)
          .set('gamesAndMakers', fromJS(updaedGameAndMaker));
      } else {
        return state
          .set('isFetchingMaker', false)
          .set('isInviteSuccess', 1);
      }
    case SEND_INVITE_ERROR:
      return state
        .set('isFetchingMaker', false)
        .set('isInviteSuccess', 2)
        .set('message', 'Some thing went wrong');
    case VERIFY_CREDIT_TOKEN_REQUEST:
      return state
        .set('isFetchingToken', true)
        .set('userCredit', {});
    case VERIFY_CREDIT_TOKEN_SUCCESS:
      return state
        .set('isFetchingToken', false)
        .set('userCredit', action.payload.data);
    case VERIFY_CREDIT_TOKEN_ERROR:
      return state
        .set('isFetchingToken', false)
        .set('message', 'Some thing went wrong');
    case USER_GAME_AND_MAKERS_REQUEST:
      return state
        .set('isFetchingMaker', true)
        .set('gamesAndMakers', fromJS([]));
    case USER_GAME_AND_MAKERS_SUCCESS:
      return state
        .set('isFetchingMaker', false)
        .set('gamesAndMakers', fromJS(action.payload.data));
    case USER_GAME_AND_MAKERS_ERROR:
      return state
        .set('isFetchingMaker', false)
        .set('message', 'Some thing went wrong');
    case MORE_MAKER_REQUEST:
      return state
        .set('isFetchingMaker', true);
    case MORE_MAKER_SUCCESS:
      const data = state.get('gamesAndMakers').toJS().map((x) => {
        if (x.id === action.payload.gameId) {
         // x.requestMakers = x.requestMakers.concat(action.payload.data); // This line will append new maker to existing maker
         x.requestMakers = action.payload.data; // This line will replace maker
         x.isLast = action.payload.data.length < MAKER_PAGE_SIZE_LIMIT;
        }
        return x;
      })
      return state
        .set('isFetchingMaker', false)
        .set('gamesAndMakers', fromJS(data));
    case MORE_MAKER_ERROR:
      return state
        .set('isFetchingMaker', false)
        .set('message', 'Some thing went wrong');
    case REMOVE_CREDIT:
      return state
        .set('userCredit', {});
    case GET_JWT_TOKEN_REQUEST:
      return state
        .set('jwtToken', '');
    case GET_JWT_TOKEN_SUCCESS:
      return state
        .set('jwtToken', action.payload.token);
    case GET_JWT_TOKEN_ERROR:
      return state
        .set('message', action.payload.message);
    default:
      return state;
  }
}

export default appReducer;
