/*
 * Modal container
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { replace } from "react-router-redux";
import { createStructuredSelector } from "reselect";
import { isEmpty } from "lodash";
import selectModal from "./selectors";
import { selectMaker } from "containers/Maker/selectors";

import {
  openSignIn,
  openSignUp,
  openDirectSignUp,
  openEditEmail,
  closeModal,
} from "./actions";
import { makerRequest } from "containers/Maker/actions";

import {
  CLAIM_FORM,
  CLAIM_PROFILE,
  SIGN_IN,
  JOB_NOT_AVAILABLE,
  MAKER_ACCESS,
  CUSTOM_SIGN_IN,
  SIGN_UP,
  DIRECT_SIGN_UP,
  EDIT_EMAIL,
  MESSAGE,
  SUBSCRIBED,
  CANCEL_PLAN,
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
  // APPLY,
  MAKE_DISPUTE,
  OPEN_APPLICANT_DETAILS,
  ADD_JOB,
  EDIT_JOB,
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
  OPEN_UPGRADE,
  OPEN_APPLICATION_RECEIVED,
  OPEN_SET_PASSWORD,
  OPEN_SEND_TO_A_FRIEND,
  OPEN_SAVE_FOR_LATER,
  OPEN_MY_CV,
  OPEN_DELETE_CV,
  OPEN_JOB_POSTING_MESSAGE,
  OPEN_ADD_PASSION,
  OPEN_UPGRADE_PROPMT,
  OPEN_GET_VERIFIED,
  SOCIAL_SHARE,
} from "./constants";

import SignIn from "./content/SignIn";
import JobNotAvailable from "./content/JobNotAvailable";
import MakerAccess from "./content/MakerAccess";
import CustomSignIn from "./content/CustomSignIn";
import ConfirmationMessage from "./content/ConfirmationMessage";
import SignUp from "./content/SignUp";
import DirectSignUp from "./content/DirectSignUp";
import EditEmail from "./content/EditEmail";
import EditLinkedInEmail from "./content/EditLinkedInEmail";
import Message from "./content/Message";
import Subscribed from "./content/Subscribed";
import CancelPlan from "./content/CancelPlan";
import ExceedSearchLimit from "./content/ExceedSearchLimit";
import OutOfClicks from "./content/OutOfClicks";
import ExceedRecruiterSearchLimit from "./content/ExceedRecruiterSearchLimit";
import Invite from "./content/Invite";
import InviteMember from "./content/InviteMember";
import Messaging from "./content/Messaging";
import CheckInbox from "./content/CheckInbox";
import CheckDetails from "./content/CheckDetails";
import Registered from "./content/Registered";
import PlayVideo from "./content/PlayVideo";
import Requested from "./content/Requested";
import AddExp from "./content/AddExp";
import MakeDispute from "./content/DisputeCredit";
import ApplySms from "./content/ApplySms";
import ConfirmCode from "./content/ConfirmCode";
import Availability from "./content/Availability";
import DeleteJob from "./content/DeleteJob";
import DeleteStudioGame from "./content/DeleteStudioGame";
import DeleteStudioContent from "./content/DeleteStudioContent";
import EditJob from "./content/EditJob";
import AddJob from "./content/AddJob";
import JobDetails from "./content/JobDetails";
import EditExp from "./content/EditExp";
import DeleteExp from "./content/DeleteExp";
import ForgetPassword from "./content/ForgetPassword";
import UpdatePassword from "./content/UpdatePassword";
import ApplicantMessage from "./content/ApplicantMessage";
import StudioMessage from "./content/StudioMessage";
import ApplicantDetails from "./content/ApplicantDetails";
import ApplicantMessageSuccess from "./content/ApplicantMessageSuccess";
import RejectApplicant from "./content/RejectApplicant";
import ProceedOnBoarding from "./content/ProceedOnBoarding";
import AddGameGuide from "./content/AddGameGuide";
import ConnectionsGuide from "./content/ConnectionsGuide";
import JobSearchGuide from "./content/JobSearchGuide";
import StartMessage from "./content/StartMessage";
import VerificationGuide from "./content/VerificationGuide";
import Location from "./content/Location";
import Education from "./content/Education";
import Opportunities from "./content/Opportunities";
import InviteMaker from "./content/InviteMaker";
import ShowMakerInviteButton from "./content/ShowMakerInviteButton";
import ConfirmApplyJob from "./content/ConfirmApplyJob";
import ConfirmRejectTeamRequest from "./content/ConfirmRejectTeamRequest";
import ClaimProfile from "./content/ClaimProfile";
import Claim from "./content/Claim";
import PartnerMessage from "./content/PartnerMessage";
import AddSalary from "./content/AddSalary";
import AddStudio from "./content/AddStudio";
import ConfirmAddStudio from "./content/ConfirmAddStudio";
import AddPaymentDetails from "./content/AddPaymentDetails";
import UpgradeStudio from "./content/UpgradeStudio";
import ApplicationReceived from "./content/ApplicationReceived";
import SetPassword from "./content/SetPassword";
import SendToFriend from "./content/SendToFriend";
import SaveForLater from "./content/SaveForLater";
import ShowCv from "./content/ShowCv";
import DeleteCv from "./content/DeleteCv";
import JobPostingLimitMessage from "./content/JobPostingLimitMessage";
import AddPassion from "./content/AddPassion";
import UpgradePrompt from "./content/UpgradePrompt";
import GetVerified from "./content/GetVerified";
import SocialShare from "./content/SocialShare";

import s from "./styles.module.scss";

const Modals = ({
  modal: { id, name, title, message, receiverID, isOpen, data, email, image },
  onCloseModal,
  onCloseUpgradeModal,
  onOpenSignin,
  onOpenSignup,
  onOpenDirectSignup,
  onOpenEditEmail,
  params,
}) => {
  let modal;
  switch (id) {
    default:
    case SIGN_IN:
      modal = (
        <SignIn
          className={s.signin}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case JOB_NOT_AVAILABLE:
      modal = (
        <JobNotAvailable
          className={s.signin}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case MAKER_ACCESS:
      modal = (
        <MakerAccess
          className={s.signin}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case CUSTOM_SIGN_IN:
      modal = (
        <CustomSignIn
          className={s.signin}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case CONFIRMATION_MESSAGE:
      modal = (
        <ConfirmationMessage
          code={data}
          className={s.signin}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case SIGN_UP:
      modal = (
        <SignUp
          className={s.signup}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case FORGET_PASSWORD:
      modal = (
        <ForgetPassword
          className={s.signup}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case UPDATE_PASSWORD:
      modal = (
        <UpdatePassword
          className={s.signup}
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case DIRECT_SIGN_UP:
      modal = (
        <DirectSignUp
          className={s.directsignup}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case EDIT_EMAIL:
      modal = (
        <EditEmail
          className={s.editemail}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case EDIT_LINKEDIN_EMAIL:
      modal = (
        <EditLinkedInEmail
          className={s.editemail}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case MESSAGE:
      modal = (
        <Message
          title={title}
          message={message}
          image={image}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case SUBSCRIBED:
      modal = (
        <Subscribed
          title={title}
          message={message}
          data={data}
          image={image}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case CANCEL_PLAN:
      modal = (
        <CancelPlan data={data} isOpen={isOpen} onCloseModal={onCloseModal} />
      );
      break;
    case EXCEED_SEARCH_LIMIT:
      modal = (
        <ExceedSearchLimit
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          data={data}
        />
      );
      break;
    case OUT_OF_CLICKS:
      modal = <OutOfClicks isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case EXCEED_RECRUITER_SEARCH_LIMIT:
      modal = (
        <ExceedRecruiterSearchLimit
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          data={data}
        />
      );
      break;
    case INVITE:
      modal = (
        <Invite
          receiverID={receiverID}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case MAKER_INVITE:
      modal = (
        <InviteMember
          title="Add Team Member"
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case MESSAGING:
      modal = (
        <Messaging
          receiverID={receiverID}
          name={name}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case CHECK_INBOX:
      modal = (
        <CheckInbox isOpen={isOpen} onCloseModal={onCloseModal} email={email} />
      );
      break;
    case CHECK_DETAILS:
      modal = (
        <CheckDetails isOpen={isOpen} onCloseModal={onCloseModal} data={data} />
      );
      break;
    case REGISTERED:
      modal = (
        <Registered
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          onOpenSignin={onOpenSignin}
        />
      );
      break;
    case PLAY_VIDEO:
      modal = <PlayVideo isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case REQUESTED:
      modal = <Requested isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case ADD_EXP:
      modal = (
        <AddExp isOpen={isOpen} data={data} onCloseModal={onCloseModal} />
      );
      break;
    case APPLY_SMS:
      modal = (
        <ApplySms data={data} isOpen={isOpen} onCloseModal={onCloseModal} />
      );
      break;
    case CONFIRM_CODE:
      modal = (
        <ConfirmCode
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          params={params}
        />
      );
      break;
    case CONFIRM_REJECT_TEAMREQUEST:
      modal = (
        <ConfirmRejectTeamRequest
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          params={params}
        />
      );
      break;
    case AVAILABILITY:
      modal = <Availability isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case DELETE_JOB:
      modal = (
        <DeleteJob
          data={data}
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          params={params}
        />
      );
      break;
    case DELETE_STUDIO_GAME:
      modal = (
        <DeleteStudioGame
          data={data}
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          params={params}
        />
      );
      break;
    case DELETE_STUDIO_CONTENT:
      modal = (
        <DeleteStudioContent
          data={data}
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          params={params}
        />
      );
      break;
    case ADD_JOB:
      modal = (
        <AddJob
          data={data}
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case EDIT_JOB:
      modal = (
        <EditJob
          data={data}
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          params={params}
        />
      );
      break;
    case JOB_DETAILS:
      modal = (
        <JobDetails
          data={data}
          className={s.setBackgroundColor}
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          params={params}
        />
      );
      break;
    case DELETE_EXP:
      modal = (
        <DeleteExp
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          params={params}
        />
      );
      break;
    case EDIT_EXP:
      modal = (
        <EditExp
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          params={params}
        />
      );
      break;
    case MAKE_DISPUTE:
      modal = (
        <MakeDispute data={data} isOpen={isOpen} onCloseModal={onCloseModal} />
      );
      break;
    case OPEN_APPLICANT_DETAILS:
      modal = (
        <ApplicantDetails
          crossClassname={s.setCrossBorder}
          className={`${s.applicantModal} `}
          maker={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case OPEN_APPLICANT_MESSAGE:
      modal = (
        <ApplicantMessage
          crossClassname={s.setCrossBorder}
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case OPEN_STUDIO_MESSAGE:
      modal = (
        <StudioMessage
          crossClassname={s.setCrossBorder}
          studioId={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case APPLICANT_MESSAGE_SUCCESS:
      modal = (
        <ApplicantMessageSuccess
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case REJECT_APPLICANT:
      modal = (
        <RejectApplicant
          data={data}
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case PROCEED_ONBOARDING:
      modal = (
        <ProceedOnBoarding
          data={data}
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case VERIFICATION_GUIDE:
      modal = (
        <VerificationGuide
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case START_MESSAGE:
      modal = (
        <StartMessage
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case JOB_SEARCH_GUIDE:
      modal = (
        <JobSearchGuide
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case CONNECTION_GUIDE:
      modal = (
        <ConnectionsGuide
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case ADD_GAME_GUIDE:
      modal = (
        <AddGameGuide
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case LOCATION:
      modal = (
        <Location
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case EDUCATION:
      modal = (
        <Education
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case OPPORTUNITIES:
      modal = (
        <Opportunities
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case INVITE_MAKER:
      modal = (
        <InviteMaker
          data={data}
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case SHOW_MAKER_INVITE_BUTTON:
      modal = (
        <ShowMakerInviteButton
          data={data}
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case CONFIRM_APPLY_JOB:
      modal = (
        <ConfirmApplyJob
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          data={data}
        />
      );
      break;
    case CLAIM_PROFILE:
      modal = (
        <ClaimProfile
          crossClassname={s.setCrossBorder}
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case CLAIM_FORM:
      modal = (
        <Claim
          crossClassname={s.setCrossBorder}
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case OPEN_PARTNER_MESSAGE:
      modal = (
        <PartnerMessage
          title={title}
          message={message}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case ADD_SALARY:
      modal = (
        <AddSalary data={data} isOpen={isOpen} onCloseModal={onCloseModal} />
      );
      break;
    case ADD_STUDIO:
      modal = (
        <AddStudio data={data} isOpen={isOpen} onCloseModal={onCloseModal} />
      );
      break;
    case CONFIRM_ADD_STUDIO:
      modal = (
        <ConfirmAddStudio
          message="Many thanks for your interest. All applications are responded to within 24 hours."
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case ADD_PAYMENT_DETAILS:
      modal = (
        <AddPaymentDetails
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case OPEN_UPGRADE:
      modal = (
        <UpgradeStudio
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case OPEN_APPLICATION_RECEIVED:
      modal = (
        <ApplicationReceived
          data={data}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case OPEN_SET_PASSWORD:
      modal = (
        <SetPassword data={data} isOpen={isOpen} onCloseModal={onCloseModal} />
      );
      break;
    case OPEN_SEND_TO_A_FRIEND:
      modal = (
        <SendToFriend data={data} isOpen={isOpen} onCloseModal={onCloseModal} />
      );
      break;
    case OPEN_SAVE_FOR_LATER:
      modal = (
        <SaveForLater data={data} isOpen={isOpen} onCloseModal={onCloseModal} />
      );
      break;
    case OPEN_MY_CV:
      modal = (
        <ShowCv data={data} isOpen={isOpen} onCloseModal={onCloseModal} />
      );
      break;
    case OPEN_DELETE_CV:
      modal = (
        <DeleteCv data={data} isOpen={isOpen} onCloseModal={onCloseModal} />
      );
      break;
    case OPEN_JOB_POSTING_MESSAGE:
      modal = (
        <JobPostingLimitMessage isOpen={isOpen} onCloseModal={onCloseModal} />
      );
      break;
    case OPEN_ADD_PASSION:
      modal = <AddPassion isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case OPEN_UPGRADE_PROPMT:
      modal = (
        <UpgradePrompt
          isOpen={isOpen}
          data={data}
          onCloseUpgradeModal={onCloseUpgradeModal}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case OPEN_GET_VERIFIED:
      modal = (
        <GetVerified
          isOpen={isOpen}
          data={data}
          onCloseUpgradeModal={onCloseUpgradeModal}
          onCloseModal={onCloseModal}
        />
      );
      break;
    case SOCIAL_SHARE:
      modal = (
        <SocialShare
          crossClassname={s.setCrossBorder}
          isOpen={isOpen}
          onCloseModal={onCloseModal}
          data={data}
        />
      );
      break;
  }

  return modal;
};

Modals.propTypes = {
  modal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    receiverID: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  maker: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  onCloseModal: PropTypes.func.isRequired,
  onCloseUpgradeModal: PropTypes.func.isRequired,
  onOpenSignin: PropTypes.func.isRequired,
  onOpenSignup: PropTypes.func.isRequired,
  onOpenDirectSignup: PropTypes.func.isRequired,
  onOpenEditEmail: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    modal: selectModal(),
    maker: selectMaker(),
  }),
  (dispatch, ownProps) => ({
    dispatch,
    onCloseModal: () => {
      dispatch(closeModal());
      // this clears the query url parameter
      if (!isEmpty(ownProps.location.query)) {
        dispatch(
          replace({
            ...ownProps.location,
            query: {},
          })
        );
      }
    },
    onCloseUpgradeModal: (data) => {
      data.toggleTabsFunc("plan");
      dispatch(closeModal());
      // this clears the query url parameter
      if (!isEmpty(ownProps.location.query)) {
        dispatch(
          replace({
            ...ownProps.location,
            query: {},
          })
        );
      }
    },
    onOpenSignin: () => dispatch(openSignIn()),
    onOpenSignup: () => dispatch(openSignUp()),
    onOpenDirectSignup: () => dispatch(openDirectSignUp()),
    onOpenEditEmail: () => dispatch(openEditEmail()),
    onGetMaker: (id) => dispatch(makerRequest(id)),
  })
)(Modals);
