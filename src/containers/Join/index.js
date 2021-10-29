/*
 * Join container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { connect } from "react-redux";

import { makerJoinRequest } from "./actions";
import selectJoin from "./selectors";

import s from "./styles.module.scss";

class Join extends Component {
  componentDidMount() {
    const {
      location: { query },
      dispatch,
      onMakerJoinRequest,
    } = this.props;
    if (
      {}.hasOwnProperty.call(query, "email") &&
      {}.hasOwnProperty.call(query, "code")
    ) {
      onMakerJoinRequest({ email: query.email, code: query.code });
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
        <h2>
          Gamesmith uses LinkedIn to verify candidate ownership and protect
          users
        </h2>
      </main>
    );
  }
}

Join.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  onMakerJoinRequest: PropTypes.func.isRequired,
};

export default connect(selectJoin(), (dispatch) => ({
  dispatch,
  onMakerJoinRequest: ({ email, code }) =>
    dispatch(makerJoinRequest({ email, code })),
}))(Join);
