/*
 * Applicant details modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Modal from "components/UI/Modal";
import ApplicantDetail from "components/ApplicantDetails";
import { openApplicantDetails, openMyCv } from "containers/Modals/actions";
import { createStructuredSelector } from "reselect";

class ApplicantDetails extends Component {
  render() {
    const {
      className = "",
      crossClassname = "",
      onApplicantDetails,
      isOpen,
      onViewMyCv,
      onCloseModal,
      maker,
    } = this.props;
    return (
      <Modal
        title=""
        className={className}
        crossClassname={crossClassname}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <ApplicantDetail
          maker={maker}
          onApplicantDetails={onApplicantDetails}
          onCloseModal={onCloseModal}
          onViewMyCv={onViewMyCv}
        />
      </Modal>
    );
  }
}

ApplicantDetails.propTypes = {
  maker: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onApplicantDetails: PropTypes.func.isRequired,
  className: PropTypes.string,
  crossClassname: PropTypes.string,
  onViewMyCv: PropTypes.func,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onApplicantDetails: () => dispatch(openApplicantDetails()),
  onViewMyCv: (makerCvUrl) => dispatch(openMyCv(makerCvUrl)),
}))(ApplicantDetails);
