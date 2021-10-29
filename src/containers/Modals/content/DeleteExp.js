/*
 * Delete Exp Confirmation modal
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import { deleteExpRequest } from "containers/App/actions";
import s from "containers/Modals/styles.module.scss";

const DeleteExp = ({
  className = "",
  isOpen,
  onCloseModal,
  onDeleteConfirm,
  data,
}) => (
  <Modal
    title="Are you sure you want to delete this game from your profile?"
    className={`${className}${s.titleStyle}`}
    isOpen={isOpen}
    closeModal={onCloseModal}
    note="All information you have entered for this game will be lost."
  >
    <Button className={s.deleteButtonCancle} onClick={onCloseModal} text="NO" />
    <Button
      className={s.deleteButtonConfirm}
      onClick={() => onDeleteConfirm(data)}
      text="YES"
    />
  </Modal>
);

DeleteExp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  onDeleteConfirm: PropTypes.func,
  gameID: PropTypes.number,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onDeleteConfirm: (data) => dispatch(deleteExpRequest(data)),
}))(DeleteExp);
