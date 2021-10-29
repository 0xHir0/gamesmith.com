/*
 * Payments container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import selectPayments from "./selectors";
import Button from "components/UI/Button";
import tickmark from "../../data/icons/tickmark.png";
import logo from "../../data/images/logo.png";
import { openPayment, openSignIn } from "../Modals/actions";
import { checkAuthToken } from "../../utils";
import s from "./styles.module.scss";

class Payments extends Component {
  render() {
    const { onOpenPayment, onSignIn } = this.props;
    return (
      <main role="main" className={`${s.root} ${s.payment_main}`}>
        <div
          className="container-fluid"
          style={{ marginLeft: "5%", marginRight: "5%" }}
        >
          <div className="row">
            <div className="col-lg-3"></div>
            <div
              className="col-lg-6"
              style={{ textAlign: "center", color: "#525252" }}
            >
              <div
                style={{ color: "#525252 !important;", textAlign: "center" }}
              >
                <h1 className={s.topHeading}>Plans & Pricing</h1>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className={s.spHeader}>
                <h3>Studio Plan</h3>
              </div>

              <div
                style={{
                  height: "9rem",
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
                      style={{ color: "white", marginBottom: "0px!important" }}
                    >
                      99.00<sup>$</sup>
                    </h1>
                  </div>
                  <div className="col-md-3"></div>
                </div>
                <div
                  className="row"
                  style={{ backgroundColor: "#EFD72F", color: "#ffffff" }}
                >
                  <div className="col-lg-3"></div>
                  <div className="col-lg-6" style={{ textAlign: "center" }}>
                    per month
                  </div>
                  <div className="col-lg-3"></div>
                </div>
              </div>
              <div className={s.spBottomText}>
                <p>
                  By purchasing you authorize Atlantic Trade Charter Inc, BDA
                  Gamesmith to automatically charge you $99.00 + any applicable
                  tax each month until you cancel. If the price changes, we'll
                  notify you beforehand. You can cancel anytime via by emailing
                  sales@gamesmith.com. No partial refunds. Terms and Conditions
                  apply.
                </p>
              </div>
              <div className={s.spButton}>
                <Button
                  style={{ width: "100%" }}
                  text="Studio Plan"
                  color="yellow"
                  onClick={
                    checkAuthToken()
                      ? () => onOpenPayment("Studio")
                      : () => onSignIn()
                  }
                />
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <div className={s.centreDescription}>
                <div className={s.info}>
                  <p>Access the largest vetted Game Professional Commmunity</p>
                  <img src={tickmark} alt="tick-img" width={20} />
                </div>
                <div className={s.info}>
                  <p>Gain unlimited connections and messaging</p>
                  <img src={tickmark} alt="tick-img" width={20} />
                </div>
                <div className={s.info}>
                  <p>Create a fully discoverable company page</p>
                  <img src={tickmark} alt="tick-img" width={20} />
                </div>
                <div className={s.info}>
                  <p>Access powerful Game filters</p>
                  <img src={tickmark} alt="tick-img" width={20} />
                </div>
                <div className={s.info}>
                  <p>Embed your images and videos</p>
                  <img src={tickmark} alt="tick-img" width={20} />
                </div>
                <div className={s.info}>
                  <p>Unlimited Studio job Postings</p>
                  <img src={tickmark} alt="tick-img" width={20} />
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <div className={s.bheader}>
                <h3>Branded Plan</h3>
              </div>
              <div
                style={{
                  height: "9rem",
                  backgroundColor: "#191919",
                  border: "1px solid",
                  fontFamily: "Helvetica",
                }}
              >
                <div
                  className="row"
                  style={{ backgroundColor: "#191919", width: "100%" }}
                >
                  <div
                    className="col-md-offset-4 col-md-4"
                    style={{ textAlign: "center" }}
                  >
                    <h1 className={s.price} style={{ color: "white" }}>
                      14.95<sup>$</sup>
                    </h1>
                  </div>
                  {/* <div className={s.doller}><h1>$</h1></div>*/}

                  {/* <p className="row" style={{ textAlign: 'center' }}>per month</p>*/}
                  {/* <p className={s.annaul}>$179.40 <strong>Annually</strong></p>*/}
                </div>
                <div
                  className="row"
                  style={{ backgroundColor: "#191919", color: "#ffffff" }}
                >
                  <div
                    className="col-lg-offset-4 col-lg-4"
                    style={{ textAlign: "center" }}
                  >
                    per month
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    backgroundColor: "#191919",
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  <div className="col-lg-offset-4 ">
                    <p style={{ color: "#ffffff", margin: "0" }}>
                      $179.40 <strong>Annually</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className={s.spBottomText}>
                <p>
                  By purchasing you authorize Atlantic Trade Charter Inc, BDA
                  Gamesmith to automatically charge you $99.00 + any applicable
                  tax each month until you cancel. If the price changes, we'll
                  notify you beforehand. You can cancel anytime via by emailing
                  sales@gamesmith.com. No partial refunds. Terms and Conditions
                  apply.
                </p>
              </div>
              <div className={s.spButton}>
                <Button
                  style={{ width: "100%" }}
                  text="Branded Plan"
                  color="yellow"
                  onClick={
                    checkAuthToken()
                      ? () => onOpenPayment("Branded")
                      : () => onSignIn()
                  }
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className={s.footer}>
                <div className={s.logo}>
                  <img src={logo} width={30} />
                </div>
                <div>
                  <p>
                    <strong>GAMESMITH</strong> | A DISCOVERY COMMUNICATION
                    COMPANY
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className={s.websiteName}>
                <p>WWW.GAMESMITH.COM</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
Payments.propTypes = {
  params: PropTypes.object.isRequired,
  onOpenPayment: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

export default connect(selectPayments(), (dispatch) => ({
  dispatch,
  onOpenPayment: (plan) => dispatch(openPayment(plan)),
  onSignIn: () => dispatch(openSignIn()),
}))(Payments);
