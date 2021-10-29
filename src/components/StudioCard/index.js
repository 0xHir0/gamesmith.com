/*
 * Studio card
 */

import React from "react";
import PropTypes from "prop-types";

import { toUpper, startCase } from "lodash";
import { Link } from "react-router";

import s from "./styles.module.scss";

const StudioCard = ({
  id,
  partnerName,
  slug,
  name,
  location,
  logo,
  bannerUrl,
  isAuth,
  onSignIn,
}) => (
  <div>
    {isAuth === false && partnerName === "funding" ? (
      <div onClick={onSignIn}>
        <section
          className={s.full}
          style={{ backgroundImage: `url(${bannerUrl})` }}
        >
          <div className={s.outer}>
            <div className={s.inner}>
              <img src={logo}></img>
              <h4>{toUpper(name)}</h4>
              <p className={s.location}>
                <i className="fa fa-map-marker"></i>
                <span className={s.size}>{startCase(location)}</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    ) : (
      <Link to={`/studio/${slug}`}>
        <section
          className={s.full}
          style={{ backgroundImage: `url(${bannerUrl})` }}
        >
          <div className={s.outer}>
            <div className={s.inner}>
              <img src={logo}></img>
              <h4>{toUpper(name)}</h4>
              <p className={s.location}>
                <i className="fa fa-map-marker"></i>
                <span className={s.size}>{startCase(location)}</span>
              </p>
            </div>
          </div>
        </section>
      </Link>
    )}
  </div>
);

StudioCard.propTypes = {
  id: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  bannerUrl: PropTypes.string.isRequired,
  partnerName: PropTypes.string,
};

export default StudioCard;
