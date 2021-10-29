/*
 * Studio Job card
 */

import React from "react";
import PropTypes from "prop-types";

import Button from "components/UI/Button";
//import { toUpper, truncate } from "lodash";
import { Link } from "react-router";
//import ReactTooltip from "react-tooltip";
import suitcase from "./img/suitcase.png";
import pen from "./img/pen.png";
import loc from "./img/location.png";

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
const StudioJobCardNew = ({
  studioId,
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
  jobFamily,
  jobType,
}) => {
  return (
    <div className={s.container}>
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
          })
        }
        style={{ color: "#ffffff" }}
      >
        <img
          className={s.img}
          src={imgUrl ? imgUrl : studioLogo}
          alt={"icon"}
        />
        <h4 className={s.heading}>{role}</h4>
      </Link>
      <div className={s.content}>
        <img src={loc} alt={"Location"} className={s.icon} />
        <p className={s.info}>
          {city},{country}
        </p>
      </div>
      <div className={s.content}>
        <img src={suitcase} alt={"suitcase"} className={s.icon} />
        <p className={s.info}>{jobFamily}</p>
      </div>
      <div className={s.content}>
        <img src={pen} alt={"pen"} className={s.icon} />
        <p className={s.info}>{jobType}</p>
      </div>
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
                expiredAt,
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
              },
              "studio"
            )
          }
        />
      ) : (
        <Button
          className={s.studioJobEditBtn}
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
            })
          }
          color={applied ? "transparent-studio-job" : "yellow"}
        />
      )}
    </div>
  );
};

StudioJobCardNew.propTypes = {
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
  jobFamilyId: PropTypes.number,
  country: PropTypes.string,
  state: PropTypes.string,
  city: PropTypes.string,
  countryId: PropTypes.string,
  stateId: PropTypes.string,
  workCategories: PropTypes.array,
};

export default StudioJobCardNew;
