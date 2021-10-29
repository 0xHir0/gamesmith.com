/*
 * Edit container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty, isEqual, trim, map, toInteger } from "lodash";
import { createStructuredSelector } from "reselect";
import langs from "langs";
import { updateProfileRequest } from "./actions";
import {
  getAutocompleteRequest,
  getCountriesRequest,
} from "containers/App/actions";
import { makerRequest } from "containers/Maker/actions";
import {
  openEditEmail,
  openEditLinkedInEmail,
} from "containers/Modals/actions";

import {
  selectUser,
  selectCountries,
  selectIsFetchingCountries,
} from "containers/App/selectors";
import { selectMaker } from "containers/Maker/selectors";

import UpdateProfile from "components/UpdateProfile";
import JobFamilyData from "../../data/jobPassions";

import s from "./styles.module.scss";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoCountryId:
        this.props.maker &&
        this.props.maker.additionalInfo &&
        this.props.maker.additionalInfo[0].address &&
        this.props.maker.additionalInfo[0].address.countryId,
      geoStateId:
        this.props.maker &&
        this.props.maker.additionalInfo &&
        this.props.maker.additionalInfo[0].address &&
        this.props.maker.additionalInfo[0].address.stateId,
      socialLinksError: null,
      isCheck: false,
    };
  }

  componentDidMount() {
    const { user, onGetMaker, onGetCountries, maker } = this.props;
    onGetMaker(user.id);
    onGetCountries();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.maker, this.props.maker)) {
      this.setState({
        geoCountryId:
          nextProps.maker &&
          nextProps.maker.additionalInfo &&
          nextProps.maker.additionalInfo[0].address &&
          nextProps.maker.additionalInfo[0].address.countryId,
        geoStateId:
          nextProps.maker &&
          nextProps.maker.additionalInfo &&
          nextProps.maker.additionalInfo[0].address &&
          nextProps.maker.additionalInfo[0].address.stateId,
      });
    }
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

  setLanguagesArray = () => {
    const langList = langs.names();
    const result = map(langList, (value) => {
      return { label: trim(value), value: trim(value) };
    });
    return result;
  };
  setWorkCategories = (WorkCategories, id) => {
    if (WorkCategories.includes(id)) {
      WorkCategories.splice(WorkCategories.indexOf(id), 1);
    } else {
      WorkCategories.push(id);
    }
    this.setState({ isCheck: true });
  };

  parseLanguageString() {
    const { maker } = this.props;
    const languagesList = maker.additionalInfo[0].language.split(",");
    const result = map(languagesList, (value) => {
      return { label: trim(value), value: trim(value) };
    });
    return result;
  }

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const {
        maker: { connections, credits, imgUrl, additionalInfo },
      } = this.props;
      if (
        this.state.geoCountryId == "WLS" ||
        this.state.geoCountryId == "SCT" ||
        this.state.geoCountryId == "ENG" ||
        this.state.geoCountryId == "NIR"
      ) {
        values.state = null;
        dispatch(
          updateProfileRequest({
            values,
            countryId: this.state.geoCountryId,
            stateId: null,
            addressId:
              additionalInfo && additionalInfo[0].address
                ? additionalInfo[0].address.id
                : -1,
            resolve,
            reject,
            connections,
            credits,
            imgUrl,
            workCategories: this.props.maker.workCategories,
          })
        );
      } else {
        dispatch(
          updateProfileRequest({
            values,
            countryId: this.state.geoCountryId,
            stateId: this.state.geoStateId,
            addressId:
              additionalInfo && additionalInfo[0].address
                ? additionalInfo[0].address.id
                : -1,
            resolve,
            reject,
            connections,
            credits,
            imgUrl,
            workCategories: this.props.maker.workCategories,
          })
        );
      }
    });

  getSuggestions = (data) => this.props.handleAutoComplete(data);

  onNext = () => {
    const { dispatch } = this.props;
    dispatch(openEditEmail());
  };

  removeProfileContent = (profileContent, index) => {
    const content = profileContent.filter(
      (pc) => !pc.icon.value || !pc.url.value
    );
    if (
      !isEmpty(content) &&
      content.length === 1 &&
      (!profileContent[index].url.value || !profileContent[index].icon.value)
    ) {
      this.setSocialLinksError(false);
    }
    profileContent.removeField(index);
  };

  setSocialLinksError = (isFieldEmpty) => {
    if (isFieldEmpty) {
      this.setState({ socialLinksError: "Field can't be blank" });
    } else {
      this.setState({ socialLinksError: "" });
    }
  };

  render() {
    const {
      user,
      maker,
      onEditLinkedInEmail,
      countryOptions,
      isFetchingCountries,
    } = this.props;
    const jobFamilyId =
      maker.additionalInfo && maker.additionalInfo[0].jobsFamily
        ? maker.additionalInfo[0].jobsFamily
        : null;
    const jobFamilyData = jobFamilyId
      ? JobFamilyData.filter((x) => x.id === jobFamilyId)
      : [];
    return (
      <main role="main" className={s.root}>
        {!isEmpty(maker) && !isFetchingCountries && (
          <div>
            <div className={s.top}>
              <h1>Edit Profile Info</h1>
            </div>
            <div className={s.steps}>
              <UpdateProfile
                maker={maker}
                initialValues={{
                  ...user,
                  ...maker,
                  availability:
                    maker.availability && maker.availability.length > 2
                      ? maker.availability
                      : "not available",
                  country:
                    maker.additionalInfo &&
                    maker.additionalInfo[0].address &&
                    maker.additionalInfo[0].address.country,
                  state:
                    maker.additionalInfo &&
                    maker.additionalInfo[0].address &&
                    maker.additionalInfo[0].address.state,
                  city:
                    maker.additionalInfo &&
                    maker.additionalInfo[0].address &&
                    maker.additionalInfo[0].address.city,
                  languages:
                    maker.additionalInfo && maker.additionalInfo[0].language
                      ? this.parseLanguageString()
                      : "",
                  socialLinks:
                    maker.additionalInfo &&
                    maker.additionalInfo[0].socialProfileLink
                      ? maker.additionalInfo[0].socialProfileLink
                      : [],
                  jobsFamily:
                    jobFamilyData && jobFamilyData[0]
                      ? jobFamilyData[0].value
                      : "",
                  isStudent: maker && maker.isStudent,
                  school: maker && maker.school,
                  major: maker && maker.major,
                }}
                workCategories={maker.workCategories}
                isLinkedInUser={
                  maker.additionalInfo
                    ? maker.additionalInfo[0] &&
                      maker.additionalInfo[0].isLinkedInUser
                      ? maker.additionalInfo[0].isLinkedInUser
                      : false
                    : false
                }
                onSubmit={this.onSubmit}
                onGetSuggestions={this.getSuggestions}
                onEmail={this.onNext}
                onEditLinkedInEmail={onEditLinkedInEmail}
                languageOptions={this.setLanguagesArray()}
                countryOptions={countryOptions}
                cId={
                  maker.additionalInfo &&
                  maker.additionalInfo[0].address &&
                  maker.additionalInfo[0].address.countryId
                }
                sId={
                  maker.additionalInfo &&
                  maker.additionalInfo[0].address &&
                  maker.additionalInfo[0].address.stateId
                }
                setGeoCountryId={this.setGeoCountryId}
                setGeoStateId={this.setGeoStateId}
                socialLinksError={this.state.socialLinksError}
                removeProfileContent={this.removeProfileContent}
                setSocialLinksError={this.setSocialLinksError}
                setWorkCategories={this.setWorkCategories}
              />
            </div>
          </div>
        )}
      </main>
    );
  }
}

Edit.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  maker: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onGetMaker: PropTypes.func.isRequired,
  onEditLinkedInEmail: PropTypes.func.isRequired,
  handleAutoComplete: PropTypes.func.isRequired,
  onGetCountries: PropTypes.func.isRequired,
  countryOptions: PropTypes.array.isRequired,
  isFetchingCountries: PropTypes.bool.isRequired,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    maker: selectMaker(),
    countryOptions: selectCountries(),
    isFetchingCountries: selectIsFetchingCountries(),
  }),
  (dispatch) => ({
    dispatch,
    onGetMaker: (id) => dispatch(makerRequest(id)),
    onEditLinkedInEmail: () => dispatch(openEditLinkedInEmail()),
    handleAutoComplete: (data) => dispatch(getAutocompleteRequest(data)),
    onGetCountries: () => dispatch(getCountriesRequest()),
  })
)(Edit);
