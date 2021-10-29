/*
 * Sign in modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { linkedinAuth } from "utils";

import { loginRequest } from "containers/App/actions";
import { openForgetPassword, openSignUp } from "containers/Modals/actions";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
import AuthForm from "components/AuthForm";

class SignIn extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const emailLowerCase = values.email.toLowerCase();
      values.email = emailLowerCase;
      dispatch(loginRequest({ values, resolve, reject }));
    });

  render() {
    const {
      className = "",
      isOpen,
      onCloseModal,
      onApply,
      onForgetPassword,
    } = this.props;
    return (
      <Modal
        title="Sign In"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <AuthForm onSubmit={this.onSubmit} />
        By using Gamesmith, I agree to the{" "}
        <a href="/terms" className="links">
          <u>Terms, Conditions and Privacy Policy</u>
        </a>
        <div className="links">
          <a onClick={onForgetPassword}>Forgot Password?</a>
          <p>
            New to Gamesmith?{" "}
            <a href="/signup" className="links">
              <strong>Join Now</strong>
            </a>
          </p>
        </div>
      </Modal>
    );
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  onApply: PropTypes.func.isRequired,
  onForgetPassword: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onApply: () => dispatch(openSignUp()),
  onForgetPassword: () => dispatch(openForgetPassword()),
}))(SignIn);
