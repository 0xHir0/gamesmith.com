/*
 * Check inbox modal
 */

import React from "react";
import PropTypes from "prop-types";

import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

const CheckInbox = ({ className = "", isOpen, onCloseModal, onOpenSignin }) => (
  <Modal
    title="Already Registered"
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <p>
      That Linkedin profile is already connected to a maker account. Please sign
      in with the button below.
    </p>
    <Button onClick={onOpenSignin} text="Sign In" />
  </Modal>
);

CheckInbox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onOpenSignin: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CheckInbox;
