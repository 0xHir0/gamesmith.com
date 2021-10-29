/*
 * Add Experience modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { disputeRequest } from "containers/Maker/actions";

import Modal from "components/UI/Modal";
import GameCreditDisputeForm from "components/GameCreditDisputeForm";

class OpenDispute extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(disputeRequest({ values, resolve, reject }));
    });
  render() {
    const { className = "", isOpen, onCloseModal, data } = this.props; // eslint-disable-line
    const initials = {
      makerId: data.makerId,
      creditId: data.creditId,
      title: data.title.toString(),
      studio: data.studio.toString(),
      makerName: data.makerName.toString(),
    };
    return (
      <Modal
        title="Dispute Game History"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <GameCreditDisputeForm
          onSubmit={this.onSubmit}
          initialValues={initials}
        />
      </Modal>
    );
  }
}

OpenDispute.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(OpenDispute);
