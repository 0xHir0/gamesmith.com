/*
 * Sign in modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { linkedinAuth } from "utils";

import { directSignupRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
import DirectSignUpForm from "components/DirectSignUpForm";

class DirectSignUp extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(directSignupRequest({ values, resolve, reject }));
    });

  render() {
    const { className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title="Sign-Up Now"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <p> Gamesmith is an community for professional game makers.</p>
        <DirectSignUpForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

DirectSignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(DirectSignUp);
