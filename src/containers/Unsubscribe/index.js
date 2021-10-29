/*
 * Join container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { connect } from "react-redux";

import {
  openConfirmationMessage,
  openMessage,
} from "containers/Modals/actions";

import selectUnsubscribe from "./selectors";

import s from "./styles.module.scss";

class Unsubscribe extends Component {
  componentDidMount() {
    const {
      location: { query },
      dispatch,
      onConfirmation,
      onError,
      params,
    } = this.props;
    if (params && params.code) {
      onConfirmation(params.code);
      dispatch(push("/"));
    } else {
      onError();
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
        <h2>Request In Progress</h2>
      </main>
    );
  }
}

Unsubscribe.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  onConfirmation: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default connect(selectUnsubscribe(), (dispatch) => ({
  dispatch,
  onError: () =>
    dispatch(
      openMessage("Error", "There was an error in processing your request.")
    ),
  onConfirmation: (code) => dispatch(openConfirmationMessage(code)),
}))(Unsubscribe);
