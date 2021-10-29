/*
 * Studio Job Application Card
 */

import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";
import Button from "components/UI/Button";
import ReactTooltip from "react-tooltip";

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
import Info from "./img/info.png";

import Applicant from "components/Applicant";
import s from "./styles.module.scss";
import Switch from "react-switch";

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
const uncheckedIcon = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 12,
      color: "white",
      paddingRight: 2.5,
      paddingTop: 1,
    }}
  >
    Off
  </div>
);
const checkedIcon = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 12,
      fontWeight: 400,
      color: "black",
      paddingRight: 2.5,
      paddingLeft: 2.5,
      paddingTop: 1,
    }}
  >
    On
  </div>
);
class StudioJobApplicationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gtOption: this.props.gtOption,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.gtOption !== prevProps.gtOption) {
      this.setState({ gtOption: this.props.gtOption });
    }
  }
  handleGtChange = (e) => {
    const val = e ? "yes" : "no";
    this.setState({ gtOption: val });
    // const JobId = this.props.id;
    // const jobRole = this.props.role;
    this.props.gtPlusRequest(this.props.id, val, this.props.role);
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.gtOption !== prevProps.gtOption) {
      this.setState({ gtOption: this.props.gtOption });
    }
  }

  render() {
    const {
      id,
      role,
      company,
      startDate,
      expiredAt,
      location,
      country,
      state,
      city,
      countryId,
      stateId,
      countryOptions,
      platforms,
      description,
      imgUrl,
      ownerId,
      studioId,
      isLastPage,
      jobs,
      isShow,
      applicantCount,
      isJobApplicantFetching,
      rejectedApplicantCount,
      onMoveApplicantToOtherJob,
      reviewedApplicantCount,
      onApplicantDetails,
      onApplicantMessage,
      onRejectApplicant,
      onEditJob,
      onJobDetails,
      jobApplicants,
      onDeleteJob,
      renderJobApplicants,
      handleNextPageRequest,
      user,
      applied,
      onSignIn,
      authenticated,
      onApply,
      onValidate,
      isValidated,
      jobFamilyId,
      youtubeVideoUrl,
      cvOption,
      gtOption,
      workCategories,
      studioLogo,
    } = this.props;
    const job = {
      id,
      role,
      company,
      startDate,
      expiredAt,
      location,
      platforms,
      description,
      imgUrl,
      jobFamilyId,
    };

    return (
      <div className={s.root}>
        <div>
          <div className={s.content}>
            <div className={s.info}>
              <div className={s.gtHead}>
                <Link
                  onClick={() =>
                    onJobDetails({
                      id,
                      role,
                      company,
                      startDate,
                      expiredAt,
                      location,
                      country,
                      state,
                      city,
                      countryId,
                      stateId,
                      platforms,
                      jobFamilyId,
                      description,
                      imgUrl,
                      studioId,
                      user,
                      ownerId,
                      applied,
                      onApply,
                      isValidated,
                      onValidate,
                      onEditJob,
                      authenticated,
                      onSignIn,
                      countryOptions,
                      youtubeVideoUrl,
                      cvOption,
                      domain: "recruiter",
                      studioLogo,
                    })
                  }
                >
                  <h1 className={s.title}>{role}</h1>
                </Link>
                <div className={s.gtBtns}>
                  <a
                    onClick={() =>
                      onEditJob(
                        {
                          id,
                          role,
                          studioId,
                          startDate,
                          expiredAt,
                          location,
                          country,
                          state,
                          city,
                          countryId,
                          stateId,
                          platforms,
                          jobFamilyId,
                          description,
                          imgUrl,
                          countryOptions,
                          youtubeVideoUrl,
                          cvOption,
                          gtOption,
                          workCategories,
                        },
                        "recruiter"
                      )
                    }
                  >
                    <i className="fa-pencil fa" />
                  </a>
                  <a onClick={() => onDeleteJob(id, "recruiter")}>
                    <i className="fa-trash fa" />
                  </a>
                </div>
              </div>
              <div className={s.infoDiv}>
                {location && (
                  <span className={s.location}>
                    <i className="icon-pin" />
                    {location}
                  </span>
                )}
                {platforms && (
                  <span className={s.platforms}>
                    {" "}
                    {platforms.map((p, idx) => (
                      <img
                        key={idx}
                        data-tip={p.displayName.toUpperCase()}
                        className={s.platform}
                        src={`${getIcon(p.displayName)}`}
                        alt="icon"
                      />
                    ))}{" "}
                  </span>
                )}
              </div>
            </div>
            <div className={s.extra}>
              <ReactTooltip place="top" type="light" effect="float" html />
              <div className={s.topButtons}>
                <img
                  src={Info}
                  alt="info"
                  className={s.infoIcon}
                  data-tip="Our experts will find you the right person for any job.  <br /> Switch GT+ on and our recruiter will reach out to you."
                />
                Accept GT+ Resumes?
                <Switch
                  onChange={this.handleGtChange}
                  checked={this.state.gtOption === "yes" ? true : false}
                  offColor="#191919"
                  onColor="#FFFF00"
                  id="normal-switch"
                  offHandleColor="#1c1c1c"
                  onHandleColor="#191919"
                  uncheckedIcon={uncheckedIcon}
                  checkedIcon={checkedIcon}
                  height={20}
                  width={45}
                  handleDiameter={20}
                  className={s.gtSwitch}
                />
              </div>
              <div className={s.applicantsButtons}>
                <span>{applicantCount} Applicants</span>
                <span>{rejectedApplicantCount} Rejected</span>
                <span>{reviewedApplicantCount} To Review</span>
                <span>
                  <a
                    onClick={() => renderJobApplicants(id)}
                    id={`applicantsButton${id}`}
                    className="applicantsButton"
                  >
                    Show Applicants
                  </a>{" "}
                </span>
              </div>
            </div>
          </div>
          <div
            className={`${s.applicantsContainer} applicants hidden`}
            id={`applicant${id}`}
          >
            {isJobApplicantFetching && (
              <div className={s.loader}>
                <h3>Loading</h3>
                <div className="loader">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            )}
            {!isJobApplicantFetching && (
              <div>
                {jobApplicants && jobApplicants.length > 0 ? (
                  jobApplicants.map((a, idx) => (
                    <Applicant
                      key={idx}
                      maker={a.maker}
                      job={job}
                      jobs={jobs}
                      isShow={isShow}
                      isRejected={a.isRejected}
                      onMoveApplicantToOtherJob={onMoveApplicantToOtherJob}
                      onApplicantDetails={onApplicantDetails}
                      onApplicantMessage={onApplicantMessage}
                      user={user}
                      onRejectApplicant={onRejectApplicant}
                    />
                  ))
                ) : (
                  <div>
                    <p>No Applicants</p>
                  </div>
                )}
                {isLastPage && jobApplicants && jobApplicants.length > 0 && (
                  <p>No More Applicants</p>
                )}
                {!isLastPage && (
                  <Button
                    text="more"
                    className={`${s.button} ${s.more}`}
                    onClick={() => handleNextPageRequest(id)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

StudioJobApplicationCard.propTypes = {
  onApplicantDetails: PropTypes.func,
  onRejectApplicant: PropTypes.func,
  onApplicantMessage: PropTypes.func,
  renderApplicants: PropTypes.func,
  onJobDetails: PropTypes.func,
  onMoveApplicantToOtherJob: PropTypes.func,
  onEditJob: PropTypes.func.isRequired,
  onDeleteJob: PropTypes.func.isRequired,
  jobs: PropTypes.array.isRequired,
  id: PropTypes.number,
  ownerId: PropTypes.number,
  role: PropTypes.string,
  company: PropTypes.string,
  startDate: PropTypes.string,
  country: PropTypes.string,
  state: PropTypes.string,
  city: PropTypes.string,
  area: PropTypes.string,
  countryId: PropTypes.string,
  stateId: PropTypes.string,
  location: PropTypes.string,
  platforms: PropTypes.array.isRequired,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
  studioId: PropTypes.number,
  applied: PropTypes.bool,
  isJobApplicantFetching: PropTypes.bool,
  getNextPage: PropTypes.func,
  user: PropTypes.object,
  onSignIn: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onValidate: PropTypes.func,
  onApply: PropTypes.func.isRequired,
  isValidated: PropTypes.bool,
  countryOptions: PropTypes.array.isRequired,
  jobFamilyId: PropTypes.number,
  cvOption: PropTypes.string,
  gtOption: PropTypes.string,
  youtubeVideoUrl: PropTypes.string,
  isLastPage: PropTypes.bool,
  gtPlusRequest: PropTypes.func,
  isShow: PropTypes.bool,
  applicantCount: PropTypes.number,
  rejectedApplicantCount: PropTypes.number,
  reviewedApplicantCount: PropTypes.number,
  jobApplicants: PropTypes.array,
  renderJobApplicants: PropTypes.func,
  handleNextPageRequest: PropTypes.func,
  studioLogo: PropTypes.string,
  workCategories: PropTypes.array,
  expiredAt: PropTypes.string,
};

export default StudioJobApplicationCard;
