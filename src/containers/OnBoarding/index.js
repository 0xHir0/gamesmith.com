/*
 * OnBoarding container
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { connect } from "react-redux";

import selectOnBoarding from "./selectors";

import s from "./styles.module.scss";
import { validateTokenRequest } from "../App/actions";

class OnBoarding extends Component {
  componentDidMount() {
    const {
      location: { query },
      dispatch,
      onValidateTokenRequest,
    } = this.props;
    if ({}.hasOwnProperty.call(query, "invitationToken")) {
      localStorage.setItem("inviteToken", query.invitationtoken);
      onValidateTokenRequest({ invitetoken: query.invitationToken });
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
        <h2>Verify invite token</h2>
      </main>
    );
  }
}

OnBoarding.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  onValidateTokenRequest: PropTypes.func,
};

export default connect(selectOnBoarding(), (dispatch) => ({
  dispatch,
  onValidateTokenRequest: (token) => dispatch(validateTokenRequest(token)),
}))(OnBoarding);
