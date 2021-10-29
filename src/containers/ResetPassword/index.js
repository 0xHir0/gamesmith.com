/*
 * Reset Password container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { connect } from "react-redux";

import { resetPasswordRequest } from "./actions";
import selectResetPassword from "./selectors";

import s from "./styles.module.scss";

class ResetPassword extends Component {
  componentDidMount() {
    const {
      location: { query },
      dispatch,
      onResetPasswordRequest,
    } = this.props;
    if (
      {}.hasOwnProperty.call(query, "email") &&
      {}.hasOwnProperty.call(query, "code")
    ) {
      localStorage.setItem("resetEmail", query.email.toLowerCase());
      localStorage.setItem("resetCode", query.code);
      const set = query.setPassword ? true : false;
      onResetPasswordRequest({
        email: query.email.toLowerCase(),
        code: query.code,
        setPassword: set,
      });
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
        <h2>Verify Code and Email</h2>
      </main>
    );
  }
}

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  onResetPasswordRequest: PropTypes.func.isRequired,
};

export default connect(selectResetPassword(), (dispatch) => ({
  dispatch,
  onResetPasswordRequest: ({ email, code, setPassword }) =>
    dispatch(resetPasswordRequest({ email, code, setPassword })),
}))(ResetPassword);
