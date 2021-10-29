/*
 * Maker card
 */

import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { uniq } from "lodash";

import {
  openMessaging,
  openInvite,
  openClaim,
} from "containers/Modals/actions";

import { checkAuthToken } from "utils";

import { makerExpRequest } from "containers/Game/actions";

import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import icon from "data/icons/claim-profile-icon.png";

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

import s from "./styles.module.scss";
import ReactTooltip from "react-tooltip";

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

const MakerCard = ({
  id,
  currID,
  firstName,
  connection,
  claimed = false,
  avatar = "",
  lastName = "",
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
  isBAFTAWinner = false
}) => {
  const linkTo = `/maker/${id === currID ? "me" : id}`;
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
  } else if (currID != -1) {
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
      style={{
        backgroundImage: `url('${
          width < 767 ? imageSm.replace(/^http:\/\//i, "https://") : ""
        }')`,
      }}
    >
      {width < 767 && <div className={s.cusOverlay}></div>}
      <div className={s.flex}>
        {width > 767 && (
          <div className={s.maker}>
            <div>
              <Avatar
                className={s.avatar}
                linkTo={linkTo}
                handleRedirect={handleRedirect}
                image={avatar}
                firstName={firstName}
                lastName={lastName}
              />
              <div onClick={() => handleRedirect(linkTo)}>
                {timesVerified > 0 ? (
                  <p
                    className={s.verified}
                    style={{ color: "#F8E81c", fontSize: "14px" }}
                    data-tooltip="Professionally verified by fellow game makers"
                  >
                    VERIFIED &#x2605; {timesVerified}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div onClick={() => handleRedirect(linkTo)} className="divLink">
              <h1 className={s.heading}>{`${firstName} ${lastName}`}</h1>
              {currRole && (
                <h3>
                  <i className="icon-briefcase"></i>
                  {currRole}
                </h3>
              )}
            </div>
          </div>
        )}
        <div
          className={s.game}
          style={{
            backgroundImage: `url('${
              width < 767 ? "" : imageLg.replace(/^http:\/\//i, "https://")
            }')`,
            backgroundColor: width < 767 ? "transparent" : "#101010",
          }}
        >
          {width > 767 && <div className={s.overlay}></div>}
          {width < 767 && (
            <div className={s.maker}>
              <div style={{ marginBottom: 20 }}>
                <Avatar
                  className={s.avatar}
                  linkTo={linkTo}
                  handleRedirect={handleRedirect}
                  image={avatar}
                  firstName={firstName}
                  lastName={lastName}
                />
                <div onClick={() => handleRedirect(linkTo)}>
                  {timesVerified > 0 ? (
                    <p
                      className={s.verified}
                      style={{ color: "#F8E81c", fontSize: "14px" }}
                      data-tooltip="Professionally verified by fellow game makers"
                    >
                      VERIFIED &#x2605; {timesVerified}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div onClick={() => handleRedirect(linkTo)} className="divLink">
                <h1>{`${firstName} ${lastName}`}</h1>
                {currRole && (
                  <h3>
                    <i className="icon-briefcase"></i>
                    {currRole}
                  </h3>
                )}
              </div>
            </div>
          )}
          <div className={width < 767 ? "col-sm-12" : "col-xs-5"}>
            {currGame && <p>{currGame}</p>}
            {currCompany && <p>{currCompany}</p>}
            {/* {platforms && <div className={s.platforms}>{platformList.map((p, idx) => <i key={idx} className={`icon-${p}`} />)}</div>}*/}
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
          {isSubscribe && button}
        </div>
        <div onClick={() => handleRedirect(linkTo)} className="">
          <button>
          <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png' />
          </button>
        </div>
        <ReactTooltip place="top" type="light" effect="float" />
      </div>
    </div>
  );
};

MakerCard.propTypes = {
  id: PropTypes.number,
  currID: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  connection: PropTypes.string.isRequired,
  claimed: PropTypes.bool,
  lastName: PropTypes.string,
  avatar: PropTypes.string,
  platforms: PropTypes.array,
  currRole: PropTypes.string,
  currGame: PropTypes.string,
  currCompany: PropTypes.string,
  gameImage: PropTypes.string,
  onMessage: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
  onGetExperience: PropTypes.func.isRequired,
  onConnect: PropTypes.func,
  onClaimProfile: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onMessage: (id, name) => dispatch(openMessaging(id, name)),
  onInvite: (id) => dispatch(openInvite(id)),
  onGetExperience: (id, gameID) => dispatch(makerExpRequest(id, gameID)),
  onClaimProfile: (id) => dispatch(openClaim(id)),
  // onConnect: ({ id, page, query }) => dispatch(connectRequest({ id, page, query })),
}))(MakerCard);
