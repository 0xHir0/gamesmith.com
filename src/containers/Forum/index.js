/*
 * Forum container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { forumRequest } from "./actions";
import selectData from "./selectors";

import s from "./styles.module.scss";

class Forum extends Component {
  componentDidMount() {
    const {
      location: { query },
      onForumRequest,
    } = this.props;
    onForumRequest({ redirect: query.return_url });
  }

  render() {
    const { data } = this.props;
    return (
      <main role="main" className={s.root}>
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h2>Redirecting to Forum</h2>
      </main>
    );
  }
}

Forum.propTypes = {
  location: PropTypes.object.isRequired,
  onForumRequest: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default connect(
  createStructuredSelector({
    data: selectData(),
  }),
  (dispatch) => ({
    dispatch,
    onForumRequest: ({ token, redirect }) =>
      dispatch(forumRequest({ token, redirect })),
  })
)(Forum);
