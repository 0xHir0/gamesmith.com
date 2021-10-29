import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import s from "containers/Modals/styles.module.scss";
import { openClaimForm } from "containers/Modals/actions";

const ClaimProfile = ({
  className = "",
  isOpen,
  onCloseModal,
  onOpenClaimProfile,
  data,
}) => (
  <Modal
    title="Are you sure you want to claim this profile?"
    className={`${className}${s.titleStyle}`}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <Button className={s.deleteButtonCancle} onClick={onCloseModal} text="NO" />
    <Button
      className={s.deleteButtonConfirm}
      onClick={() => onOpenClaimProfile(data)}
      text="YES"
    />
  </Modal>
);

ClaimProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  gameID: PropTypes.number,
  onOpenClaimProfile: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onOpenClaimProfile: (id) => dispatch(openClaimForm(id)),
}))(ClaimProfile);
