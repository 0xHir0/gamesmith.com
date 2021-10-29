/*
 * Unsubscribe Confirmation modal
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import { unsubscribeRequest } from "containers/Unsubscribe/actions";
import s from "containers/Modals/styles.module.scss";

const ConfirmationMessage = ({
  code,
  className = "",
  isOpen,
  onCloseModal,
  onUnsubscribe,
}) => (
  <Modal
    title="Do you really wish to unsubscribe from this email?"
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <Button
      className={s.buttons}
      onClick={() => onUnsubscribe(code)}
      text="YES"
      style={{ marginRight: 10 }}
    />
    <Button
      className={s.buttons}
      onClick={onCloseModal}
      text="NO"
      style={{ marginLeft: 10 }}
    />
  </Modal>
);

ConfirmationMessage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  onUnsubscribe: PropTypes.func,
  code: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onUnsubscribe: (code) => dispatch(unsubscribeRequest(code)),
}))(ConfirmationMessage);
