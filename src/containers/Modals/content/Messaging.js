/*
 * Messaging modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { messageRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import MessageForm from "components/MessageForm";

class Messaging extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const { receiverID } = this.props;
      dispatch(messageRequest({ receiverID, values, resolve, reject }));
    });

  render() {
    const { name, className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title={name ? `Message ${name}` : "Send Message"}
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <MessageForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

Messaging.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  receiverID: PropTypes.number.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(Messaging);
