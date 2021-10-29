/*
 * ApplicationReceived modal
 */

import React from "react";
import PropTypes from "prop-types";

import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
import requestSent from "../../../data/icons/request-sent.png";

const style = {
  fontWeight: 400,
  fontSize: "90px !important",
};
const title = (
  <div>
    <h3 style={{ color: "#ffffff", fontSize: "1.4rem" }}>
      Application received!
    </h3>
  </div>
);
const ismobile = window.innerWidth <= 1150;

const ApplicationReceived = ({ isOpen, onCloseModal }) => (
  <Modal
    isOpen={isOpen}
    closeModal={onCloseModal}
    image={requestSent}
    imageStyle={ismobile ? { width: "90px", marginBottom: "40px" } : {}}
  >
    <div className="row">
      {/* <div className="col-sm-12" style={{ textAlign: 'center' }}>*/}
      {/*    <p style={{ fontSize: '1.43rem', fontWeight: '450', color: '#ffffff' }}> Application Received!</p>*/}
      {/* </div>*/}
    </div>
    <div className="row">
      <div className="col-sm-3"></div>
      <div className="col-sm-6">
        <p
          style={
            !ismobile
              ? { fontSize: "1.2rem", fontWeight: "450", color: "#ffffff" }
              : { fontSize: "24px", fontWeight: "250", color: "#ffffff" }
          }
        >
          Check your inbox for onboarding instructions.
        </p>
      </div>
      <div className="col-sm-3"></div>
    </div>

    <div className="row">
      <div className="col-sm-12">
        <p
          style={
            !ismobile
              ? { fontSize: "1.2rem", fontWeight: "450", color: "#ffffff" }
              : { fontSize: "24px", fontWeight: "250", color: "#ffffff" }
          }
        >
          Thank you!
        </p>
      </div>
    </div>
    <Button
      style={
        ismobile
          ? {
              width: "219px",
              marginTop: "1rem !important",
              marginBottom: "50px",
            }
          : { marginTop: "1rem !important" }
      }
      onClick={onCloseModal}
      text="OK"
    />
  </Modal>
);

ApplicationReceived.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ApplicationReceived;
