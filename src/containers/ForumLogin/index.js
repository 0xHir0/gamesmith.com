/*
 * Forum container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Button from "../../components/UI/Button";
import { loginRequest } from "../App/actions";
import AuthForm from "../../components/AuthForm";

import { checkAuthToken } from "utils";
import { forumLoginRequest } from "./actions";

import s from "./styles.module.scss";

class ForumLogin extends Component {
  onSubmit = (values, dispatch) => {
    const {
      location: { query },
    } = this.props;
    const sso = query.sso;
    const sig = query.sig;
    let nonce = "";

    if (sso && sso.length > 0 && sig && sig.length > 0) {
      nonce = atob(sso);
    }
    return new Promise((resolve, reject) => {
      dispatch(
        loginRequest({ values, resolve, reject, nonce, returnUrl: "/forum" })
      );
    });
  };

  onLinkedInSubmit = (values, dispatch) => {
    const {
      location: { query },
    } = this.props;
    const sso = query.sso;
    const sig = query.sig;
    let nonce = "";

    if (sso && sso.length > 0 && sig && sig.length > 0) {
      nonce = atob(sso);
    }
    new Promise((resolve, reject) => {
      linkedinAuth("forum");
    });
  };

  componentDidMount() {
    const {
      location: { query },
      onForumLoginRequest,
    } = this.props;
    onForumLoginRequest({ query });
  }

  render() {
    if (checkAuthToken()) {
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
    } else {
      return (
        <div className={s.root}>
          <div title="Sign In" className={s.content}>
            <h1>Sign into your GameSmith Account To Access The Forum</h1>

            <AuthForm onSubmit={this.onSubmit} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      );
    }
  }
}

ForumLogin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onForumLoginRequest: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onForumLoginRequest: ({ query }) => dispatch(forumLoginRequest({ query })),
}))(ForumLogin);
