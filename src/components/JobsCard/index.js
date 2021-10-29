/*
 * Jobs card
 */

import React from "react";
import PropTypes from "prop-types";

import s from "./styles.module.scss";
import locations from "./img/location.svg";
import signature from "./img/signature.svg";
import briefcase from "./img/briefcase.png";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router";

const JobsCard = ({
  id,
  title,
  location,
  jobsFamily,
  jobEmployments,
  handleRedirect,
  logo,
  company,
}) => {
  const parsedLocation = `${location.city ? location.city : ""}${
    location.city ? ", " : ""
  }${location.country}`;
  const linkTo = `/job/${id}`;
  return (
    <div className={s.root}>
      <div className={s.cusOverlay}></div>
      <div className={s.flex}>
        <div className={s.game}>
          <div className={s.overlay}></div>
          <div className="row">
            <div className={s.maker}>
              <div>
                {logo ? (
                  <img className={s.avatar} src={logo} alt="logo" />
                ) : (
                  <div className={s.avatar}></div>
                )}
              </div>
              <Link to={linkTo} className="divLink">
                <h1>{title}</h1>
              </Link>
            </div>
            <div className={s.opportunities}>
              <span className={s.location}>
                <img className={s.briefCase} src={locations} alt="icon" />
                <small>{parsedLocation}</small>
              </span>
              {jobsFamily ? (
                <span className={s.openTo}>
                  <img className={s.briefCase} src={briefcase} alt="icon" />

                  <small>{jobsFamily}</small>
                </span>
              ) : (
                ""
              )}
              {jobEmployments ? (
                <span className={s.openTo}>
                  <img className={s.briefCase} src={signature} alt="icon" />
                  <small>{jobEmployments}</small>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/*<div onClick={() => handleRedirect(linkTo)}><button><i className="icon-forward" /></button></div>*/}
        <Link to={linkTo}>
          <button>
          <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png' />
          </button>
        </Link>

        <ReactTooltip place="top" type="light" effect="float" />
      </div>
    </div>
  );
};

JobsCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.object,
  jobsFamily: PropTypes.string,
  isNewJobStatus: PropTypes.bool,
  jobEmployments: PropTypes.string,
  handleRedirect: PropTypes.func,
  logo: PropTypes.string,
  company: PropTypes.string,
};

export default JobsCard;
