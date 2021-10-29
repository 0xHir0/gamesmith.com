/*
 * App actions
 */

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
  APPLICANT_MESSAGE_REQUEST,
  APPLICANT_MESSAGE_SUCCESS,
  STUDIO_MESSAGE_ERROR,
  STUDIO_MESSAGE_REQUEST,
  STUDIO_MESSAGE_SUCCESS,
  INVITE_REQUEST,
  INVITE_SUCCESS,
  INVITE_ERROR,
  INVITE_MEMBER_REQUEST,
  INVITE_MEMBER_SUCCESS,
  INVITE_MEMBER_ERROR,
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
  UPDATE_EDUCATION_REQUEST,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_ERROR,
  UPDATE_OPPORTUNITIES_REQUEST,
  UPDATE_OPPORTUNITIES_SUCCESS,
  UPDATE_OPPORTUNITIES_ERROR,
  AVAILABILITY_REQUEST,
  AVAILABILITY_SUCCESS,
  AVAILABILITY_ERROR,
  LOCATION_REQUEST,
  LOCATION_SUCCESS,
  LOCATION_ERROR,
  PASSWORD_LINK_REQUEST,
  PASSWORD_LINK_SUCCESS,
  PASSWORD_LINK_ERROR,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  GET_UNIVERSITIES_REQUEST,
  GET_UNIVERSITIES_SUCCESS,
  GET_UNIVERSITIES_ERROR,
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
  INVITE_MAKER_REQUEST,
  INVITE_MAKER_ERROR,
  CLAIM_PROFILE_REQUEST,
  CLAIM_PROFILE_ERROR,
  CHECK_CATEGORIES,
  STUDIO_HUB_REQUEST,
  VALIDATE_TOKEN_REQUEST,
  SET_PASSWORD_REQUEST,
  SEND_JOB_TO_FRIEND_REQUEST,
  SAVE_JOB_FOR_LATER,
  CONFIRM_JOB_REPOST,
  DELETE_CV_REQUEST,
  GET_MAKER_CV_INFO,
  MAKER_CV_SUCCESS,
  GET_COMPANY_INFO,
  COMPANY_INFO_SUCCESS,
  SELECTED_CV,
  ADD_SUBSCRIBER_REQUEST,
  ADD_PASSION_REQUEST,
  ADD_APPLOZIC_COUNT_REQUEST,
  GET_APPLOZIC_COUNT_REQUEST,
  GET_APPLOZIC_COUNT_SUCCESS,
  GET_APPLOZIC_COUNT_ERROR,
  ADD_APPLOZIC_COUNT_SUCCESS,
  PROFILE_VIEW_COUNT_REQUEST,
  PROFILE_VIEW_COUNT_SUCCESS,
  CHECK_PHONE_NUMBER_REQUEST,
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
  IGNORE_VERIFICATION_REQUEST,
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
  GET_ACCOUNT_ID_BY_NAME,
  SAVE_SLUG_REQUEST,
  GET_APPLOZIC_RECRUITER_REQUEST,
  GET_APPLOZIC_RECRUITER_SUCCESS,
} from './constants';


export function directSignupRequest(data) {
  return {
    type: DIRECT_SIGNUP_REQUEST,
    payload: data,
  };
}
export function directSignupSuccess(message) {
  return {
    type: DIRECT_SIGNUP_SUCCESS,
    message,
  };
}
export function directSignupError(error) {
  return {
    type: DIRECT_SIGNUP_ERROR,
    payload: error,
  };
}
//Sign In action creator
export function signupRequest(data) {
  return {
    type: SIGNUP_REQUEST,
    payload: data,
  };
}
export function signupSuccess(message) {
  return {
    type: SIGNUP_SUCCESS,
    message,
  };
}
export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    payload: error,
  };
}
// login action creators
export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    payload: data,
  };
}
export function loginSuccess(message) {
  return {
    type: LOGIN_SUCCESS,
    message,
  };
}
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
}

