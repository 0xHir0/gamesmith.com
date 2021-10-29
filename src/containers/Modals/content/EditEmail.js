/*
 * Sign in modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { linkedinAuth } from "utils";

import { updateEmailRequest } from "containers/Edit/actions";

import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
import EditEmailForm from "components/EditEmailForm";

class EditEmail extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(updateEmailRequest({ values, resolve, reject }));
    });

  render() {
    const { className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title="Edit Email"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <p> Once you edit your email you will be logged out of GameSmith</p>
        <EditEmailForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

EditEmail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(EditEmail);
