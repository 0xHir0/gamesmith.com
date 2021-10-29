/*
 * Applicant Messaging modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { applicantMessageRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import ApplicantMessageForm from "components/ApplicantMessageForm";

class ApplicantMessage extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(applicantMessageRequest({ values, resolve, reject }));
    });

  render() {
    const {
      data: { maker, jobId },
      className = "",
      crossClassname = "",
      isOpen,
      onCloseModal,
    } = this.props;
    return (
      <Modal
        title="Message Candidate"
        crossClassname={crossClassname}
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <ApplicantMessageForm
          onSubmit={this.onSubmit}
          initialValues={{
            applicantId: maker.id,
            jobId,
          }}
          maker={maker}
        />
      </Modal>
    );
  }
}

ApplicantMessage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  data: PropTypes.object,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(ApplicantMessage);
