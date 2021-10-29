/*
 * Modal actions
 */
import { merge } from 'lodash';

import {
  CLAIM_FORM,
  CLAIM_PROFILE,
  OPEN_MODAL,
  CLOSE_MODAL,
  MAKER_ACCESS,
  SIGN_IN,
  JOB_NOT_AVAILABLE,
  CUSTOM_SIGN_IN,
  SIGN_UP,
  DIRECT_SIGN_UP,
  EDIT_EMAIL,
  MESSAGE,
  SUBSCRIBED,
  EXCEED_SEARCH_LIMIT,
  OUT_OF_CLICKS,
  EXCEED_RECRUITER_SEARCH_LIMIT,
  INVITE,
  MAKER_INVITE,
  MESSAGING,
  CHECK_INBOX,
  CHECK_DETAILS,
  REGISTERED,
  PLAY_VIDEO,
  REQUESTED,
  ADD_EXP,
  APPLY_SMS,
  CONFIRM_CODE,
  AVAILABILITY,
  DELETE_JOB,
  DELETE_EXP,
  EDIT_EXP,
  FORGET_PASSWORD,
  UPDATE_PASSWORD,
  CONFIRMATION_MESSAGE,
  APPLY,
  MAKE_DISPUTE,
  OPEN_APPLICANT_DETAILS,
  EDIT_JOB,
  SOCIAL_SHARE,
  ADD_JOB,
  JOB_DETAILS,
  OPEN_APPLICANT_MESSAGE,
  OPEN_STUDIO_MESSAGE,
  APPLICANT_MESSAGE_SUCCESS,
  REJECT_APPLICANT,
  DELETE_STUDIO_GAME,
  DELETE_STUDIO_CONTENT,
  EDIT_LINKEDIN_EMAIL,
  PROCEED_ONBOARDING,
  VERIFICATION_GUIDE,
  START_MESSAGE,
  JOB_SEARCH_GUIDE,
  CONNECTION_GUIDE,
  ADD_GAME_GUIDE,
  LOCATION,
  EDUCATION,
  OPPORTUNITIES,
  INVITE_MAKER,
  SHOW_MAKER_INVITE_BUTTON,
  CONFIRM_APPLY_JOB,
  CONFIRM_REJECT_TEAMREQUEST,
  OPEN_PARTNER_MESSAGE,
  ADD_SALARY,
  ADD_STUDIO,
  CONFIRM_ADD_STUDIO,
  ADD_PAYMENT_DETAILS,
  CANCEL_PLAN,
  OPEN_UPGRADE,
  OPEN_APPLICATION_RECEIVED,
  OPEN_SEND_TO_A_FRIEND,
  OPEN_SAVE_FOR_LATER,
  OPEN_SET_PASSWORD,
  OPEN_MY_CV,
  OPEN_DELETE_CV,
  OPEN_JOB_POSTING_MESSAGE,
  OPEN_ADD_PASSION,
  OPEN_UPGRADE_PROPMT,
  OPEN_GET_VERIFIED,
} from './constants';

export function openModal(id, title = '', message = '', receiverID = '', name = '', data, email, image = null) {
  return {
    type: OPEN_MODAL,
    id,
    title,
    message,
    receiverID,
    name,
    data,
    email,
    image,
  };
}
export function openClaimForm(id) {
  return openModal(CLAIM_FORM, '', '', '', '', id);
}
export function openClaim(id) {
  return openModal(CLAIM_PROFILE, '', '', '', '', id);
}
export function openSignIn() {
  return openModal(SIGN_IN);
}
export function openJobNotAvailable() {
  return openModal(JOB_NOT_AVAILABLE);
}
export function openMakerAccess() {
  return openModal(MAKER_ACCESS);
}

export function openCustomSignIn() {
  return openModal(CUSTOM_SIGN_IN);
}

export function openApply() {
  return openModal(APPLY);
}

export function openConfirmationMessage(code) {
  return openModal(CONFIRMATION_MESSAGE, '', '', '', '', code);
}

export function openSignUp() {
  return openModal(SIGN_UP);
}

export function openForgetPassword() {
  return openModal(FORGET_PASSWORD);
}

