import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import ClaimForm from "components/ClaimForm";
import { claimProfileRequest } from "containers/App/actions";

import s from "containers/Modals/styles.module.scss";

class Claim extends React.Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(claimProfileRequest(values, this.props.data, resolve, reject));
    });

  render() {
    const { className = "", isOpen, onCloseModal, data } = this.props;
    return (
      <Modal
        title="Claim Request "
        className={`${className}${s.titleStyle}`}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <ClaimForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}
Claim.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  gameID: PropTypes.number,
  onOpenClaimProfile: PropTypes.func,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(Claim);