// reset password action creators
export function passwordLinkRequest(data) {
  return {
    type: PASSWORD_LINK_REQUEST,
    payload: data,
  };
}
export function passwordLinkSuccess(message) {
  return {
    type: PASSWORD_LINK_SUCCESS,
    message,
  };
}
export function passwordLinkError(error) {
  return {
    type: PASSWORD_LINK_ERROR,
    payload: error,
  };
}

// update password action creators
export function updatePasswordRequest(data) {
  return {
    type: UPDATE_PASSWORD_REQUEST,
    payload: data,
  };
}
export function updatePasswordSuccess(message) {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    message,
  };
}
export function updatePasswordError(error) {
  return {
    type: UPDATE_PASSWORD_ERROR,
    payload: error,
  };
}

// logout action creators
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}
export function logoutSuccess(message) {
  return {
    type: LOGOUT_SUCCESS,
    message,
  };
}
export function logoutError(message) {
  return {
    type: LOGOUT_ERROR,
    message,
  };
}

// get user action creators
export function userRequest(profile, returnUrl, nonce) {
  return {
    type: USER_REQUEST,
    payload: {
      profile,
      returnUrl,
      nonce
    },
  };
}
export function userSuccess(data) {
  return {
    type: USER_SUCCESS,
    data,
  };
}
export function userError(message) {
  return {
    type: USER_ERROR,
    message,
  };
}

// get pending connections action creators
export function pendingRequest() {
  return {
    type: PENDING_REQUEST,
  };
}
export function pendingSuccess(data) {
  return {
    type: PENDING_SUCCESS,
    data,
  };
}
export function pendingError(message) {
  return {
    type: PENDING_ERROR,
    message,
  };
}

// reject connection request action creators
export function acceptRequest(id) {
  return {
    type: ACCEPT_REQUEST,
    payload: {
      id,
    },
  };
}
export function acceptSuccess(message) {
  return {
    type: ACCEPT_SUCCESS,
    message,
  };
}
export function acceptError(message) {
  return {
    type: ACCEPT_ERROR,
    message,
  };
}

// reject connection request action creators
export function rejectRequest(id) {
  return {
    type: REJECT_REQUEST,
    payload: {
      id,
    },
  };
}
export function rejectSuccess(message) {
  return {
    type: REJECT_SUCCESS,
    message,
  };
}
export function rejectError(message) {
  return {
    type: REJECT_ERROR,
    message,
  };
}

// message action creators
export function messageRequest(data) {
  return {
    type: MESSAGE_REQUEST,
    payload: data,
  };
}
export function messageSuccess(data) {
  return {
    type: MESSAGE_SUCCESS,
    data,
  };
}
export function messageError(message) {
  return {
    type: MESSAGE_ERROR,
    message,
  };
}

// Studio message action creators
export function studioMessageRequest(data) {
  return {
    type: STUDIO_MESSAGE_REQUEST,
    payload: data,
  };
}
export function studioMessageSuccess(data) {
  return {
    type: STUDIO_MESSAGE_SUCCESS,
    data,
  };
}
export function studioMessageError(message) {
  return {
    type: STUDIO_MESSAGE_ERROR,
    message,
  };
}

// Applicant message action creators
export function applicantMessageRequest(data) {
  return {
    type: APPLICANT_MESSAGE_REQUEST,
    payload: data,
  };
}
export function applicantMessageSuccess(data) {
  return {
    type: APPLICANT_MESSAGE_SUCCESS,
    data,
  };
}
export function applicantMessageError(message) {
  return {
    type: APPLICANT_MESSAGE_ERROR,
    message,
  };
}


// invite action creators
export function inviteRequest(data) {
  return {
    type: INVITE_REQUEST,
    payload: data,
  };
}
export function inviteSuccess(message) {
  return {
    type: INVITE_SUCCESS,
    message,
  };
}
export function inviteError(message) {
  return {
    type: INVITE_ERROR,
    message,
  };
}

