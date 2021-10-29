/*
 * Send Job to Friend  modal
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { sendJobToFriendRequest } from "../../../containers/App/actions";

import Modal from "components/UI/Modal";
import SendJobToFriendForm from "components/SendJobToFriendForm";

class SendToFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      showErrorMsg: false,
    };
  }
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      if (this.state.isVerified) {
        const jobDetails = {
          friendEmail: values.email,
          jobTitle: "I thought you'd be interested in this...",
          jobUrl: this.props.data.jobUrl,
          name: values.name,
        };
        dispatch(sendJobToFriendRequest({ jobDetails, resolve, reject }));
      } else {
        this.setState({
          showErrorMsg: true,
        });
      }
    });
  verifyCallback = (response) => {
    if (response) {
      this.setState({
        isVerified: true,
        showErrorMsg: false,
      });
    }
  };
  render() {
    const {
      className = "",
      crossClassname = "",
      isOpen,
      onCloseModal,
      data,
    } = this.props;
    const jobUrlText = `Just saw this awesome job, and I thought I would share with you! <br/> <strong>Check it out here: ${this.props.data.jobUrl} </strong> <br/>`;
    const subject = "I thought you'd be interested in this...";
    return (
      <Modal
        title="Send to a Friend"
        crossClassname={crossClassname}
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <SendJobToFriendForm
          jobTitle={subject}
          jobUrlText={jobUrlText}
          jobUrl={data.jobUrl}
          verifyCallback={this.verifyCallback}
          onSubmit={this.onSubmit}
          isVerified={this.state.showErrorMsg}
        />
      </Modal>
    );
  }
}

SendToFriend.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  crossClassname: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(SendToFriend);
