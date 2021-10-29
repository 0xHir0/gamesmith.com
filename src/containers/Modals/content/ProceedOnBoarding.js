/*
 * Proceed to onboarding modal
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import { openCheckDetails } from "containers/Modals/actions";
import { selectUser } from "containers/App/selectors";
import s from "containers/Modals/styles.module.scss";

const ProceedOnBoarding = ({
  className = "",
  isOpen,
  onCloseModal,
  onContinue,
  user,
}) => (
  <Modal
    title="Proceed to onboarding"
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <p>You have to complete your onboarding first.</p>
    <Button
      className={s.buttons}
      onClick={() => onContinue(user)}
      text="Proceed"
    />
  </Modal>
);

ProceedOnBoarding.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  params: PropTypes.object,
  onContinue: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
  }),
  (dispatch) => ({
    dispatch,
    onContinue: (user) => dispatch(openCheckDetails(user)),
  })
)(ProceedOnBoarding);