export function openResetPassword(setPassword) {
  return openModal(UPDATE_PASSWORD, '', '', '', '', { setPassword });
}

export function openDirectSignUp() {
  return openModal(DIRECT_SIGN_UP);
}

export function openEditEmail() {
  return openModal(EDIT_EMAIL);
}

export function openEditLinkedInEmail() {
  return openModal(EDIT_LINKEDIN_EMAIL);
}

export function openMessage(title, message, image) {
  return openModal(MESSAGE, title, message, '', '', '', '', image);
}

export function openSubscribe(title, message, data) {
  return openModal(SUBSCRIBED, title, message, '', '', data, '');
}

export function openExceedLimit(params) {
  return openModal(EXCEED_SEARCH_LIMIT, '', '', '', '', { message: params.message });
}

export function openOutOfClicks(params) {
  return openModal(OUT_OF_CLICKS, '', '', '', '');
}

export function openExceedRecruiterSearchLimit(params) {
  return openModal(EXCEED_RECRUITER_SEARCH_LIMIT, '', '', '', '', { message: params.message });
}

export function openInvite(receiverID) {
  return openModal(INVITE, '', '', receiverID);
}
export function openMemberInvite(userId, gameId, game, company, role) {
  return openModal(MAKER_INVITE, '', '', '', '', { userId, gameId, game, company, role });
}

// TODO:20 find a way around those empty string args
export function openMessaging(receiverID, name) {
  return openModal(MESSAGING, '', '', receiverID, name);
}

export function openCheckInbox(email) {
  return openModal(CHECK_INBOX, '', '', '', '', '', email);
}

export function openRegistered() {
  return openModal(REGISTERED);
}

export function openPlayVideo() {
  return openModal(PLAY_VIDEO);
}

export function openRequested() {
  return openModal(REQUESTED);
}

export function openAddExp(data) {
  return openModal(ADD_EXP, '', '', '', '', data);
}
export function openConfirmApplyJob(jobId, studioId) {
  return openModal(CONFIRM_APPLY_JOB, '', '', '', '', { jobId, studioId });
}
export function openApplySms(jobId, studioId) {
  return openModal(APPLY_SMS, '', '', '', '', { jobId, studioId });
}

export function openDeleteJob(id, domain) {
  return openModal(DELETE_JOB, '', '', '', '', { id, domain });
}

export function openEditJob(data, domain) {
  return openModal(EDIT_JOB, '', '', '', '', merge(data, { domain }));
}

export function openShare(data) {
  return openModal(SOCIAL_SHARE, '', '', '','', data);
}
export function openJobDetails(data) {
  return openModal(JOB_DETAILS, '', '', '', '', data);
}

export function openAddJob(studioId, countryOptions) {
  return openModal(ADD_JOB, '', '', '', '', { studioId, countryOptions });
}

export function openEditExp(gameData, page = 'edit') {
  return openModal(EDIT_EXP, '', '', '', '', { gameData, page });
}

export function openDeleteExp(data) {
  return openModal(DELETE_EXP, '', '', '', '', data);
}

export function openConfirmCode(jobId, studioId) {
  return openModal(CONFIRM_CODE, '', '', '', '', { jobId, studioId });
}

export function openCheckDetails(user) {
  return openModal(CHECK_DETAILS, '', '', '', '', user);
}

export function openAvailability() {
  return openModal(AVAILABILITY);
}

export function openLocation() {
  return openModal(LOCATION);
}

export function openEducation() {
  return openModal(EDUCATION);
}

export function openOpportunities() {
  return openModal(OPPORTUNITIES);
}

export function openOnBoarding() {
  return openModal(PROCEED_ONBOARDING);
}

export function openVerificationGuide() {
  return openModal(VERIFICATION_GUIDE);
}

export function openStartMessage() {
  return openModal(START_MESSAGE);
}

export function openJobSearchGuide() {
  return openModal(JOB_SEARCH_GUIDE);
}

export function openConnectionGuide() {
  return openModal(CONNECTION_GUIDE);
}

export function openConfirmRejectTeamRequest(id) {
  return openModal(CONFIRM_REJECT_TEAMREQUEST, '', '', '', '', id);
}