// invite_team_member action creators
export function inviteMemberRequest(data) {
  return {
    type: INVITE_MEMBER_REQUEST,
    payload: data,
  };
}
export function inviteMemberSuccess(message) {
  return {
    type: INVITE_MEMBER_SUCCESS,
    message,
  };
}
export function inviteMemberError(message) {
  return {
    type: INVITE_MEMBER_ERROR,
    message,
  };
}

// connect request action creators
export function connectRequest(data) {
  return {
    type: CONNECT_REQUEST,
    payload: data,
  };
}
export function connectSuccess(message) {
  return {
    type: CONNECT_SUCCESS,
    message,
  };
}
export function connectError(message) {
  return {
    type: CONNECT_ERROR,
    message,
  };
}

// add experience action creators
export function addExpRequest(data) {
  return {
    type: ADD_EXP_REQUEST,
    payload: data,
  };
}

export function addExpSuccess(message) {
  return {
    type: ADD_EXP_SUCCESS,
    message,
  };
}

export function addExpError(message) {
  return {
    type: ADD_EXP_ERROR,
    message,
  };
}

// edit experience action creators
export function editExpRequest(data) {
  return {
    type: EDIT_EXP_REQUEST,
    payload: data,
  };
}

export function editExpSuccess(message) {
  return {
    type: EDIT_EXP_SUCCESS,
    message,
  };
}

export function editExpError(message) {
  return {
    type: EDIT_EXP_ERROR,
    message,
  };
}

// DELETE experience action creators
export function deleteExpRequest(data) {
  return {
    type: DELETE_EXP_REQUEST,
    payload: data,
  };
}

export function deleteExpSuccess(message) {
  return {
    type: DELETE_EXP_SUCCESS,
    message,
  };
}

export function deleteExpError(message) {
  return {
    type: DELETE_EXP_ERROR,
    message,
  };
}

// apply sms action creators
export function applySmsRequest(data) {
  return {
    type: APPLY_SMS_REQUEST,
    payload: data,
  };
}

export function applySmsSuccess(message) {
  return {
    type: APPLY_SMS_SUCCESS,
    message,
  };
}

export function applySmsError(message) {
  return {
    type: APPLY_SMS_ERROR,
    message,
  };
}

// confirm sms code action creators
export function confirmCodeRequest(data) {
  return {
    type: CONFIRM_CODE_REQUEST,
    payload: data,
  };
}

export function confirmCodeSuccess(message) {
  return {
    type: CONFIRM_CODE_SUCCESS,
    message,
  };
}

export function confirmCodeError(message) {
  return {
    type: CONFIRM_CODE_ERROR,
    message,
  };
}

// update credits action creators
export function updateCreditsRequest(data) {
  return {
    type: CREDITS_REQUEST,
    payload: data,
  };
}

export function updateCreditsSuccess(message) {
  return {
    type: CREDITS_SUCCESS,
    message,
  };
}

export function updateCreditsError(message) {
  return {
    type: CREDITS_ERROR,
    message,
  };
}

// autocomplete action creators
export function getAutocompleteRequest(data) {
  return {
    type: GET_AUTOCOMPLETE_REQUEST,
    payload: data,
  };
}

export function getAutocompleteSuccess(message) {
  return {
    type: GET_AUTOCOMPLETE_SUCCESS,
    message,
  };
}

export function getAutocompleteError(message) {
  return {
    type: GET_AUTOCOMPLETE_ERROR,
    message,
  };
}

// check details action creators
export function updateDetailsRequest(data) {
  return {
    type: UPDATE_DETAILS_REQUEST,
    payload: data,
  };
}

export function updateDetailsSuccess(message) {
  return {
    type: UPDATE_DETAILS_SUCCESS,
    message,
  };
}

