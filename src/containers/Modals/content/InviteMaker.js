/*
 * Invite modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { inviteMakerRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import InviteForm from "components/InviteForm";
import { closeModal } from "../actions";
import { peopleRequest } from "../../People/actions";
import { browserHistory } from "react-router";

class InviteMaker extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(inviteMakerRequest({ values, resolve, reject }));
    });

  changeMaker = () => {
    const { dispatch } = this.props;
    dispatch(closeModal());
    // dispatch(peopleRequest());
    window.location.replace("/makers");
  };
  render() {
    const { className = "", isOpen, data } = this.props;
    return (
      <Modal
        title={`Invite ${data.name} to Gamesmith`}
        className={className}
        isOpen={isOpen}
        closeModal={this.changeMaker}
      >
        <InviteForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

InviteMaker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(InviteMaker);
