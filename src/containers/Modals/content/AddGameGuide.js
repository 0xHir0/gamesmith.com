/*
 * Proceed to addGameGuide
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { openVerificationGuide } from "containers/Modals/actions";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
import s from "containers/Modals/styles.module.scss";
import logo from "containers/Header/svg/logo.svg";
import plus from "data/images/plus.png";

class AddGameGuide extends Component {
  render() {
    const { className = "", isOpen, onCloseModal, onNext } = this.props;
    const title = (
      <div>
        <div>
          <h3 style={{ color: "#ffffff", fontSize: "1.4rem" }}>Welcome!</h3>
        </div>
      </div>
    );
    return (
      <Modal
        title=""
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
        modalName={"Welcome"}
      >
        <div>
          <h2 style={{ fontWeight: "400" }}>Welcome!</h2>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <p style={{ textAlign: "center", color: "white" }}>
              Congratulations on receiving a verified Gamesmith profile.
            </p>
          </div>
          <div className="col-sm-3"></div>
        </div>
        <div className="row">
          <div
            className="col-sm-12"
            style={{ textAlign: "center", color: "white" }}
          >
            <h3 style={{ fontWeight: "500" }}>What's Next?</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10" style={{ color: "white" }}>
            <p style={{ color: "white" }}>
              Add the games you've worked on, verify your peers, discover new
              opportunities, studios and more...
            </p>
          </div>
          <div className="col-sm-1"></div>
        </div>

        <Button
          onClick={onCloseModal}
          className={s.startExploringBtn}
          text="Start Exploring"
        />
      </Modal>
    );
  }
}

AddGameGuide.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onNext: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onNext: () => dispatch(openVerificationGuide()),
}))(AddGameGuide);
