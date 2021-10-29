/*
 * Upgrade modal
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-dom";

import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

const UpgradePrompt = ({ isOpen, onCloseUpgradeModal, onCloseModal, data }) => (
  <Modal isOpen={isOpen} closeModal={onCloseModal}>
    <p style={{ fontSize: "1.5rem", color: "white", fontWeight: "500" }}>
      You need to upgrade to do that
    </p>
    <Button
      style={{ padding: "0.75rem 2rem" }}
      text="Upgrade Now"
      onClick={() => onCloseUpgradeModal(data)}
    />
    {/* <Button style={{ padding: '0.75rem 2rem' }} text="Upgrade Now" onClick={() => data.toggleTabsFunc('plan')}/>*/}
  </Modal>
);

UpgradePrompt.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.object,
  title: PropTypes.string.isRequired,
  onCloseUpgradeModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default UpgradePrompt;
