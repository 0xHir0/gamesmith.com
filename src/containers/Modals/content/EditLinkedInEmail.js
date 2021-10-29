/*
 * Edit Linked users Email
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { updateLinkedInEmailRequest } from "containers/Edit/actions";

import Modal from "components/UI/Modal";
import EditEmailForm from "components/EditLinkedInEmailForm";

class EditLinkedInEmail extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(updateLinkedInEmailRequest({ values, resolve, reject }));
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

EditLinkedInEmail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(EditLinkedInEmail);
