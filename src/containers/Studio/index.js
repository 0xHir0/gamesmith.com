/*
 * Studio container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toUpper, startCase, debounce, merge, isEmpty } from "lodash";
import { createStructuredSelector } from "reselect";
import "./scroll";
import { checkAuthToken, FRONTEND_URI, getUserData } from "../../utils";
import StudioDescriptionCard from "components/StudioDescriptionCard";
import StudioGameCard from "components/StudioGameCard";
import StudioRightNav from "components/StudioRightNav";
import StudioJobCard from "components/StudioJobCard";
import StudioContentCard from "components/StudioContentCard";

import selectStudio, {
  selectStudioJobs,
  selectIsFetching,
  selectIsJobsNumberClicked,
  selectRecruiter,
} from "./selectors";
import {
  selectUser,
  selectCountries,
  selectHasMakerCV,
  selectAuth,
} from "containers/App/selectors";
import { getCountriesRequest, getMakerCVInfo } from "containers/App/actions";
import { studioRequest, applyStudioJobRequest } from "./actions";

import { selectPhoneValidated } from "../Job/selectors";
import {
  openEditJob,
  openJobDetails,
  openApplySms,
  openStudioMessage,
  openSignIn,
} from "containers/Modals/actions";

import heroPlaceholder from "../../data/images/hero-placeholder.jpg";
import logoPlaceholder from "../../data/images/logo-placeholder.jpg";
import basisCoverImage from "../Home/img/bg.jpg";
import editButton from "./images/editPencil.png";
import NewStudio from "../NewStudio";

import s from "./styles.module.scss";
import MetaTags from "react-meta-tags";

class Studio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScroller: false,
    };
  }
  getStudioOffset = (element) => {
    if (element != null) {
      const bounding = element.getBoundingClientRect();
      return {
        top: bounding.top + document.body.scrollTop,
        left: bounding.left + document.body.scrollLeft,
      };
    }
  };

  handleStudioScroll = () => {
    const rightNavBar = document.getElementById("rightNav");
    const startElement = document.getElementById("about");
    if (rightNavBar != null && startElement != null) {
      const offset = this.getStudioOffset(startElement);
      const windowsScrollTop = window.pageYOffset;
      if (windowsScrollTop >= offset.top - 150) {
        rightNavBar.classList.remove(
          "hideNav__app-components-StudioRightNav-styles__OgZAW"
        );
        rightNavBar.classList.remove(
          "hideNav__app-containers-Studio-styles__3Xd8B"
        );
      } else {
        rightNavBar.classList.add(
          "hideNav__app-components-StudioRightNav-styles__OgZAW"
        );
        rightNavBar.classList.add(
          "hideNav__app-containers-Studio-styles__3Xd8B"
        );
      }
    }
    if (this.getScrollYPosition() >= 1000) {
      this.setState({
        showScroller: true,
      });
    } else {
      this.setState({
        showScroller: false,
      });
    }
  };

  componentDidMount() {
    const {
      params: { slug },
      onGetStudio,
      onGetCountries,
      user,
      isJobCountClicked,
      onGetMakerCv,
    } = this.props;
    onGetStudio(slug);
    if (!isEmpty(user) && checkAuthToken()) {
      onGetCountries();
    }
    if (!isEmpty(user) && user.maker && checkAuthToken()) {
      onGetMakerCv(user.maker.id);
    }
    const addEvent = window.attachEvent || window.addEventListener;
    addEvent("scroll", this.handleStudioScroll);
  }

  componentWillUnmount() {
    const removeEvent = window.detachEvent || window.removeEventListener;
    removeEvent("scroll", this.handleStudioScroll);
  }
  findStudioMakers(studioId, name) {
    localStorage.removeItem("studioName");
    localStorage.setItem("studioName", name);
    localStorage.setItem("returnToStudioPath", window.location.href);
  }
  getScrollYPosition = () => {
    const scrollLength =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    return scrollLength;
  };
  scrollPage = () => {
    document.getElementById("scorlldivSingleStudio").scrollIntoView(true);
  };

  createGroup = (name, users) => {
    const { user } = this.props;
    window.$applozic.fn.applozic("createGroup", {
      groupName: name, // required
      type: 1, // (required) 1:private, 2:public, 5:broadcast,7:GroupofTwo
      clientGroupId: name + user.id, // optional
      users: users.map((user) => {
        return {
          userId: user.id,
          displayName: `${user.firstName} ${user.lastName}`,
          groupRole: 3, // (optional)  USER(0), ADMIN(1), MODERATOR(2), MEMBER(3)
        };
      }),
      callback(response) {
        if (response.status == "error") {
          window.$applozic.fn.applozic("loadGroupTabByClientGroupId", {
            clientGroupId: name + user.id,
          });
        }
      },
    });
  };

  render() {
    const {
      params: { slug },
      studio,
      jobs,
      doc,
      hasCV,
      onEditJob,
      onJobDetails,
      onApply,
      isFetching,
      isValidated,
      onValidate,
      onStudioMessage,
      authenticated,
      onSignIn,
      countryOptions,
      findStudioMakers,
      recruiter,
    } = this.props;
    const studioMakerCount =
      studio &&
      studio.studioAdditionalInfo &&
      studio.studioAdditionalInfo[0].employeeCount;
    const loginRecruiterStudio = !!(getUserData() && getUserData().recruiter)
      ? getUserData().recruiter.companyId
      : -1;
    const { user } = this.props;
    const studiovideos =
      studio &&
      studio.content &&
      studio.content.length > 0 &&
      studio.content.filter((c) => c.isVideo);
    const studioimages =
      studio &&
      studio.content &&
      studio.content.length > 0 &&
      studio.content.filter((c) => c.isImage);

    return (
      <main role="main" className={s.root}>
        <div id="scorlldivSingleStudio"></div>
        <div className="wrapper">
          <MetaTags>
            <meta property="og:site_name" content="Gamesmith" />
            <meta
              property="og:title"
              content={`Gamesmith profile of ${studio.name}`}
            />
            <meta
              property="og:url"
              content={`${decodeURIComponent(
                FRONTEND_URI + this.props.location.pathname
              )}`}
            />
            <meta property="og:image" content={studio.heroUrl} />
            <meta property="og:description" content={studio.description} />
            <meta
              property="og:image:alt"
              content={`Gamesmith profile of ${studio.name}`}
            />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:creator" content="@VcChurchill" />
          </MetaTags>
        </div>
        {!isFetching && (
          <div>
            {studio &&
            studio.studioAdditionalInfo &&
            studio.studioAdditionalInfo[0] &&
            studio.studioAdditionalInfo[0].source &&
            studio.studioAdditionalInfo[0].source == "giantbomb" ? (
              <NewStudio
                description={studio.description}
                user={user}
                id={studio.id}
                licenseType={studio.licenseType}
                basicCoverImage={basisCoverImage}
                heroUrl={studio.heroUrl}
                heroPlaceHolder={heroPlaceholder}
                location={studio.location}
                websiteLink={studio.websiteLink}
                contactEmail={studio.contactEmail}
                logo={studio.logo || logoPlaceholder}
                employeeCount={studioMakerCount}
                bannerUrl={studio.bannerUrl}
                name={studio.name}
                slug={slug}
                category={
                  studio &&
                  studio.studioAdditionalInfo &&
                  studio.studioAdditionalInfo[0] &&
                  studio.studioAdditionalInfo[0].category &&
                  studio.studioAdditionalInfo[0].category[0]
                    ? studio.studioAdditionalInfo[0].category[0]
                    : ""
                }
                platforms={studio.platforms}
                userId={user.studioId}
                jobs={studio.jobs}
                games={studio.games}
                owner={studio.id === loginRecruiterStudio}
                onEditJob={onEditJob}
                isValidated={isValidated}
                onValidate={onValidate}
                onApply={onApply}
                onJobDetails={onJobDetails}
                authenticated={authenticated}
                onSignIn={onSignIn}
                hasCV={hasCV}
                token={checkAuthToken()}
                countryOptions={countryOptions}
                studioLogo={studio.logo || logoPlaceholder}
                recruiter={recruiter}
                createGroup={this.createGroup}
              />
            ) : (
              <div>
                <section
                  id="hero"
                  className={s.full}
                  style={
                    studio.licenseType === "basic"
                      ? { backgroundImage: `url(${basisCoverImage})` }
                      : {
                          backgroundImage: `url(${
                            studio.heroUrl || heroPlaceholder
                          })`,
                        }
                  }
                >
                  <div className={s.studioName}>
                    <h4>{toUpper(studio.name)}</h4>
                  </div>
                  {user &&
                  user.recruiter &&
                  studio.id === loginRecruiterStudio ? (
                    <div className={s.editButton}>
                      <a href="/recruiter">
                        <img src={editButton} alt={"edit"}></img>
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={s.outer}>
                    <div className={s.inner}>
                      {jobs && jobs.length > 0 && (
                        <h4>Find your next great gaming gig</h4>
                      )}
                      {jobs && jobs.length > 0 && (
                        <a href="#studio-jobs">
                          <p className={s.joinButton}>JUMP TO JOBS</p>
                        </a>
                      )}
                    </div>
                  </div>
                </section>
                <div id="about" className={s.about}>
                  <StudioDescriptionCard
                    studioId={studio.id}
                    name={studio.name}
                    license={studio.licenseType}
                    description={studio.description}
                    location={studio.location}
                    websiteLink={studio.websiteLink}
                    contactEmail={studio.contactEmail}
                    platforms={studio.platforms}
                    logo={studio.logo || logoPlaceholder}
                    employeeCountId={studio.employeeCountId}
                    owner={studio.id === loginRecruiterStudio}
                    onStudioMessage={onStudioMessage}
                    authenticated={checkAuthToken()}
                    isRecruiter={user && user.recruiter}
                    findStudioMakers={this.findStudioMakers}
                    employeeCount={studioMakerCount}
                    onSignIn={onSignIn}
                    recruiter={recruiter}
                    createGroup={this.createGroup}
                    slug={slug}
                    userId={user.studioId}
                  />
                </div>
                {studio && studio.licenseType !== "basic" ? (
                  <div>
                    <StudioRightNav
                      game={studio.games && studio.games.length > 0}
                      content={studio.content && studio.content.length > 0}
                      job={studio.jobs && studio.jobs.length > 0}
                    />
                    <div id="studio-games" className={`${s.games}`}>
                      {studio.games &&
                        studio.games.length > 0 &&
                        studio.games.map((g, idx) => (
                          <StudioGameCard
                            key={idx}
                            name={g.name}
                            description={g.description}
                            imageUrl={g.imageUrl}
                            doc={doc}
                          />
                        ))}
                    </div>
                    <div id="studio-content" className={`${s.culture}`}>
                      {studioimages &&
                        studioimages.length > 0 &&
                        studioimages.map((c, idx) => (
                          <StudioContentCard
                            key={idx}
                            contentId={c.id}
                            contentUrl={c.contentUrl}
                            isVideo={c.isVideo}
                            isImage={c.isImage}
                          />
                        ))}
                      {studiovideos &&
                        studiovideos.length > 0 &&
                        studiovideos.map((c, idx) => (
                          <StudioContentCard
                            key={idx}
                            contentId={c.id}
                            contentUrl={c.contentUrl}
                            isVideo={c.isVideo}
                            isImage={c.isImage}
                          />
                        ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {studio &&
                studio.licenseType !== "basic" &&
                studio.licenseType !== "branded" ? (
                  <div id="studio-jobs" className={`${s.jobs}`}>
                    {jobs &&
                      jobs.length > 0 &&
                      jobs.map((j, idx) => (
                        <StudioJobCard
                          key={idx}
                          studioId={studio.id}
                          id={j.id}
                          role={j.role.name}
                          company={studio.name}
                          user={user}
                          startDate={
                            j.startDate ? new Date(j.startDate).toString() : ""
                          }
                          expiredAt={
                            j.studioJobCardDetails &&
                            j.studioJobCardDetails.expiredAt
                              ? new Date(
                                  j.studioJobCardDetails.expiredAt
                                ).toString()
                              : ""
                          }
                          location={j.location}
                          country={j.address && j.address.country}
                          state={j.address && j.address.state}
                          city={j.address && j.address.city}
                          countryId={j.address && j.address.countryId}
                          stateId={j.address && j.address.stateId}
                          countryOptions={countryOptions}
                          platforms={j.platforms}
                          workCategories={j.workCategories}
                          description={j.description}
                          imgUrl={j.imgUrl}
                          owner={j.companyId === loginRecruiterStudio}
                          onEditJob={onEditJob}
                          isValidated={isValidated}
                          onValidate={onValidate}
                          onApply={onApply}
                          applied={j.applied}
                          onJobDetails={onJobDetails}
                          authenticated={authenticated}
                          onSignIn={onSignIn}
                          ownerId={j.ownerId}
                          jobFamilyId={j.jobFamilyId}
                          youtubeVideoUrl={j.youtubeVideo}
                          cvOption={j.cvOption}
                          gtOption={j.gtOption}
                          hasCv={hasCV}
                          token={checkAuthToken()}
                          studioLogo={studio.logo || logoPlaceholder}
                        />
                      ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        )}
        {isFetching && (
          <div style={{ margin: 80 }}>
            <h3>Loading</h3>
            <div className="loader">
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
        {this.state.showScroller ? (
          <div onClick={() => this.scrollPage()} className={s.float}>
            <i className={`fa fa-arrow-up ${s["my-float"]}`}></i>
          </div>
        ) : (
          ""
        )}
      </main>
    );
  }
}

Studio.propTypes = {
  params: PropTypes.object.isRequired,
  studio: PropTypes.object.isRequired,
  jobs: PropTypes.array.isRequired,
  onEditJob: PropTypes.func.isRequired,
  onJobDetails: PropTypes.func.isRequired,
  user: PropTypes.object,
  doc: PropTypes.object,
  onStudioMessage: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onGetStudio: PropTypes.func.isRequired,
  isValidated: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onValidate: PropTypes.func.isRequired,
  countryOptions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isJobCountClicked: PropTypes.bool.isRequired,
  findStudioMakers: PropTypes.func,
  onGetMakerCv: PropTypes.func,
  hasCv: PropTypes.bool,
};

export default connect(
  createStructuredSelector({
    authenticated: selectAuth(),
    studio: selectStudio(),
    jobs: selectStudioJobs(),
    isFetching: selectIsFetching(),
    isValidated: selectPhoneValidated(),
    countryOptions: selectCountries(),
    user: selectUser(),
    isJobCountClicked: selectIsJobsNumberClicked(),
    hasCV: selectHasMakerCV(),
    recruiter: selectRecruiter(),
  }),
  (dispatch) => ({
    dispatch,
    onGetStudio: (slug) => dispatch(studioRequest(slug)),
    onEditJob: (job, domain) => dispatch(openEditJob(job, domain)),
    onJobDetails: (job) => dispatch(openJobDetails(job)),
    onValidate: (jobId, studioId) => dispatch(openApplySms(jobId, studioId)),
    onApply: (jobId, studioId) =>
      dispatch(applyStudioJobRequest(jobId, studioId)),
    onStudioMessage: (studioId) => dispatch(openStudioMessage(studioId)),
    onSignIn: () => dispatch(openSignIn()),
    onGetCountries: () => dispatch(getCountriesRequest()),
    onGetMakerCv: (makerId) => dispatch(getMakerCVInfo(makerId)),
  })
)(Studio);
