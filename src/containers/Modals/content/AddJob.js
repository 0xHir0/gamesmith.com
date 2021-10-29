/*
 * Add Job modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { toInteger } from "lodash";
import { createStructuredSelector } from "reselect";
import Modal from "components/UI/Modal";
import AddJobForm from "components/AddJobForm";

import { addJobRequest } from "containers/Recruiter/actions";
import { selectedCV } from "containers/App/actions";
import { selectCVOptionSelected } from "containers/App/selectors";

class AddJob extends Component {
  constructor(props) {
    super(props);
    const val = this.props.gtOption ? this.props.gtOption : "no";
    this.state = {
      geoCountryId: "",
      geoStateId: "",
      selectedValue: "no",
      selectGTValue: val,
    };
  }

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      let newValues = values;
      if (localStorage.getItem("selectedCVOption") === "yes") {
        values.cvOption = "yes";
      } else {
        values.cvOption = this.props.selectedCVOption;
      }
      values.gtOption = localStorage.getItem("gtOption");
      dispatch(
        addJobRequest({
          countryId: this.state.geoCountryId,
          stateId: this.state.geoStateId,
          values,
          resolve,
          reject,
        })
      );
      localStorage.removeItem("selectedCVOption");
      this.props.selectOption("no");
    });

  setGeoCountryId = (val) => {
    this.setState({
      geoCountryId: val,
    });
  };

  setGeoStateId = (val) => {
    this.setState({
      geoStateId: val,
    });
  };

  setWorkCategories = (workCategories, e, selectedWorkCategories) => {
    const i = selectedWorkCategories.indexOf(toInteger(e.target.value));
    if (e.target.checked) {
      workCategories.addField({ id: toInteger(e.target.value) });
    } else {
      workCategories.removeField(i);
    }
  };

  setPlatforms = (platforms, e, selectedPlatforms) => {
    const index = selectedPlatforms.indexOf(toInteger(e.target.value));
    if (e.target.checked) {
      platforms.addField({ id: toInteger(e.target.value) });
    } else {
      platforms.removeField(index);
    }
  };
  handleCVOption = (val) => {
    this.props.selectOption(val);
  };
  handleGTOption = (val) => {
    // this.props.selectGTOption(val);
    this.setState({ selectGTValue: val });
  };
  render() {
    const {
      className = "",
      crossClassname = "",
      isOpen,
      onCloseModal,
      data: { studioId, countryOptions },
      countries,
    } = this.props;
    return (
      <Modal
        title="Posting a Job"
        className={className}
        crossClassname={crossClassname}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <AddJobForm
          onSubmit={this.onSubmit}
          setPlatforms={this.setPlatforms}
          initialValues={{
            studioId,
            cvOption: this.state.selectedValue,
          }}
          gtOption={this.state.selectGTValue}
          setGeoCountryId={this.setGeoCountryId}
          setGeoStateId={this.setGeoStateId}
          countryId=""
          stateId=""
          selectedValue={this.props.selectedCVOption}
          handleCVOption={this.handleCVOption}
          handleGTOption={this.handleGTOption}
          countryOptions={countryOptions}
          setWorkCategories={this.setWorkCategories}
        />
      </Modal>
    );
  }
}

AddJob.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  countryOptions: PropTypes.array,
  className: PropTypes.string,
  selectOption: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    selectedCVOption: selectCVOptionSelected(),
  }),
  (dispatch) => ({
    dispatch,
    selectOption: (val) => dispatch(selectedCV(val)),
  })
)(AddJob);
