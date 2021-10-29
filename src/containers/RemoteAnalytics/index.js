/*
 * Analytics container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openSignUp } from "containers/Modals/actions";
import s from "./styles.module.scss";
import { createStructuredSelector } from "reselect";

import { checkAuthToken } from "utils";

const studio = JSON.parse(localStorage.userData);
const studioId = studio.studioId;
const getUserId = JSON.parse(localStorage.userData).id;

const Analytics = ({ onApply }) => (
  <main role="main">
    <div id="root">
      <div id="sub-heading" className={s.sub_heading_container}>
        {studioId == -1 ? (
          <iframe
            src={`https://devstagingui.gamesmith.com/analytics-static/analytics.html?user=${getUserId}`}
          ></iframe>
        ) : (
          <iframe
            src={`https://devstagingui.gamesmith.com/analytics-static/analytics.html?studio=${studio.studioSlug}`}
          ></iframe>
        )}
      </div>
    </div>
  </main>
);

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onApply: () => dispatch(openSignUp()),
}))(Analytics);
