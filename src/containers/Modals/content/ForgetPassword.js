/*
 * Sign in modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { passwordLinkRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import ResetPasswordLink from "components/ResetPasswordLink";

class ForgetPassword extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(passwordLinkRequest({ values, resolve, reject }));
    });

  render() {
    const { className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title="Forgot Password"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <ResetPasswordLink onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

ForgetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(ForgetPassword);
