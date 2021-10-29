/*
 * Recruiter container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toInteger } from "lodash";
import JobFamilyData from "./../../data/jobFamily";
import { Redirect } from "react-router-dom";
import { getUserData, checkAuthToken } from "utils";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  recruiterConnectionsRequest,
  jobApplicantsRequest,
  globalApplicantsRequest,
  editStudioRequest,
  upgradeToStudioRequest,
  getRecruiterStudioRequest,
  moveApplicantToOtherJobRequest,
  moveGlobalApplicantToJobRequest,
  toggleView,
  nextPageRequest,
  gtPlusRequest,
} from "./actions";

import {
  openRejectApplicant,
  openApplicantDetails,
  openAddJob,
  openEditJob,
  openJobDetails,
  openDeleteJob,
  openApplicantMessage,
  openDeleteStudioGame,
  openApplySms,
  openDeleteStudioContent,
  openSignIn,
  openPayment,
  openJobPostingMessage,
  openUpgradePrompt,
  openOutOfClicks,
  openExceedRecruiterSearchLimit,
} from "containers/Modals/actions";

import {
  selectRecruiter,
  selectJobApplicants,
  selectGlobalApplicants,
  selectJobs,
  selectStudio,
  selectIsFetching,
  selectIsGlobalFetching,
  selectIsGlobalView,
  selectIsLastPage,
  selectIsJobApplicantFetching,
  selectIsStudioPaying,
} from "./selectors";

import { selectPhoneValidated } from "../Job/selectors";

import {
  selectUser,
  selectAuth,
  selectCountries,
  selectProfileViewCount,
} from "containers/App/selectors";

import AddStudioForm from "components/AddStudioForm";
import StudioJobApplicationCard from "components/StudioJobApplicationCard";

import {
  getCountriesRequest,
  getProfileViewCountRequest,
} from "containers/App/actions";
import StudioGlobalView from "components/StudioGlobalView";
import StudioPlans from "components/StudioPlans";
import GTPlus from "components/GTPlus";
import Button from "components/UI/Button";

import s from "./styles.module.scss";
import { put } from "redux-saga/effects";

class Recruiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPage: "studioPage",
      isPostingJob: false,
      isCandidateSearch: false,
      isGlobalView: false,
      isManageStudio: true,
      isViewMyStudio: false,
      isMyPlan: false,
      isGtPlus: false,
      isFirstTime: true,
      isRecruitmentPlans: false,
      swapGameIndex: 0,
      isPlans: false,
    };
  }

  componentDidMount() {
    if (this.props.location.pathname === "/recruiter") {
      this.toggleTabs("studioPage");
    } else if (this.props.location.pathname === "/recruiter/jobposting") {
      this.toggleTabs("jobs");
    } else if (this.props.location.pathname === "/recruiter/globalview") {
      this.toggleTabs("applicants");
    } else if (this.props.location.pathname === "/recruiter/gtplus") {
      this.toggleTabs("gtplus");
    } else if (this.props.location.pathname === "/recruiter/recruitmentplans") {
      this.toggleTabs("recruitmentplans");
    } else if (this.props.location.pathname === "/recruiter/jobplans") {
      this.toggleTabs("jobplans");
    } else if (this.props.location.pathname === "/recruiter/plans") {
      this.toggleTabs("plans");
    } else {
    }
    if (this.props.location && this.props.location.state) {
      const { fromSettings = false } = this.props.location.state;
      if (fromSettings) {
        this.toggleTabs("jobplans");
      }
    }
    const { user, onGetRecruiter, onStudioRequest, onGetCountries } =
      this.props;
    const loginRecruiterStudio = !!(getUserData() && getUserData().recruiter)
      ? getUserData().recruiter.companyId
      : -1;
    onGetRecruiter(user && user.recruiter ? user.recruiter.id : -1);
    onStudioRequest(loginRecruiterStudio);
    onGetCountries();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isStudioPaying === "no") {
      localStorage.setItem("isPaying", "false");
    } else {
      localStorage.setItem("isPaying", "true");
    }

    if (nextProps.studio) {
      if (nextProps.studio.licenseType === "full" && this.state.isFirstTime) {
        this.updateMYState();
      }
    }
  }

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(editStudioRequest({ values, resolve, reject }));
    });

  toggleTabs = (name) => {
    this.setState({
      showPage: name,
      isPostingJob: false,
      isCandidateSearch: false,
      isGlobalView: false,
      isManageStudio: false,
      isHomePage: false,
      isMyPlan: false,
      isRecruitmentPlans: false,
      isGtPlus: false,
      isPlans: false,
    });
    this.highlightActiveTab(name);
  };

  highlightActiveTab = (name) => {
    if (name === "welcome") {
      this.setState({
        isHomePage: true,
      });
      if (this.props.isGlobalView) {
        this.props.toggleView();
      }
    } else if (name === "jobs") {
      this.setState({
        isPostingJob: true,
      });
      if (this.props.isGlobalView) {
        this.props.toggleView();
      }
    } else if (name === "candidateSearch") {
      this.setState({
        isCandidateSearch: true,
      });
      if (this.props.isGlobalView) {
        this.props.toggleView();
      }
    } else if (name === "applicants") {
      this.setState({
        isGlobalView: true,
      });
      this.renderGlobalView();
      if (!this.props.isGlobalView) {
        this.props.toggleView();
      }
    } else if (name === "jobplans") {
      this.setState({
        isMyPlan: true,
      });
      if (this.props.isGlobalView) {
        this.props.toggleView();
      }
    } else if (name === "recruitmentplans") {
      this.setState({
        isRecruitmentPlans: true,
      });
      if (this.props.isGlobalView) {
        this.props.toggleView();
      }
    } else if (name === "plans") {
      this.setState({
        isPlans: true,
      });
      if (this.props.isGlobalView) {
        this.props.toggleView();
      }
    } else if (name === "gtplus") {
      this.setState({
        isGtPlus: true,
      });
      if (this.props.isGlobalView) {
        this.props.toggleView();
      }
    } else {
      this.setState({
        isManageStudio: true,
      });
    }
  };

  renderGlobalView = () => {
    const { onRenderGlobalApplicants } = this.props;
    const loginRecruiterStudio = !!(getUserData() && getUserData().recruiter)
      ? getUserData().recruiter.companyId
      : -1;
    onRenderGlobalApplicants(loginRecruiterStudio);
  };
  renderJobApplicants = (jobId) => {
    const { onRenderJobApplicants } = this.props;
    const applicantButton = document.getElementById(`applicantsButton${jobId}`);
    applicantButton.innerText == "Show Applicants"
      ? (applicantButton.innerHTML = "Hide Applicants")
      : (applicantButton.innerHTML = "Show Applicants");

    const applicant = document.querySelectorAll(".applicants");
    const applicantBtn = document.querySelectorAll(".applicantsButton");
    for (let i = 0; i < applicant.length; i++) {
      if (`applicant${jobId}` !== applicant[i].id)
        applicant[i].classList.add("hidden");
    }
    for (let i = 0; i < applicantBtn.length; i++) {
      if (`applicantsButton${jobId}` !== applicantBtn[i].id)
        applicantBtn[i].innerHTML = "Show Applicants";
    }
    document.getElementById(`applicant${jobId}`).classList.toggle("hidden");
    onRenderJobApplicants(jobId);
  };

  removeStudioContent = (studioContent, index, contentId) => {
    const {
      studio: { id },
      onDeleteStudioContent,
    } = this.props;
    if (contentId == -1) {
      studioContent.removeField(index);
    } else {
      onDeleteStudioContent(contentId, id, studioContent, index);
    }
  };

  removeStudioGame = (games, index, gameId) => {
    const {
      studio: { id },
      onDeleteStudioGame,
    } = this.props;
    if (gameId == -1) {
      games.removeField(index);
    } else {
      onDeleteStudioGame(gameId, id, games, index);
    }
  };

  addStudioGame = (games) => {
    games.addField({ id: -1 });
    if (games.length > 0) {
      games.swapFields(this.state.swapGameIndex, games.length);
      games.swapFields(this.state.swapGameIndex, 0);
      this.setState({
        swapGameIndex: this.state.swapGameIndex + 1,
      });
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
  openJobLimitModal = () => {
    const { onJobLimitMessage } = this.props;
    onJobLimitMessage();
    this.toggleTabs("jobplans");
  };

  setFamilies = (family) => {
    const data = family.map((f) => JobFamilyData.filter((x) => x.label === f));
    return data.map((x) => x[0]);
  };
  handleNextPageRequest = (jobId) => {
    const { getNextPage, isJobApplicantFetching, isLastPage, jobApplicants } =
      this.props;
    const url = `jobApplicant/${jobId}`;
    const query = "";
    const offset = jobApplicants.length;
    !isJobApplicantFetching && !isLastPage && getNextPage(url, offset, query);
  };
  updateMYState = () => {
    this.setState({ isFirstTime: false });
    this.toggleTabs("applicants");
  };
  clickCountAndApplicantDetail = (maker) => {
    const {
      onApplicantDetails,
      getProfileViewCount,
      profileViewCount,
      openOutOfClicks,
    } = this.props;

    getProfileViewCount();
    if (!profileViewCount) {
      openExceedRecruiterSearchLimit({
        message: "Let's look at a plan that suits your business needs.",
      });
      this.toggleTabs("recruitmentplans");
    } else {
      onApplicantDetails(maker);
    }
  };

  render() {
    const {
      user,
      studio,
      jobs,
      isLastPage,
      jobApplicants,
      countryOptions,
      globalApplicants,
      onRejectApplicant,
      isFetching,
      onValidate,
      isValidated,
      isGlobalFetching,
      isJobApplicantFetching,
      onMoveApplicantToOtherJob,
      onJobLimitMessage,
      onMoveGlobalApplicantToJob,
      onSubmitUpgradeStudioRequest,
      onApplicantDetails,
      onJobDetails,
      onDeleteJob,
      onApplicantMessage,
      onAddJob,
      onEditJob,
      recruiter,
      onApply,
      authenticated,
      onSignIn,
      doc,
      onOpenUpgrade,
      onOpenUpgradePrompt,
      onGtPlusRequest,
      onDowngradePlan,
    } = this.props;

    const rec = user.recruiter || {};
    const full = "full";
    const basic = "basic";
    const free = "free";
    const branded = "branded";
    const primary = "primary";
    const team = "team";
    const singleJobPost = "single-job-post";
    const jobsPostPack = "jobs-post-pack";
    const unlimitedJobsPostPack = "unlimited-jobs-post-pack";
    const lite = "lite-plan";
    const trial = "trial-plan";
    const team2 = "team-plan";
    const pro = "pro-plan";
    const enterprise = "enterprise-plan";
    const global = "global";
    const isUpgradable =
      studio && studio.studioAdditionalInfo && studio.studioAdditionalInfo[0]
        ? studio.studioAdditionalInfo[0].isUpgradable
        : "false";
    const initial = {
      platforms: studio && studio.platforms,
      employeeCountId: studio && studio.employeeCountId,
      name: studio && studio.name,
      id: studio && studio.id,
      location: studio && studio.location,
      websiteLink: studio && studio.websiteLink,
      email: studio && studio.contactEmail,
      description: studio && studio.description,
      logo: studio && studio.logo,
      heroUrl: studio && studio.heroUrl,
      bannerUrl: studio && studio.bannerUrl,
      games: studio && studio.games,
      videos:
        studio && studio.content && studio.content.filter((sc) => sc.isVideo),
      images:
        studio && studio.content && studio.content.filter((sc) => sc.isImage),
    };
    const manageStudioPage = (
      <section>
        <div
          className={`${s.games} ${s.setBgC} ${s.setMarginBottom} ${s.setMarginTop}`}
        >
          {(rec.role && rec.role.id !== 1) ||
            (studio && studio.licenseType === free && (
              <div className={`${s.noJob}`}>
                {studio.licenseType === basic ? (
                  <h4> You do not have a license to access this module</h4>
                ) : (
                  <h4>
                    It looks like you do not have the correct admin privileges
                    to access this page.
                  </h4>
                )}
                <br></br>
                <h4>
                  Please contact{" "}
                  <a href="mailto:sales@gamesmith.com">sales@gamesmith.com</a>{" "}
                  for more details.
                </h4>
              </div>
            ))}

          {rec.role &&
            rec.role.id === 1 &&
            studio &&
            studio.licenseType !== free && (
              <AddStudioForm
                initialValues={initial}
                removeStudioGame={this.removeStudioGame}
                addStudioGame={this.addStudioGame}
                removeStudioContent={this.removeStudioContent}
                setPlatforms={this.setPlatforms}
                onSubmit={this.onSubmit}
                license={studio.licenseType}
                toggleTab={this.toggleTabs}
              />
            )}

          {!!!rec.role && (
            <div className={`${s.noJob}`}>
              {studio.licenseType === basic ? (
                <h4> You do not have a license to access this module</h4>
              ) : (
                <h4>
                  It looks like you do not have the correct admin privileges to
                  access this page.
                </h4>
              )}
              <br></br>
              <h4>
                Please contact{" "}
                <a href="mailto:sales@gamesmith.com">sales@gamesmith.com</a> for
                more details.
              </h4>
            </div>
          )}
        </div>
      </section>
    );
    const myPlan = (
      <section>
        <StudioPlans
          planType={"myPlan"}
          name={studio && studio.name}
          id={studio && studio.id}
          license={studio.licenseType}
          doc={doc}
          onDowngradePlan={onDowngradePlan}
          onOpenUpgrade={onOpenUpgrade}
        />
      </section>
    );
    const recruitmentPlans = (
      <section>
        <StudioPlans
          planType={"recruitmentPlans"}
          name={studio && studio.name}
          id={studio && studio.id}
          license={studio.licenseType}
          doc={doc}
          onDowngradePlan={onDowngradePlan}
          onOpenUpgrade={onOpenUpgrade}
        />
      </section>
    );
    const plans = (
      <section>
        <StudioPlans
          planType={"plans"}
          name={studio && studio.name}
          id={studio && studio.id}
          license={studio.licenseType}
          doc={doc}
          onDowngradePlan={onDowngradePlan}
          onOpenUpgrade={onOpenUpgrade}
        />
      </section>
    );
    const gtPlus = (
      <section>
        <GTPlus handleClick={this.toggleTabs} />
      </section>
    );
    const jobHistory = (
      <div className={s.games}>
        <div>
          {jobs && jobs.length > 0 ? (
            jobs.map((j, idx) => (
              <StudioJobApplicationCard
                key={idx}
                id={j.id}
                role={j.role.name}
                company={studio.name}
                startDate={j.startDate ? new Date(j.startDate).toString() : ""}
                expiredAt={
                  j.jobCardDetails && j.jobCardDetails.expiredAt
                    ? new Date(j.jobCardDetails.expiredAt).toString()
                    : j.studioJobCardDetails && j.studioJobCardDetails.expiredAt
                    ? j.studioJobCardDetails.expiredAt
                    : ""
                }
                location={j.location}
                country={j.address && j.address.country}
                state={j.address && j.address && j.address.state}
                city={j.address && j.address.city}
                countryId={j.address && j.address.countryId}
                stateId={j.address && j.address.stateId}
                countryOptions={countryOptions && countryOptions}
                platforms={j.platforms}
                jobFamilyId={j.jobFamilyId ? j.jobFamilyId : ""}
                description={j.description}
                imgUrl={j.imgUrl}
                applied={j.applied}
                jobs={jobs}
                isShow
                studioId={studio.id}
                ownerId={j.ownerId}
                onApply={onApply}
                applicantCount={j.applicantCount}
                rejectedApplicantCount={j.rejectedApplicantCount}
                reviewedApplicantCount={j.reviewedApplicantCount}
                onApplicantDetails={onApplicantDetails}
                onApplicantMessage={onApplicantMessage}
                onMoveApplicantToOtherJob={onMoveApplicantToOtherJob}
                isJobApplicantFetching={isJobApplicantFetching}
                onRejectApplicant={onRejectApplicant}
                onEditJob={onEditJob}
                onJobDetails={onJobDetails}
                jobApplicants={jobApplicants}
                onDeleteJob={onDeleteJob}
                renderJobApplicants={this.renderJobApplicants}
                handleNextPageRequest={this.handleNextPageRequest}
                isLastPage={isLastPage}
                user={user}
                authenticated={authenticated}
                onValidate={onValidate}
                isValidated={isValidated}
                onSignIn={onSignIn}
                youtubeVideoUrl={j.youtubeVideo}
                cvOption={j.cvOption}
                gtOption={j.gtOption}
                workCategories={j.workCategories}
                gtPlusRequest={onGtPlusRequest}
                studioLogo={studio.logo}
                recruiter
              />
            ))
          ) : (
            <div className={s.nojobsContainer}>
              <p>Time to get busy! You do not have any jobs posted yet.</p>
              <p>Click the "Post A Job" button above to get started!</p>
            </div>
          )}
        </div>
      </div>
    );

    return (
      <Router>
        <main role="main" className={s.root}>
          {!isFetching &&
          jobs &&
          studio &&
          studio.isApproved &&
          studio.isEnable ? (
            <div>
              <section className={s.recruiterHeader}>
                <div className={s.top}>
                  <div className={s.topLinks}>
                    <Link
                      className={
                        this.state.isManageStudio ? s.highLight : s.unHighLight
                      }
                      onClick={() => this.toggleTabs("studioPage")}
                      to={"/recruiter"}
                    >
                      Edit Studio
                    </Link>
                    <a
                      className={s.unHighLight}
                      href={`/studio/${
                        studio
                          ? studio.studioAdditionalInfo[0].slug
                            ? studio.studioAdditionalInfo[0].slug
                            : ""
                          : ""
                      }`}
                     
                    >
                      View My Studio
                    </a>
                    <Link
                      className={
                        this.state.isPostingJob ? s.highLight : s.unHighLight
                      }
                      onClick={() => this.toggleTabs("jobs")}
                      to={"/recruiter/jobposting"}
                    >
                      Job Postings
                    </Link>
                    <a
                      className={
                        this.state.isCandidateSearch
                          ? s.highLight
                          : s.unHighLight
                      }
                      href={"/recruitermaker"}
                    //   onClick={() => 
                    //   (<Redirect to='/recruitermaker' />)
                     
                    //  }
                    >
                      Candidate Search
                    </a>
                    {/*<Link*/}
                    {/*  className={this.state.isGtPlus ? s.highLight : s.unHighLight}*/}
                    {/*  onClick={() => this.toggleTabs('gtplus')}*/}
                    {/*  to={'/recruiter/gtplus'}>GT+ </Link>*/}
                    {/*<Link*/}
                    {/*  className={`${this.state.isRecruitmentPlans ? s.highLight : s.unHighLight} ${s.recruitmentPlans}`}*/}
                    {/*  onClick={() => this.toggleTabs('recruitmentplans')}*/}
                    {/*  to={'/recruiter/recruitmentplans'}>Recruitment Plans</Link>*/}
                    {/*<Link*/}
                    {/*  className={`${this.state.isMyPlan ? s.highLight : s.unHighLight} ${s.recruitmentPlans}`}*/}
                    {/*  onClick={() => this.toggleTabs('jobplans')}*/}
                    {/*  to={'/recruiter/jobplans'}>Job Plans</Link>*/}
                    {/*<Link*/}
                    {/*  className={`${this.state.plans ? s.highLight : s.unHighLight} ${s.recruitmentPlans}`}*/}
                    {/*  onClick={() => this.toggleTabs('plans')}*/}
                    {/*  to={'/recruiter/plans'}>Plans</Link>*/}
                  </div>
                  <div>
                    {studio.licenseType === branded ||
                    studio.licenseType === basic ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={
                          checkAuthToken()
                            ? studio.licenseType === branded ||
                              studio.licenseType === basic
                              ? () =>
                                  onOpenUpgradePrompt(
                                    this.toggleTabs,
                                    "jobplans"
                                  )
                              : ""
                            : () => onSignIn()
                        }
                      />
                    ) : studio.licenseType === primary &&
                      jobs &&
                      jobs.length < 3 ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={
                          checkAuthToken()
                            ? () => onAddJob(studio.id, countryOptions)
                            : () => onSignIn()
                        }
                      />
                    ) : studio.licenseType === team &&
                      jobs &&
                      jobs.length < 10 ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={
                          checkAuthToken()
                            ? () => onAddJob(studio.id, countryOptions)
                            : () => onSignIn()
                        }
                      />
                    ) : studio.licenseType === singleJobPost &&
                      jobs &&
                      jobs.length < 1 ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={
                          checkAuthToken()
                            ? () => onAddJob(studio.id, countryOptions)
                            : () => onSignIn()
                        }
                      />
                    ) : studio.licenseType === jobsPostPack &&
                      jobs &&
                      jobs.length < 4 ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={
                          checkAuthToken()
                            ? () => onAddJob(studio.id, countryOptions)
                            : () => onSignIn()
                        }
                      />
                    ) : studio.licenseType === unlimitedJobsPostPack ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={
                          checkAuthToken()
                            ? () => onAddJob(studio.id, countryOptions)
                            : () => onSignIn()
                        }
                      />
                    ) : studio.licenseType === lite &&
                      jobs &&
                      jobs.length < 1 ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={
                          checkAuthToken()
                            ? () => onAddJob(studio.id, countryOptions)
                            : () => onSignIn()
                        }
                      />
                    ) : studio.licenseType === trial &&
                      jobs &&
                      jobs.length < 1 ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={
                          checkAuthToken()
                            ? () => onAddJob(studio.id, countryOptions)
                            : () => onSignIn()
                        }
                      />
                    ) : studio.licenseType === team2 &&
                      jobs &&
                      jobs.length < 5 ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={
                          checkAuthToken()
                            ? () => onAddJob(studio.id, countryOptions)
                            : () => onSignIn()
                        }
                      />
                    ) : studio.licenseType === pro &&
                      jobs &&
                      jobs.length < 15 ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={
                          checkAuthToken()
                            ? () => onAddJob(studio.id, countryOptions)
                            : () => onSignIn()
                        }
                      />
                    ) : studio.licenseType === enterprise &&
                      jobs &&
                      jobs.length < 40 ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={
                          checkAuthToken()
                            ? () => onAddJob(studio.id, countryOptions)
                            : () => onSignIn()
                        }
                      />
                    ) : studio.licenseType === global ? (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={() => onAddJob(studio.id, countryOptions)}
                      />
                    ) : (
                      <Button
                        className={s.jobPostButton}
                        text="Post a Job"
                        onClick={() => this.openJobLimitModal()}
                      />
                    )}
                  </div>
                </div>
              </section>

              <section className={s.history}>
                {this.state.showPage === "jobs" ? (
                  jobHistory
                ) : this.state.showPage === "studioPage" ? (
                  manageStudioPage
                ) : this.state.showPage === "gtplus" ? (
                  gtPlus
                ) : this.state.isMyPlan === true ? (
                  myPlan
                ) : this.state.isRecruitmentPlans === true ? (
                  recruitmentPlans
                ) : this.state.isPlans === true ? (
                  plans
                ) : (
                  <div>
                    {!isGlobalFetching && (
                      <StudioGlobalView
                        isFullLicense={
                          studio.licenseType !== "basic" &&
                          studio.licenseType !== "branded" &&
                          studio.licenseType !== "single-job-post" &&
                          studio.licenseType !== "unlimited-jobs-post-pack"
                        }
                        studioId={studio.id}
                        studioName={studio.name}
                        jobs={jobs}
                        onOpenUpgradePrompt={onOpenUpgradePrompt}
                        onMoveGlobalApplicantToJob={onMoveGlobalApplicantToJob}
                        onSubmitUpgradeStudioRequest={
                          onSubmitUpgradeStudioRequest
                        }
                        globalApplicants={globalApplicants}
                        license={studio.licenseType}
                        onApplicantDetails={this.clickCountAndApplicantDetail}
                        toggleTab={this.toggleTabs}
                      />
                    )}
                    {isGlobalFetching && (
                      <div className={s.loader}>
                        <h3>Loading</h3>
                        <div className="loader">
                          <div />
                          <div />
                          <div />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
          ) : (
            !isFetching &&
            jobs &&
            studio &&
            (!studio.isApproved || !studio.isEnable) && (
              <div className={`${s.noLicense}`}>
                <h4>Your studio has been disabled.</h4>
                <br></br>
                <h4>
                  Please contact{" "}
                  <a href="mailto:sales@gamesmith.com">sales@gamesmith.com</a>{" "}
                  for more details.
                </h4>
              </div>
            )
          )}
          {isFetching && studio && jobs && (
            <div className={s.loader}>
              <h3>Loading</h3>
              <div className="loader">
                <div />
                <div />
                <div />
              </div>
            </div>
          )}
        </main>
      </Router>
    );
  }
}

