/*
 * Confirm Add Studio modal
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

// import s from 'containers/Modals/styles.module.scss';

const ConfirmAddStudio = ({ message, isOpen, onCloseModal }) => (
  <Modal isOpen={isOpen} closeModal={onCloseModal}>
    <p>{message}</p>
    <Button onClick={onCloseModal} text="OK" />
  </Modal>
);

ConfirmAddStudio.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  message: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(ConfirmAddStudio);
