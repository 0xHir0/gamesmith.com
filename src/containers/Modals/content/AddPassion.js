/*
 * Availability modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { createStructuredSelector } from "reselect";

import { selectUser } from "containers/App/selectors";
import { selectMaker } from "containers/Maker/selectors";

import { makerRequest } from "containers/Maker/actions";
import { addPassionRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import PassionForm from "components/PassionForm";
import heartIcon from "../../../data/icons/heart.png";

class AddPassion extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const makerId = this.props.user && this.props.user.id;
      Object.assign(values, { makerId });
      dispatch(addPassionRequest({ values, resolve, reject }));
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
    return (
      <Modal
        className={className}
        title="What's Your Career Passion?"
        isOpen={isOpen}
        closeModal={onCloseModal}
        titleImage={heartIcon}
      >
        <p style={{ marginBottom: "3rem" }}>
          Help us serve you relevent content, introduce you to team members,
          market leaders, jobs, news and more.
        </p>
        <PassionForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

AddPassion.propTypes = {
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
)(AddPassion);
