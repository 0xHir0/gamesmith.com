/*
 * Delete Studio Game Confirmation modal
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import { deleteGameRequest } from "containers/Recruiter/actions";
import s from "containers/Modals/styles.module.scss";

const DeleteStudioGame = ({
  data: { id, studioId, games, index },
  className = "",
  isOpen,
  onCloseModal,
  onDeleteConfirm,
}) => (
  <Modal
    title="Are you sure you want to delete this Game?"
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <Button className={s.buttons} onClick={onCloseModal} text="Cancel" />
    <Button
      className={s.buttons}
      onClick={() => {
        onDeleteConfirm(id, studioId);
        games.removeField(index);
      }}
      text="Delete"
    />
  </Modal>
);

DeleteStudioGame.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  onDeleteConfirm: PropTypes.func,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onDeleteConfirm: (id, studioId) => dispatch(deleteGameRequest(id, studioId)),
}))(DeleteStudioGame);
