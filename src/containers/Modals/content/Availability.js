/*
 * Availability modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectUser } from "containers/App/selectors";
import { selectMaker } from "containers/Maker/selectors";

import { makerRequest } from "containers/Maker/actions";
import { availabilityRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import AvailabilityForm from "components/AvailabilityForm";
import JobIcon from "../../../data/icons/job.png";
import JobIconMobile from "../../../data/icons/Briefcase Pin.svg";

class Availability extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(availabilityRequest({ values, resolve, reject }));
    });

  render() {
    const {
      user: {
        maker: { status },
      },
      maker,
      className = "",
      isOpen,
      onCloseModal,
    } = this.props;
    const ismobile = window.innerWidth <= 1150;
    return (
      <Modal
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
        titleImage={ismobile ? JobIconMobile : JobIcon}
      >
        <AvailabilityForm
          initialValues={{
            status,
            availability:
              maker && maker.availability && maker.availability.length > 2
                ? maker.availability
                : "not available",
          }}
          onSubmit={this.onSubmit}
        />
      </Modal>
    );
  }
}

Availability.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  maker: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onGetMaker: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    maker: selectMaker(),
  }),
  (dispatch) => ({
    dispatch,
    onGetMaker: (id) => dispatch(makerRequest(id)),
  })
)(Availability);
