/*
 * Message modal
 */

import React from "react";
import PropTypes from "prop-types";

import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

const PartnerMessage = ({
  className = "",
  title,
  message,
  image,
  isOpen,
  onCloseModal,
}) => (
  <Modal
    title={title == "invite" ? "" : title ? title : "Error"}
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    {message !== "blank" && (
      <p style={{ color: "white" }}>
        {message || "Ouch, it seems an error has occured."}
      </p>
    )}
    <Button onClick={onCloseModal} text="OK" />
  </Modal>
);

PartnerMessage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default PartnerMessage;
