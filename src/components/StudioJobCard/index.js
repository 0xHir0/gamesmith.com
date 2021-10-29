/*
 * Studio Job card
 */

import React from "react";
import PropTypes from "prop-types";

import Button from "components/UI/Button";
import { toUpper, truncate } from "lodash";
import { Link } from "react-router";
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

import s from "./styles.module.scss";

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
const StudioJobCard = ({
  studioId,
  id,
  role,
  company,
  startDate,
  location,
  country,
  state,
  city,
  countryId,
  stateId,
  platforms,
  description,
  imgUrl,
  owner,
  applied,
  onEditJob,
  onApply,
  isValidated,
  onValidate,
  onJobDetails,
  authenticated,
  onSignIn,
  countryOptions,
  user,
  ownerId,
  token,
  jobFamilyId,
  youtubeVideoUrl,
  cvOption,
  hasCv,
  studioLogo,
  workCategories,
  gtOption,
  expiredAt,
}) => {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.info}>
          <h4 className={s.title}>
            <Link
              onClick={() =>
                onJobDetails({
                  id,
                  role,
                  company,
                  startDate,
                  location,
                  country,
                  state,
                  city,
                  countryId,
                  stateId,
                  platforms,
                  description,
                  imgUrl,
                  countryOptions,
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
                  jobFamilyId,
                  youtubeVideoUrl,
                  domain: "studio",
                  cvOption,
                  hasCv,
                  studioLogo
                })
              }
              style={{ color: "#ffffff" }}
            >
              {role}
            </Link>
          </h4>
        </div>
        <div className={s.bottom}>
          {location && (
            <div className={s.location}>
              {/* <i className="icon-pin" /> */}
            {/* <img style={{width: '30px', height: '30px', paddingBottom: '10px', paddingRight: '5px',}} src='https://cdn-icons-png.flaticon.com/512/684/684809.png' /> */}
            <i className="fas fa-map-marker-alt"></i>
              {toUpper(truncate(location, { length: 15 }))}
            </div>
          )}
          {platforms && (
            <div className={s.platforms}>
              {" "}
              {platforms.map((p, idx) => (
                <img
                  data-tip={p.displayName.toUpperCase()}
                  key={idx}
                  className={s.platform}
                  src={`${getIcon(p.displayName)}`}
                  alt={"icon"}
                />
              ))}{" "}
            </div>
          )}
          <div className={s.btnContainer}>
            {owner ? (
              <Button
                className={s.studioJobEditBtn}
                text="Edit Job"
                onClick={() =>
                  onEditJob(
                    {
                      id,
                      role,
                      studioId,
                      startDate,
                      location,
                      country,
                      state,
                      city,
                      countryId,
                      stateId,
                      platforms,
                      description,
                      imgUrl,
                      countryOptions,
                      jobFamilyId,
                      youtubeVideoUrl,
                      cvOption,
                      workCategories,
                      gtOption,
                      expiredAt,
                    },
                    "studio"
                  )
                }
              />
            ) : (
              <Button
                className={s.studioJobAppliedBtn}
                text={applied ? "Applied" : "See More"}
                onClick={() =>
                  onJobDetails({
                    id,
                    role,
                    company,
                    startDate,
                    location,
                    country,
                    state,
                    city,
                    countryId,
                    stateId,
                    platforms,
                    description,
                    imgUrl,
                    countryOptions,
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
                    youtubeVideoUrl,
                    domain: "studio",
                    cvOption,
                    hasCv,
                    studioLogo
                  })
                }
                color={applied ? "transparent-studio-job" : "yellow"}
              />
            )}
          </div>
        </div>
        <ReactTooltip place="top" type="light" effect="float" />
      </div>
    </div>
  );
};

StudioJobCard.propTypes = {
  onEditJob: PropTypes.func.isRequired,
  onJobDetails: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  user: PropTypes.object,
  isValidated: PropTypes.bool.isRequired,
  onValidate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  role: PropTypes.string,
  company: PropTypes.string,
  startDate: PropTypes.string,
  location: PropTypes.string,
  platforms: PropTypes.array,
  description: PropTypes.string,
  ownerId: PropTypes.number.isRequired,
  imgUrl: PropTypes.string,
  applied: PropTypes.bool.isRequired,
  owner: PropTypes.bool,
  authenticated: PropTypes.bool.isRequired,
  onSignIn: PropTypes.func.isRequired,
  studioId: PropTypes.number.isRequired,
  countryOptions: PropTypes.array.isRequired,
  studioLogo: PropTypes.string,
  cvOption: PropTypes.string,
  hasCv: PropTypes.bool,
  youtubeVideoUrl: PropTypes.string,
  jobFamilyId: PropTypes.array,
  country: PropTypes.string,
  state: PropTypes.string,
  city: PropTypes.string,
  countryId: PropTypes.number,
  stateId: PropTypes.number,
  workCategories: PropTypes.array,
};

export default StudioJobCard;
