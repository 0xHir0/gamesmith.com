/*
 * Proceed to StartMessage
 */

import React from "react";
import PropTypes from "prop-types";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import { selectUser } from "containers/App/selectors";
import s from "containers/Modals/styles.module.scss";
import logo from "containers/Header/svg/logo.svg";

const StartMessage = ({ className = "", isOpen, onCloseModal, onContinue }) => (
  <Modal
    title=""
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
    titleImage={logo}
  >
    <p>
      <h3>Let's go!</h3> <i className={s.line} /> Claim your work and let the
      glory roll in!
    </p>
    <Button onClick={onCloseModal} text="DONE" />
  </Modal>
);

StartMessage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
};

export default StartMessage;
