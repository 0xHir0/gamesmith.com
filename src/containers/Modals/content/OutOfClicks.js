/*
 * OUT OF CLICKS
 */
import alert from "../img/alert.png";
import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";
import Modal from "components/UI/Modal";
import s from "../styles.module.scss";
import Button from "../../../components/UI/Button";

const OutOfClicks = ({ isOpen, onCloseModal }) => (
  <Modal
    title={""}
    isOpen={isOpen}
    closeModal={onCloseModal}
    className={s.outOfClicks}
    modalName={"OutOfClicks"}
  >
    <img src={alert} alt="alert" className={s.alert} />
    <p>You're out of clicks for now.</p>
    <p>Your limit will be reset in 7 days.</p>
    <hr></hr>
    <p>
      To keep Gamesmith a trusted community, we allow a limited number of clicks
      on profiles for users with a personal account.
    </p>
    <p>
      For more clicks, get in touch with us at{" "}
      <a className={s.mail} href="mailto:sales@gamesmith.com">
        sales@gamesmith.com
      </a>
    </p>
    <Button text="OK" onClick={onCloseModal} />
  </Modal>
);
OutOfClicks.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
export default OutOfClicks;
