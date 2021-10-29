/*
 * Subscribed modal
 */

import React from "react";
import PropTypes from "prop-types";

import Modal from "components/UI/Modal";
import success from "../img/success.png";
import cancel from "../img/cancel.png";
import Button from "../../../components/UI/Button";

const Subscribed = ({
  title,
  message,
  data: { email, startMessage, endMessage },
  isOpen,
  onCloseModal,
}) => (
  <Modal isOpen={isOpen} closeModal={onCloseModal} modalName={"Subscribed"}>
    {title === "You have successfully subscribed." && (
      <img src={success} alt={"success"} style={{ marginBottom: "1rem" }} />
    )}
    {title === "Plan cancelled." && (
      <img src={cancel} alt={"cancel"} style={{ marginBottom: "1rem" }} />
    )}
    {title !== "blank" && (
      <p
        style={{
          color: "white",
          marginBottom: "2rem",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {title}
      </p>
    )}
    {message !== "blank" && (
      <p style={{ color: "#1c1c1c" }}>
        {message || "Ouch, it seems an error has occurred."}
      </p>
    )}
    {email !== "" && (
      <p style={{ color: "#1c1c1c" }}>
        {startMessage} <a href={`mailto:${email}`}>{email}</a> {endMessage}
      </p>
    )}
    <Button onClick={onCloseModal} text="OK" />
  </Modal>
);

Subscribed.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Subscribed;
