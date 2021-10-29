/*
 * Settings container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { STRIPE_PUBLIC_API_KEY, loadScript, STRIPE_URL } from "../../utils";

import {
  getSettingsRequest,
  updateSettingsRequest,
  getStudioAndPlanRequest,
} from "./actions";

import {
  selectSettings,
  selectStudio,
  selectCardLast4,
  selectExpMonth,
  selectExpYear,
  selectNextBillingDate,
} from "./selectors";
import { selectUser } from "containers/App/selectors";

import SettingsForm from "components/SettingsForm";

import s from "./styles.module.scss";
const STRIPE_ID = "stripeId";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  componentWillMount() {
    /* check tom
    if (document.getElementById(STRIPE_ID)) {
      this.setState({ isLoading: false });
    } else {
      const that = this;
      this.setState({ isLoading: true });
      const promise = loadScript(STRIPE_URL, "text/javascript", STRIPE_ID);
      promise.then(
        (script) => that.setState({ isLoading: false }),
        (error) => console.log(`Script Loading ${error}`)
      );
    }
      */
    const { onGetSettings, onGetStudioAndPlanInfo, user } = this.props;
    onGetSettings();
  }
  componentDidMount() {
    const { onGetStudioAndPlanInfo, user } = this.props;
    if (user && user.recruiter) {
      onGetStudioAndPlanInfo(user.recruiter.id, user.recruiter.companyId);
    }
  }

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const imgUrl = {}.hasOwnProperty.call(this.props.user, "recruiter")
        ? this.props.user.recruiter.logo
        : null;
      const {
        user: { email },
      } = this.props;
      this.setState({ clicked: false });
      dispatch(
        updateSettingsRequest({ values, resolve, reject, email, imgUrl })
      );
    });

  render() {
    const studioObj = {};
    if (this.props.user && this.props.user.recruiter) {
      studioObj.id = this.props.user.recruiter.companyId;
      studioObj.name = this.props.user.recruiter.currCompany;
    }
    const {
      user,
      settings: { settings },
      studio,
      expMonth,
      expYear,
      cardLast4,
      nextBillingDate,
    } = this.props;

    const imgUrl = {}.hasOwnProperty.call(user, "recruiter")
      ? user.recruiter.logo
      : null;
    // only recruiters can change their logos from the settings page
    // if logged in as a maker we disable image upload - this is done on the maker profile page instead
    const studioStripeData = {};
    if (user && user.recruiter && studio && studio.licenseType !== "basic") {
      studioStripeData.expYear = expYear;
      studioStripeData.expMonth = expMonth;
      studioStripeData.cardLast4 = cardLast4;
      studioStripeData.nextBillingDate = nextBillingDate;
    }

    return (
      <main role="main" className={s.root}>
        <div className={s.top}>
          <h1>Settings</h1>
        </div>
        {this.state.isLoading ? (
          <div className={s.loader}>
            <h3>Loading</h3>
            <div className="loader">
              <div />
              <div />
              <div />
            </div>
          </div>
        ) : (
          <div className={s.steps}>
            <SettingsForm
              showImageUpload={{}.hasOwnProperty.call(user, "recruiter")}
              user={user}
              imgUrl={imgUrl}
              initialValues={{
                ...settings,
                messageFallback:
                  settings.commPreferences === 1 ||
                  settings.commPreferences === 2,
                generalAnnounce:
                  settings.commPreferences === 1 ||
                  settings.commPreferences === 3,
              }}
              studio={studioObj}
              licenseType={studio.licenseType}
              studioStripeData={studioStripeData}
              onSubmit={this.onSubmit}
            />
          </div>
        )}
      </main>
    );
  }
}

Settings.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  settings: PropTypes.object.isRequired,
  onGetSettings: PropTypes.func.isRequired,
  onGetStudioAndPlanInfo: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    settings: selectSettings(),
    studio: selectStudio(),
    expYear: selectExpYear(),
    expMonth: selectExpMonth(),
    cardLast4: selectCardLast4(),
    nextBillingDate: selectNextBillingDate(),
  }),
  (dispatch) => ({
    dispatch,
    onGetSettings: () => dispatch(getSettingsRequest()),
    onGetStudioAndPlanInfo: (recruiterId, companyId) =>
      dispatch(getStudioAndPlanRequest(recruiterId, companyId)),
  })
)(Settings);
