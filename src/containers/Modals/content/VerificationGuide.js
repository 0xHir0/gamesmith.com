/*
 * Proceed to addGameGuide
 */

/*
 * Proceed to JobSearchGuide
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { openConnectionGuide } from "containers/Modals/actions";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
import s from "containers/Modals/styles.module.scss";
import logo from "containers/Header/svg/logo.svg";
import verify from "data/images/verify.png";

class VerificationGuide extends Component {
  render() {
    const { className = "", isOpen, onCloseModal, onNext } = this.props;
    return (
      <Modal
        title="Welcome to the largest game professional network!"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
        titleImage={logo}
        image={verify}
        imageStyle={s.verifyImg}
      >
        <p>
          Verify peers' game credits and get verified in return{" "}
          <i className={s.line} /> All discovery results are sorted by
          verification score
        </p>
        <Button onClick={() => onNext()} text="NEXT" />
      </Modal>
    );
  }
}

VerificationGuide.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onNext: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onNext: () => dispatch(openConnectionGuide()),
}))(VerificationGuide);
