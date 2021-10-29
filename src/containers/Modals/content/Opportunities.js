/*
 * Add Opportunities modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Modal from "components/UI/Modal";
import OpportunitiesForm from "components/OpportunitiesForm";
import { updateOpportunitiesRequest } from "containers/App/actions";
import { selectMaker } from "containers/Maker/selectors";
import { makerRequest } from "containers/Maker/actions";
import OpportunitiesIcon from "../../../data/icons/opportunities.png";

class Opportunities extends Component {
  onSubmit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(
        updateOpportunitiesRequest({
          values,
          resolve,
          reject,
          workCategories: this.props.maker.workCategories,
        })
      );
    });
  };
  setWorkCategories = (WorkCategories, id) => {
    if (WorkCategories.includes(id)) {
      WorkCategories.splice(WorkCategories.indexOf(id), 1);
    } else {
      WorkCategories.push(id);
    }
    this.setState({ isCheck: true });
  };

  render() {
    const { maker } = this.props;
    const { className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title="Opportunities"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
        titleImage={OpportunitiesIcon}
      >
        <OpportunitiesForm
          initialValues={{}}
          workCategories={maker.workCategories}
          setWorkCategories={this.setWorkCategories}
          onSubmit={this.onSubmit}
        />
      </Modal>
    );
  }
}

Opportunities.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  maker: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default connect(
  createStructuredSelector({
    maker: selectMaker(),
  }),
  (dispatch) => ({
    dispatch,
    onGetMaker: (id) => dispatch(makerRequest(id)),
  })
)(Opportunities);
