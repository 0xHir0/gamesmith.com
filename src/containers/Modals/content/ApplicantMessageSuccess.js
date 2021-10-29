/*
 * Apply Message Success modal
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import s from "containers/Modals/styles.module.scss";

const ApplicantMessageSuccess = ({
  className = "",
  crossClassname = "",
  isOpen,
  onCloseModal,
  onDirectSignUp,
}) => (
  <Modal
    title=""
    crossClassname={crossClassname}
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <h4 style={{ fontSize: 30 }}>Excellent</h4>
    <p style={{ fontSize: 18 }}>Your Message is on the way to Gamesmith.</p>
    <p style={{ fontSize: 18 }}>
      Sit Back and Relax and we shall contact you ASAP
    </p>
    <Button
      className={s.buttons}
      onClick={onCloseModal}
      text="Back To My Jobs Page"
    />
  </Modal>
);

ApplicantMessageSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  crossClassname: PropTypes.string,
};

export default connect((dispatch) => ({
  dispatch,
}))(ApplicantMessageSuccess);
