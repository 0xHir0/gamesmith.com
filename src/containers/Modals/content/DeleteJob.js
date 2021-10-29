/*
 * Delete Job Confirmation modal
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import { deleteJobRequest } from "containers/Recruiter/actions";
import s from "containers/Modals/styles.module.scss";

const DeleteJob = ({
  data: { id, domain },
  className = "",
  isOpen,
  onCloseModal,
  onDeleteConfirm,
}) => (
  <Modal
    title="Are you sure you want to delete this job?"
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <Button className={s.buttons} onClick={onCloseModal} text="Cancel" />
    <Button
      className={s.deleteBtn}
      onClick={() => onDeleteConfirm(id, domain)}
      text="Delete"
    />
  </Modal>
);

DeleteJob.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  onDeleteConfirm: PropTypes.func,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onDeleteConfirm: (id, domain) => dispatch(deleteJobRequest(id, domain)),
}))(DeleteJob);
