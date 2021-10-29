/*
 * Sign Up Container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import s from "./styles.module.scss";
import CreateProfile from "components/CreateProfile";
import AddOpportunities from "components/AddOpportunities";
import AddGame from "components/AddGame";

import {
  getAutocompleteRequest,
  getCountriesRequest,
} from "containers/App/actions";
import {
  selectCountries,
  selectIsFetchingCountries,
} from "containers/App/selectors";
import { createAccountRequest, checkEmailRequest } from "./actions";
import { toInteger } from "lodash";
import { selectIsError, selectCvUrl } from "./selectors";
import { openAddGameGuide } from "../Modals/actions";
import ReactPixel from "react-facebook-pixel";
export const fields = [
  "firstName",
  "lastName",
  "emailAddress",
  "password",
  "currCompany",
  "currRole",
  "country",
  "state",
  "city",
  "isStudent",
  "degree",
  "university",
  "workCategories[].id",
  "phoneNumber",
  "makerCvUrl",
  "isGameMaker",
  "currGame",
  "startYear",
  "endYear",
  "platforms[].id",
];

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStudent: false,
      isCheck: false,
      isGameMaker: false,
      formComplete: 0,
      value: "",
      page: 1,
      values: {},
      cv: "",
      geoCountryId: "",
      geoStateId: "",
    };
  }
  componentDidMount() {
    const { onGetCountries } = this.props;
    onGetCountries();
  }
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
  getSuggestions = (data) => this.props.handleAutoComplete(data);
  setWorkCategories = (workCategories, e, selectedWorkCategories) => {
    const index = selectedWorkCategories.indexOf(toInteger(e.target.value));
    if (e.target.checked) {
      workCategories.addField({ id: toInteger(e.target.value) });
    } else {
      workCategories.removeField(index);
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
  nextPage = () => {
    this.setState({ page: this.state.page + 1 }, () =>
      this.props.handleStep(this.state.page)
    );
  };
  checkEmailAndNextPage = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(checkEmailRequest(values.email, resolve, reject));
    }).then(() => {
      if (!this.props.isError) {
        this.setState({ page: this.state.page + 1 }, () =>
          this.props.handleStep(this.state.page)
        );
      }
    });

  previousPage = () => {
    this.setState({ page: this.state.page - 1 }, () =>
      this.props.handleStep(this.state.page)
    );
  };
  uploadedCv = (value) => {
    this.setState({ cv: value });
  };
  handleGameMaker = (value) => {
    this.setState({ isGameMaker: value });
  };
  handleStudent = (value) => {
    this.setState({ isStudent: value });
  };
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      if (this.state.isStudent) values.currRole = "Student";
      values.cvUrl = this.props.cvUrl;
      dispatch(createAccountRequest({ values, resolve, reject }));
    });

  render() {
    const { cId, sId, countryOptions, isError, handleStep, cvUrl } = this.props;
    const { geoStateId, geoCountryId } = this.state;
    return (
      <div>
        <div className={s.root}>
          {this.state.page === 1 && (
            <CreateProfile
              setGeoStateId={this.setGeoStateId}
              setGeoCountryId={this.setGeoCountryId}
              countryOptions={countryOptions}
              cId={geoCountryId}
              sId={geoStateId}
              onGetSuggestions={this.getSuggestions}
              student={this.state.isStudent}
              handleStudent={this.handleStudent}
              onSubmit={this.checkEmailAndNextPage}
            />
          )}
          {this.state.page === 2 && (
            <AddOpportunities
              setWorkCategories={this.setWorkCategories}
              previousPage={this.previousPage}
              uploadedCv={this.uploadedCv}
              onSubmit={this.nextPage}
            />
          )}
          {this.state.page === 3 && (
            <AddGame
              student={this.state.isStudent}
              setPlatforms={this.setPlatforms}
              onGetSuggestions={this.getSuggestions}
              previousPage={this.previousPage}
              isGameMaker={this.state.isGameMaker}
              handleGameMaker={this.handleGameMaker}
              onSubmit={this.onSubmit}
            />
          )}
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  fields: PropTypes.object,
  countryOptions: PropTypes.array,
  handleAutoComplete: PropTypes.func,
  onGetCountries: PropTypes.func,
  setWorkCategories: PropTypes.func,
  onGetSuggestions: PropTypes.func,
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleStep: PropTypes.func,
  error: PropTypes.string,
  isError: PropTypes.bool,
  cvUrl: PropTypes.string,
};

export default connect(
  createStructuredSelector({
    isFetchingCountries: selectIsFetchingCountries(),
    countryOptions: selectCountries(),
    isError: selectIsError(),
    cvUrl: selectCvUrl(),
  }),
  (dispatch) => ({
    dispatch,
    onGetCountries: () => dispatch(getCountriesRequest()),
    handleAutoComplete: (data) => dispatch(getAutocompleteRequest(data)),
  })
)(SignUp);
