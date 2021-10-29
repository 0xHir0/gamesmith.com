/*
 * Maker card
 */

import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isEmpty, startCase, uniq } from "lodash";
import ReactTooltip from "react-tooltip";

import s from "./styles.module.scss";
// import { connectRequest } from 'containers/People/actions';
import {
  openMessaging,
  openInvite,
  openClaim,
} from "containers/Modals/actions";

import { checkAuthToken } from "utils";
import { scrollToJobsSection } from "../../containers/Studio/actions";
import { makerExpRequest } from "containers/Game/actions";

import editButton from "../../containers/Studio/images/editPencil.png";
import Button from "components/UI/Button";
import icon from "data/icons/claim-profile-icon.png";
import locationIcon from "../../data/icons/locationIcon.png";

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

// For New Platform Icons
const getIcon = (icon) => {
  // console.log("Icon Studio Card Newe", icon)
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

// const getIcon = (icon) => {
//   switch (icon) {
//     case 'PS3':
//     case 'PS4':
//     case 'PSP':
//       return 'playstation';
//     case 'Xbox 360':
//     case 'Xbox One':
//       return 'xbox';
//     case 'iOS':
//       return 'apple';
//     case 'switch':
//       return 'switch';
//     case 'browser':
//       return 'web';
//     case 'pc':
//       return 'windows';
//     case 'handheld':
//       return 'handheld';
//     case 'mobile':
//       return 'mobile';
//     case 'Android':
//     case 'ar':
//     case 'vr':
//     case 'DS':
//       return icon.toLowerCase();
//     default:
//       return 'controller';
//   }
// };
const logos = {
  height: "auto",
  width: "30%",
  paddingTop: "1rem",
};

const StudioCardNew = ({
  id,
  partnerName,
  slug,
  name,
  location,
  logo,
  bannerUrl,
  jobCount,
  isAuth,
  onSignIn,
  currID,
  firstName,
  connection,
  claimed = false,
  avatar = "",
  lastName = "",
  isSubscribe,
  isRecruiterStudio = false,
  platforms,
  studioLicense,
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
  isJobCountClicked,
}) => {
  const linkTo = `/studio/${slug}`;
  const linkToJobs = `/studio/${slug}#studio-jobs`;
  let button;
  const platformList =
    platforms && uniq(platforms.map((p) => getIcon(p.displayName)));
  if (id === currID) {
    if (page == "game") {
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
    // button =  <Button className={s.joinButton} text="Claim profile"  disabled={!isSubscribe} onClick={() => checkAuthToken() ? onInvite(id) : onSignIn()} icon={icon}/> ;
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
  } else if (connection === "pending") {
    button = <Button className={s.button} text="Pending" color="transparent" />;
  } else if (currID !== -1) {
    button = (
      <Button
        className={s.button}
        text="Connect"
        onClick={() =>
          checkAuthToken() ? onConnect({ id, page, query }) : onSignIn()
        }
      />
    );
  }
  return (
    <div
      className={s.root}
      style={{ backgroundImage: `url('${width < 767 ? bannerUrl : ""}')` }}
    >
      <div className={s.flex}>
        <div className={s.maker} style={{ textAlign: "center" }}>
          {studioLicense !== "basic" && (
            <Link to={linkTo}>
              <img src={logo} style={logos} alt={"logo"} />
            </Link>
          )}
          <div
            className={
              studioLicense !== "basic"
                ? s.studioLoaction
                : `${s.studioLoaction} ${s.labelStyle}`
            }
          >
            <img
              src={locationIcon}
              className={s.locationIcon}
              alt={"location"}
            />
            {location}
            {width < 767 && (
              <div>
                <Link to={linkTo} style={{ color: "white" }}>{`${
                  jobCount > 0
                    ? jobCount > 1
                      ? `${jobCount} jobs available`
                      : " 1 job available"
                    : ""
                }  `}</Link>
              </div>
            )}
          </div>
        </div>
        <div
          className={s.game}
          style={{
            backgroundImage: `url('${width < 767 ? "" : bannerUrl}')`,
            backgroundColor: width < 767 ? "transparent" : "#101010",
          }}
        >
          {width > 767 && (
            <div className={s.overlay}>
              {isRecruiterStudio && (
                <div className={s.edit}>
                  <a href="/recruiter">
                    <img src={editButton} alt={"edit"}></img>
                  </a>
                </div>
              )}
              <div style={{ width: "50%", height: "100%", float: "left" }}>
                <div className={s.studioName}>
                  <a href={linkTo} className={s.heading}>
                    {name}
                  </a>
                </div>
                <div className={s.studioPlatform}>
                  <div className={"col-sm-12"}>
                    {platforms &&
                      platforms.map((p, idx) => (
                        <span key={idx}>
                          <img
                            data-tip={p.displayName.toUpperCase()}
                            alt={"display"}
                            src={getIcon(p.displayName)}
                            className={s.studioCardPlatformIcon}
                          />
                        </span>
                      ))}
                    {/*{platforms && <div className={s.platforms}>{platformList.map((p, idx) => <span key={idx}><img alt={'display'} className={s.studioCardPlatformIcon} src={getIcon(p.displayName)}/><i>{startCase(p.displayName)}</i></span>)}</div>}*/}
                    {/*<span key={idx}><img alt={'display'} src={getIcon(p.displayName)}/><i>{startCase(p.displayName)}</i></span>*/}
                    {/*{platforms && <div className={s.platforms}>{platformList.map((p, idx) => <i key={idx} className={`icon-${p}`} />)}</div>}*/}
                  </div>
                </div>
              </div>
              <div
                className={s.outer}
                style={{ width: "50%", height: "100%", float: "right" }}
              >
                <div className={s.inner}>
                  <Link style={{ color: "white" }} to={linkTo}>{`${
                    jobCount > 0
                      ? jobCount > 1
                        ? `${jobCount} jobs available`
                        : " 1 job available"
                      : ""
                  }  `}</Link>
                </div>
              </div>
            </div>
          )}
          {width < 767 && <div className={s.maker}></div>}
          <div className={width < 767 ? "col-sm-12" : "col-xs-5"}></div>
        </div>
        <ReactTooltip place="top" type="light" effect="float" />
        <Link to={linkTo}>
          <button>
          <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png' />
          </button>
        </Link>
      </div>
    </div>
  );
};

StudioCardNew.propTypes = {
  id: PropTypes.number.isRequired,
  //currID: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  firstName: PropTypes.string,
  //connection: PropTypes.string.isRequired,
  claimed: PropTypes.bool,
  isRecruiterStudio: PropTypes.bool,
  lastName: PropTypes.string,
  avatar: PropTypes.string,
  studioLicense: PropTypes.string,
  platforms: PropTypes.array,
  currRole: PropTypes.string,
  currGame: PropTypes.string,
  currCompany: PropTypes.string,
  gameImage: PropTypes.string,
  onMessage: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
  onGetExperience: PropTypes.func.isRequired,
  //onConnect: PropTypes.func.isRequired,
  onClaimProfile: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onMessage: (id, name) => dispatch(openMessaging(id, name)),
  onInvite: (id) => dispatch(openInvite(id)),
  onGetExperience: (id, gameID) => dispatch(makerExpRequest(id, gameID)),
  onClaimProfile: (id) => dispatch(openClaim(id)),
  handleJobsAvailableLink: () => dispatch(scrollToJobsSection()),
  // onConnect: ({ id, page, query }) => dispatch(connectRequest({ id, page, query })),
}))(StudioCardNew);
