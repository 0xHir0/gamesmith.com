/*
 * Delete CV Confirmation modal
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
import { deleteCVRequest } from "containers/App/actions";
import s from "containers/Modals/styles.module.scss";

const DeleteCv = ({
  className = "",
  isOpen,
  onCloseModal,
  onDeleteConfirm,
  data,
}) => (
  <Modal
    title="Are you sure you want to delete your CV?"
    className={`${className}${s.titleStyle}`}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <Button className={s.deleteButtonCancle} onClick={onCloseModal} text="NO" />
    <Button
      className={s.deleteButtonConfirm}
      onClick={() => onDeleteConfirm(data)}
      text="YES"
    />
  </Modal>
);

DeleteCv.propTypes = {
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
  onDeleteConfirm: (data) => dispatch(deleteCVRequest(data)),
}))(DeleteCv);
