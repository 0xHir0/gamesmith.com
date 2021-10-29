/*
 * Job card
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./styles.module.scss";

class ResultCard extends Component {
  render() {
    const { title, salary } = this.props;
    return (
      <div className={s.root}>
        <div className={s.content}>
          <div className={s.info}>
            <h1 className={s.title}>{title}</h1>
          </div>
          <div className={s.extra}>
            <h2 style={{ color: "black" }}>
              ${salary}
              <small> (avg. salary per year)</small>
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

ResultCard.propTypes = {};

export default ResultCard;
