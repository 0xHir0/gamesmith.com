/*
 * Confirm Apply job modal
 */

import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";

import s from "../styles.module.scss";
import { openPayment } from "../actions";
import { downgradeSubscriptionRequest } from "../../Recruiter/actions";

const UpgradeStudio = ({
  className = "",
  isOpen,
  onCloseModal,
  onApplyConfirm,
  onDowngradeSubscriptionRequest,
  data,
}) => (
  <Modal
    title=""
    className={`${className}${s.titleStyle}`}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <div className="row">
      <div className="col-md-12">
        <div className={s.spHeader}>
          <h3 style={{ fontWeight: "600", fontSize: "2rem" }}>
            {`${data.plan}`} PLAN
          </h3>
        </div>
        <div
          style={{
            backgroundColor: "#EFD72F",
            border: "1px solid",
            fontFamily: "Helvetica",
          }}
        >
          <div
            className="row"
            style={{ backgroundColor: "#EFD72F", width: "100%" }}
          >
            <div className="col-md-3"></div>
            <div className="col-md-6" style={{ textAlign: "center" }}>
              <h1
                className={s.price}
                style={{ color: "black", marginBottom: "0px!important" }}
              >
                ${data.price}
              </h1>
            </div>
            <div className="col-md-3"></div>
          </div>
          <div
            className="row"
            style={{ backgroundColor: "#EFD72F", color: "#ffffff" }}
          >
            <div className="col-lg-2"></div>
            <div
              className="col-lg-8"
              style={{
                textAlign: "center",
                paddingBottom: "1.5rem",
                color: "black",
              }}
            >
              per user/per month
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
        <div className={`row ${s.spBottomText}`}>
          <div className="col-sm-12">
            <p style={{ textAlign: "left" }}>
              By purchasing you authorize Atlantic Trade Charter Inc, DBA
              Gamesmith to automatically charge you ${`${data.price}`}+ any
              applicable tax each month until you cancel. If the price changes,
              we'll notify you beforehand.
              <br />
              <br />
              You can cancel anytime by emailing
              <a href="mailto:sales@gamesmith.com" style={{ color: "yellow" }}>
                {" "}
                sales@gamesmith.com
              </a>
              .
              <br />
              <br />
              No partial refunds.
              <Link
                to="/terms"
                className={
                  window.location.pathname.indexOf("terms") == 1 ? s.active : ""
                }
                style={{ color: "yellow" }}
              >
                {" "}
                Terms and Conditions
              </Link>{" "}
              apply.
            </p>
          </div>
        </div>
        {/* <div className={s.spButton}>*/}
        {/* <Button style={{ width: '100%' }} text="Studio Plan" color="yellow" onClick={checkAuthToken() ? () => onOpenPayment('Studio') : () => onSignIn()}/>*/}
        {/* </div>*/}
      </div>
    </div>
    <Button
      className={s.deleteButtonCancle}
      onClick={onCloseModal}
      text="CANCEL"
    />
    <Button
      className={s.deleteButtonConfirm}
      onClick={
        data.upgradeText === "UPGRADE"
          ? () => onApplyConfirm(data)
          : () => onDowngradeSubscriptionRequest(data)
      }
      text={data.upgradeText}
    />
  </Modal>
);

UpgradeStudio.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  gameID: PropTypes.number,
  onApplyConfirm: PropTypes.func,
  onDowngradeSubscriptionRequest: PropTypes.func,
  data: PropTypes.object,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onApplyConfirm: (data) => dispatch(openPayment(data)),
  onDowngradeSubscriptionRequest: (data) =>
    dispatch(downgradeSubscriptionRequest(data)),
}))(UpgradeStudio);
