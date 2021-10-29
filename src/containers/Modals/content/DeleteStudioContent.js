/*
 * Delete Studio Content Confirmation modal
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import { deleteStudioContentRequest } from "containers/Recruiter/actions";
import s from "containers/Modals/styles.module.scss";

const DeleteStudioContent = ({
  data: { id, studioId, studioContent, index },
  className = "",
  isOpen,
  onCloseModal,
  onDeleteConfirm,
}) => (
  <Modal
    title="Are you sure you want to delete this?"
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <Button className={s.buttons} onClick={onCloseModal} text="Cancel" />
    <Button
      className={s.buttons}
      onClick={() => {
        onDeleteConfirm(id, studioId);
        studioContent.removeField(index);
      }}
      text="Delete"
    />
  </Modal>
);

DeleteStudioContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  onDeleteConfirm: PropTypes.func,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onDeleteConfirm: (id, studioId) =>
    dispatch(deleteStudioContentRequest(id, studioId)),
}))(DeleteStudioContent);
