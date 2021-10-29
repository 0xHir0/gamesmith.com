/*
 *Confirmation modal
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import { rejectTeamRequest } from "containers/App/actions";
import s from "containers/Modals/styles.module.scss";

const ConfirmRejectTeamRequest = ({
  data,
  className = "",
  isOpen,
  onCloseModal,
  onReject,
}) => (
  <Modal
    title="Do you really want to reject this request?"
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <Button
      className={s.buttons}
      onClick={() => onReject(data)}
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

ConfirmRejectTeamRequest.propTypes = {
  data: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  onReject: PropTypes.func,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  onReject: (data) => dispatch(rejectTeamRequest(data)),
}))(ConfirmRejectTeamRequest);
