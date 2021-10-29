import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router";
import { debounce, map } from "lodash";
import { createStructuredSelector } from "reselect";
import MultiJobSearchForm from "components/MultiJobSearchForm";
import { getUserData, checkAuthToken } from "utils";
import ReactTooltip from "react-tooltip";

import {
  jobsRequest,
  searchJobsRequest,
  nextPageRequest,
  toggleSearch,
  getJobsDataTypeRequest,
  jobsSorter,
  searchJobFilters,
  searchJob,
} from "./actions";

import { selectAuth, selectUser } from "containers/App/selectors";

import {
  selectJobs,
  selectSearch,
  selectIsSearching,
  selectIsFetching,
  selectOffset,
  selectIsLastPage,
  selectFamily,
  selectLocations,
  selectStudios,
  selectEmployments,
  selectIsFetchingFilter,
  selectQueryF,
  selectQueryS,
  selectQueryL,
  selectQueryE,
  selectIsJobSearching,
  selectJobCountries,
  selectQueryText,
} from "./selectors";

import { getAutocompleteRequest, addSubscriber } from "containers/App/actions";

import { openSignIn } from "containers/Modals/actions";

import JobsCard from "components/JobsCard";

import s from "./styles.module.scss";

//importing images
import logo from "data/images/logo.png";
import Img1 from "data/images/1.png";
import Img2 from "data/images/2.png";
import Img3 from "data/images/3.png";
import Img4 from "data/images/4.png";
import Img5 from "data/images/5.png";
import Img6 from "data/images/6.png";

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      family: [],
      location: [],
      studio: [],
      employment: [],
      isTitleSort: false,
      isFamilysort: false,
      isEmploymentSort: false,
      isLocationSort: false,
      isStudioSort: false,
      sortType: true,
      showScroller: false,
    };
  }
  componentWillMount() {
    const {
      family,
      queryF,
      queryL,
      queryS,
      queryT,
      employments,
      queryE,
      locations,
      studios,
    } = this.props;

    const key = this.props.location.query.key;
    if (key && family.length > 0) {
      if (queryF.length > 0) {
        const prevKey = queryF[0];
        family[prevKey - 1].isSelected = false;
      }
      queryF.splice(0, queryF.length);
      family[key - 1].isSelected = true;
      queryF.push(family[key - 1].value);
    }
    this.setState({
      family: queryF,
      location: queryL,
      studio: queryS,
      employment: queryE,
      term: queryT,
    });
    this.props.onGetJobFilters(family, locations, employments);
  }

  componentDidMount() {
    const {
      onGetJobs,
      isSearchingJob,
      queryF,
      queryL,
      queryS,
      queryE,
      queryT,
    } = this.props;
    if (isSearchingJob || this.props.location.query.key) {
      this.props.onSearchJobs({ queryF, queryL, queryE, queryT });
    } else {
      this.props.onGetJobsType();
      onGetJobs();
    }
    const addEvent = window.attachEvent || window.addEventListener;
    addEvent("scroll", this.handleNextPageRequest);
  }
  componentDidUpdate() {
    const {
      location: { query },
      isFetching,
    } = this.props;
    if (
      {}.hasOwnProperty.call(query, "search") &&
      localStorage.getItem("jobId") &&
      document.getElementById(localStorage.getItem("jobId")) &&
      !isFetching
    ) {
      const elementPosition = this.getPositionOfElement(
        document.getElementById(localStorage.getItem("jobId"))
      );
      setTimeout(() => {
        window.scrollTo(elementPosition.left, elementPosition.top - 130);
        localStorage.removeItem("jobId");
      }, 500);
    }

    ReactTooltip.rebuild();
  }

  componentWillUnmount() {
    const removeEvent = window.detachEvent || window.removeEventListener;
    removeEvent("scroll", this.handleNextPageRequest);
    if (localStorage.getItem("jobUrl")) localStorage.removeItem("jobUrl");
  }

  handleSearch = debounce(this.props.onSearchJobs, 300);

  handleNextPageRequest = () => {
    const {
      location: { query },
      onGetNextPage,
      isFetching,
      isSearching,
      isLastPage,
      offset,
    } = this.props;
    const url = isSearching ? "searchjob" : "browse/jobs";
    const family = this.state.family;
    const location = this.state.location;
    const studio = this.state.studio;
    const employment = this.state.employment;
    const queryUrl = isSearching ? { family, location, employment } : "";
    if (
      (window.innerHeight + this.getScrollYPosition()) /
        document.body.scrollHeight >=
      0.95
    ) {
      !isFetching && !isLastPage && onGetNextPage(url, offset, queryUrl);
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
  };

  getScrollYPosition = () => {
    const scrollLength =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    return scrollLength;
  };

  getPositionOfElement = (el) => {
    let _x = 0;
    let _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  };
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      this.handleSearch(values);
      if (!this.props.isSearching) {
        this.props.toggleSearch();
      }
    });
  handleTermChange = (e) => {
    this.setState({ term: e });
  };
  onSubmitSubscribeRequest = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(addSubscriber(values.email));
    });

  onGetJobId = (jobId) => {
    localStorage.setItem("jobUrl", `/job/${jobId}`);
    this.props.onSignin();
  };
  getSuggestions = debounce((data) => {
    this.props.handleAutoComplete(data);
  }, 300);

  generateThumbnail = (index) => {
    let rendered = null;
    let reindex = 0;
    let title = "";
    let image = "";
    let link = "/home";

    if (index === 1) {
      reindex = 1;
      title = (
        <h1>
          Discover the creators behind the credits and expand your professional
          network.
        </h1>
      );
      image = Img1;
    }
    if (index % 10 === 0 && index !== 0) {
      reindex = 2;
      title = (
        <h1>
          Say hello to the professional game industry. <br />
          Discover more.
        </h1>
      );
      image = Img2;
    }
    if (index % 20 === 0 && index !== 0) {
      reindex = 3;
      title = (
        <h1>
          Elevate your industry presence.
          <br />
          Create a post and explore Tribe.
        </h1>
      );
      image = Img3;
    }
    if (index % 30 === 0 && index !== 0) {
      reindex = 4;
      title = (
        <h1>
          Be recognized as a thought-leader:
          <br />
          Share a post with your network today.
        </h1>
      );
      image = Img4;
    }
    if (index % 40 === 0 && index !== 0) {
      reindex = 5;
      title = (
        <h1>
          Gamesmith promotes your job to the right people.
          <br />
          Discover how.
        </h1>
      );
      image = Img5;
      link = "/jobs";
    }
    if (index % 50 === 0 && index !== 0) {
      reindex = 6;
      title = (
        <h1>
          Meet the elite in games.
          <br />
          Explore Gamesmith.
        </h1>
      );
      image = Img6;
    }
    if (index % 60 === 0 && index !== 0) {
      reindex = 1;
      title = (
        <h1>
          Discover the creators behind the credits and expand your professional
          network.
        </h1>
      );
      image = Img1;
    }
    rendered = reindex > 0 && (
      <Link to={link}>
        <div className={s.bannersDiv}>
          <div className={s.innerBannersDiv}>
            <img src={logo} alt="logo" className={s.logo}></img>
          </div>
          <h1>{title}</h1>
          {/* Important test case */}
          {/* testx INDEX: {index} REINDEX: {reindex} {reindex % 10 === 0 && reindex !== 0 ? 'divisible' : 'not divisible'} */}
          <img src={image} alt={"banner"}></img>
          <div className={s.bottomDiv}>
            <small className={s.bannersdesc}>Sponsored</small>
          </div>
          <button className={s.customButtonJobs}>
          <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png' />
          </button>
        </div>
      </Link>
    );

    return rendered;
  };

  onSearch = (queryF, queryL, queryE, queryT) => {
    this.setState({
      family: queryF,
      location: queryL,
      employment: queryE,
      term: queryT,
    });

    this.props.onSearchJobs({ queryF, queryL, queryE, queryT });
  };
  handleSort = (id, sorter) => {
    const { isSearching, jobs, search, jobSort } = this.props;
    this.setState({ sortType: !this.state.sortType });
    if (id === "isTitleSort") {
      this.setState({
        isTitleSort: true,
        isFamilysort: false,
        isLocationSort: false,
        isEmploymentSort: false,
        sortType: this.state.isTitleSort ? !this.state.sortType : true,
      });
      jobSort(
        isSearching ? search : jobs,
        sorter,
        this.state.isTitleSort ? !this.state.sortType : true,
        isSearching
      );
    } else if (id === "isFamilySort") {
      this.setState({
        isTitleSort: false,
        isFamilysort: true,
        isLocationSort: false,
        isEmploymentSort: false,
        sortType: this.state.isFamilysort ? !this.state.sortType : true,
      });
      jobSort(
        isSearching ? search : jobs,
        sorter,
        this.state.isFamilysort ? !this.state.sortType : true,
        isSearching
      );
    } else if (id === "isLocationSort") {
      this.setState({
        isTitleSort: false,
        isFamilysort: false,
        isLocationSort: true,
        isEmploymentSort: false,
        sortType: this.state.isLocationSort ? !this.state.sortType : true,
      });
      jobSort(
        isSearching ? search : jobs,
        sorter,
        this.state.isLocationSort ? !this.state.sortType : true,
        isSearching
      );
    } else if (id === "isEmploymentSort") {
      this.setState({
        isTitleSort: false,
        isFamilysort: false,
        isLocationSort: false,
        isEmploymentSort: true,
        sortType: this.state.isEmploymentSort ? !this.state.sortType : true,
      });
      jobSort(
        isSearching ? search : jobs,
        sorter,
        this.state.isEmploymentSort ? !this.state.sortType : true,
        isSearching
      );
    }
  };
  handleRedirect = (path) => {
    const win = window.open(path, "_blank");
    win.focus();
    // this.props.history.push(path);
  };
  isNewJob = (repostedAt) => {
    let currentUnixTime = new Date().getTime();
    currentUnixTime = currentUnixTime - 2592000000;
    if (repostedAt >= currentUnixTime) {
      return true;
    }
    return false;
  };
  scrollPage() {
    document.getElementById("scorlldiv").scrollIntoView(true);
  }
  render() {
    const ismobile = window.innerWidth <= 1150;
    const d = document.querySelectorAll(".buttonMobileMenu");
    const {
      location: { query },
      user,
      isFetching,
      isFetchingFilter,
      jobs,
      search,
      isLastPage,
      isSearching,
      authenticated,
      onSignin,
      family,
      locations,
      studios,
      employments,
      onGetJobFilters,
      jobCountries,
      queryText,
    } = this.props;
    // let scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
    const found = (
      <div className={s.filters}>
        <div className="searchform">
          {!isFetchingFilter ? (
            <MultiJobSearchForm
              family={family}
              locations={locations}
              studios={studios}
              employments={employments}
              onUpdateSearchFilter={onGetJobFilters}
              term={this.state.term}
              queryF={this.state.family}
              queryL={this.state.location}
              queryS={this.state.studio}
              queryE={this.state.employment}
              onSearch={this.onSearch}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );

    const notFound = (
      <div className={s.filters}>
        <div className="searchform">
          {!isFetchingFilter ? (
            <MultiJobSearchForm
              family={family}
              locations={locations}
              studios={studios}
              employments={employments}
              term={this.state.term}
              queryF={this.state.family}
              queryL={this.state.location}
              queryS={this.state.studio}
              queryE={this.state.employment}
              onUpdateSearchFilter={onGetJobFilters}
              onSearch={this.onSearch}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
    return (
      <main
        role="main"
        className={` ${s.rootjob} ${!authenticated ? s.topPadding : ""}`}
      >
        <div id="scorlldiv"></div>
        <h3
          style={ismobile ? { display: "none" } : {}}
          className={s.main_title}
        >
          The Home of Video Games Jobs
        </h3>

        <div className={`${checkAuthToken() ? s.autfull : s.full} `}>
          {jobs && jobs.length > 0 ? found : notFound}
        </div>
        <div className={s.jobs}>
          {!isSearching && jobs && jobs.length > 0
            ? jobs.map((j, idx) => {
                return (
                  <div>
                    {this.generateThumbnail(idx)}
                    <JobsCard
                      key={idx}
                      id={j.id}
                      jobEmployments={j.jobEmployments}
                      platforms={j.platforms}
                      title={j.role.name.replace("/", "/ ")}
                      company={j.company.name}
                      applied={j.applied}
                      recruiter={
                        !!(
                          user &&
                          user.recruiter &&
                          user.recruiter.companyId === j.company.id &&
                          user.recruiter.studioApproved
                        )
                      }
                      location={j.address ? j.address : ""}
                      isSearch={this.props.isSearching}
                      onSignin={onSignin}
                      onGetJobId={this.onGetJobId}
                      jobsFamily={j.jobFamilies}
                      seprator={window.innerWidth < 681 ? ", " : ""}
                      handleRedirect={this.handleRedirect}
                      logo={j.company.logo}
                      query={
                        this.props.isSearching
                          ? {}.hasOwnProperty.call(query, "search")
                            ? this.searchString(query)
                            : ""
                          : ""
                      }
                      isNewJobStatus={this.isNewJob(j.jobCardDetails.createdAt)}
                    />
                  </div>
                );
              })
            : search && search.length > 0
            ? search.map((j, idx) => {
                return (
                  <div>
                    {this.generateThumbnail(idx)}
                    <JobsCard
                      key={idx}
                      id={j.id}
                      jobEmployments={j.jobEmployments}
                      platforms={j.platforms}
                      title={j.role.name.replace("/", "/ ")}
                      company={j.company.name}
                      applied={j.applied}
                      recruiter={
                        !!(
                          user &&
                          user.recruiter &&
                          user.recruiter.companyId === j.company.id &&
                          user.recruiter.studioApproved
                        )
                      }
                      location={j.address ? j.address : ""}
                      isSearch={this.props.isSearching}
                      onSignin={onSignin}
                      onGetJobId={this.onGetJobId}
                      jobsFamily={j.jobFamilies}
                      handleRedirect={this.handleRedirect}
                      logo={j.company.logo}
                      seprator={window.innerWidth < 681 ? ", " : ""}
                      query={
                        this.props.isSearching
                          ? {}.hasOwnProperty.call(query, "search")
                            ? this.searchString(query)
                            : ""
                          : ""
                      }
                      isNewJobStatus={this.isNewJob(j.jobCardDetails.createdAt)}
                    />
                  </div>
                );
              })
            : !isFetching && !isSearching && jobs.length === 0 && <h3></h3>}
          {isFetching && (
            <div style={{ marginTop: "6rem" }}>
              <h3>Loading</h3>
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          {isLastPage && jobs.length > 0 && <h3>No more results</h3>}
          {!isFetching && isSearching && search.length < 1 && (
            <h3>There are no jobs to display</h3>
          )}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
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

Jobs.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  search: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  offset: PropTypes.number,
  toggleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
  isFetching: PropTypes.bool,
  jobs: PropTypes.array.isRequired,
  user: PropTypes.object,
  onGetJobs: PropTypes.func.isRequired,
  onSearchJobs: PropTypes.func.isRequired,
  onGetNextPage: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  handleAutoComplete: PropTypes.func.isRequired,
  jobSort: PropTypes.func,
  onGetJobId: PropTypes.func,
  onGetJobFilters: PropTypes.func,
  jobCountries: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default connect(
  createStructuredSelector({
    authenticated: selectAuth(),
    jobs: selectJobs(),
    user: selectUser(),
    search: selectSearch(),
    isSearching: selectIsSearching(),
    isFetching: selectIsFetching(),
    offset: selectOffset(),
    isLastPage: selectIsLastPage(),
    family: selectFamily(),
    locations: selectLocations(),
    studios: selectStudios(),
    employments: selectEmployments(),
    isFetchingFilter: selectIsFetchingFilter(),
    isSearchingJob: selectIsJobSearching(),
    queryL: selectQueryL(),
    queryF: selectQueryF(),
    queryS: selectQueryS(),
    queryE: selectQueryE(),
    jobCountries: selectJobCountries(),
    queryText: selectQueryText(),
  }),
  (dispatch) => ({
    dispatch,
    onGetJobs: () => dispatch(jobsRequest()),
    onGetJobFilters: (familyList, locationList, employmentList) =>
      dispatch(searchJobFilters(familyList, locationList, employmentList)),
    toggleSearch: () => dispatch(toggleSearch()),
    onSearchJobs: (query) => dispatch(searchJobsRequest(query)),
    onGetNextPage: (url, offset, query) =>
      dispatch(nextPageRequest(url, offset, query)),
    handleAutoComplete: (data) => dispatch(getAutocompleteRequest(data)),
    onSignin: () => dispatch(openSignIn()),
    onGetJobsType: () => dispatch(getJobsDataTypeRequest()),
    jobSort: (data, sorter, type, isSearching) =>
      dispatch(jobsSorter(data, sorter, type, isSearching)),
  })
)(Jobs);
