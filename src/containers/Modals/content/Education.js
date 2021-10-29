/*
 * Add Education modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Modal from "components/UI/Modal";
import EducationForm from "components/EducationForm";
import {
  updateEducationRequest,
  getAutocompleteRequest,
} from "containers/App/actions";
import EducationIcon from "../../../data/icons/education.png";

// import EducationIcon from '../../../data/icons/education.png';

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(updateEducationRequest({ values, resolve, reject }));
    });
  };

  getSuggestions = (data) => this.props.handleAutoComplete(data);

  render() {
    const { className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title="Education"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
        titleImage={EducationIcon}
      >
        <EducationForm
          initialValues={{}}
          onGetSuggestions={this.getSuggestions}
          onSubmit={this.onSubmit}
        />
      </Modal>
    );
  }
}

Education.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  handleAutoComplete: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  handleAutoComplete: (data) => dispatch(getAutocompleteRequest(data)),
}))(Education);
