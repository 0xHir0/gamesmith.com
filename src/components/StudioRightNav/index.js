/*
 * Studio Right Nav
 */

import React from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";

const StudioRightNav = ({ game, content, job }) => (
  <div id="rightNav" className={`${s.rightNav} ${s.hideNav}`}>
    <a href="#about" className={s.transitionScroll}>
      ABOUT
    </a>
    {game && (
      <a href="#studio-games" className={s.transitionScroll}>
        GAMES
      </a>
    )}
    {content && (
      <a href="#studio-content" className={s.transitionScroll}>
        CULTURE
      </a>
    )}
    {job && (
      <a href="#studio-jobs" className={s.transitionScroll}>
        JOBS
      </a>
    )}
  </div>
);

StudioRightNav.propTypes = {
  game: PropTypes.bool,
  content: PropTypes.bool,
  job: PropTypes.bool,
};

export default StudioRightNav;
