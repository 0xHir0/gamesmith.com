/*
 * Proceed to connectionsGuide
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { openJobSearchGuide } from "containers/Modals/actions";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
import s from "containers/Modals/styles.module.scss";
import logo from "containers/Header/svg/logo.svg";
import connection from "data/images/connection.png";

class ConnectionsGuide extends Component {
  render() {
    const { className = "", isOpen, onCloseModal, onNext } = this.props;
    return (
      <Modal
        title="Welcome to the largest game professional network!"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
        titleImage={logo}
        imageStyle={s.connectImg}
        image={connection}
      >
        <p>
          Invite, connect or message fellow game makers to build your game
          verified network.
        </p>
        <Button onClick={() => onNext()} text="NEXT" />
      </Modal>
    );
  }
}

ConnectionsGuide.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onNext: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onNext: () => dispatch(openJobSearchGuide()),
}))(ConnectionsGuide);
