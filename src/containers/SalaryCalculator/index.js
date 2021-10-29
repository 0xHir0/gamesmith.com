import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import logo from "./img/logo.png";
import s from "./styles.module.scss";
import { checkAuthToken } from "../../utils";
import CalculatorFiltersForm from "components/CalculatorFiltersForm";
import ResultCard from "components/ResultCard";

import { getJobTitleRequest, getJobsByNameRequest } from "./actions";

import JobCard from "components/JobCard";

import {
  openSignIn,
  openAddSalary,
  openParnterMessage,
} from "containers/Modals/actions";

import {
  selectSalary,
  selectValue,
  selectIsSearching,
  selectIsFetching,
  selectTitle,
  selectCurrentSalary,
  selectJobs,
  selectFlag,
  selectTitles,
} from "./selectors";

class SalaryCalculator extends Component {
  componentWillMount() {
    this.props.onGetJobs("");
  }

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const { titles, onMessage } = this.props;
      if (titles.includes(values.title)) {
        // this.setState({ titleExists: true })
        dispatch(openAddSalary(values, resolve, reject));
      } else {
        onMessage(
          "invite",
          "Please select your job title from the dropdown list",
          "blank",
          "blank"
        );
      }
    });
  getSuggestions = (data) => this.props.handleAutoComplete(data);

  searchString = (obj) => {
    let searchString = "search=true";
    if (obj.title) {
      searchString += `&title=${obj.title}`;
    }
    if (obj.age) {
      searchString += `&age=${obj.age}`;
    }
    if (obj.sex) {
      searchString += `&sex=${obj.sex}`;
    }
    if (obj.level) {
      searchString += `&level=${obj.level}`;
    }
    return searchString;
  };

  handleClick(e) {
    const { onMessage } = this.props;
    onMessage(
      "invite",
      "Members Only: Please sign in or apply for membership to access this section",
      "blank",
      "blank"
    );
  }
  render() {
    const {
      location: { query },
      salary,
      isSearching,
      isFetching,
      value,
      title,
      currentSalary,
      jobs,
      onSignin,
      flag,
    } = this.props;
    return (
      <main role="main">
        {checkAuthToken() ? (
          <div className={s.root}>
            <div className={s.heading}>
              <div className={s.content}>
                <img
                  src={logo}
                  width="75px"
                  height="75px"
                  style={{
                    maxWidth: "170px",
                    float: "left",
                    paddingTop: "8px",
                  }}
                />
                <div className={s.head_content}>
                  <h3>Game Salary Calculator</h3>
                  <div className={s.divider}>
                    <hr />
                    <p>Game salaries provided anonymously by employees</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.body_content}>
              <CalculatorFiltersForm
                initialValues={{
                  title: {}.hasOwnProperty.call(query, "title")
                    ? query.title
                    : "",
                  age: {}.hasOwnProperty.call(query, "age") ? query.age : "",
                  sex: {}.hasOwnProperty.call(query, "sex") ? query.sex : "",
                  level: {}.hasOwnProperty.call(query, "level")
                    ? query.level
                    : "",
                }}
                onGetSuggestions={this.getSuggestions}
                onSubmit={this.onSubmit}
              />
              {isSearching && !isFetching && !value && (
                <div role="no results">
                  <h1>No Results</h1>
                  <p>
                    We have no compareable data results but your data has been
                    registered and will help the community build a more robust
                    calculator. Thank you
                  </p>
                </div>
              )}

              {isSearching && !isFetching && value ? (
                <div role="comparison results">
                  <h1>Comparison Results</h1>
                  {/* <p>Taking your data and comparing to Gamesmith database.</p>*/}
                  <ResultCard
                    title={title}
                    salary={value.toLocaleString("en")}
                  />
                  <p className={s.resInfo}>
                    You are being paid {currentSalary}% {flag} the current
                    market value.
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={s.jobs}>
              {jobs && jobs.length > 0 && <h2>Top Jobs at Gamesmith</h2>}
              {jobs && jobs.length > 0
                ? jobs.map((j, idx) => (
                    <JobCard
                      key={idx}
                      id={j.id}
                      platforms={j.platforms}
                      title={j.role.name}
                      applied={j.applied}
                      // recruiter={( !!(user && user.recruiter && user.recruiter.companyId == j.company.id && user.recruiter.studioApproved))}
                      location={j.location}
                      onSignin={onSignin}
                    />
                  ))
                : ""}
              {jobs && jobs.length > 0 && (
                <h4 className={s.center} style={{ color: "white" }}>
                  <span style={{ color: "#E8E24E" }}>Gamesmith.</span> Gaming
                  Professionals Only: Thousands of Gaming Jobs
                </h4>
              )}
              {isFetching && (
                <div className={s.center}>
                  <h3>Loading</h3>
                  <div className="loader">
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              )}
              {!isFetching && !isSearching && jobs.length === 0 && (
                <div className={s.center}>
                  <h3>There are no Jobs to display</h3>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={s.fundingfilter} onClick={(e) => this.handleClick(e)}>
            <div className={s.heading}>
              <div className={s.content}>
                <img
                  src={logo}
                  width="75px"
                  height="75px"
                  style={{
                    maxWidth: "170px",
                    float: "left",
                    paddingTop: "8px",
                  }}
                  alt="some logo"
                />
                <div className={s.head_content}>
                  <h3>Game Salary Calculator</h3>
                  <div className={s.divider}>
                    <hr />
                    <p>Game salaries provided anonymously by employees</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.body_content}>
              <CalculatorFiltersForm
                initialValues={{
                  title: {}.hasOwnProperty.call(query, "title")
                    ? query.title
                    : "",
                  age: {}.hasOwnProperty.call(query, "age") ? query.age : "",
                  sex: {}.hasOwnProperty.call(query, "sex") ? query.sex : "",
                  level: {}.hasOwnProperty.call(query, "level")
                    ? query.level
                    : "",
                }}
                onGetSuggestions={this.getSuggestions}
                onSubmit={this.onSubmit}
              />
              {isSearching && !isFetching && !value && (
                <div role="no results">
                  <h1>No Results</h1>
                  <p>
                    We have no compareable data results but your data has been
                    registered and will help the community build a more robust
                    calculator. Thank you
                  </p>
                </div>
              )}

              {isSearching && !isFetching && value ? (
                <div role="comparison results">
                  <h1>Comparison Results</h1>
                  {/* <p>Taking your data and comparing to Gamesmith database.</p>*/}
                  <ResultCard
                    title={title}
                    salary={value.toLocaleString("en")}
                  />
                  <p className={s.resInfo}>
                    You are being paid {currentSalary}% {flag} the current
                    market value.
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={s.jobs}>
              {jobs && jobs.length > 0 && <h2>Top Jobs at Gamesmith</h2>}
              {jobs && jobs.length > 0
                ? jobs.map((j, idx) => (
                    <JobCard
                      key={idx}
                      id={j.id}
                      platforms={j.platforms}
                      title={j.role.name}
                      applied={j.applied}
                      // recruiter={( !!(user && user.recruiter && user.recruiter.companyId == j.company.id && user.recruiter.studioApproved))}
                      location={j.location}
                      onSignin={onSignin}
                      blur
                    />
                  ))
                : ""}
              {jobs && jobs.length > 0 && (
                <h4 className={s.center} style={{ color: "white" }}>
                  <span style={{ color: "#E8E24E" }}>Gamesmith.</span> Gaming
                  Professionals Only: Thousands of Gaming Jobs
                </h4>
              )}
              {isFetching && (
                <div className={s.center}>
                  <h3>Loading</h3>
                  <div className="loader">
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              )}
              {!isFetching && !isSearching && jobs.length === 0 && (
                <div className={s.center}>
                  <h3>There are no Jobs to display</h3>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    );
  }
}
SalaryCalculator.propTypes = {
  handleAutoComplete: PropTypes.func,
  getJobs: PropTypes.func,
  isSearching: PropTypes.func,
  isFetching: PropTypes.func,
  onSignin: PropTypes.func,
  onMessage: PropTypes.func,
};
export default connect(
  createStructuredSelector({
    salary: selectSalary(),
    value: selectValue(),
    isFetching: selectIsFetching(),
    isSearching: selectIsSearching(),
    title: selectTitle(),
    currentSalary: selectCurrentSalary(),
    jobs: selectJobs(),
    flag: selectFlag(),
    titles: selectTitles(),
  }),
  (dispatch) => ({
    dispatch,
    handleAutoComplete: (data) => dispatch(getJobTitleRequest(data)),
    onSignin: () => dispatch(openSignIn()),
    onGetJobs: (name) => dispatch(getJobsByNameRequest(name)),
    onMessage: (title, msg, b1, b2) =>
      dispatch(openParnterMessage(title, msg, b1, b2)),
  })
)(SalaryCalculator);
