/*
 * Proceed to JobSearchGuide
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { openStartMessage } from "containers/Modals/actions";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
import s from "containers/Modals/styles.module.scss";
import logo from "containers/Header/svg/logo.svg";
import job from "data/images/job-search.png";

class JobSearchGuide extends Component {
  render() {
    const { className = "", isOpen, onCloseModal, onNext } = this.props;
    return (
      <Modal
        title="Welcome to the largest game professional network!"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
        titleImage={logo}
        image={job}
        imageStyle={s.jobImg}
      >
        <p>
          Discover exclusive job opportunities, not available in the public
          domain.
        </p>
        <Button onClick={() => onNext()} text="NEXT" />
      </Modal>
    );
  }
}

JobSearchGuide.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onNext: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onNext: () => dispatch(openStartMessage()),
}))(JobSearchGuide);
