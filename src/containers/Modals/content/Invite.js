/*
 * Invite modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { inviteRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import InviteForm from "components/InviteForm";

class Invite extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const { receiverID } = this.props;
      dispatch(inviteRequest({ receiverID, values, resolve, reject }));
    });

  render() {
    const { className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title="Invite User"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <p>This user is not registered. Send an invite?</p>
        <InviteForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

Invite.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  receiverID: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(Invite);