Recruiter.propTypes = {
  params: PropTypes.object.isRequired,
  studio: PropTypes.object.isRequired,
  jobs: PropTypes.array.isRequired,
  jobApplicants: PropTypes.array.isRequired,
  globalApplicants: PropTypes.array.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  recruiter: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    location: PropTypes.string,
    currCompany: PropTypes.string,
    connections: PropTypes.array,
  }),
  onGetRecruiter: PropTypes.func,
  isLastPage: PropTypes.bool.isRequired,
  fromSettings: PropTypes.bool,
  location: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  isGlobalFetching: PropTypes.bool.isRequired,
  toggleView: PropTypes.func,
  isJobApplicantFetching: PropTypes.bool.isRequired,
  onStudioRequest: PropTypes.func,
  onJobLimitMessage: PropTypes.func,
  onApplicantDetails: PropTypes.func,
  onApplicantMessage: PropTypes.func,
  onAddJob: PropTypes.func,
  onDeleteJob: PropTypes.func,
  onDeleteStudioGame: PropTypes.func,
  onDeleteStudioContent: PropTypes.func,
  onRejectApplicant: PropTypes.func,
  onEditJob: PropTypes.func,
  onJobDetails: PropTypes.func,
  onRenderJobApplicants: PropTypes.func,
  onRenderGlobalApplicants: PropTypes.func,
  onSubmitUpgradeStudioRequest: PropTypes.func,
  onMoveApplicantToOtherJob: PropTypes.func,
  onMoveGlobalApplicantToJob: PropTypes.func,
  getNextPage: PropTypes.func.isRequired,
  isValidated: PropTypes.bool.isRequired,
  onValidate: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  countryOptions: PropTypes.array.isRequired,
  onGetCountries: PropTypes.func.isRequired,
  doc: PropTypes.object.isRequired,
  onOpenUpgrade: PropTypes.func.isRequired,
  onCancelPlan: PropTypes.func.isRequired,
  onOpenUpgradePrompt: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    recruiter: selectRecruiter(),
    jobApplicants: selectJobApplicants(),
    globalApplicants: selectGlobalApplicants(),
    isFetching: selectIsFetching(),
    isGlobalFetching: selectIsGlobalFetching(),
    isJobApplicantFetching: selectIsJobApplicantFetching(),
    studio: selectStudio(),
    jobs: selectJobs(),
    isGlobalView: selectIsGlobalView(),
    isLastPage: selectIsLastPage(),
    authenticated: selectAuth(),
    isValidated: selectPhoneValidated(),
    countryOptions: selectCountries(),
    isStudioPaying: selectIsStudioPaying(),
    profileViewCount: selectProfileViewCount(),
  }),
  (dispatch) => ({
    dispatch,
    onGetRecruiter: (id) => dispatch(recruiterConnectionsRequest(id)),
    onApplicantDetails: (maker) => dispatch(openApplicantDetails(maker)),
    onJobLimitMessage: () => dispatch(openJobPostingMessage()),
    onAddJob: (studioId, countryOptions) => {
      dispatch(openAddJob(studioId, countryOptions));
    },
    onEditJob: (job, domain) => dispatch(openEditJob(job, domain)),
    onJobDetails: (job) => dispatch(openJobDetails(job)),
    onDeleteJob: (id, domain) => dispatch(openDeleteJob(id, domain)),
    onRenderJobApplicants: (id) => dispatch(jobApplicantsRequest(id)),
    onRenderGlobalApplicants: (id) => dispatch(globalApplicantsRequest(id)),
    onApplicantMessage: (maker, jobId) =>
      dispatch(openApplicantMessage(maker, jobId)),
    onRejectApplicant: (makerId, jobId) =>
      dispatch(openRejectApplicant(makerId, jobId)),
    onStudioRequest: (id) => dispatch(getRecruiterStudioRequest(id)),
    onDeleteStudioGame: (id, studioId, games, index) =>
      dispatch(openDeleteStudioGame(id, studioId, games, index)),
    onDeleteStudioContent: (id, studioId, studioContent, index) =>
      dispatch(openDeleteStudioContent(id, studioId, studioContent, index)),
    onSubmitUpgradeStudioRequest: (id) => dispatch(upgradeToStudioRequest(id)),
    onMoveApplicantToOtherJob: (currentJobId, movedJobId, applicantId) =>
      dispatch(
        moveApplicantToOtherJobRequest(currentJobId, movedJobId, applicantId)
      ),
    onMoveGlobalApplicantToJob: (movedJobId, applicantId) =>
      dispatch(moveGlobalApplicantToJobRequest(movedJobId, applicantId)),
    toggleView: () => dispatch(toggleView()),
    getNextPage: (url, offset, query) =>
      dispatch(nextPageRequest(url, offset, query)),
    onApply: (jobId, studioId) =>
      dispatch(applyStudioJobRequest(jobId, studioId)),
    onValidate: (jobId, studioId) => dispatch(openApplySms(jobId, studioId)),
    onSignIn: () => dispatch(openSignIn()),
    onGetCountries: () => dispatch(getCountriesRequest()),
    // onOpenUpgrade: (plan, price, studioId, studioName, license) => dispatch(openUpgrade(plan, price, studioId, studioName, license)),
    onOpenUpgrade: (plan, price, studioId, studioName, license) =>
      dispatch(openPayment({ plan, price, studioId, studioName, license })),
    onOpenUpgradePrompt: (toggletabs, plan) =>
      dispatch(openUpgradePrompt(toggletabs, plan)),
    onGtPlusRequest: (id, gtOption, role) =>
      dispatch(gtPlusRequest({ id, gtOption, role })),
    // onDowngradePlan: (id, plan) => dispatch(downgradeSubscriptionRequest({ id, plan })),
    getProfileViewCount: () => dispatch(getProfileViewCountRequest()),
    openOutOfClicks: (data) => dispatch(openOutOfClicks(data)),
    openExceedRecruiterSearchLimit: (data) =>
      dispatch(openExceedRecruiterSearchLimit(data)),
  })
)(Recruiter);
