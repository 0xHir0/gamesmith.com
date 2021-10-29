/*
 * People container
 */

import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { debounce } from "lodash";
import { selectUser, selectCountries } from "containers/App/selectors";
import { Redirect } from "react-router-dom";
import {
  getCountriesRequest,
  getAutocompleteRequest,
} from "containers/App/actions";
import {
  getRecruiterStudioRequest,
  recruiterConnectionsRequest,
} from "containers/Recruiter/actions";
import { selectStudio } from "containers/Recruiter/selectors";
import { hideSideNav } from "containers/SideNav/actions";
import { reset } from "redux-form";
import { checkAuthToken, getUserData, getFilter } from "../../utils";
import verificationCount from "data/verificationScore";
import Button from "../../components/UI/Button";

import {
  selectPeople,
  selectSearch,
  selectIsSearching,
  selectOffset,
  selectIsFetching,
  selectIsLastPage,
  selectShowFilter,
  selectSearchedPeopleCount,
} from "../People/selectors";

import {
  connectRequest,
  peopleRequest,
  toggleSearch,
  searchPeopleRequest,
  nextPageRequest,
  hideFilterNav,
  showFilterNav,
  nextPageAddition,
} from "../People/actions";
import {
  openSignIn,
  openOutOfClicks,
  openAddJob,
  openJobPostingMessage,
} from "../Modals/actions";

