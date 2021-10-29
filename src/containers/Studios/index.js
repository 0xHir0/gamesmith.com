/*
 * Studios container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { createStructuredSelector } from "reselect";

import {
  studiosRequest,
  studioSearch,
  toggleSearch,
  nextPageRequest,
  getRecruiterStudioRequest,
} from "./actions";

import StudioCardNew from "components/StudioCardNew";
import StudioFiltersForm from "components/StudioFiltersForm";
import bannerPlaceholder from "../../data/images/banner-placeholder.png";
import logoPlaceholder from "../../data/images/logo-placeholder.jpg";
import basisCoverImage from "../Home/img/bg.jpg";
import { selectCountries, selectUser } from "../App/selectors";
import Button from "components/UI/Button";
import platformsList from "../../data/studioPlatforms";

import {
  selectStudios,
  selectSearch,
  selectIsSearching,
  selectIsFetching,
  selectOffset,
  selectIsLastPage,
  selectRecruiterStudio,
} from "./selectors";

import { openAddStudio } from "../Modals/actions";

import s from "./styles.module.scss";
import { getAutocompleteRequest } from "../App/actions";
import { checkAuthToken, getSizeId } from "../../utils";

class Studios extends Component {
  state = {
    showScroller: false,
  };

  componentDidMount() {
    const {
      onGetStudios,
      location: { query },
      studiosSearch,
      user,
      onGetRecruiterStudio,
      recruitersOwnStudio,
    } = this.props;
    if ({}.hasOwnProperty.call(query, "search")) {
      studiosSearch({
        values: {
          studioName: this.getQueryValue(query, "studioName"),
          country: this.getQueryValue(query, "country"),
          platform: this.getQueryValue(query, "platform"),
          size: this.getQueryValue(query, "size"),
        },
      });
    } else {
      onGetStudios();
      if (user && user.recruiter) {
        onGetRecruiterStudio(user.recruiter.companyId);
      }
    }
  }
  getQueryValue = (query, key) => {
    return {}.hasOwnProperty.call(query, key) ? query[key] : "";
  };

  handleNextPageRequest = () => {
   
    const {
      location: { query },
      getNextPage,
      isFetching,
      isSearching,
      isLastPage,
      search,
      studios,
    } = this.props;
    const url = isSearching ? "searchstudio" : "browse/company";
    const queryUrl = isSearching ? this.searchString(query) : "";
    const offset = isSearching ? search.length : studios.length;
    // if (((window.innerHeight + this.getScrollYPosition()) / document.body.scrollHeight) >= 0.7) {
    !isFetching && !isLastPage && getNextPage(url, offset, queryUrl);
    // }
    if (this.getScrollYPosition() >= 710) {
      this.setState({
        showScroller: true,
      });
    } else {
      this.setState({
        showScroller: false,
      });
    }
   
  };

  searchString = (obj) => {
    
    let searchString = "search=true";
    if (obj.studioName) {
      searchString += `&studioName=${obj.studioName}`;
    }
    if (obj.country) {
      searchString += `&country=${obj.country}`;
    }
    if (obj.platform) {
      searchString += `&platform=${obj.platform}`;
    }
    if (obj.size) {
      searchString += `&size=${getSizeId(obj.size)}`;
    }
    return searchString;
  };

  getSuggestions = (data) => this.props.handleAutoComplete(data);

  getPlatformIds = (values) => {
    if (values.platform && typeof values.platform != "string") {
      values.platform = values.platform.map((v) => {
        return v.value;
      });
    }
    return values;
  };
  getPlatformNames = (ids) => {
    const arrayOfIds = ids.split(",");
    const platformArray = [];
    arrayOfIds.map((id) =>
      platformsList.map(
        (platform) =>
          id === platform.value.toString() && platformArray.push(platform)
      )
    );
    return platformArray;
  };

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      console.log('here1')
      values = this.getPlatformIds(values);
      console.log("here2");
      dispatch(studioSearch({ values, resolve, reject }));
    });

  getScrollYPosition = () => {
    const scrollLength =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    return scrollLength;
  };

  scrollPage() {
    document.getElementById("scorlldivStudio").scrollIntoView(true);
  }
  addStudio = () => {
    window.location.href = "https://gamesmith.com/for-studios/ ";
  };
  render() {
    const {
      location: { query },
      studios,
      search,
      isFetching,
      isSearching,
      isLastPage,
      onAddStudio,
      doc,
      user,
      recruitersOwnStudio,
    } = this.props;
    let studioList;
    let recruiterStudio;
    if (user && user.recruiter) {
      studioList = (isSearching ? search : studios).filter(
        (p) => p.id !== user.recruiter.companyId
      );
      const getStudio = (isSearching ? search : studios).filter(
        (p) => p.id === user.recruiter.companyId
      );
      recruiterStudio = getStudio[0] || null; // eslint-disable-line
    }

    const studioSlug =
      recruitersOwnStudio &&
      recruitersOwnStudio.studioAdditionalInfo &&
      recruitersOwnStudio.studioAdditionalInfo[0] &&
      recruitersOwnStudio.studioAdditionalInfo[0].slug;
    const recruiterStudioJobCount =
      recruitersOwnStudio &&
      recruitersOwnStudio.studioAdditionalInfo &&
      recruitersOwnStudio.studioAdditionalInfo[0] &&
      recruitersOwnStudio.studioAdditionalInfo[0].jobCount;
    return (
      <main role="main" className={s.root}>
        <div id="scorlldivStudio"></div>
        <h3 className={s.studioHeading}>Studios</h3>
        <div className={s.top}>
          <StudioFiltersForm
            initialValues={{
              studioName: {}.hasOwnProperty.call(query, "studioName")
                ? query.studioName
                : "",
              country: {}.hasOwnProperty.call(query, "country")
                ? query.country
                : "",
              platform: {}.hasOwnProperty.call(query, "platform")
                ? this.getPlatformNames(query.platform)
                : "",
              size: {}.hasOwnProperty.call(query, "size") ? query.size : "",
            }}
            onResetForm={this.onResetForm}
            onSubmit={this.onSubmit}
            onGetSuggestions={this.getSuggestions}
          />
          <div className={s.addStudio}>
            <Button
              text="Add Your Studio"
              className={s.addStudioBtn}
              onClick={this.addStudio}
            />
          </div>
        </div>
        <div className={s.studios}>
          {checkAuthToken() &&
            user &&
            user.recruiter &&
            recruitersOwnStudio &&
            !isSearching && (
              <StudioCardNew
                id={recruitersOwnStudio.id}
                slug={studioSlug}
                name={recruitersOwnStudio.name}
                location={recruitersOwnStudio.location || "set location"}
                logo={
                  recruitersOwnStudio.logo === ""
                    ? logoPlaceholder
                    : recruitersOwnStudio.logo
                }
                width={doc.width}
                isRecruiterStudio
                studioLicense={recruitersOwnStudio.licenseType}
                platforms={recruitersOwnStudio.platforms}
                jobCount={recruiterStudioJobCount}
                bannerUrl={
                  recruitersOwnStudio &&
                  recruitersOwnStudio.licenseType === "basic"
                    ? basisCoverImage
                    : recruitersOwnStudio.bannerUrl === ""
                    ? bannerPlaceholder
                    : recruitersOwnStudio.bannerUrl
                }
              />
            )}
          {(user && user.recruiter
            ? studioList
            : isSearching
            ? search
            : studios
          ).map((s, idx) => (
            <StudioCardNew
              key={idx}
              id={s.id}
              slug={s.slug}
              name={s.name}
              location={s.location || "set location"}
              logo={s.logo === "" ? logoPlaceholder : s.logo}
              width={doc.width}
              isRecruiterStudio={false}
              studioLicense={s.licenseType}
              platforms={s.platforms}
              jobCount={s.jobCount}
              bannerUrl={
                s.licenseType === "basic"
                  ? basisCoverImage
                  : s.bannerUrl === ""
                  ? bannerPlaceholder
                  : s.bannerUrl
              }
            />
          ))}
        </div>
        {!isFetching && !isSearching && studios.length === 0 && (
          <h3>There are no studios to display</h3>
        )}
        {isFetching && (
          <div>
            <h3>Loading</h3>
            <div className="loader">
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
        {isLastPage ? (
          <h3>No more results</h3>
        ) : (
          !isFetching && (
            <Button
              text="More"
              className={s.addStudioBtn}
              onClick={this.handleNextPageRequest}
            />
          )
        )}
        {this.state.showScroller ? (
          <div onClick={() => this.scrollPage()} className={s.float}>
            <i className={`fa fa-arrow-up ${s["my-float"]}`}></i>
          </div>
        ) : (
          ""
        )}
      </main>
    );
  }
}

Studios.propTypes = {
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  user: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  isSearching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  studios: PropTypes.array.isRequired,
  search: PropTypes.array.isRequired,
  onGetStudios: PropTypes.func.isRequired,
  studiosSearch: PropTypes.func.isRequired,
  onToggleSearch: PropTypes.func.isRequired,
  getNextPage: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  onAddStudio: PropTypes.func.isRequired,
  handleAutoComplete: PropTypes.func.isRequired,
  onGetRecruiterStudio: PropTypes.func.isRequired,
  recruitersOwnStudio: PropTypes.object,
};

export default connect(
  createStructuredSelector({
    studios: selectStudios(),
    user: selectUser(),
    search: selectSearch(),
    isSearching: selectIsSearching(),
    isFetching: selectIsFetching(),
    offset: selectOffset(),
    isLastPage: selectIsLastPage(),
    countries: selectCountries(),
    recruitersOwnStudio: selectRecruiterStudio(),
  }),
  (dispatch) => ({
    dispatch,
    onGetStudios: () => dispatch(studiosRequest()),
    studiosSearch: (query) => dispatch(studioSearch(query)),
    onToggleSearch: () => dispatch(toggleSearch()),
    getNextPage: (url, offset, query) =>
      dispatch(nextPageRequest(url, offset, query)),
    onAddStudio: (studio) => dispatch(openAddStudio(studio)),
    handleAutoComplete: (data) => dispatch(getAutocompleteRequest(data)),
    onGetRecruiterStudio: (companyId) =>
      dispatch(getRecruiterStudioRequest(companyId)),
  })
)(Studios);
