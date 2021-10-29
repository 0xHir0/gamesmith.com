/*
 * Job card
 */

import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";
import { toUpper, truncate } from "lodash";
import Button from "components/UI/Button";
import ReactTooltip from "react-tooltip";

// import ar from 'data/icons/AR.svg';
// import consol from 'data/icons/console.svg';
// import gameboy from 'data/icons/gameboy.svg';
// import globe from 'data/icons/globe.svg';
// import mobile from 'data/icons/phone.svg';
// import vr from 'data/icons/VR.svg';
// import pc from 'data/icons/pc.png';
// import switch_icon from 'data/icons/switch.png';

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

import { checkAuthToken } from "utils";

import s from "./styles.module.scss";

// const getIcon = (icon) => {
//   switch (icon) {
//     case 'ar':
//       return ar;
//     case 'vr':
//       return vr;
//     case 'handheld':
//       return gameboy;
//     case 'browser':
//       return globe;
//     case 'mobile':
//       return mobile;
//     case 'console':
//       return consol;
//     case 'pc':
//       return pc;
//     case 'switch':
//       return switch_icon;
//   }
// };

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

const JobCard = ({
  id,
  platforms,
  title,
  applied,
  date = "",
  imgUrl,
  location = "",
  company = "",
  recruiter,
  toggleEditJob,
  isSearch,
  query,
  onSignin,
  blur = false,
}) => (
  <div id={`job-${id}`} className={s.root}>
    {isSearch ? (
      <Link to={`/job/${id}?${query}`}>
        <div className={s.content}>
          <div className={s.info}>
            <h1 className={s.title}>{title}</h1>
            {company && <p>{company}</p>}
          </div>
          <div className={s.extra}>
            <div>
              {date && <p>{date}</p>}
              {location && (
                <p>
                  {/* <i className="icon-pin" /> */}
                  <i className="fas fa-map-marker-alt"></i>
                  {toUpper(truncate(location, { length: 15 }))}
                </p>
              )}
              {platforms && (
                <div className={s.platforms}>
                  {" "}
                  {platforms.map((p) => (
                    <img
                      data-tip={p.displayName.toUpperCase()}
                      className={s.platform}
                      src={`${getIcon(p.displayName)}`}
                    />
                  ))}{" "}
                </div>
              )}
              <ReactTooltip place="top" type="light" effect="float" />
            </div>
            {!recruiter ? (
              <Button
                className={s.button}
                text={applied ? "Applied" : "See more"}
                color={applied ? "transparent-job" : "yellow"}
              />
            ) : (
              <Button
                className={s.button}
                text="Edit Job"
                onClick={() => toggleEditJob}
              />
            )}
          </div>
        </div>
        <button>
          <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png' />
        </button>
      </Link>
    ) : (
      <Link
        to={
          checkAuthToken() ? `/job/${id}` : blur ? "/salaryCalculator" : "/jobs"
        }
        onClick={checkAuthToken() ? "" : onSignin}
      >
        <div className={s.content}>
          <div className={s.info}>
            <h1 className={s.title}>{title}</h1>
            {company && <p>{company}</p>}
          </div>
          <div className={s.extra}>
            <div>
              {date && <p>{date}</p>}
              {location && (
                <p>
                  {/* <i className="icon-pin" /> */}
                  <i className="fas fa-map-marker-alt"></i>
                  {truncate(location, { length: 15 })}
                </p>
              )}
              {platforms && (
                <div className={s.platforms}>
                  {" "}
                  {platforms.map((p, idx) => (
                    <img
                      key={idx}
                      data-tip={p.displayName.toUpperCase()}
                      className={s.platform}
                      src={`${getIcon(p.displayName)}`}
                    />
                  ))}{" "}
                </div>
              )}
              <ReactTooltip place="top" type="light" effect="float" />
            </div>
            {!recruiter ? (
              <Button
                className={s.button}
                text={applied ? "Applied" : "See more"}
                color={applied ? "transparent-job" : "yellow"}
                onClick={() => onSignin}
              />
            ) : (
              <Button
                className={s.button}
                text="Edit Job"
                onClick={() => toggleEditJob}
              />
            )}
          </div>
        </div>
        <button>
          <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png' />
        </button>
      </Link>
    )}
  </div>
);

JobCard.propTypes = {
  id: PropTypes.number.isRequired,
  platforms: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string,
  recruiter: PropTypes.bool,
  applied: PropTypes.bool,
  date: PropTypes.string,
  location: PropTypes.string,
  imgUrl: PropTypes.string,
  toggleEditJob: PropTypes.func,
  blur: PropTypes.bool,
};

export default JobCard;
