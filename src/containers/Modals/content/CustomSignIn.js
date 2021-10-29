/*
 * Sign in modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { linkedinAuth } from "utils";

import { loginRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
import AuthForm from "components/AuthForm";

class CustomSignIn extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(loginRequest({ values, resolve, reject }));
    });

  render() {
    const { className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title="Congragulations!"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <p> You are now officially a GAMESMITH, Please Login Below</p>
        <AuthForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

CustomSignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(CustomSignIn);
