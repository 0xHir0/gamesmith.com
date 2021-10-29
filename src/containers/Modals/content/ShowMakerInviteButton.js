/*
 * Invite modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { openMakerInvite } from "../actions";

import Modal from "components/UI/Modal";
import InviteForm from "components/InviteForm";
import { closeModal } from "../actions";
import { peopleRequest } from "../../People/actions";
import { browserHistory } from "react-router";
import Button from "components/UI/Button";

class ShowMakerInviteButton extends Component {
  changeMaker = () => {
    const { dispatch } = this.props;
    dispatch(closeModal());
    // dispatch(peopleRequest());
    window.location.replace("/makers");
  };
  render() {
    const { className = "", isOpen, data, onMakerInvite } = this.props;
    return (
      <Modal
        title={`Maker not found`}
        className={className}
        isOpen={isOpen}
        closeModal={this.changeMaker}
      >
        <Button
          text={data.isRecruiter ? "Ok" : "Invite"}
          color="yellow"
          onClick={
            data.isRecruiter ? this.changeMaker : () => onMakerInvite(data.name)
          }
        />
      </Modal>
    );
  }
}

ShowMakerInviteButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onMakerInvite: (name) => dispatch(openMakerInvite(name)),
}))(ShowMakerInviteButton);
