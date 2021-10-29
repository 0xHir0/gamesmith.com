/*
 * Requested modal
 */

import React from "react";
import PropTypes from "prop-types";

import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

const Requested = ({ className = "", isOpen, onCloseModal }) => (
  <Modal
    title="Already Requested"
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <p>That Linkedin profile has been already requested.</p>
    <Button onClick={onCloseModal} text="OK" />
  </Modal>
);

Requested.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Requested;
