/*
 * Add Studio modal
 * */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import AddStudioForm from "components/AddNewStudioForm";
import Modal from "components/UI/Modal";
import { addStudioRequest } from "../../../containers/Studios/actions";

class AddStudio extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const label = this.props.data;
      dispatch(addStudioRequest(values, label, resolve, reject));
    });
  render() {
    const { className = "", isOpen, onCloseModal, data } = this.props;
    const title = (
      <div>
        <h3 style={{ color: "#ffffff", fontSize: "1.8rem" }}>
          Apply For A Company Profile
        </h3>
      </div>
    );
    return (
      <Modal
        title={title}
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <AddStudioForm label={data} onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

AddStudio.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  // receiverID: PropTypes.number.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(AddStudio);
