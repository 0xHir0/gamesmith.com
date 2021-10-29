/*
 * Sign In Container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SignInForm from "../../components/SignInForm";
import { loginRequest } from "containers/App/actions";
import { openForgetPassword } from "containers/Modals/actions";

import s from "./styles.module.scss";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const emailLowerCase = values.email.toLowerCase();
      values.email = emailLowerCase;
      dispatch(loginRequest({ values, resolve, reject }));
    });

  render() {
    const { onForgetPassword } = this.props;
    return (
      <div className={s.root}>
        <SignInForm
          onForgetPassword={onForgetPassword}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

SignIn.propTypes = {
  onForgetPassword: PropTypes.func,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onForgetPassword: () => dispatch(openForgetPassword()),
}))(SignIn);
