/*
 * Check inbox modal
 */

import React from "react";
import PropTypes from "prop-types";

import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

const CheckInbox = ({ className = "", isOpen, onCloseModal, email }) => (
  <Modal
    title="Check Your Inbox"
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <p>
      Gamesmith is a validated professional network that reviews each
      application within 24hrs. Keeping checking <em>{email}</em> for your
      invitation and we hope to see you soon.
    </p>
    <Button onClick={onCloseModal} text="OK" />
  </Modal>
);

CheckInbox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  email: PropTypes.string.isRequired,
};

export default CheckInbox;
