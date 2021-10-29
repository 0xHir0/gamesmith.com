/*
 * Sign in modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { linkedinAuth } from "utils";

import { signupRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
import SignUpForm from "components/SignUpForm";
import s from "../styles.module.scss";

class SignUp extends Component {
  onSubmit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(signupRequest({ values, resolve, reject }));
    });
  };

  render() {
    const { className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title="Create Your Profile"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <SignUpForm onSubmit={this.onSubmit} />
        <p className={s.termsAndCond}>
          By joining Gamesmith, you agree to our{" "}
          <a href="/terms" target="_blank">
            Terms, Conditions and Privacy Policy
          </a>
          .
        </p>
      </Modal>
    );
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(SignUp);
