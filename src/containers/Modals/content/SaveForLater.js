/*
 * Send Job to Friend  modal
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";

class SaveForLater extends Component {
  // onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  //   dispatch(studioMessageRequest({ values, resolve, reject }));
  // });

  render() {
    const {
      className = "",
      crossClassname = "",
      isOpen,
      onCloseModal,
    } = this.props;
    return (
      <Modal
        title="Save For Later"
        crossClassname={crossClassname}
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      ></Modal>
    );
  }
}

SaveForLater.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  crossClassname: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(SaveForLater);
