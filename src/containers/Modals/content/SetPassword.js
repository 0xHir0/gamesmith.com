/*
 * Sign in modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setPasswordRequest } from "containers/App/actions";
import Modal from "components/UI/Modal";
import SetPasswordForm from "components/SetPasswordForm";
import lockimage from "../../../data/images/lock.png";
import lockimagemob from "../../../data/images/lockmob.svg";

const ismobile = window.innerWidth <= 1150;
class SetPassword extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(setPasswordRequest(values, resolve, reject));
    });

  render() {
    const { className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title={
          !ismobile
            ? "Ok, let's set your password!"
            : "Lastly, let’s set your password"
        }
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
        titleImage={!ismobile ? lockimage : lockimagemob}
      >
        <SetPasswordForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

SetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(SetPassword);
