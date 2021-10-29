/*
 * Studio Description card
 */

import React from "react";
import PropTypes from "prop-types";

import { toUpper, startCase } from "lodash";
import { Link } from "react-router";

// New Icons

import android from "data/icons/platform_icons_new/android-logo.png";
import apple from "data/icons/platform_icons_new/apple-big-logo.png";
import augmentedReality from "data/icons/platform_icons_new/augmented-reality.png";
import googleStadia from "data/icons/platform_icons_new/Google-Stadia.png";
import switchIco from "data/icons/platform_icons_new/nintendo-switch.png";
import virtualreality from "data/icons/platform_icons_new/virtual-reality.png";
import browser from "data/icons/platform_icons_new/web.png";
import windows from "data/icons/platform_icons_new/windows-logo-silhouette.png";
import xbox from "data/icons/platform_icons_new/xbox.png";
import playstation from "data/icons/platform_icons_new/icon.png";

import editButton from "../../containers/Studio/images/editPencil.png";
import websiteIcon from "../../containers/Studio/images/websiteIcon.png";
import Button from "components/UI/Button";

import s from "./styles.module.scss";
import chatIcon from "../../containers/Maker/img/chat.png";

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
const getEmployeeCount = (employeeCountId) => {
  switch (employeeCountId) {
    case 1:
      return "1-10";
    case 2:
      return "11-50";
    case 3:
      return "51-100";
    case 4:
      return "101-500";
    case 5:
      return "500+";
    case 6:
      return "1000+";
  }
};

const StudioDescriptionCard = ({
  slug,
  studioId,
  name,
  location,
  websiteLink,
  contactEmail,
  description,
  license,
  logo,
  platforms,
  owner,
  employeeCountId,
  onStudioMessage,
  authenticated,
  onSignIn,
  isRecruiter,
  findStudioMakers,
  employeeCount,
  recruiter,
  createGroup,
}) => (
  <div
    className={
      license === "basic"
        ? `${s.studioInfo} ${s.basicLicenseStyle}`
        : `${s.studioInfo}`
    }
  >
    <div
      className={
        license === "basic"
          ? `${s.basicInfo} ${s.basicLicense}`
          : `${s.basicInfo}`
      }
    >
      {license !== "basic" && <img alt={"logo"} src={logo} />}
      <span className="fa fa-map-marker">
        <i className={s.fonts}>{startCase(location)}</i>
      </span>
      {license !== "basic" && (
        <div>
          <span className="fa fa-user">
            <i className={s.fonts}>
              {getEmployeeCount(employeeCountId)} Employees
            </i>
          </span>
          {websiteLink && (
            <div className={s.iconImg}>
              <img alt="icon" className={s.websiteImg} src={websiteIcon} />
              <a
                href={
                  websiteLink.includes("https") || websiteLink.includes("http")
                    ? websiteLink
                    : `https://${websiteLink}`
                }
                target="_blank"
              >
                Visit Website
              </a>
            </div>
          )}
          <div className={s.platforms}>
            {platforms &&
              platforms.map((p, idx) => (
                <span key={idx}>
                  <img alt={"display"} src={getIcon(p.displayName)} />
                  <i style={{ fontStyle: "normal" }}>
                    {p.displayName === "ios" ? "iOS" : startCase(p.displayName)}
                  </i>
                </span>
              ))}
          </div>
        </div>
      )}
      <div className={s.seeAllJobs}>
        {authenticated ? (
          <Link to={`/studio/${slug}/employees`} title={name}>
            {employeeCount !== 0
              ? employeeCount > 1
                ? ` See all ${employeeCount} employees`
                : `See the ${employeeCount} employee`
              : ""}
          </Link>
        ) : (
          <div className="divLink" onClick={onSignIn}>
            {employeeCount !== 0
              ? employeeCount > 1
                ? ` See all ${employeeCount} employees `
                : `See the ${employeeCount} employee`
              : ""}
          </div>
        )}
      </div>
      {
        <div>
          {
            <Button
              icon={chatIcon}
              onClick={() =>
                authenticated ? createGroup(name, recruiter) : onSignIn()
              }
              className={`applozic-launcher ${s.buttonChat}`}
              text="Chat with us"
              disabled={recruiter && recruiter.length < 1}
            />
          }
        </div>
      }
    </div>
    <div className={s.detailInfo}>
      <h1>Hello. We are {toUpper(name)}</h1>
      <p>{description}</p>
    </div>
    {isRecruiter && owner ? (
      <div className={s.edit}>
        <a href="/recruiter">
          <img src={editButton} alt={"edit"}></img>
        </a>
      </div>
    ) : (
      ""
    )}
  </div>
);

StudioDescriptionCard.propTypes = {
  name: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
  onSignIn: PropTypes.func.isRequired,
  logo: PropTypes.string,
  location: PropTypes.string,
  contactEmail: PropTypes.string,
  description: PropTypes.string,
  license: PropTypes.string,
  websiteLink: PropTypes.string,
  isRecruiter: PropTypes.object,
  owner: PropTypes.bool,
  platforms: PropTypes.array,
  employeeCountId: PropTypes.number,
  onStudioMessage: PropTypes.func,
  findStudioMakers: PropTypes.func,
  employeeCount: PropTypes.number,
  studioId: PropTypes.number,
  slug: PropTypes.string.isRequired,
};

export default StudioDescriptionCard;