export function updateDetailsError(message) {
  return {
    type: UPDATE_DETAILS_ERROR,
    message,
  };
}
// check education details action creators
export function updateEducationRequest(data) {
  return {
    type: UPDATE_EDUCATION_REQUEST,
    payload: data,
  };
}

export function updateEducationSuccess(message) {
  return {
    type: UPDATE_EDUCATION_SUCCESS,
    message,
  };
}

export function updateEducationError(message) {
  return {
    type: UPDATE_EDUCATION_ERROR,
    message,
  };
}

// check Opportunities details action creators
export function updateOpportunitiesRequest(data) {
  return {
    type: UPDATE_OPPORTUNITIES_REQUEST,
    payload: data,
  };
}

export function updateOpportunitiesSuccess(message) {
  return {
    type: UPDATE_OPPORTUNITIES_SUCCESS,
    message,
  };
}

export function updateOpportunitiesError(message) {
  return {
    type: UPDATE_OPPORTUNITIES_ERROR,
    message,
  };
}

// availability action creators
export function availabilityRequest(data) {
  return {
    type: AVAILABILITY_REQUEST,
    payload: data,
  };
}

export function availabilitySuccess(message) {
  return {
    type: AVAILABILITY_SUCCESS,
    message,
  };
}

export function availabilityError(message) {
  return {
    type: AVAILABILITY_ERROR,
    message,
  };
}

// location action creators
export function locationRequest(data) {
  return {
    type: LOCATION_REQUEST,
    payload: data,
  };
}

export function locationSuccess(message) {
  return {
    type: LOCATION_SUCCESS,
    message,
  };
}

export function locationError(message) {
  return {
    type: LOCATION_ERROR,
    message,
  };
}

// Countries List
export function getCountriesRequest() {
  return {
    type: GET_COUNTRIES_REQUEST,
  };
}

export function getCountriesSuccess(data) {
  return {
    type: GET_COUNTRIES_SUCCESS,
    data,
  };
}

export function getCountriesError(message) {
  return {
    type: GET_COUNTRIES_ERROR,
    message,
  };
}

// States List
export function getStatesRequest(countryKey, hasState) {
  return {
    type: GET_STATES_REQUEST,
    payload: {
      countryKey,
      hasState,
    },
  };
}

export function getStatesSuccess(data) {
  return {
    type: GET_STATES_SUCCESS,
    data,
  };
}

export function getStatesError(message) {
  return {
    type: GET_STATES_ERROR,
    message,
  };
}

// Cities List
export function getCitiesRequest(countryKey, stateKey) {
  return {
    type: GET_CITIES_REQUEST,
    payload: {
      countryKey,
      stateKey,
    },
  };
}

export function getCitiesSuccess(data) {
  return {
    type: GET_CITIES_SUCCESS,
    data,
  };
}

export function getStateCitiesSuccess(data) {
  return {
    type: GET_STATE_CITIES_SUCCESS,
    data,
  };
}

export function getCitiesError(message) {
  return {
    type: GET_CITIES_ERROR,
    message,
  };
}
// get pending team action creators
export function pendingTeamRequest() {
  return {
    type: PENDING_TEAM_REQUEST,
  };
}
export function pendingTeamSuccess(data) {
  return {
    type: PENDING_TEAM_SUCCESS,
    data,
  };
}
export function pendingTeamError(message) {
  return {
    type: PENDING_TEAM_ERROR,
    message,
  };
}

// get pending team action creators
export function acceptTeamRequest(id) {
  return {
    type: ACCEPT_TEAM_REQUEST,
    payload: { id },
  };
}
export function teamRequestSuccess(data) {
  return {
    type: TEAM_REQUEST_SUCCESS,
    data,
  };
}
export function acceptTeamError(message) {
  return {
    type: ACCEPT_TEAM_ERROR,
    message,
  };
}

// get pending team action creators
export function rejectTeamRequest(id) {
  return {
    type: REJECT_TEAM_REQUEST,
    payload: {id},
  };
}
export function rejectTeamError(message) {
  return {
    type: REJECT_TEAM_ERROR,
    message,
  };
}

