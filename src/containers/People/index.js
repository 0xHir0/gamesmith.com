/*
 * People container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
// import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { debounce, isEmpty, startCase } from "lodash";
// import Button from 'components/UI/Button';
import Button from "components/UI/Button";
import MakersCard from "components/MakersCard";
// import FreeFiltersForm from 'components/FreeFiltersForm';
import PaidFiltersForm from "components/PaidFiltersForm";
import { getGameURLFromId } from "../../utils/hashingFunction";

import { selectUser, selectCountries } from "containers/App/selectors";
import {
  getCountriesRequest,
  getAutocompleteRequest,
} from "containers/App/actions";
import { getRecruiterStudioRequest } from "containers/Recruiter/actions";
import { selectStudio } from "containers/Recruiter/selectors";
import { hideSideNav } from "containers/SideNav/actions";
// import { connectRequest } from 'containers/People/actions';
import { reset } from "redux-form";
import { checkAuthToken, getUserData, getFilter } from "../../utils";
import verificationCount from "data/verificationScore";

import {
  selectPeople,
  selectSearch,
  selectIsSearching,
  selectOffset,
  selectIsFetching,
  selectIsLastPage,
  selectShowFilter,
} from "./selectors";

import {
  connectRequest,
  peopleRequest,
  toggleSearch,
  searchPeopleRequest,
  nextPageRequest,
  hideFilterNav,
  showFilterNav,
  nextPageAddition,
} from "./actions";

import {
  openSignIn,
  openOutOfClicks,
  openMakerAccess,
} from "../Modals/actions";

import s from "./styles.module.scss";

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goBack: false,
      showScroller: false,
      blockScroll: 1,
      showForm: false,
      term: "",
      family: "all",
      platforms: "all",
      rate: "all",
      verification: "all",
      filter: "Most Verified",
      country: "",
      pageByTerm: "",
      pageBrowseMaker: "",
    };
  }
  onTouchStart = (evt) => {
    const nav = this.nav;
    nav.startX = evt.touches[0].pageX;
    nav.currentX = nav.startX;
    nav.touchingSideNav = true;
    requestAnimationFrame(this.update);
  };

  onTouchMove = (evt) => {
    const nav = this.nav;
    if (!nav.touchingSideNav) return;
    nav.currentX = evt.touches[0].pageX;
    const translateX = Math.min(0, nav.currentX - nav.startX);
    if (translateX < 0) evt.preventDefault();
  };

  onTouchEnd = () => {
    const nav = this.nav;
    const { onHideFiltersNav } = this.props;
    if (!nav.touchingSideNav) return;
    nav.touchingSideNav = false;
    const translateX = Math.min(0, nav.currentX - nav.startX);
    nav.style.transform = "";
    if (translateX < 0) onHideFiltersNav();
  };

  update = () => {
    const nav = this.nav;
    if (!nav.touchingSideNav) return;
    requestAnimationFrame(this.update);
    const translateX = Math.min(0, nav.currentX - nav.startX);
    nav.style.transform = `translateX(${translateX}px)`;
  };

  componentWillMount() {
    const { user, onStudioRequest } = this.props;
    const loginRecruiterStudio = !!(getUserData() && getUserData().recruiter)
      ? getUserData().recruiter.companyId
      : -1;
    if (user && user.recruiter && checkAuthToken()) {
      onStudioRequest(loginRecruiterStudio);
    }
  }

  componentDidMount() {
    const searchStudioName = localStorage.getItem("studioName");
    const {
      onGetPeople,
      location: { query },
      onSearchPeople,
      onGetCountries,
    } = this.props;
    onGetCountries();
    if (
      {}.hasOwnProperty.call(query, "search") ||
      localStorage.getItem("studioName")
    ) {
      if (searchStudioName) {
        query.currCompany = searchStudioName;
        onSearchPeople({ values: query });
        localStorage.removeItem("studioName");
        this.setState({
          term: searchStudioName,
          goBack: !this.state.goBack,
        });
        this.searchMakerAgain(searchStudioName, this.state.filter);
      } else {
        const t = query.term;
        const f = query.filterBy;
        this.setState({ filter: f, term: t });
        this.searchMakerAgain(t, f);
      }
    } else {
      onGetPeople();
    }
    const addEvent = window.attachEvent || window.addEventListener;
    addEvent("scroll", this.handleNextPageRequest);
  }

  componentWillUnmount() {
    const removeEvent = window.detachEvent || window.removeEventListener;
    removeEvent("scroll", this.handleNextPageRequest);
  }

  handleSearch = debounce(this.props.onSearchPeople, 300);

  handleNextPageRequest = () => {
    const {
      location: { query },
      onGetNextPage,
      isFetching,
      isSearching,
      isLastPage,
      offset,
      people,
      dispatch,
      nextPageAddition,
    } = this.props;
    if (people && people.length >= 90 && !checkAuthToken()) {
      dispatch(openSignIn());
    } else {
      const url = isSearching ? "by_term" : "browse_game_makers";
      const queryUrl = isSearching ? this.searchString(query) : "";
      // if (((window.innerHeight + this.getScrollYPosition()) / document.body.scrollHeight) >= 0.95) {
      //   !isFetching && !isLastPage && onGetNextPage(url, offset/20, queryUrl); // eslint-disable-line
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
    }
  };

  parseArrayValuesToString = (values) => {
    if (values.platform && typeof values.platform !== "string") {
      values.platform = values.platform
        .map((v) => {
          return v.value;
        })
        .join(",");
    }
    return values;
  };

  getFamily = (title) => {
    const d = title === "all" ? "" : title.toLowerCase();
    return d;
  };
  getVerificationScore = (value) => {
    const val = verificationCount.filter((x) => x.label === value);
    return val[0].id;
  };
  searchMaker = (
    currCompany,
    pastCompany,
    gameTitle,
    country,
    geoCountryId,
    language,
    location
  ) => {
    const {
      user: { recruiter },
      dispatch,
    } = this.props;
    const { term, name, family, platforms, rate, verification, filter } =
      this.state;
    const initial = {
      filterBy: filter,
      name,
      currCompany,
      pastCompany,
      platform: this.getFamily(platforms),
      jobTitle: term,
      gameTitle,
      country,
      city: "",
      state: "",
      verificationFilter: this.getVerificationScore(verification),
      language,
      term,
      location,
      rate: this.getFamily(rate),
      geoCountryId,
      family: this.getFamily(family),
    };
    if (checkAuthToken()) {
      this.setState({ pageByTerm: 1, pageBrowseMaker: 1 });
      dispatch(searchPeopleRequest(initial, !!recruiter));
    } else {
      dispatch(openSignIn());
    }
  };
  searchMakerAgain = (jobTitle, filter) => {
    const {
      user: { recruiter },
      dispatch,
    } = this.props;
    const i = {
      jobTitle,
      filterBy: filter,
    };
    if (checkAuthToken()) {
      this.setState({ pageByTerm: 1, pageBrowseMaker: 1 });
      dispatch(searchPeopleRequest(i, !!recruiter));
    } else {
      dispatch(openSignIn());
    }
  };

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const {
        user: { recruiter },
      } = this.props;
      if (!checkAuthToken()) {
        dispatch(openSignIn());
      } else {
        const { onHideFiltersNav } = this.props;
        onHideFiltersNav();
        // values = this.parseArrayValuesToString(values);
        // dispatch(searchPeopleRequest({ values, resolve, reject }));
        this.setState({ pageByTerm: 1, pageBrowseMaker: 1 });
        dispatch(searchPeopleRequest(values, !!recruiter));
      }
    });

  getScrollYPosition = () => {
    const scrollLength =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    return scrollLength;
  };

  searchString = (obj) => {
    let searchString = "page_size=10";
    if (obj.name) {
      searchString += `&name=${obj.name}`;
    }
    if (obj.term) {
      searchString += `&term=${obj.term}`;
    }
    if (obj.filterBy) {
      searchString += `&filter_by=${getFilter(obj.filterBy)}`;
    }
    if (obj.currCompany) {
      searchString += `&currCompany=${obj.currCompany}`;
    }
    if (obj.pastCompany) {
      searchString += `&pastCompany=${obj.pastCompany}`;
    }
    if (obj.opportunity) {
      searchString += `&opportunity=${obj.opportunity}`;
    }
    if (obj.city) {
      searchString += `&city=${obj.city}`;
    }
    // if (obj.country) {
    //   searchString += `&country=${obj.country}`;
    // }
    if (obj.state) {
      searchString += `&state=${obj.state}`;
    }
    if (obj.language) {
      searchString += `&language=${obj.language}`;
    }
    if (obj.platform) {
      searchString += `&platform=${obj.platform}`;
    }
    if (obj.verificationFilter) {
      searchString += `&verificationFilter=${obj.verificationFilter}`;
    }
    if (obj.jobTitle) {
      searchString += `&jobTitle=${obj.jobTitle}`;
    }
    if (obj.gameTitle) {
      searchString += `&gameTitle=${obj.gameTitle}`;
    }

    return searchString;
  };
  goBackHandler() {
    localStorage.removeItem("returnToStudioPath");
  }
  getSuggestions = (data) => this.props.handleAutoComplete(data);

  scrollPage() {
    document.getElementById("scorlldivMakers").scrollIntoView(true);
  }
  handleRedirect = (path) => {
    // window.count += 1;
    if (window.count <= 14) {
      if (checkAuthToken()) {
        const win = window.open(path, "_blank");
        win.focus();
        // this.props.history.push(path);
      } else {
        this.props.dispatch(openSignIn());
      }
    } else {
      this.props.dispatch(openOutOfClicks());
    }
  };

  handleTermChange = (value) => {
    this.setState({ term: value });
  };
  handleFamilyChange = (value) => {
    this.setState({ family: value });
  };
  handlePlatformChange = (value) => {
    this.setState({ platforms: value });
  };
  handleRateChange = (value) => {
    this.setState({ rate: value });
  };
  handleVerificationChange = (value) => {
    this.setState({ verification: value });
  };
  handleFilterChange = (value) => {
    this.setState({ filter: value });
  };
  render() {
    const {
      location: { query },
      user: { id, maker, recruiter },
      doc,
      people,
      search,
      isSearching,
      onToggleSearch,
      isFetching,
      isLastPage,
      studio,
      showFilters,
      onHideFiltersNav,
      onShowFiltersNav,
      onConnect,
      onSignIn,
      onResetForm,
      countryOptions,
      onMakerAccess,
    } = this.props;
    // isSearching = true, use search data, else people data.
    const backToStudioLink = localStorage.getItem("returnToStudioPath");
    const peopleList = (isSearching ? search : people).filter(
      (p) => p.id !== id
    );
    const getMaker = (isSearching ? search : people).filter((p) => p.id == id);
    let m = getMaker[0] || null; // eslint-disable-line
    const freeFilters = !!(
      maker ||
      (recruiter &&
        !isEmpty(studio) &&
        (studio.licenseType === "basic" || studio.licenseType === "branded"))
    );
    const paidFilters = !!(
      recruiter &&
      !isEmpty(studio) &&
      studio.licenseType !== "basic" &&
      studio.licenseType !== "branded"
    );
    // const isUnregistered = !freeFilters && !paidFilters;
    const initial = {
      filterBy: {}.hasOwnProperty.call(query, "filterBy") ? query.filterBy : "",
      name: {}.hasOwnProperty.call(query, "name") ? query.name : "",
      currCompany: {}.hasOwnProperty.call(query, "currCompany")
        ? query.currCompany
        : "",
      pastCompany: {}.hasOwnProperty.call(query, "pastCompany")
        ? query.pastCompany
        : "",
      platform: {}.hasOwnProperty.call(query, "platform") ? query.platform : "",
      jobTitle: {}.hasOwnProperty.call(query, "jobTitle") ? query.jobTitle : "",
      gameTitle: {}.hasOwnProperty.call(query, "gameTitle")
        ? query.gameTitle
        : "",
      country: {}.hasOwnProperty.call(query, "country")
        ? query.country
        : "United States",
      city: {}.hasOwnProperty.call(query, "city") ? query.city : "",
      state: {}.hasOwnProperty.call(query, "state") ? query.state : "",
      verificationFilter: {}.hasOwnProperty.call(query, "verificationFilter")
        ? query.verificationFilter
        : "",
      language: {}.hasOwnProperty.call(query, "language") ? query.language : "",
    };
    return (
      <main role="main" className={s.root} id="root">
        <div id="scorlldivMakers"></div>
        <div className={s.returndiv}>
          {this.state.goBack && (
            <nav className={s.nav}>
              <Link to={backToStudioLink} onClick={() => this.goBackHandler()}>
                {/* <i
                  className="icon-arrow-left"
                  style={{ marginRight: "1rem" }}
                /> */}
                <font color='#f8e81c' style={{fontSize: '20px', marginRight: "10px"}}>←</font>
                return
              </Link>
            </nav>
          )}
        </div>
        <div className={s.top}>
          <h3>Meet the world's top game professionals</h3>
        </div>
        <div className={`${s.container}`}>
          {/*   {peopleList && doc.width >= 900 && */}
          <div className={s.full}>
            <PaidFiltersForm
              initialValues={initial}
              term={this.state.term}
              handleTermChange={this.handleTermChange}
              family={this.state.family}
              handleFamilyChange={this.handleFamilyChange}
              platforms={this.state.platforms}
              handlePlatformChange={this.handlePlatformChange}
              rate={this.state.rate}
              handleRateChange={this.handleRateChange}
              verification={this.state.verification}
              handleVerificationChange={this.handleVerificationChange}
              filter={this.state.filter}
              handleFilterChange={this.handleFilterChange}
              onSubmit={this.onSubmit}
              handleSearch={this.searchMaker}
              countryOptions={countryOptions}
              onGetSuggestions={this.getSuggestions}
            />
          </div>
          {/* } */}
          <div
            className={
              (!freeFilters
                ? !paidFilters
                  ? `${s.makers}`
                  : `${s.paidRecruiterFilters}`
                : `${s.makers}`) ||
              (freeFilters || doc.width < 900
                ? `${s.makers}`
                : `${s.paidRecruiterFilters}`)
            }
          >
            {isSearching && !isFetching && !m && peopleList.length === 0 && (
              <h3>There are no people to display </h3>
            )}

            {m && (
              <MakersCard
                id={m.id}
                currID={!!id ? id : -1}
                matchScore={m.match_score}
                awards={m.awards}
                avatar={m.profile && m.profile.img_url}
                firstName={m.profile && m.profile.first_name}
                lastName={m.profile ? m.profile.last_name : ""}
                key={m.profile && m.profile.first_name}
                currRole={m.curr_role}
                currGame={m.curr_game}
                jobFamilyName={m.job_family_name}
                width={doc.width}
                query={this.props.location.search}
                currCompany={m.curr_company}
                location={m.profile && m.profile.location}
                workCategories={m.profile && m.profile.maker_work_categories}
                connection="no"
                page="people"
                onConnect={onConnect}
                claimed
                imageSm={
                  m.latest_game_id
                    ? getGameURLFromId(
                        m.latest_game_id
                          .toString()
                          .replace(/^http:\/\//i, "https://"),
                        "550x740"
                      )
                    : getGameURLFromId(
                        Math.floor(Math.random() * 3000 + 0)
                          .toString()
                          .replace(/^http:\/\//i, "https://"),
                        "550x740"
                      )
                }
                imageLg={
                  m.latest_game_id
                    ? getGameURLFromId(
                        m.latest_game_id
                          .toString()
                          .replace(/^http:\/\//i, "https://"),
                        "1500x400"
                      )
                    : getGameURLFromId(
                        Math.floor(Math.random() * 3000 + 0)
                          .toString()
                          .replace(/^http:\/\//i, "https://"),
                        "550x740"
                      )
                }
                timesVerified={m.times_verified ? m.times_verified : null}
                // platforms={m.additionalInfo && m.additionalInfo[0].platformList ? m.additionalInfo[0].platformList : null}
                platforms={m.platforms}
                onSignIn={onSignIn}
                handleRedirect={this.handleRedirect}
              />
            )}
            {peopleList &&
              peopleList.length > 0 &&
              peopleList.map((p, idx) => (
                <MakersCard
                  key={idx}
                  id={p.id}
                  matchScore={p.match_score}
                  currID={!!id ? id : -1}
                  awards={p.awards}
                  avatar={p.profile && p.profile.img_url}
                  firstName={p.profile && p.profile.first_name}
                  lastName={p.profile ? p.profile.last_name : ""}
                  currRole={p.curr_role}
                  currGame={p.curr_game}
                  jobFamilyName={p.job_family_name}
                  isSubscribe={p.account && p.account.isSubscribe}
                  width={doc.width}
                  location={p.profile && p.profile.location}
                  workCategories={p.profile && p.profile.maker_work_categories}
                  query={this.props.location.search}
                  currCompany={p.curr_company}
                  connection={
                    p.connected ? "yes" : p.connectPending ? "pending" : "no"
                  }
                  claimed={p.claimed}
                  page="people"
                  onConnect={onConnect}
                  imageSm={
                    p.latest_game_id
                      ? getGameURLFromId(p.latest_game_id.toString(), "550x740")
                      : getGameURLFromId(
                          Math.floor(Math.random() * 3000 + 0).toString(),
                          "550x740"
                        )
                  }
                  imageLg={
                    p.latest_game_id
                      ? getGameURLFromId(
                          p.latest_game_id.toString(),
                          "1500x400"
                        )
                      : getGameURLFromId(
                          Math.floor(Math.random() * 3000 + 0).toString(),
                          "550x740"
                        )
                  }
                  platforms={p.platforms}
                  timesVerified={p.times_verified ? p.times_verified : null}
                  onSignIn={onSignIn}
                  handleRedirect={this.handleRedirect}
                />
              ))}
            {peopleList && peopleList.length > 0 && (
              <Button
                text="More"
                className={s.addStudioBtn}
                onClick={() => onMakerAccess()}
              />
            )}
            {isLastPage && peopleList && peopleList.length !== 0 && (
              <h4 style={{ marginTop: "2rem" }}>No more results</h4>
            )}
            {!isFetching && !isSearching && peopleList.length === 0 && (
              <h3>There are no people to display </h3>
            )}
          </div>
        </div>
        <div className={s.container}>
          <div className={s.loader}>
            {isFetching && (
              <div style={{ marginTop: "2rem" }}>
                <h3>Loading</h3>
                <div className={`loader ${s.loading}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        </div>
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

People.propTypes = {
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    isSuperuser: PropTypes.bool,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  studio: PropTypes.object,
  offset: PropTypes.number,
  isSearching: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  people: PropTypes.array.isRequired,
  search: PropTypes.array.isRequired,
  showFilters: PropTypes.bool.isRequired,
  onHideFiltersNav: PropTypes.func.isRequired,
  onToggleSearch: PropTypes.func.isRequired,
  onGetPeople: PropTypes.func.isRequired,
  // onClearFields: PropTypes.func.isRequired,
  onSearchPeople: PropTypes.func.isRequired,
  onGetNextPage: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  // locationData: PropTypes.object.isRequired,
  // languagesList: PropTypes.array.isRequired,
  // onGetLocation: PropTypes.func.isRequired,
  // onGetLanguages: PropTypes.func.isRequired,
  onStudioRequest: PropTypes.func.isRequired,
  onShowFiltersNav: PropTypes.func.isRequired,
  handleAutoComplete: PropTypes.func.isRequired,
  query: PropTypes.string,
  onResetForm: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    people: selectPeople(),
    search: selectSearch(),
    isSearching: selectIsSearching(),
    offset: selectOffset(),
    isFetching: selectIsFetching(),
    isLastPage: selectIsLastPage(),
    countryOptions: selectCountries(),
    studio: selectStudio(),
    showFilters: selectShowFilter(),
  }),
  (dispatch) => ({
    dispatch,
    onResetForm: () => dispatch(reset("freeFilters")),
    onGetPeople: () => dispatch(peopleRequest()),
    onStudioRequest: (id) => dispatch(getRecruiterStudioRequest(id)),
    onToggleSearch: () => dispatch(toggleSearch()),
    onSearchPeople: (query, isRecruiter) =>
      dispatch(searchPeopleRequest(query, isRecruiter)),
    onGetNextPage: (url, offset, query) =>
      dispatch(nextPageRequest(url, offset, query)),
    onHideFiltersNav: () => dispatch(hideFilterNav()),
    onShowFiltersNav: () => {
      dispatch(hideSideNav());
      dispatch(showFilterNav());
    },
    handleAutoComplete: (data) => dispatch(getAutocompleteRequest(data)),
    onConnect: ({ id, page, query }) =>
      dispatch(connectRequest({ id, page, query })),
    onSignIn: () => dispatch(openSignIn()),
    onMakerAccess: () => dispatch(openMakerAccess()),
    onGetCountries: () => dispatch(getCountriesRequest()),
    nextPageAddition: () => dispatch(nextPageAddition()),
  })
)(People);
