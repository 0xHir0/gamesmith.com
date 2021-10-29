/*
 * Edit Job modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toInteger } from "lodash";
import Modal from "components/UI/Modal";
import AddJobForm from "components/AddJobForm";
import { editJobRequest } from "containers/Recruiter/actions";
import { getCountriesRequest } from "containers/App/actions";
import JobFamilyData from "../../../data/jobFamily";
import { selectedCV } from "../../../containers/App/actions";
import {
  selectCVOptionSelected,
  hasGotOption,
} from "../../../containers/App/selectors";

class EditJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoCountryId: this.props.data.countryId,
      geoStateId: this.props.data.stateId,
      selectedValue: this.props.data.cvOption,
    };
  }

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      if (
        this.state.geoCountryId === "WLS" ||
        this.state.geoCountryId === "SCT" ||
        this.state.geoCountryId === "ENG" ||
        this.state.geoCountryId === "NIR" ||
        this.state.geoCountryId === "VA"
      ) {
        // values.cvOption =  this.props.hasGotOption ? this.props.selectedCVOption : this.props.data.cvOption;
        values.state = null;
        const cvOpt = localStorage.getItem("selectedCVOption");
        values.cvOption = cvOpt;
        values.gtOption = localStorage.getItem(`gtOption${values.jobId}`);
        if (this.state.geoCountryId === "VA") {
          values.city = null;
          dispatch(
            editJobRequest({
              domain: this.props.data.domain,
              countryId: this.state.geoCountryId,
              stateId: null,
              values,
              resolve,
              reject,
            })
          );
          localStorage.removeItem("selectedCVOption");
        } else {
          dispatch(
            editJobRequest({
              domain: this.props.data.domain,
              countryId: this.state.geoCountryId,
              stateId: null,
              values,
              resolve,
              reject,
            })
          );
          localStorage.removeItem("selectedCVOption");
        }
      } else {
        values.cvOption = this.props.hasGotOption
          ? this.props.selectedCVOption
          : this.props.data.cvOption;
        const cvOpt = localStorage.getItem("selectedCVOption");
        values.cvOption = cvOpt;
        values.gtOption = localStorage.getItem(`gtOption${values.jobId}`);
        dispatch(
          editJobRequest({
            domain: this.props.data.domain,
            countryId: this.state.geoCountryId,
            stateId: this.state.geoStateId,
            values,
            resolve,
            reject,
          })
        );
        localStorage.removeItem("selectedCVOption");
      }
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
  setFamilies = (family) => {
    const data = family.map((f) => JobFamilyData.filter((x) => x.label === f));
    return data.map((x) => x[0]);
  };

  handleCVOption = (val) => {
    this.props.selectOption(val);
  };
  render() {
    const {
      className = "",
      crossClassname = "",
      hasGotOption,
      selectedCVOption,
      isOpen,
      onCloseModal,
      onEditJob,
      data: {
        id,
        platforms,
        jobFamilyId,
        studioId,
        role,
        startDate,
        expiredAt,
        description,
        imgUrl,
        location,
        country,
        state,
        city,
        domain,
        countryId,
        stateId,
        countryOptions,
        jobsFamily,
        youtubeVideoUrl,
        cvOption,
        gtOption,
        workCategories,
      },
    } = this.props;
    return (
      <Modal
        title="Edit Job"
        crossClassname={crossClassname}
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <AddJobForm
          onSubmit={this.onSubmit}
          initialValues={{
            jobId: id ? id : this.props.id,
            role,
            studioId,
            startDate,
            expiredAt,
            location,
            country,
            state,
            city,
            platforms,
            jobFamily: jobFamilyId && jobFamilyId.toString(), //domain === 'recruiter' && jobsFamily ? jobsFamily : domain === 'recruiter' && families ? families : domain === 'studio' ? jobFamilies : families,
            description,
            imgUrl,
            youtubeVideoUrl,
            cvOption,
            workCategories,
          }}
          gtOption={gtOption}
          cId={countryId}
          sId={stateId}
          setGeoCountryId={this.setGeoCountryId}
          setGeoStateId={this.setGeoStateId}
          countryOptions={countryOptions}
          isEditingJob
          selectedValue={cvOption}
          setPlatforms={this.setPlatforms}
          setWorkCategories={this.setWorkCategories}
        />
      </Modal>
    );
  }
}

EditJob.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  crossClassname: PropTypes.string,
  selectOption: PropTypes.func,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    platforms: PropTypes.array,
    workCategories: PropTypes.array,
    role: PropTypes.string,
    applied: PropTypes.bool,
    company: PropTypes.string,
    startDate: PropTypes.string,
    expiredAt: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    imgUrl: PropTypes.string,
    country: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    countryOptions: PropTypes.array.isRequired,
  }),
};

export default connect(
  createStructuredSelector({
    selectedCVOption: selectCVOptionSelected(),
    hasGotOption: hasGotOption(),
  }),
  (dispatch) => ({
    dispatch,
    selectOption: (val) => dispatch(selectedCV(val)),
  })
)(EditJob);
