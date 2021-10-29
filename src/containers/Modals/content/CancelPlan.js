/*
 * CancelPlan modal
 */

import React from "react";
import PropTypes from "prop-types";

import Modal from "components/UI/Modal";
import s from "../styles.module.scss";
import Button from "../../../components/UI/Button";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { downgradeSubscriptionRequest } from "../../Recruiter/actions";

const CancelPlan = ({
  data,
  onDowngradeSubscriptionRequest,
  isOpen,
  onCloseModal,
}) => (
  <Modal
    title={"Are you sure you want to cancel?"}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <Button
      className={s.cancelButton}
      onClick={onCloseModal}
      text="No, I'll stay"
    />
    <Button
      className={s.cancelButton2}
      onClick={() => onDowngradeSubscriptionRequest(data)}
      text="Yes, I'll cancel"
    />
    <p>
      <span style={{ color: "yellow" }}>Note:</span> All data will be lost.
    </p>
  </Modal>
);

CancelPlan.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onDowngradeSubscriptionRequest: PropTypes.func,
  onSubscribe: PropTypes.func,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onDowngradeSubscriptionRequest: (data) =>
    dispatch(downgradeSubscriptionRequest({ id: data.id, plan: data.plan })),
}))(CancelPlan);