export function inviteMakerRequest(data) {
  return {
    type: INVITE_MAKER_REQUEST,
    payload: data,
  };
}
export function inviteMakerError(message) {
  return {
    type: INVITE_MAKER_ERROR,
    message,
  };
}
export function claimProfileRequest(data, id, resolve, reject) {
  return {
    type: CLAIM_PROFILE_REQUEST,
    payload: { data, id, resolve, reject },
  };
}
export function claimProfileError(message) {
  return {
    type: CLAIM_PROFILE_ERROR,
    message,
  };
}
export function checkCategories() {
  return {
    type: CHECK_CATEGORIES,
  };
}
export function studioHubRequest(data, resovle, reject) {
  return {
    type: STUDIO_HUB_REQUEST,
    payload: { data, resovle, reject },
  };
}
export function validateTokenRequest(token) {
  return {
    type: VALIDATE_TOKEN_REQUEST,
    payload: { token },
  };
}

export function setPasswordRequest(values, resolve, reject) {
  return {
    type: SET_PASSWORD_REQUEST,
    payload: { values, resolve, reject },
  };
}

export function sendJobToFriendRequest(data) {
  return {
    type: SEND_JOB_TO_FRIEND_REQUEST,
    data,
  };
}

export function saveJobForLater(email, jobTitle, jobUrl) {
  return {
    type: SAVE_JOB_FOR_LATER,
    payload: { email, jobTitle, jobUrl },
  };
}

export function confirmJobRepost(id, token) {
  return {
    type: CONFIRM_JOB_REPOST,
    payload: { id, token },
  };
}

export function deleteCVRequest(makerId) {
  return {
    type: DELETE_CV_REQUEST,
    makerId,
  };
}
export function getMakerCVInfo(makerId) {
  return {
    type: GET_MAKER_CV_INFO,
    makerId,
  };
}
export function makerCVSuccess(data) {
  return {
    type: MAKER_CV_SUCCESS,
    data,
  };
}

export function getCompanyInfo(companyId) {
  return {
    type: GET_COMPANY_INFO,
    payload: {
      companyId,
    },
  };
}
export function companyInfoSuccess(data) {
  return {
    type: COMPANY_INFO_SUCCESS,
    data,
  };
}
export function selectedCV(data) {
  return {
    type: SELECTED_CV,
    data,
  };
}

export function addSubscriber(email) {
  return {
    type: ADD_SUBSCRIBER_REQUEST,
    email,
  };
}

export function addPassionRequest(data) {
  return {
    type: ADD_PASSION_REQUEST,
    data,
  };
}

export function addApplozicCountRequest(resolve, reject) {
  return {
    type: ADD_APPLOZIC_COUNT_REQUEST,
    payload: {
      resolve,
      reject,
    },
  };
}

export function addApplozicCountSuccess(count) {
  return {
    type: ADD_APPLOZIC_COUNT_SUCCESS,
    count,
  };
}

export function getApplozicCountRequest() {
  return {
    type: GET_APPLOZIC_COUNT_REQUEST,
  };
}
export function getApplozicCountSuccess(data) {
  return {
    type: GET_APPLOZIC_COUNT_SUCCESS,
    data,
  };
}
export function getApplozicCountError(message) {
  return {
    type: GET_APPLOZIC_COUNT_ERROR,
    message,
  };
}

export function getApplozicRecruiterRequest() {
  return {
    type: GET_APPLOZIC_RECRUITER_REQUEST,
  };
}
export function getApplozicRecuiterSuccess(data) {
  return {
    type: GET_APPLOZIC_RECRUITER_SUCCESS,
    data,
  };
}

export function getProfileViewCountRequest() {
  return {
    type: PROFILE_VIEW_COUNT_REQUEST,
  };
}

export function getProfileViewCountSuccess(data) {
  return {
    type: PROFILE_VIEW_COUNT_SUCCESS,
    data,
  };
}

