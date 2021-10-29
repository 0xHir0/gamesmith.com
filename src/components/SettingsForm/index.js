/*
 * Settings form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { Elements, StripeProvider } from "react-stripe-elements";

import Checkbox from "components/UI/Checkbox";
import Button from "components/UI/Button";
import Input from "components/UI/Input";
import AddPaymentForm from "components/AddPaymentForm";

import validate from "./validation";
import { Link } from "react-router";

import s from "./styles.module.scss";
const PLAN_HASH = {
  branded: "Branded",
  free: "Free",
  primary: "Primary",
  global: "Global",
  "single-job-post": "Single Job Post",
  "jobs-post-pack": "Jobs Post Pack",
  "unlimited-jobs-post-pack": "Unlimited Jobs Post Pack",
  "lite-plan": "Lite",
  "team-plan": "Team",
  "pro-plan": "Pro",
  "enterprise-plan": "Enterprise",
  "trial-plan": "Trial",
};
export const fields = [
  "image",
  "oldPassword",
  "newPassword",
  "confirmPassword",
  "memberConnections",
  "memberMessaging",
  "surveys",
  "jobEnquiries",
  "messageFallback",
  "generalAnnounce",
];

let SettingsForm = ({
  fields: {
    image,
    oldPassword,
    newPassword,
    confirmPassword,
    memberConnections,
    memberMessaging,
    messageFallback,
    generalAnnounce,
    surveys,
    jobEnquiries,
  },
  handleSubmit,
  submitting,
  error,
  imgUrl,
  showImageUpload,
  user,
  studio,
  licenseType,
  studioStripeData,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="step container-fluid">
      <div className="row">
        <div className={"col-sm-12"}>
          <h2>1. Change Password</h2>
          <Input
            className="input"
            open
            label="Current Password"
            type="password"
            {...oldPassword}
          />
          <Input
            className="input"
            open
            label="New Password"
            type="password"
            {...newPassword}
          />
          <Input
            className="input"
            open
            label="Repeat New Password"
            type="password"
            {...confirmPassword}
          />
        </div>
      </div>
    </div>
    {user && (user.maker || user.recruiter) && (
      <div className="step container-fluid">
        <h2>2. Communication Preferences</h2>
        <div className="row">
          <div className="col-sm-offset-2 col-sm-5 col-md-offset-3 col-md-9">
            <Checkbox className="checkbox" {...messageFallback}>
              Missed message notifications by email
            </Checkbox>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-offset-2 col-sm-5 col-md-offset-3 col-md-9">
            <Checkbox className="checkbox" {...generalAnnounce}>
              General announcements and updates
            </Checkbox>
          </div>
        </div>
        <Button
          disabled={submitting}
          type="submit"
          text="Update"
          className={s.changePasswordButton}
        />
      </div>
    )}

    {error && <div className="error">{error}</div>}
    <p className="footnote">
      Send an e-mail to{" "}
      <a href="mailto:support@gamesmith.com">support@gamesmith.com</a> if you'd
      like to have your profile removed.
    </p>
  </form>
);

SettingsForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  imgUrl: PropTypes.string,
  user: PropTypes.object,
};

export default SettingsForm = reduxForm({
  form: "settings",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(SettingsForm);
