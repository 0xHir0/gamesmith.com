/*
 * Exceed Limit modal
 */

import React from "react";
import PropTypes from "prop-types";

import Modal from "components/UI/Modal";

const ExceedSearchLimit = ({ isOpen, onCloseModal, data: { message } }) => (
  <Modal title={""} isOpen={isOpen} closeModal={onCloseModal}>
    <p style={{ color: "#e8d603", marginTop: "-1rem" }}>Yeah!</p>
    <p>It looks like you're having fun with Gamesmith.</p>
    <p>{message}</p>
  </Modal>
);
ExceedSearchLimit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
export default ExceedSearchLimit;
