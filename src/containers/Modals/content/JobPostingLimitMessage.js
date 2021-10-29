/*
 * jobPostingLimitMessage Confirmation modal
 */

import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import s from "containers/Modals/styles.module.scss";

const jobPostingLimitMessage = ({ isOpen, onCloseModal, className = "" }) => (
  <Modal
    title="Job postings limit reached!"
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <p style={{ paddingBottom: "1rem" }}>
      To post more jobs, upgrade to a bigger plan.
    </p>
    <Button
      className={s.startExploringBtn}
      onClick={onCloseModal}
      text="Upgrade now"
      to="/recruiter/jobplans"
    />
  </Modal>
);

jobPostingLimitMessage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  data: PropTypes.object,
  onAddJob: PropTypes.func,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(jobPostingLimitMessage);
