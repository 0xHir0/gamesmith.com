import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";

import s from "./styles.module.scss";
import { isEmpty } from "lodash";
import Button from "components/UI/Button";
import { checkAuthToken } from "../../utils";

import sendJobIconDark from "../../data/icons/sendjobIconDark.png";
import sendJobIconWhite from "../../data/icons/sendJobwhiteIcon.png";
import heartWhiteIcon from "../../data/icons/heartWhiteIcon.png";
import heartIconRed from "../../data/icons/hearticonred.png";
import { createStructuredSelector } from "reselect";
import { saveJobForLater } from "../../containers/App/actions";
import {
  openMessage,
  openSendToAFriend,
  openSignIn,
} from "../../containers/Modals/actions";

// New platform Icons

import android from "data/icons/platform_icons_new/android-logo.png";
import apple from "data/icons/platform_icons_new/apple-big-logo.png";
import augmentedReality from "data/icons/platform_icons_new/augmented-reality.png";
import googleStadia from "data/icons/platform_icons_new/Google-Stadia.png";
import switchIco from "data/icons/platform_icons_new/nintendo-switch.png";
import virtualreality from "data/icons/platform_icons_new/virtual-reality.png";
import browser from "data/icons/platform_icons_new/web .png";
import windows from "data/icons/platform_icons_new/windows-logo-silhouette.png";
import xbox from "data/icons/platform_icons_new/xbox.png";
import playstation from "data/icons/platform_icons_new/icon.png";

const YoutubeVideo = require("react-youtube-video");

// For New Platform Icons
const getIcon = (icon) => {
  switch (icon) {
    case "windows":
      return windows;
    case "playstation":
      return playstation;
    case "xbox":
      return xbox;
    case "switch":
      return switchIco;
    case "browser":
      return browser;
    case "android":
      return android;
    case "ios":
      return apple;
    case "ar":
      return augmentedReality;
    case "vr":
      return virtualreality;
    case "google-stadia":
      return googleStadia;
  }
};

class JobDetailsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingJob: false,
      search: null,
      darkIcon: false,
      heartIconRed: false,
      hasMakerCV: this.props.hasCv,
      hasCV: "",
      cvRequired: this.props.cvOption,
    };
  }

  changeIcon(type) {
    if (type === "send") {
      this.setState({
        darkIcon: false,
      });
    }
    if (type === "save") {
      this.setState({
        heartIconRed: false,
      });
    }
  }
  handleMouseEnter(type) {
    if (type === "send") {
      this.setState({
        darkIcon: true,
      });
    }
    if (type === "save") {
      this.setState({
        heartIconRed: true,
      });
    }
  }
  showErrorMsg() {
    this.setState({
      hasCV: "no",
    });
  }

  render() {
    const {
      id,
      platforms,
      jobsFamily,
      company,
      role,
      description,
      startDate,
      expiredAt,
      imgUrl,
      studioId,
      location,
      country,
      state,
      city,
      countryId,
      stateId,
      button,
      user,
      ownerId,
      applied,
      onApply,
      isValidated,
      onValidate,
      onEditJob,
      onSignIn,
      domain,
      authenticated,
      countryOptions,
      onConfirmApply,
      onSendEmailToFriend,
      onSaveForLater,
      onAlreadyApplied,
      youtubeVideoUrl,
      cvOption,
      hasCv,
      studioLogo,
    } = this.props;
    const jobUrlOrigin = window.location.origin;
    const jobUrl = `${jobUrlOrigin}/job/${id}`;
    return (
      <div>
        <div className={s.top}>
          <h1>{role}</h1>
        </div>
        <div className={s.jobButtonsContainer}>{button}</div>
        <div className={s.job}>
          {imgUrl ? (
            <div className={s.logo}>
              <img src={imgUrl} alt="" style={{ width: 190 }} />
            </div>
          ) : (
            <div className={s.logo}>
              <img src={studioLogo} alt="" style={{ width: 190 }} />
            </div>
          )}
          <div className={`${s.data} ${s.nologo}`}>
            <h2>{company}</h2>
            <h4>{location}</h4>
            {platforms && (
              <div className={s.platforms}>
                {platforms.map((p, idx) => (
                  <img
                    key={idx}
                    data-tip={p.displayName.toUpperCase()}
                    className={s.platform}
                    src={`${getIcon(p.displayName)}`}
                  />
                ))}
              </div>
            )}
            <ReactTooltip place="top" type="light" effect="float" />
            <div className={s.description}>
              {/* {description}*/}
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
            {cvOption === "yes" && (
              <div style={{ textAlign: "center" }}>
                <p className={this.state.hasCV === "no" ? s.red : s.white}>
                  Studio has requested a CV for this role.
                </p>
                <p className={this.state.hasCV === "no" ? s.red : s.white}>
                  Please update your Gamesmith profile before applying.
                </p>
              </div>
            )}
            <div className={s.videoSection}>
              {youtubeVideoUrl && <YoutubeVideo url={youtubeVideoUrl} />}
            </div>
          </div>
          {!user.recruiter && (
            <Button
              text={
                ownerId === (!isEmpty(user) && !!user.recruiter ? user.id : -1)
                  ? "Edit"
                  : applied
                  ? "Applied"
                  : "Apply Now"
              }
              color={applied ? "transparent-job" : "yellow"}
              className={s.button}
              onClick={
                ownerId === (!isEmpty(user) && !!user.recruiter ? user.id : -1)
                  ? () =>
                      onEditJob({
                        id,
                        role,
                        startDate,
                        expiredAt,
                        location,
                        country,
                        state,
                        city,
                        countryId,
                        stateId,
                        platforms,
                        jobsFamily,
                        description,
                        imgUrl,
                        countryOptions,
                        studioId,
                        domain,
                        youtubeVideoUrl,
                        cvOption,
                      })
                  : authenticated
                  ? !applied
                    ? this.state.cvRequired === "yes"
                      ? onConfirmApply(id, studioId)
                        ? isValidated
                          ? () => onApply(id, studioId)
                          : () => onConfirmApply(id, studioId)
                        : () => this.showErrorMsg()
                      : isValidated
                      ? () => onApply(id, studioId)
                      : () => onConfirmApply(id, studioId)
                    : ""
                  : () => onSignIn()
              }
            />
          )}
          {!user.recruiter && (
            <div className={s.jobDetailsButtonContainer}>
              <div style={{ textAlign: "center"}}>
                <div className={s.sendButtoncontainer}>
                  <Button
                    text="Send to a Friend"
                    className={s.sendToFriend}
                    onClick={() => onSendEmailToFriend(role, jobUrl)}
                    onMouseLeave={() => this.changeIcon("send")}
                    onMouseEnter={() => this.handleMouseEnter("send")}
                    // icon={
                    //   this.state.darkIcon ? sendJobIconDark : sendJobIconDark
                    //   //sendJobIconWhite
                    // }
                    icon = {sendJobIconDark}
                  />
                </div>
                <div className={s.saveButtoncontainer}>
                  <Button
                    text="Save for Later"
                    className={s.saveForLater}
                    onMouseLeave={() => this.changeIcon("save")}
                    onMouseEnter={() => this.handleMouseEnter("save")}
                    onClick={
                      checkAuthToken()
                        ? applied
                          ? () => onAlreadyApplied()
                          : () =>
                              onSaveForLater(
                                this.props.user.email,
                                role,
                                jobUrl
                              )
                        : () => onSignIn()
                    }
                    icon={
                      this.state.heartIconRed ? heartIconRed : heartIconRed
                      //heartWhiteIcon
                    }
                  />
                </div>
                {/* <div className="col-md-2"></div>*/}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

JobDetailsCard.propTypes = {
  id: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  platforms: PropTypes.array.isRequired,
  company: PropTypes.string,
  startDate: PropTypes.string,
  expiredAt: PropTypes.string,
  role: PropTypes.string,
  applied: PropTypes.bool,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
  message: PropTypes.string,
  button: PropTypes.string,
  onApply: PropTypes.func.isRequired,
  user: PropTypes.object,
  isValidated: PropTypes.bool.isRequired,
  onValidate: PropTypes.func.isRequired,
  onEditJob: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onSignIn: PropTypes.func.isRequired,
  studioId: PropTypes.number.isRequired,
  countryOptions: PropTypes.array.isRequired,
  domain: PropTypes.string,
  onConfirmApply: PropTypes.func.isRequired,
  onConfirmApplyJob: PropTypes.func.isRequired,
  onSendEmailToFriend: PropTypes.func.isRequired,
  onSaveForLater: PropTypes.func.isRequired,
  onAlreadyApplied: PropTypes.func.isRequired,
  jobsFamily: PropTypes.array,
  youtubeVideoUrl: PropTypes.string,
  cvOption: PropTypes.string,
  hasCv: PropTypes.bool,
  studioLogo: PropTypes.string,
};

// export default JobDetailsCard;

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  // onGetJob: id => dispatch(jobRequest(id)),
  // // onValidate: (jobId, studioId) => dispatch(openApplySms(jobId, studioId)),
  // onValidate: (jobId, studioId) => dispatch(openConfirmApplyJob(jobId, studioId)),
  // onApply: (id, studioId) => dispatch(applyJobRequest(id, studioId)),
  // onDelete: (id, domain) => dispatch(openDeleteJob(id, domain)),
  // onGetCountries: () => dispatch(getCountriesRequest()),
  onSignin: () => dispatch(openSignIn()),
  onSendEmailToFriend: (jobtitle, jobUrl) =>
    dispatch(openSendToAFriend(jobtitle, jobUrl)),
  onSaveForLater: (email, jobTitle, jobUrl) =>
    dispatch(saveJobForLater(email, jobTitle, jobUrl)),
  onAlreadyApplied: () =>
    dispatch(
      openMessage("Already Applied", "You have already applied for this job")
    ),
}))(JobDetailsCard);