export function openAddGameGuide() {
  return openModal(ADD_GAME_GUIDE);
}

export function openDispute(creditId, makerId, title, studio, makerName) {
  return openModal(MAKE_DISPUTE, '', '', '', '', { creditId, makerId, title, studio, makerName });
}

export function openApplicantDetails(maker) {
  return openModal(OPEN_APPLICANT_DETAILS, '', '', '', '', maker);
}
export function openApplicantMessage(maker, jobId) {
  return openModal(OPEN_APPLICANT_MESSAGE, '', '', '', '', { maker, jobId });
}

export function openStudioMessage(id) {
  return openModal(OPEN_STUDIO_MESSAGE, '', '', '', '', id);
}

export function openApplicantMessageSuccess() {
  return openModal(APPLICANT_MESSAGE_SUCCESS);
}
export function openRejectApplicant(applicantId, jobId) {
  return openModal(REJECT_APPLICANT, '', '', '', '', { applicantId, jobId });
}

export function openDeleteStudioGame(id, studioId, games, index) {
  return openModal(DELETE_STUDIO_GAME, '', '', '', '', { id, studioId, games, index });
}

export function openDeleteStudioContent(id, studioId, studioContent, index) {
  return openModal(DELETE_STUDIO_CONTENT, '', '', '', '', { id, studioId, studioContent, index });
}

export function openMakerInvite(name) {
  return openModal(INVITE_MAKER, '', '', '', '', { name });
}
export function openInviteMakerButton(name, isRecruiter) {
  return openModal(SHOW_MAKER_INVITE_BUTTON, '', '', '', '', { name, isRecruiter });
}

export function openParnterMessage(title, message) {
  return openModal(OPEN_PARTNER_MESSAGE, title, message);
}

export function openAddSalary(data, resolve, reject) {
  return openModal(ADD_SALARY, '', '', '', '', data);
}

export function openAddStudio(data) {
  return openModal(ADD_STUDIO, '', '', '', '', data);
}

export function openConfirmAddStudio() {
  return openModal(CONFIRM_ADD_STUDIO);
}

export function openPayment(data) {
  return openModal(ADD_PAYMENT_DETAILS, '', '', '', '', data);
}

export function openCancelPlan(id, plan) {
  return openModal(CANCEL_PLAN, '', '', '', '', {id, plan});
}

export function openUpgrade(plan, price, studioId, studioName, license) {
  const licenseArr = ['basic', 'branded', 'primary', 'team', 'global'];
  const upgradeText = licenseArr.indexOf(license) > licenseArr.indexOf(plan.toLowerCase()) ? 'DOWNGRADE' : 'UPGRADE'
  return openModal(OPEN_UPGRADE, '', '', '', '', { plan, price, studioId, studioName, upgradeText });
}

export function openApplicationReceived() {
  return openModal(OPEN_APPLICATION_RECEIVED, '', '', '', '', '');
}

export function openSetPassword() {
  return openModal(OPEN_SET_PASSWORD, '', '', '', '', '');
}

export function openSendToAFriend(jobTitle, jobUrl) {
  return openModal(OPEN_SEND_TO_A_FRIEND, '', '', '', '', { jobTitle, jobUrl });
}
export function openSaveForLater(data) {
  return openModal(OPEN_SAVE_FOR_LATER, '', '', '', '', data);
}

export function openMyCv(data) {
  return openModal(OPEN_MY_CV, '', '', '', '', data);
}
export function openDeleteCv(data) {
  return openModal(OPEN_DELETE_CV, '', '', '', '', data);
}
export function openJobPostingMessage() {
  return openModal(OPEN_JOB_POSTING_MESSAGE, '', '', '', '', '');
}
export function openAddPassion() {
  return openModal(OPEN_ADD_PASSION, '', '', '', '');
}
export function openUpgradePrompt(toggleTabsFunc, plan) {
  return openModal(OPEN_UPGRADE_PROPMT, '', '', '', '', { toggleTabsFunc, plan });
}
export function openGetVerified(data) {
  return openModal(OPEN_GET_VERIFIED, '', '', '', '', data);
}
export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}