export function checkPhoneNumberRequest(jobId, studioId) {
  return {
    type: CHECK_PHONE_NUMBER_REQUEST,
    payload: { jobId, studioId },
  };
}

export function gameMakersRequest(data, offset = 0) {
  return {
    type: GAME_MAKER_REQEUST,
    payload: { data, offset },
  };
}

export function gameMakersSuccess(makers) {
  return {
    type: GAME_MAKER_SUCCESS,
    payload: { data: makers },
  };
}

export function gameMakersError(message) {
  return {
    type: GAME_MAKER_ERROR,
    payload: { message },
  };
}

export function searchGameMakersRequest(data, offset = 0) {
  return {
    type: SEARCH_GAME_MAKERS_REQEUST,
    payload: { data, offset },
  };
}

export function searchGameMakersSuccess(makers) {
  return {
    type: SEARCH_GAME_MAKERS_SUCCESS,
    payload: { data: makers },
  };
}

export function searchGameMakersError(message) {
  return {
    type: SEARCH_GAME_MAKERS_ERROR,
    payload: { message },
  };
}

export function sendInviteRequest(data, page = '') {
  return {
    type: SEND_INVITE_REQUEST,
    payload: { data, page },
  };
}

export function sendInviteSuccess(data = {}, page = '') {
  return {
    type: SEND_INVITE_SUCCESS,
    payload: { success: true, data, page },
  };
}

export function sendInviteError(message) {
  return {
    type: SEND_INVITE_ERROR,
    payload: { message },
  };
}

export function verifyCreditTokenRequest(code) {
  return {
    type: VERIFY_CREDIT_TOKEN_REQUEST,
    payload: { code },
  };
}

export function verifyCreditTokenSuccess(data) {
  return {
    type: VERIFY_CREDIT_TOKEN_SUCCESS,
    payload: { data },
  };
}

export function verifyCreditTokenError(message) {
  return {
    type: VERIFY_CREDIT_TOKEN_ERROR,
    payload: { message },
  };
}

export function ignoreVerificationRequest(code) {
  return {
    type: IGNORE_VERIFICATION_REQUEST,
    payload: { code },
  };
}

export function getUserGamesAndMakersRequest(id) {
  return {
    type: USER_GAME_AND_MAKERS_REQUEST,
    payload: { id },
  };
}

export function getUserGamesAndMakersSuccess(data) {
  return {
    type: USER_GAME_AND_MAKERS_SUCCESS,
    payload: { data },
  };
}

export function getUserGamesAndMakersError(message) {
  return {
    type: USER_GAME_AND_MAKERS_ERROR,
    payload: { message },
  };
}

export function getMoreMakerRequest(data) {
  return {
    type: MORE_MAKER_REQUEST,
    payload: { data },
  };
}

export function getMoreMakerSuccess(data, gameId) {
  return {
    type: MORE_MAKER_SUCCESS,
    payload: { data, gameId },
  };
}

export function getMoreMakerError(message) {
  return {
    type: MORE_MAKER_ERROR,
    payload: { message },
  };
}

export function removeCredit() {
  return {
    type: REMOVE_CREDIT,
  };
}

export function getJwtTokenRequest(id) {
  return {
    type: GET_JWT_TOKEN_REQUEST,
    payload: { id },
  };
}

export function getJwtTokenSuccess(token) {
  return {
    type: GET_JWT_TOKEN_SUCCESS,
    payload: { token },
  };
}

export function getJwtTokenError(message) {
  return {
    type: GET_JWT_TOKEN_ERROR,
    payload: { message },
  };
}

export function getAccountIdByNameRequest(name) {
  return {
    type: GET_ACCOUNT_ID_BY_NAME,
    payload: { name },
  };
}

export function saveSlugRequest(id) {
  return {
    type: SAVE_SLUG_REQUEST,
    payload: { id },
  };
}

