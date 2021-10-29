/*
 * Invite modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { inviteMemberRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import MakerInviteForm from "components/MakerInviteForm";

class InviteMember extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const { data } = this.props;
      dispatch(
        inviteMemberRequest({
          values,
          userId: data.userId,
          gameId: data.gameId,
          game: data.game,
          company: data.company,
          role: data.role,
          resolve,
          reject,
        })
      );
    });

  render() {
    const { className = "", isOpen, onCloseModal, data } = this.props;
    return (
      <Modal
        title={`Invite makers to ${data.game}`}
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <p>Help fellow game makers claim their work!</p>
        <MakerInviteForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

InviteMember.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(InviteMember);