import s from "./styles.module.scss";
import RecruiterMakerCard from "../../components/RecruiterMakerCard";
import { BrowserRouter as Router, Link } from "react-router-dom";

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
    };
  }
  componentDidMount() {
    const searchStudioName = localStorage.getItem("studioName");
    const {
      onGetPeople,
      location: { query },
      onSearchPeople,
      onGetCountries,
      people,
      search,
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
        search.length === 0 ? this.searchMakerAgain(t, f) : "";
      }
    } else {
      onGetPeople();
    }
    const scroll = localStorage.getItem("scroll");
    localStorage.removeItem("scroll");
    if (scroll) {
      const addEvent = window.attachEvent || window.addEventListener;
      addEvent("scroll", this.handleNextPageRequest);
    }
    const input = document.getElementById("myInput");
    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
      }
    });
    const { user, onGetRecruiter, onStudioRequest } = this.props;
    const loginRecruiterStudio = !!(getUserData() && getUserData().recruiter)
      ? getUserData().recruiter.companyId
      : -1;
    onGetRecruiter(user && user.recruiter ? user.recruiter.id : -1);
    onStudioRequest(loginRecruiterStudio);
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
      if (
        (window.innerHeight + this.getScrollYPosition()) /
          document.body.scrollHeight >=
        0.95
      ) {
        if (url == "by_term") {
          !isFetching &&
            !isLastPage &&
            onGetNextPage(url, offset / 20, queryUrl);
        } else {
          !isFetching &&
            !isLastPage &&
            onGetNextPage(url, offset / 20, queryUrl);
        }
      }
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
      currCompany: "",
      pastCompany: "",
      platform: this.getFamily(platforms),
      jobTitle: term,
      gameTitle: "",
      country: "United States",
      city: "",
      state: "",
      verificationFilter: this.getVerificationScore(verification),
      language: "",
      term,
      location: "",
      rate: this.getFamily(rate),
      geoCountryId: "US",
      family: this.getFamily(family),
    };
    if (checkAuthToken()) {
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
    const removeEvent = window.detachEvent || window.removeEventListener;
    removeEvent("scroll", this.handleNextPageRequest);
    document.getElementById("scorlldivMakers").scrollIntoView(true);
  }
  handleRedirect = (path) => {
    // window.count += 1;
    if (window.count <= 14) {
      if (checkAuthToken()) {
        const win = window.open(path, "_blank");
        win.focus();
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
    this.setState({ filter: value }, () => this.searchMaker());
  };
  openJobLimitModal = () => {
    const { onJobLimitMessage } = this.props;
    onJobLimitMessage();
    this.toggleTabs("jobplans");
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
      jobs,
      onAddJob,
      showFilters,
      onHideFiltersNav,
      onShowFiltersNav,
      onConnect,
      onSignIn,
      onResetForm,
      countryOptions,
      count,
      onJobLimitMessage,
    } = this.props;
    // isSearching = true, use search data, else people data.
    const backToStudioLink = localStorage.getItem("returnToStudioPath");
    const peopleList = (isSearching ? search : people).filter(
      (p) => p.id !== id
    );
    const getMaker = (isSearching ? search : people).filter((p) => p.id == id);
    let m = getMaker[0] || null; // eslint-disable-line
    const basic = "basic";
    const branded = "branded";
    const primary = "primary";
    const team = "team";
    const singleJobPost = "single-job-post";
    const jobsPostPack = "jobs-post-pack";
    const unlimitedJobsPostPack = "unlimited-jobs-post-pack";
    const lite = "lite-plan";
    const trial = "trial-plan";
    const team2 = "team-plan";
    const pro = "pro-plan";
    const enterprise = "enterprise-plan";
    const global = "global";
    return (
      <main role="main" className={s.main}>
        <Router>
          {studio && studio.isApproved && studio.isEnable && (
            <section className={s.recruiterHeader}>
              <div className={s.top}>
                <div className={s.topLinks}>
                  <a
                    className={s.unHighLight}
                    href={"/recruiter"}
                    // onClick={() => <Redirect to="/recruiter" />}
                  >
                    Edit Studio
                  </a>
                  <a
                    className={s.unHighLight}
                    href={`/studio/${
                      studio
                        ? studio.studioAdditionalInfo[0].slug
                          ? studio.studioAdditionalInfo[0].slug
                          : ""
                        : ""
                    }`}
                    // onClick={() => (
                    //   <Redirect
                    //     to={`/studio/${studio ? studio.studioAdditionalInfo[0].slug 
                    //     ? studio.studioAdditionalInfo[0].slug  : "" : ""}`}
                    //   />
                    // )}
                  >
                    View My Studio
                  </a>
                  <a
                    className={s.unHighLight}
                    href={"/recruiter/jobposting"}
                    // onClick={() =>
                    //   <Redirect
                    //     to="/recruiter/jobposting" />
                    // }
                  >
                    Job Postings
                  </a>
                  <a
                    className={s.highLight}
                    href={"/recruitermaker"}
                    // onClick={() => <Redirect
                    //     to="/recruitermaker" />}
                  >
                    Candidate Search
                  </a>
                </div>
                <div>
                  {studio.licenseType === branded ||
                  studio.licenseType === basic ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={
                        checkAuthToken()
                          ? studio.licenseType === branded ||
                            studio.licenseType === basic
                            ? () =>
                                onOpenUpgradePrompt(this.toggleTabs, "jobplans")
                            : ""
                          : () => onSignIn()
                      }
                    />
                  ) : studio.licenseType === primary &&
                    jobs &&
                    jobs.length < 3 ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={
                        checkAuthToken()
                          ? () => onAddJob(studio.id, countryOptions)
                          : () => onSignIn()
                      }
                    />
                  ) : studio.licenseType === team &&
                    jobs &&
                    jobs.length < 10 ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={
                        checkAuthToken()
                          ? () => onAddJob(studio.id, countryOptions)
                          : () => onSignIn()
                      }
                    />
                  ) : studio.licenseType === singleJobPost &&
                    jobs &&
                    jobs.length < 1 ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={
                        checkAuthToken()
                          ? () => onAddJob(studio.id, countryOptions)
                          : () => onSignIn()
                      }
                    />
                  ) : studio.licenseType === jobsPostPack &&
                    jobs &&
                    jobs.length < 4 ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={
                        checkAuthToken()
                          ? () => onAddJob(studio.id, countryOptions)
                          : () => onSignIn()
                      }
                    />
                  ) : studio.licenseType === unlimitedJobsPostPack ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={
                        checkAuthToken()
                          ? () => onAddJob(studio.id, countryOptions)
                          : () => onSignIn()
                      }
                    />
                  ) : studio.licenseType === lite && jobs && jobs.length < 1 ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={
                        checkAuthToken()
                          ? () => onAddJob(studio.id, countryOptions)
                          : () => onSignIn()
                      }
                    />
                  ) : studio.licenseType === trial &&
                    jobs &&
                    jobs.length < 1 ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={
                        checkAuthToken()
                          ? () => onAddJob(studio.id, countryOptions)
                          : () => onSignIn()
                      }
                    />
                  ) : studio.licenseType === team2 &&
                    jobs &&
                    jobs.length < 5 ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={
                        checkAuthToken()
                          ? () => onAddJob(studio.id, countryOptions)
                          : () => onSignIn()
                      }
                    />
                  ) : studio.licenseType === pro && jobs && jobs.length < 15 ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={
                        checkAuthToken()
                          ? () => onAddJob(studio.id, countryOptions)
                          : () => onSignIn()
                      }
                    />
                  ) : studio.licenseType === enterprise &&
                    jobs &&
                    jobs.length < 40 ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={
                        checkAuthToken()
                          ? () => onAddJob(studio.id, countryOptions)
                          : () => onSignIn()
                      }
                    />
                  ) : studio.licenseType === global ? (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={() => onAddJob(studio.id, countryOptions)}
                    />
                  ) : (
                    <Button
                      className={s.jobPostButton}
                      text="Post a Job"
                      onClick={() => this.openJobLimitModal()}
                    />
                  )}
                </div>
              </div>
            </section>
          )}
        </Router>
        <div className={s.root}>
          <div id="scorlldivMakers"></div>
          <div className={s.returndiv}>
            {this.state.goBack && (
              <nav className={s.nav}>
                <Link
                  to={backToStudioLink}
                  onClick={() => this.goBackHandler()}
                >
                  {/* <i className="icon-arrow-left" style={{ margin: "auto" }} /> */}
                  <font color='#f8e81c' style={{fontSize: '20px', marginRight: "10px", margin: "auto"}}>←</font>
                  return
                </Link>
              </nav>
            )}
          </div>
          <div className={s.searchBox}>
            <div className={s.searchBar}>
              <input
                id="myInput"
                className={s.searchInput}
                type="text"
                value={this.state.term}
                onChange={(e) => this.handleTermChange(e.target.value)}
              />
              <button
                id="myBtn"
                onClick={this.searchMaker}
                className={s.search_icon}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          {this.state.term && count > 50 ? (
            <p className={s.noPeople}>{count} results</p>
          ) : (
            ""
          )}
          <div className={s.filters}>
            <p className={s.noPeople}>Sort by: </p>
            <div
              className={
                this.state.filter == "Best Match" ? s.searchedFilter : s.filter
              }
              onClick={() => this.handleFilterChange("Best Match")}
            >
              Best Match
            </div>

            <div
              className={
                this.state.filter == "Most Verified"
                  ? s.searchedFilter
                  : s.filter
              }
              onClick={() => this.handleFilterChange("Most Verified")}
            >
              Top Verified
            </div>
          </div>
          <div className={`${s.makerCard}`}>
            {isSearching && !isFetching && !m && peopleList.length === 0 && (
              <h3 className={s.noPeople}>There are no people to display </h3>
            )}
            {peopleList &&
              peopleList.length > 0 &&
              peopleList.map((i, index) => (
                <RecruiterMakerCard
                  index={index}
                  id={i.id}
                  awards={i.awards}
                  firstName={i.profile.first_name}
                  lastName={i.profile.last_name}
                  imgUrl={i.profile.img_url}
                  location={i.profile.location}
                  email={i.email}
                  phoneNumber={i.profile.phone_number}
                  VerificationScore={i.times_verified}
                  currRole={i.curr_role}
                  currCompany={i.curr_company}
                  jobCategory={i.job_family_name}
                  EmploymentType={i.profile.maker_work_categories}
                  about={i.accomplishments}
                  gameCredits={i.game_credits ? i.game_credits : ""}
                  highestRatedTitle={i.match_score}
                  handleRedirect={this.handleRedirect}
                  studio={studio}
                  workCategories={i.profile.maker_work_categories}
                />
              ))}
            {!isFetching &&
              !isLastPage &&
              peopleList &&
              peopleList.length !== 0 && (
                <div className={s.BtnClass}>
                  <Button
                    text="More"
                    onClick={this.handleNextPageRequest}
                    className={s.moreButton}
                  />
                </div>
              )}
            {isLastPage && peopleList && peopleList.length !== 0 && (
              <h4 className={s.noPeople}>No more results</h4>
            )}
            {!isFetching && !isSearching && peopleList.length === 0 && (
              <h3 className={s.noPeople}>There are no people to display </h3>
            )}
          </div>
          <div className={s.loader}>
            {isFetching && (
              <div style={{ marginTop: "2rem" }}>
                <h3>Loading</h3>
                <div className={`loader`}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
          {this.state.showScroller ? (
            <div onClick={() => this.scrollPage()} className={s.float}>
              <i
                className={`fa fa-arrow-up ${s["my-float"]}`}
                style={{ padding: "1rem" }}
              ></i>
            </div>
          ) : (
            ""
          )}
        </div>
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
  onSearchPeople: PropTypes.func.isRequired,
  onGetNextPage: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
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
    count: selectSearchedPeopleCount(),
  }),
  (dispatch) => ({
    dispatch,
    onGetRecruiter: (id) => dispatch(recruiterConnectionsRequest(id)),
    onResetForm: () => dispatch(reset("freeFilters")),
    onGetPeople: () => dispatch(peopleRequest()),
    // onGetLocation: () => dispatch(makerLocationRequest()),
    onStudioRequest: (id) => dispatch(getRecruiterStudioRequest(id)),
    // onGetLanguages: () => dispatch(laguagesRequest()),
    onToggleSearch: () => dispatch(toggleSearch()),
    onSearchPeople: (query, isRecruiter) =>
      dispatch(searchPeopleRequest(query, isRecruiter)),
    onGetNextPage: (url, offset, query) =>
      dispatch(nextPageRequest(url, offset, query)),
    // onClearFields: (query) => dispatch(searchPeopleRequest(query)),
    onHideFiltersNav: () => dispatch(hideFilterNav()),
    onShowFiltersNav: () => {
      dispatch(hideSideNav()), dispatch(showFilterNav());
    },
    handleAutoComplete: (data) => dispatch(getAutocompleteRequest(data)),
    onConnect: ({ id, page, query }) =>
      dispatch(connectRequest({ id, page, query })),
    onSignIn: () => dispatch(openSignIn()),
    onGetCountries: () => dispatch(getCountriesRequest()),
    nextPageAddition: () => dispatch(nextPageAddition()),
    onAddJob: (studioId, countryOptions) => {
      dispatch(openAddJob(studioId, countryOptions));
    },
    onJobLimitMessage: () => dispatch(openJobPostingMessage()),
  })
)(People);
