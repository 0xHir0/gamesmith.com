/*
 * Confirm Apply job modal
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import s from "containers/Modals/styles.module.scss";
import { checkPhoneNumberRequest } from "containers/App/actions";
import ProfileCompleteness from "components/ProfileCompleteness";

const ConfirmApplyJob = ({
  className = "",
  isOpen,
  onCloseModal,
  onApplyConfirm,
  data,
}) => (
  <Modal
    title=""
    className={`${className}${s.titleStyle}`}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <ProfileCompleteness customClass={s.about} />
    <p>
      Your application for this job will be released to the studio when your
      profile is at least 65% complete
    </p>
    <h2>Complete job application?</h2>
    <Button 
    style ={{marginRight: '10px'}}
    // className={s.deleteButtonCancle} 
    onClick={onCloseModal} 
    text="NO" />
    <Button
      // className={s.deleteButtonConfirm}
      onClick={() => onApplyConfirm(data)}
      text="YES"
    />
  </Modal>
);

ConfirmApplyJob.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  gameID: PropTypes.number,
  onApplyConfirm: PropTypes.func,
  data: PropTypes.object,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onApplyConfirm: (data) =>
    dispatch(checkPhoneNumberRequest(data.jobId, data.studioId)),
}))(ConfirmApplyJob);
