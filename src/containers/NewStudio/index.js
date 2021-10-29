// /*
//  * New Studio Container
//  */
//
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "components/UI/Button";
import s from "./styles.module.scss";
import { selectStudios } from "../Studios/selectors";
import { studiosRequest } from "../Studios/actions";
import home from "./img/home.png";
import yellowHome from "./img/Yellowhome.png";
import game from "./img/game.png";
import yellowGame from "./img/Yellowgame.png";
import briefcase from "./img/briefcase.png";
import yellowBriefcase from "./img/Yellowbriefcase.png";
import people from "./img/people.png";
import yellowPeople from "./img/Yellowpeople.png";
import service from "./img/service.png";
import yellowService from "./img/Yellowservice.png";
import benefit from "./img/benefit.png";
import yellowBenefit from "./img/Yellowbenefit.png";
import envelope from "./img/envelope.png";
import yellowEnvelope from "./img/Yellowenvelope.png";
import website from "./img/website.png";
import yellowWebsite from "./img/yellowWebsite.png";
import claim from "./img/claim.png";
import claimYellow from "./img/claimyellow.png";
import plus from "./img/plus.png";
import message from "./img/message.png";
import StudioOverview from "../../components/StudioOverview";
import StudioServices from "../../components/StudioServices";
import StudioBenefits from "../../components/StudioBenefits";
import StudioContact from "../../components/StudioContact";
import StudioGames from "../../components/StudioGames";
import StudioJobs from "../../components/StudioJobs";
import StudioPeople from "../../components/StudioPeople";
class NewStudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "overview",
    };
  }
  componentDidMount() {
    const { onGetStudios } = this.props;
    onGetStudios();
  }
  setPage = (page) => {
    this.setState({ selected: page });
  };
  render() {
    const {
      user,
      id,
      licenseType,
      basicCoverImage,
      heroUrl,
      heroPlaceHolder,
      name,
      category,
      slug,
      platforms,
      location,
      websiteLink,
      contactEmail,
      logo,
      employeeCount,
      jobs,
      bannerUrl,
      games,
      description,
      onSignIn,
      owner,
      onEditJob,
      isValidated,
      onValidate,
      onApply,
      onJobDetails,
      authenticated,
      hasCV,
      token,
      countryOptions,
      studioLogo,
      recruiter,
      createGroup,
    } = this.props;
    const address = location ? location.split(",") : null;
    const country = address ? address[address.length - 1] : null;
    const city = address ? address[address.length - 2] : null;
    const newlocation = [city, country];
    return (
      <div className={s.root}>
        <div className={s.wrap}>
          <div className={s.head}>
            <img
              src={
                licenseType === "basic"
                  ? basicCoverImage
                  : heroUrl || heroPlaceHolder
              }
              className={s.banner}
            ></img>
            <span className={s.span}>Currently Hiring</span>
          </div>
          <div className={s.about}>
            <div className={s.logo}>
              <div className={s.subItems}>
                <div className={s.logoBox}>
                  <img className={s.img} src={logo} alt="Logo" />
                </div>
                <span className={s.content}>{name}</span>
              </div>
            </div>
            <div className={s.menuItemsSmall}>
              <div className={s.menuDescriptionSmall}>
                <span className={s.descriptionSmall}>
                  {newlocation ? newlocation : "-"}
                </span>
                <span className={s.descriptionSmall}>{employeeCount}</span>
                <span className={`${s.descriptionSmall} ${s.hideBorder}`}>
                  {games.length}
                </span>
              </div>
              <div className={`row ${s.menuHeadingSmall}`}>
                <span className={`${s.headingSmall} `}>Location</span>
                <span className={`${s.headingSmall} `}>Employees</span>
                <span className={`${s.headingSmall} `}>Games Published</span>
              </div>
              <div className={s.menuDescriptionSmall}>
                <span className={s.descriptionSmall}>{games.length}</span>
                <span className={s.descriptionSmall}>
                  {category ? category : "-"}
                </span>
                <span className={`${s.descriptionSmall} ${s.hideBorder}`}>
                  {platforms && platforms.length > 0
                    ? platforms.map((i) => `${i.label} `)
                    : "-"}
                </span>
              </div>
              <div className={`row ${s.menuHeadingSmall}`}>
                <span className={`${s.headingSmall} `}>Games Developed</span>
                <span className={`${s.headingSmall} `}>Category</span>
                <span className={`${s.headingSmall} `}>Platforms</span>
              </div>
            </div>
            <div className={s.menuItems}>
              <div className={s.menuDescription}>
                <span className={s.description}>
                  {newlocation ? newlocation : "-"}
                </span>
                <span className={s.description}>{employeeCount}</span>
                <span className={s.description}>-</span>
                <span className={s.description}>{games.length}</span>
                <span className={s.description}>{games.length}</span>
                <span className={s.description}>
                  {category ? category : "-"}
                </span>
                <span className={s.description}>
                  {platforms && platforms.length > 0
                    ? platforms.map((i) => `${i.label} `)
                    : "-"}
                </span>
                <span className={s.description}>{slug}</span>
              </div>
              <div className={`row ${s.menuHeading}`}>
                <span className={`${s.heading} `}>Location</span>
                <span className={`${s.heading} `}>Employees</span>
                <span className={`${s.heading} `}>Founded</span>
                <span className={`${s.heading} `}>Games</span>
                <span className={`${s.heading} `}>Games Developed</span>
                <span className={`${s.heading} `}>Category</span>
                <span className={`${s.heading} `}>Platforms</span>
                <span className={`${s.heading} `}>Aliases</span>
              </div>
            </div>
            <div className={s.menuButtons}>
              <Button
                text="Follow"
                className={s.addStudioBtn}
                icon={plus}
                style={{ marginRight: "0.6rem" }}
              />
              <Button
                text="Message"
                className={`applozic-launcher ${s.addStudioBtn}`}
                icon={message}
                onClick={() =>
                  authenticated ? createGroup(name, recruiter) : onSignIn()
                }
                disabled={recruiter && recruiter.length < 1}
              />
            </div>
          </div>
        </div>
        <div className={s.overview}>
          <div className={s.overviewItems}>
            <div
              className={s.items}
              onClick={() => this.setState({ selected: "overview" })}
            >
              <img
                src={this.state.selected === "overview" ? yellowHome : home}
                alt={"Overview"}
                className={s.icon}
              />
              <span
                className={
                  this.state.selected === "overview"
                    ? s.yellowItemContent
                    : s.itemContent
                }
              >
                Overview
              </span>
            </div>
            <div
              className={s.items}
              onClick={() => this.setState({ selected: "games" })}
            >
              <img
                src={this.state.selected === "games" ? yellowGame : game}
                alt={"Games"}
                className={s.icon}
              />
              <span
                className={
                  this.state.selected === "games"
                    ? s.yellowItemContent
                    : s.itemContent
                }
              >
                Games
              </span>
            </div>
            <div
              className={s.items}
              onClick={() => this.setState({ selected: "jobs" })}
            >
              <img
                src={
                  this.state.selected === "jobs" ? yellowBriefcase : briefcase
                }
                alt={"Jobs"}
                className={s.icon}
              />
              <span
                className={
                  this.state.selected === "jobs"
                    ? s.yellowItemContent
                    : s.itemContent
                }
              >
                Jobs
              </span>
            </div>
            <div
              className={s.items}
              onClick={() =>
                authenticated
                  ? this.setState({ selected: "people" })
                  : onSignIn()
              }
            >
              <img
                src={this.state.selected === "people" ? yellowPeople : people}
                alt={"People"}
                className={s.icon}
              />
              <span
                className={
                  this.state.selected === "people"
                    ? s.yellowItemContent
                    : s.itemContent
                }
              >
                People
              </span>
            </div>
            {/*   <div className={`${s.items} ${s.hide}`} onClick={() => this.setState({ selected: 'services' })}>
              <img src={this.state.selected === 'services' ? yellowService : service} alt={'Services'} className={s.icon}/>
              <span className={this.state.selected === 'services' ? s.yellowItemContent : s.itemContent}>Services</span>
            </div>
            <div className={s.items} onClick={() => this.setState({ selected: 'benefits' })}>
              <img src={this.state.selected === 'benefits' ? yellowBenefit : benefit} alt={'Perks+Benefits'} className={s.icon}/>
              <span className={this.state.selected === 'benefits' ? s.yellowItemContent : s.itemContent}>Perks+Benefits</span>
            </div>*/}
            <div
              className={`${s.items} ${s.hide}`}
              onClick={() => this.setState({ selected: "contact" })}
            >
              <img
                src={
                  this.state.selected === "contact" ? yellowEnvelope : envelope
                }
                alt={"Contact"}
                className={s.icon}
              />
              <span
                className={
                  this.state.selected === "contact"
                    ? s.yellowItemContent
                    : s.itemContent
                }
              >
                Contact
              </span>
            </div>
            <div className={s.items} onClick={() => window.open(websiteLink)}>
              <img
                src={
                  this.state.selected === "website" ? yellowWebsite : website
                }
                alt={"Website"}
                className={s.icon}
              />
              <span
                className={
                  this.state.selected === "website"
                    ? s.yellowItemContent
                    : s.itemContent
                }
              >
                Website
              </span>
            </div>
            {!contactEmail && (
              <div
                className={`${s.items} ${s.hide}`}
                onClick={() =>
                  window.open("https://gamesmith.com/claim-studio")
                }
              >
                <img src={claim} alt={"claim"} className={s.icon} />
                <span
                  className={
                    this.state.selected === "claim"
                      ? s.yellowItemContent
                      : s.itemContent
                  }
                >
                  Claim this studio
                </span>
              </div>
            )}
          </div>
        </div>
        <div id="about" className={s.about}>
          {this.state.selected === "overview" ? (
            <StudioOverview
              bannerUrl={bannerUrl}
              heroUrl={heroUrl}
              description={description}
              setPage={this.setPage}
              games={games && games[0] ? games[0] : ""}
              jobs={jobs}
              studioId={id}
              studioName={name}
              slug={slug}
              user={user}
              onEditJob={onEditJob}
              owner={owner}
              isValidated={isValidated}
              onValidate={onValidate}
              onApply={onApply}
              onJobDetails={onJobDetails}
              authenticated={authenticated}
              onSignIn={onSignIn}
              hasCV={hasCV}
              token={token}
              countryOptions={countryOptions}
              studioLogo={studioLogo}
            />
          ) : this.state.selected === "games" ? (
            <StudioGames games={games} />
          ) : this.state.selected === "jobs" ? (
            <StudioJobs
              jobs={jobs}
              studioId={id}
              studioName={name}
              user={user}
              onEditJob={onEditJob}
              owner={owner}
              isValidated={isValidated}
              onValidate={onValidate}
              onApply={onApply}
              onJobDetails={onJobDetails}
              authenticated={authenticated}
              onSignIn={onSignIn}
              hasCV={hasCV}
              token={token}
              countryOptions={countryOptions}
              studioLogo={studioLogo}
            />
          ) : this.state.selected === "people" ? (
            <StudioPeople slug={slug} studioName={name} />
          ) : /*   this.state.selected === 'services' ? <StudioServices/> :
                  this.state.selected === 'benefits' ? <StudioBenefits/> :*/
          this.state.selected === "contact" ? (
            <StudioContact
              contactEmail={contactEmail}
              websiteLink={websiteLink}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}
NewStudio.propTypes = {
  studios: PropTypes.array.isRequired,
  onGetStudios: PropTypes.func.isRequired,
};
export default connect(
  createStructuredSelector({
    studios: selectStudios(),
  }),
  (dispatch) => ({
    dispatch,
    onGetStudios: () => dispatch(studiosRequest()),
  })
)(NewStudio);
