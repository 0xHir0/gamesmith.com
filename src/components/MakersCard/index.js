/*
 * Maker card
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { uniq, startCase } from "lodash";
import briefCase from "./img/briefcase.png";
import trophy from "../../data/icons/awards_icons/trophy.png"
import loc from "./img/location.png";
import {
  openMessaging,
  openInvite,
  openClaim,
} from "containers/Modals/actions";

import { checkAuthToken, getUserData } from "utils";

import { makerExpRequest } from "containers/Game/actions";

import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import icon from "data/icons/claim-profile-icon.png";
import { Link } from "react-router";

// New Icons

import android from "../../data/icons/platform_icons_new/android-logo.png";
import apple from "../../data/icons/platform_icons_new/apple-big-logo.png";
import augmentedReality from "../../data/icons/platform_icons_new/augmented-reality.png";
import googleStadia from "../../data/icons/platform_icons_new/Google-Stadia.png";
import switchIco from "../../data/icons/platform_icons_new/nintendo-switch.png";
import virtualreality from "../../data/icons/platform_icons_new/virtual-reality.png";
import browser from "../../data/icons/platform_icons_new/web.png";
import windows from "../../data/icons/platform_icons_new/windows-logo-silhouette.png";
import xbox from "../../data/icons/platform_icons_new/xbox.png";
import playstation from "../../data/icons/platform_icons_new/icon.png";
import { BACKEND_RAIL, filterAwards } from "utils/index";
// import ProgressBar from 'react-bootstrap/ProgressBar';
import { Line } from "rc-progress";

import s from "./styles.module.scss";
import ReactTooltip from "react-tooltip";
const loginRecruiterStudio = !!(getUserData() && getUserData().recruiter)
  ? getUserData().recruiter.companyId
  : -1;

// For New Platform Icons
const getIcon = (ic) => {
  switch (ic) {
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
window.count = 14;
class MakersCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      largeBgImg: this.props.imageLg,
    };
  }

  componentDidMount() {
    if (this.props.latestGameId) {
      fetch(`${BACKEND_RAIL}/games/get_game_data?id=${this.props.latestGameId}`)
        .then((r) => r.json())
        .then((data) => {
          const bUrl = data.data[0].game_card_art;

          if (bUrl) this.setState(() => ({ largeBgImg: bUrl }));
        });
    }
  }

  render() {
    const {
      jobFamilyName,
      user,
      id,
      currID,
      matchScore,
      firstName,
      connection,
      claimed = false,
      avatar = "",
      lastName,
      location,
      workCategories,
      isSubscribe,
      platforms = "",
      currRole = "",
      currGame = "",
      currCompany = "",
      gameImage = "",
      onMessage,
      onInvite,
      onConnect,
      width,
      imageSm,
      imageLg,
      timesVerified,
      query,
      page = "people",
      gameID = -1,
      onGetExperience,
      onClaimProfile,
      onSignIn,
      handleRedirect,
      awards,
    } = this.props;

    const linkTo = `/maker/${id === currID ? "me" : id}`;
    let button;
    let awardsWrapper
    const platformList =
      platforms && uniq(platforms.map((p) => getIcon(p.displayName)));
    if (id === currID) {
      if (page === "game") {
        button = (
          <Button
            onClick={() =>
              checkAuthToken() ? onGetExperience(id, gameID) : onSignIn()
            }
            className={s.button}
            text="Edit Experience"
            color="transparent"
          />
        );
      } else {
        button = (
          <Button
            to="/edit"
            className={s.button}
            text="Edit Profile"
            color="transparent"
          />
        );
      }
    } else if (!claimed && !checkAuthToken()) {
      button = (
        <Button
          className={s.joinButton}
          text="Claim profile"
          disabled={!isSubscribe}
          onClick={() => onClaimProfile(id)}
          icon={icon}
        />
      );
    } else if (!claimed) {
      button = (
        <Button
          className={s.button}
          text="Invite"
          color="transparent"
          disabled={!isSubscribe}
          onClick={() => (checkAuthToken() ? onInvite(id) : onSignIn())}
        />
      );
    } else if (connection === "yes") {
      button = (
        <Button
          className={s.button}
          text="Message"
          onClick={() =>
            checkAuthToken()
              ? onMessage(id, `${firstName} ${lastName}`)
              : onSignIn()
          }
        />
      );
    } /*else if (connection === 'pending') {
    button = <Button className={s.button} text="Pending" color="transparent" />;
  } else if (currID !== -1) {
    button = <Button className={s.button} text="Connect" onClick={() => checkAuthToken() ? onConnect({ id, page, gameID }) : onSignIn()} />;
  }*/

    if (awards) {
      let filteredAwards = filterAwards(awards)
      awardsWrapper =
        filteredAwards.length ? (
          <span className={`${s.awards}`}>
            <img className={s.trophy} src={trophy} alt="icon" />
            {filteredAwards.length > 1 ? (
              `${filteredAwards.length} awards`
            ) : (
              `1 award`
            )}
          </span>) : (
          null
        )
    }

    return (
      <div
        className={s.root}
        style={{
          backgroundImage: `url('${
            width < 955 ? imageSm.replace(/^http:\/\//i, "https://") : ""
          }')`,
        }}
      >
        {width < 955 && <div className={s.cusOverlay}></div>}
        <div className={s.flex}>
          <div
            className={s.game}
            style={{
              backgroundImage: `url('${
                width < 955
                  ? ""
                  : this.state.largeBgImg.replace(/^http:\/\//i, "https://")
              }')`,

              backgroundColor: width < 955 ? "transparent" : "#101010",
            }}
          >
            {width >= 955 && <div className={s.overlay}></div>}
            {width >= 955 && (
              <div className="row">
                <div className={s.maker}>
                  <div style={{ marginRight: "1rem", maxHeight: "120px" }}>
                    <Avatar
                      className={s.avatar}
                      linkTo={linkTo}
                      handleRedirect={handleRedirect}
                      image={avatar}
                      firstName={firstName}
                      lastName={lastName || ''}
                    />
                  </div>
                  <Link to={linkTo} className="divLink">
                    <h1>{`${startCase(firstName)} ${lastName || ''} `}</h1>
                    <Link to={linkTo}>
                      {timesVerified > 0 ? (
                        <div className={s.verified}>
                          <p
                            style={{
                              color: "#F8E81c",
                              fontSize: "16px",
                              textAlign: "left",
                            }}
                            data-tooltip="Professionally verified by fellow game makers"
                          >
                            &#x2605; {timesVerified}{" "}
                            {timesVerified > 1 ? (
                              <span
                                style={{ color: "#F8E81c", fontSize: "16px" }}
                              >
                                verifications
                              </span>
                            ) : (
                              <span
                                style={{ color: "#F8E81c", fontSize: "16px" }}
                              >
                                verification
                              </span>
                            )}
                          </p>
                          {awardsWrapper}
                        </div>
                      ) : (
                        ""
                      )}
                    </Link>
                  </Link>
                </div>
                <div className={` ${s.opportunities}`}>
                  <span className={` ${s.location}`}>
                    <img className={s.briefCase} src={loc} alt="icon" />
                    <small>{location}</small>
                  </span>
                  {jobFamilyName ? (
                    <span className={`${s.openTo}`}>
                      <img className={s.briefCase} src={briefCase} alt="icon" />
                      <small>{jobFamilyName}</small>
                    </span>
                  ) : (
                    ""
                  )}
                  {workCategories &&
                  workCategories.length > 0 &&
                  loginRecruiterStudio !== -1 ? (
                    <span className={`${s.openTo}`}>
                      <img className={s.briefCase} src={briefCase} alt="icon" />
                      <small>Open to opportunities</small>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
            {width < 955 && (
              <div className={s.maker}>
                <div style={{ marginRight: "1rem", maxHeight: "120px" }}>
                  <Avatar
                    className={s.avatar}
                    linkTo={linkTo}
                    handleRedirect={handleRedirect}
                    image={avatar}
                    firstName={firstName}
                    lastName={lastName || ''}
                  />
                </div>
                <Link to={linkTo} className="divLink">
                  <h1>{`${startCase(firstName)} ${lastName || ''} `}</h1>
                  <Link to={linkTo}>
                    {timesVerified > 0 ? (
                      <div className={s.verified}>
                        <p
                          style={{
                            color: "#F8E81c",
                            fontSize: "16px",
                            textAlign: "left",
                          }}
                          data-tooltip="Professionally verified by fellow game makers"
                          >
                          &#x2605; {timesVerified}{" "}
                          {timesVerified > 1 ? (
                            <span style={{ color: "#F8E81c", fontSize: "16px" }}>
                              verifications
                            </span>
                          ) : (
                            <span style={{ color: "#F8E81c", fontSize: "16px" }}>
                              verification
                            </span>
                          )}
                        </p>
                        {awardsWrapper}
                      </div>
                    ) : (
                      ""
                    )}
                  </Link>
                </Link>
              </div>
            )}
            {width >= 955 && (
              <div>
                {isSubscribe && user.maker && button}
                {platforms && (
                  <div className={s.platforms}>
                    {platforms.map((p, idx) => (
                      <img
                        key={idx}
                        data-tip={p.displayName.toUpperCase()}
                        alt={"some icon"}
                        src={getIcon(p.displayName)}
                        style={{ height: "22px", margin: "6px" }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <Link to={linkTo} className={width <= 955 ? "divLink" : ""}>
            <button>
            <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png' />
            </button>
          </Link>
          <ReactTooltip place="top" type="light" effect="float" />
        </div>
      </div>
    );
  }
}

MakersCard.propTypes = {
  jobFamilyName: PropTypes.string,
  user: PropTypes.object,
  id: PropTypes.number,
  currID: PropTypes.number,
  width: PropTypes.number,
  firstName: PropTypes.string,
  claimed: PropTypes.bool,
  lastName: PropTypes.string,
  avatar: PropTypes.string,
  platforms: PropTypes.array,
  currRole: PropTypes.string,
  currGame: PropTypes.string,
  currCompany: PropTypes.string,
  gameImage: PropTypes.string,
  onMessage: PropTypes.func,
  onInvite: PropTypes.func,
  onGetExperience: PropTypes.func,
  onConnect: PropTypes.func,
  onClaimProfile: PropTypes.func,
  connection: PropTypes.string,
  location: PropTypes.string,
  workCategories: PropTypes.array,
  imageSm: PropTypes.string,
  imageLg: PropTypes.string,
  isSubscribe: PropTypes.bool,
  timesVerified: PropTypes.number,
  page: PropTypes.string,
  gameID: PropTypes.number,
  awards: PropTypes.array
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onMessage: (id, name) => dispatch(openMessaging(id, name)),
  onInvite: (id) => dispatch(openInvite(id)),
  onGetExperience: (id, gameID) => dispatch(makerExpRequest(id, gameID)),
  onClaimProfile: (id) => dispatch(openClaim(id)),
  // onConnect: ({ id, page, query }) => dispatch(connectRequest({ id, page, query })),
}))(MakersCard);
