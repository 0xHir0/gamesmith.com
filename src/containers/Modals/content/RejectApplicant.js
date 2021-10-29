import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import { rejectApplicantRequest } from "../../Recruiter/actions";

import s from "containers/Modals/styles.module.scss";

const RejectApplicant = ({
  className = "",
  crossClassname = "",
  isOpen,
  onCloseModal,
  data: { applicantId, jobId },
  onRejectJobApplicant,
}) => (
  <Modal
    title="Are you sure you want to reject this candidate?"
    crossClassname={crossClassname}
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <p>
      When you reject a Gamesmith candidate we notify them for you via Email.
    </p>
    <Button
      className={s.buttons}
      text="YES, REJECT"
      style={{ color: "#6E6632" }}
      onClick={() => onRejectJobApplicant(applicantId, jobId)}
    />
    <Button
      className={s.buttons}
      onClick={onCloseModal}
      style={{ backgroundColor: "transparent", color: "#E8D603" }}
      text="NO, KEEP THEM FOR NOW"
    />
  </Modal>
);

RejectApplicant.propTypes = {
  data: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  crossClassname: PropTypes.string,
  onRejectJobApplicant: PropTypes.func,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onRejectJobApplicant: (applicantId, jobId) =>
    dispatch(rejectApplicantRequest(applicantId, jobId)),
}))(RejectApplicant);
