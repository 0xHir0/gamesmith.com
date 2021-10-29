/*
 * Subscription form component
 */

import React from "react";
import PropTypes from "prop-types";

import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import SubscriberInput from "components/UI/SubscriberInput";

import validate from "./validation";

import s from "./styles.module.scss";
import { Link } from "react-router";

export const fields = ["email"];

let SubscriptionForm = ({ fields: { email }, handleSubmit, page }) => {
  if (page === "home") {
    return (
      <div className={s.subscriptionContainer}>
        <h4 style={{ color: "white" }}>
          Stay on the top of the digital entertainment industry!
        </h4>
        <p style={{ fontSize: "medium" }}>
          Sign-up and we'll send you the latest product news, jobs and all kinds
          of goodness!
        </p>
        <form onSubmit={handleSubmit}>
          <div className={s.subs}>
            <SubscriberInput
              className={s.subsInput}
              open
              {...email}
              page={page}
              placeholder={"Your Email"}
            />
            <Button
              type="submit"
              text="Subscribe"
              className={s.subscribeButton}
            />
          </div>
        </form>
        <p style={{ fontSize: "0.8rem" }}>
          By submitting your email address, you agree to Gamesmith's{" "}
          <span>
            <Link to="/terms">Terms & Privacy Policy.</Link>
          </span>
        </p>
      </div>
    );
  } else {
    return (
      <form
        className={s.root}
        onSubmit={handleSubmit}
        style={{ marginTop: "-1rem", paddingTop: "0rem" }}
      >
        <div className="row">
          <div
            className="col-md-8"
            style={{
              marginTop: "1rem",
              marginBottom: "-1rem",
              color: "white",
              marginLeft: "-1rem",
              fontWeight: "500",
            }}
          >
            Let us send you job opportunities
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Input
              label=""
              placeholder="YOUR EMAIL"
              open
              {...email}
              page={page}
            />
          </div>
          <div className="col-md-4">
            <Button
              type="submit"
              text="Subscribe"
              className={s.jobsubscribeButton}
            />
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-12"
            style={{
              marginBottom: "1rem",
              marginTop: "0.5rem",
              fontSize: "0.71rem",
              textAlign: "left",
              fontWeight: "500",
            }}
          >
            By submitting your email address, you agree to Gamesmith's{" "}
            <span>
              <Link to="/terms">Terms & Privacy</Link>
            </span>
          </div>
        </div>
      </form>
    );
  }
};

SubscriptionForm.propTypes = {
  error: PropTypes.string,
  page: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SubscriptionForm = reduxForm({
  form: "claim",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(SubscriptionForm);
