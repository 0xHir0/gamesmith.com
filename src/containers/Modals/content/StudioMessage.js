/*
 * Studio Message modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { studioMessageRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import StudioMessageForm from "components/StudioMessageForm";

class StudioMessage extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(studioMessageRequest({ values, resolve, reject }));
    });

  render() {
    const {
      studioId,
      className = "",
      crossClassname = "",
      isOpen,
      onCloseModal,
    } = this.props;
    return (
      <Modal
        title="Send Message"
        crossClassname={crossClassname}
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <StudioMessageForm
          onSubmit={this.onSubmit}
          initialValues={{
            studioId,
          }}
        />
      </Modal>
    );
  }
}

StudioMessage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  name: PropTypes.string,
  studioId: PropTypes.number.isRequired,
  className: PropTypes.string,
  crossClassname: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(StudioMessage);
