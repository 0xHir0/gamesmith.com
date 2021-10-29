/*
 * Job container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router";
import { createStructuredSelector } from "reselect";
import ReactTooltip from "react-tooltip";
import { toInteger } from "lodash";
import Helmet from "react-helmet";

import { jobRequest, applyJobRequest } from "./actions";
import {
  saveJobForLater,
  getMakerCVInfo,
  getCountriesRequest,
} from "containers/App/actions";
import { editJobRequest } from "containers/Recruiter/actions";
import AddJobForm from "components/AddJobForm";

import {
  openDeleteJob,
  openConfirmApplyJob,
  openSignIn,
  openSendToAFriend,
  openJobNotAvailable,
} from "containers/Modals/actions";

import selectJob, { selectPhoneValidated } from "./selectors";
import {
  selectUser,
  selectCountries,
  selectHasMakerCV,
} from "containers/App/selectors";

import Button from "components/UI/Button";
import sendJobIconDark from "../../data/icons/sendjobIconDark.png";
import sendJobIconWhite from "../../data/icons/sendJobwhiteIcon.png";
import heartWhiteIcon from "../../data/icons/heartWhiteIcon.png";
import heartIconRed from "../../data/icons/hearticonred.png";
import s from "./styles.module.scss";
import { checkAuthToken } from "../../utils";
import JobFamilyData from "../../data/jobFamily";
import { openMessage } from "../Modals/actions";
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
import { FRONTEND_URI } from "../../utils/index";

const YoutubeVideo = require("react-youtube-video");

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoCountryId: null,
      geoStateId: null,
      isEditingJob: false,
      search: null,
      darkIcon: false,
      heartIconRed: false,
      hasMakerCV: this.props.hasCV,
      hasCV: "yes",
      cvRequired: this.props.job.job.cvOption,
    };
  }

  componentWillMount() {
    const {
      location: { query },
      params: { jobID },
      onGetJob,
    } = this.props;
    if ({}.hasOwnProperty.call(query, "search")) {
      localStorage.setItem("jobId", `job-${jobID}`);
      this.setState({
        search: this.searchString(query),
      });
    }
    onGetJob(jobID);
    if (localStorage.getItem("jobUrl")) localStorage.removeItem("jobUrl");
    localStorage.setItem("jobID", `/job/${jobID}`);
  }
  componentDidMount() {
    const {
      job: { company = {} },
    } = this.props.job;
    const {
      params: { jobID },
      dispatch,
    } = this.props;
    if (this.state.isEditingJob) {
      this.props.onGetCountries();
    }
    if (checkAuthToken()) {
      this.props.onGetMakerCv(
        this.props.user && this.props.user.maker && this.props.user.maker.id
      );
      if (localStorage.getItem("apply")) {
        dispatch(openConfirmApplyJob(jobID, company.id));
        localStorage.removeItem("apply");
      }
    }
  }
  componentWillUpdate(nextProps) {
    const {
      params: { jobID },
      onGetJob,
    } = this.props;
    const nextID = nextProps.params.jobID;
    if (nextID !== jobID) {
      onGetJob(nextID);
    }
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      if (
        this.state.geoCountryId === "WLS" ||
        this.state.geoCountryId == "SCT" ||
        this.state.geoCountryId == "ENG" ||
        this.state.geoCountryId == "NIR" ||
        this.state.geoCountryId === "VA"
      ) {
        values.state = null;
        const cvOpt = localStorage.getItem("selectedCVOption");
        values.cvOption = cvOpt;
        values.gtOption = localStorage.getItem(`gtOption${values.jobId}`);
        if (this.state.geoCountryId === "VA") {
          values.city = null;
          dispatch(
            editJobRequest({
              domain: "job",
              countryId: this.state.geoCountryId,
              stateId: null,
              values,
              resolve,
              reject,
              toggle: this.toggleEditJob,
            })
          );
          localStorage.removeItem("selectedCVOption");
        } else {
          dispatch(
            editJobRequest({
              domain: "job",
              countryId: this.state.geoCountryId,
              stateId: null,
              values,
              resolve,
              reject,
              toggle: this.toggleEditJob,
            })
          );
          localStorage.removeItem("selectedCVOption");
        }
      } else {
        const cvOpt = localStorage.getItem("selectedCVOption");
        values.cvOption = cvOpt;
        values.gtOption = localStorage.getItem(`gtOption${values.jobId}`);
        dispatch(
          editJobRequest({
            domain: "job",
            countryId: this.state.geoCountryId,
            stateId: this.state.geoStateId,
            values,
            resolve,
            reject,
            toggle: this.toggleEditJob,
          })
        );
        localStorage.removeItem("selectedCVOption");
      }
    });

  toggleEditJob = () => {
    this.setState({
      isEditingJob: !this.state.isEditingJob,
      geoCountryId:
        this.props.job &&
        this.props.job.job &&
        this.props.job.job.address &&
        this.props.job.job.address.countryId,
      geoStateId:
        this.props.job &&
        this.props.job.job &&
        this.props.job.job.address &&
        this.props.job.job.address.stateId,
    });
  };

  setGeoCountryId = (val) => {
    this.setState({
      geoCountryId: val,
    });
  };

  setGeoStateId = (val) => {
    this.setState({
      geoStateId: val,
    });
  };

  ISODateString = (d) => {
    function pad(n) {
      return n < 10 ? "0" + n : n;
    }
    return (
      d.getUTCFullYear() +
      "-" +
      pad(d.getUTCMonth() + 1) +
      "-" +
      pad(d.getUTCDate()) +
      "T" +
      pad(d.getUTCHours()) +
      ":" +
      pad(d.getUTCMinutes()) +
      ":" +
      pad(d.getUTCSeconds()) +
      "Z"
    );
  };

  searchString = (obj) => {
    let searchString = "search=true";
    if (obj.currRole) {
      searchString += `&currRole=${obj.currRole}`;
    }
    if (obj.platforms) {
      searchString += `&platforms=${obj.platforms}`;
    }
    if (obj.location) {
      searchString += `&location=${obj.location}`;
    }
    if (obj.country) {
      searchString += `&country=${obj.country}`;
    }
    if (obj.state) {
      searchString += `&state=${obj.state}`;
    }
    if (obj.city) {
      searchString += `&city=${obj.city}`;
    }
    return searchString;
  };

  // For New Platform Icons
  getIcon = (icon) => {
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

  setPlatforms = (platforms, e, selectedPlatforms) => {
    const index = selectedPlatforms.indexOf(toInteger(e.target.value));
    if (e.target.checked) {
      platforms.addField({ id: toInteger(e.target.value) });
    } else {
      platforms.removeField(index);
    }
  };

  setWorkCategories = (workCategories, e, selectedWorkCategories) => {
    const i = selectedWorkCategories.indexOf(toInteger(e.target.value));
    if (e.target.checked) {
      workCategories.addField({ id: toInteger(e.target.value) });
    } else {
      workCategories.removeField(i);
    }
  };

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
  setFamilies = (family) => {
    const data = family.map((f) => JobFamilyData.filter((x) => x.label === f));
    return data.map((x) => x[0]);
  };

  onConfirmApplyJob() {
    if (this.props.job.job.cvOption === "yes") {
      if (this.props.hasCV) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  showErrorMsg() {
    this.setState({
      hasCV: "no",
    });
  }
  toDash(text) {
    return text ? text.replace(/\s+/g, "-") : "";
  }

  slugifyUrl(role, company) {
    // this code is responsible for the "slugfication"
    window.history.pushState(
      null,
      null,
      `${window.location.pathname}?${this.toDash(company.name)}-${
        role ? this.toDash(role.name) : ""
      }`
    );
  }

  makeJobSchema = (
    role,
    description,
    jobID,
    startDate,
    validThrough,
    company,
    address,
    companyUrl,
    imgUrl
  ) => {
    const postedDate = this.props.job.job.jobCardDetails
      ? this.props.job.job.jobCardDetails.updatedAt
      : "";
    return {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      title: role.name,
      description: description ? description.replace(/(<([^>]+)>)/gi, "") : "",
      identifier: {
        "@type": "PropertyValue",
        name: "Gamesmith",
        value: jobID,
      },
      datePosted: this.ISODateString(new Date(postedDate)),
      // validThrough: escape(validThrough.toDateString()),
      employmentType: "full-time",
      hiringOrganization: {
        "@type": "Organization",
        name: escape(company.name),
        sameAs: escape(companyUrl),
        logo: imgUrl || null,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: "",
          addressLocality: escape(address.city),
          addressRegion: escape(address.state),
          postalCode: "",
          addressCountry: escape(address.country),
        },
      },
    };
  };
  applyToScrapeJob = (jobApplyUrl) => {
    const res = window.location.href.includes("?")
      ? jobApplyUrl.concat("&utm_source=Gamesmith.com&source=Gamesmith.com")
      : jobApplyUrl.concat("?utm_source=Gamesmith.com&source=Gamesmith.com");
    window.open(jobApplyUrl);
  };
  render() {
    const { search } = this.state;
    const jobUrl = window.location.href;
    const {
      params: { jobID },
      isValidated,
      onApply,
      onValidate,
      onDelete,
      onSignin,
      onSendEmailToFriend,
      onSaveForLater,
      onAlreadyApplied,
      onJobNotAvailable,
    } = this.props;
    const { user, countryOptions } = this.props;
    const {
      job: {
        location,
        platforms,
        description,
        imgUrl,
        company = {},
        startDate,
        expiredAt,
        role = {},
        address = {},
        companyId = 0,
        recruiter = {},
        applied,
        jobFamilyId,
        youtubeVideo,
        cvOption,
        gtOption,
        workCategories,
        isEnable,
      },
      isFetching,
      message,
    } = this.props.job;
    const jobSource =
      "jobCardDetails" in this.props.job.job &&
      "jobSource" in this.props.job.job.jobCardDetails
        ? this.props.job.job.jobCardDetails.jobSource
        : "";
    const jobApplyUrl =
      "jobCardDetails" in this.props.job.job &&
      "jobApplyUrl" in this.props.job.job.jobCardDetails
        ? this.props.job.job.jobCardDetails.jobApplyUrl
        : "";
    const ismobile = window.innerWidth <= 1150;
    const date = new Date(startDate);
    const validThrough = new Date(
      date.getFullYear() + 1,
      date.getMonth(),
      date.getDate()
    );
    const companyUrl = `${window.location.origin}/studio/${company.slug}`;
    if (role.name && company) this.slugifyUrl(role, company);
    const button =
      (recruiter.id === user.id && recruiter.studioApproved) ||
      !!(
        user &&
        user.recruiter &&
        user.recruiter.companyId == companyId &&
        user.recruiter.studioApproved
      ) ? (
        <div className={"row"}>
          <div className={"col-xs-4 col-sm-4 col-md-2"}></div>
          <div className={"col-xs-4 col-sm-4 col-md-8"}>
            <Button
              text="Edit"
              className={s.buttons}
              onClick={this.toggleEditJob}
            />
            <Button
              text="Delete"
              className={`${s.buttons} ${s.btn}`}
              onClick={() => onDelete(jobID, "jobs")}
            />
          </div>
          <div className={"col-xs-4 col-sm-4 col-md-2"}></div>
        </div>
      ) : (
        <div className={"row"}>
          <div className={"col-xs-4 col-sm-4 col-md-2"}></div>
          <div className={"col-xs-4 col-sm-4 col-md-8"}>
            <Button
              text={
                company && company.offsiteApply === true
                  ? "Apply on company website"
                  : applied
                  ? "Applied"
                  : "Apply Now"
              }
              color={applied ? "transparent" : "yellow"}
              className={s.button}
              disabled={applied}
              onClick={
                company && company.offsiteApply === true
                  ? () => this.applyToScrapeJob(jobApplyUrl)
                  : checkAuthToken()
                  ? isEnable
                    ? this.props.job.job.cvOption === "yes"
                      ? this.onConfirmApplyJob()
                        ? isValidated
                          ? () => onApply(jobID, company.id)
                          : () => onValidate(jobID, company.id)
                        : () => this.showErrorMsg()
                      : isValidated
                      ? () => onApply(jobID, company.id)
                      : () => onValidate(jobID, company.id)
                    : () => onJobNotAvailable()
                  : () => onSignin()
              }
            />
          </div>
          <div className={"col-xs-4 col-sm-4 col-md-2"}></div>
        </div>
      );
    const editJob = (
      <div>
        <div className={s.top}>
          <h1>Edit Job</h1>
        </div>
        <div className={s.job}>
          <AddJobForm
            showImageUpload={{}.hasOwnProperty.call(user, "recruiter")}
            onSubmit={this.onSubmit}
            setPlatforms={this.setPlatforms}
            initialValues={{
              jobId: jobID,
              role: role.name,
              studioId: companyId
                ? companyId
                : !!(user && user.recruiter)
                ? user.recruiter.companyId
                : -1,
              startDate: startDate ? new Date(startDate) : "",
              location,
              country: address && address.country,
              state: address && address.state,
              city: address && address.city,
              platforms,
              description,
              imgUrl,
              jobFamily: jobFamilyId ? jobFamilyId.toString() : "",
              youtubeVideoUrl: youtubeVideo,
              cvOption,
              workCategories,
              expiredAt: expiredAt ? new Date(expiredAt) : "",
            }}
            cId={address.countryId}
            sId={address.stateId}
            setGeoCountryId={this.setGeoCountryId}
            setGeoStateId={this.setGeoStateId}
            countryOptions={countryOptions}
            selectedValue={cvOption}
            gtOption={gtOption}
            setWorkCategories={this.setWorkCategories}
            isEditingJob={this.state.isEditingJob}
          />
        </div>
      </div>
    );
    const jobDescription = (
      <div>
        <div className={s.top}>
          <h1>{role.name}</h1>
        </div>
        <div className={s.job}>
          {imgUrl ? (
            <div className={s.logo}>
              {isEnable ? (
                <img src={imgUrl} alt="" style={{ width: 190 }} />
              ) : (
                <div className={s.noJob}>
                  <p>This job is no longer available.</p>
                  <p>
                    Click <a href={"https://gamesmith.com/jobs"}>here</a> for
                    other jobs you may like.
                  </p>
                </div>
              )}
              {company &&
                (company.licenseType === "basic" ||
                  company.licenseType === "full") && (
                  <p>
                    {!ismobile ? (
                      <Link to={`/studio/${company.slug}`}>
                        {`View all jobs at ${
                          company.name ||
                          (!!(user && user.recruiter)
                            ? user.recruiter.currCompany
                            : "")
                        }`}
                      </Link>
                    ) : (
                      `View all jobs at ${
                        company.name ||
                        (!!(user && user.recruiter)
                          ? user.recruiter.currCompany
                          : "")
                      }`
                    )}
                  </p>
                )}
            </div>
          ) : (
            <div className={s.logo}>
              {isEnable ? (
                company.logo ? (
                  <img src={company.logo} alt="" style={{ width: 190 }} />
                ) : (
                  <h1 className={s.heading}>
                    {company.name ||
                      (!!(user && user.recruiter)
                        ? user.recruiter.currCompany
                        : "")}
                  </h1>
                )
              ) : (
                <div className={s.noJob}>
                  <p>This job is no longer available.</p>
                  <p>
                    Click <a href={"https://gamesmith.com/jobs"}>here</a> for
                    other jobs you may like.
                  </p>
                </div>
              )}
              {company &&
                (company.licenseType === "basic" ||
                  company.licenseType === "full") && (
                  <p>
                    <Link to={`/studio/${company.slug}`}>
                      {`View all jobs at ${
                        company.name ||
                        (!!(user && user.recruiter)
                          ? user.recruiter.currCompany
                          : "")
                      }`}
                    </Link>
                  </p>
                )}
            </div>
          )}
          <div className={`${s.data} ${!recruiter.logo && s.nologo}`}>
            <h2>
              {!ismobile ? (
                <Link to={`/studio/${company.slug}`} style={{ color: "white" }}>
                  {company.name ||
                    (!!(user && user.recruiter)
                      ? user.recruiter.currCompany
                      : "")}
                </Link>
              ) : (
                company.name ||
                (!!(user && user.recruiter) ? user.recruiter.currCompany : "")
              )}
            </h2>
            <h4>{location}</h4>
            {platforms && (
              <div className={s.platforms}>
                {platforms.map((p, idx) => (
                  <img
                    key={idx}
                    data-tip={p.displayName.toUpperCase()}
                    className={s.platform}
                    src={`${this.getIcon(p.displayName)}`}
                  />
                ))}
              </div>
            )}
            <div style={ismobile ? { display: "none" } : {}}>
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                <Link
                  to={`/studio/${company.slug}`}
                  style={{ color: "white" }}
                  className={s.seeallJobsLink}
                >
                  See all jobs from{" "}
                  {company.name ||
                    (!!(user && user.recruiter)
                      ? user.recruiter.currCompany
                      : "")}
                </Link>
              </p>
            </div>
            <ReactTooltip place="top" type="light" effect="float" />
            <div className={s.description}>
              {/* {description}*/}
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
              {cvOption === "yes" && user && user.maker && (
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
                {youtubeVideo && <YoutubeVideo url={youtubeVideo} />}
              </div>
            </div>
            <div>
              {user.recruiter && recruiter.id !== user.id ? <br /> : button}
            </div>
            {/* { recruiter.id !== user.id  && <div>*/}

            {!user.recruiter &&
              ((recruiter.id !== user.id && recruiter.studioApproved) ||
                !(
                  user &&
                  user.recruiter &&
                  user.recruiter.companyId == companyId &&
                  user.recruiter.studioApproved
                )) && (
                <div>
                  <div className="row" style={{ textAlign: "center" }}>
                    <div className="col-sm-2"></div>
                    <div className="col-md-4">
                      <Button
                        text="Send to a Friend"
                        className={s.sendToFriend}
                        onClick={() => onSendEmailToFriend(role.name, jobUrl)}
                        onMouseLeave={() => this.changeIcon("send")}
                        onMouseEnter={() => this.handleMouseEnter("send")}
                        icon={
                           sendJobIconDark
                            //sendJobIconWhite
                        }
                      />
                    </div>
                    <div className="col-md-4">
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
                                    role.name,
                                    jobUrl
                                  )
                            : () => onSignin()
                        }
                        icon={
                           heartIconRed
                        }
                      />
                    </div>
                    <div className="col-sm-2"></div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );

    return (
      <main role="main" className={s.root}>
        <Helmet
          meta={[
            { property: "og:site_name", content: "Gamesmith" },
            {
              property: "og:title",
              content: `Gamesmith profile of ${company.name}`,
            },
            {
              property: "og:url",
              content: escape(
                decodeURIComponent(FRONTEND_URI + this.props.location.pathname)
              ),
            },
            { property: "og:description", content: description },
            { property: "og:type", content: `company` },
            { property: "og:image", content: company.logo },
            {
              property: "og:image:alt",
              content: `Gamesmith profile of ${company.name}`,
            },
            { property: "twitter:card", content: `summary` },
            { property: "twitter:creator", content: "@VcChurchill" },
          ]}
          script={[
            {
              type: "application/ld+json",
              innerHTML: JSON.stringify(
                this.makeJobSchema(
                  role,
                  description,
                  jobID,
                  startDate,
                  validThrough,
                  company,
                  address,
                  companyUrl,
                  imgUrl
                )
              ),
            },
          ]}
        />
        <div className="wrapper"></div>
        {!isFetching && (
          <div>
            <nav className={s.nav}>
              <Link
                style={ismobile ? { marginTop: "30px" } : { opacity: "1" }}
                to={search ? `/jobs?${search}` : "/jobs"}
              >
                <font color='#f8e81c' style={{ fontSize: '20px', marginRight: "10px",}}>←</font>
                Back to Jobs
              </Link>
            </nav>
            {this.state.isEditingJob ? editJob : jobDescription}
          </div>
        )}
        {isFetching && (
          <div>
            <h3>{message}</h3>
            <div className={`loader ${s.loading}`}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </main>
    );
  }
}

Job.propTypes = {
  params: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
  user: PropTypes.object,
  isValidated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool,
  onApply: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onGetJob: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  address: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  onGetCountries: PropTypes.func.isRequired,
  onSignin: PropTypes.func.isRequired,
  onSendEmailToFriend: PropTypes.func.isRequired,
  onSaveForLater: PropTypes.func.isRequired,
  onAlreadyApplied: PropTypes.func.isRequired,
  onGetMakerCv: PropTypes.func,
  hasCv: PropTypes.bool,
};

export default connect(
  createStructuredSelector({
    job: selectJob(),
    user: selectUser(),
    isValidated: selectPhoneValidated(),
    countryOptions: selectCountries(),
    hasCV: selectHasMakerCV(),
  }),
  (dispatch) => ({
    dispatch,
    onGetJob: (id) => dispatch(jobRequest(id)),
    // onValidate: (jobId, studioId) => dispatch(openApplySms(jobId, studioId)),
    onValidate: (jobId, studioId) =>
      dispatch(openConfirmApplyJob(jobId, studioId)),
    onApply: (id, studioId) => dispatch(applyJobRequest(id, studioId)),
    onDelete: (id, domain) => dispatch(openDeleteJob(id, domain)),
    onGetCountries: () => dispatch(getCountriesRequest()),
    onSignin: () => dispatch(openSignIn()),
    onJobNotAvailable: () => dispatch(openJobNotAvailable()),
    onSendEmailToFriend: (jobtitle, jobUrl) =>
      dispatch(openSendToAFriend(jobtitle, jobUrl)),
    onSaveForLater: (email, jobTitle, jobUrl) =>
      dispatch(saveJobForLater(email, jobTitle, jobUrl)),
    onAlreadyApplied: () =>
      dispatch(
        openMessage("Already Applied", "You have already applied for this job")
      ),
    onGetMakerCv: (makerId) => dispatch(getMakerCVInfo(makerId)),
  })
)(Job);
