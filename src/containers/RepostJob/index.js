/*
 * Reset Job container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { confirmJobRepost } from "../App/actions";

import s from "./styles.module.scss";

class RepostJob extends Component {
  componentDidMount() {
    const {
      location: { query },
      dispatch,
      onRepostJob,
    } = this.props;
    if (
      {}.hasOwnProperty.call(query, "id") &&
      {}.hasOwnProperty.call(query, "token")
    ) {
      onRepostJob(query.id, query.token);
      dispatch(push("/"));
    } else {
      dispatch(push("/"));
    }
  }

  render() {
    // eslint-disable-line class-methods-use-this
    return (
      <main role="main" className={s.root}>
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </main>
    );
  }
}

RepostJob.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  onRepostJob: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onRepostJob: (jobId, token) => dispatch(confirmJobRepost(jobId, token)),
}))(RepostJob);
