import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import Arrow from "./img/arrow.png";
import Message from "./img/message.png";
import Switch from "./img/switch.png";
import Verified from "./img/verified.png";
import Dollar from "./img/dollar.png";

const GtStep = ({ path, textLine1, textLine2, textLine3, className }) => {
  return (
    <div className={s.step}>
      <img src={path} alt="gt+" className={s.gt_icons} />
      <p className={className ? className : ""}>
        {textLine1}
        {textLine2}
        {textLine3}
      </p>
    </div>
  );
};

class Index extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div className={s.gtplus}>
        <br />
        <br />
        <div id="top" className={s.header}>
          <h2>What is GT+?</h2>
          <hr className={s.line} />
          <p className={s.head_content}>
            GT+ (Gamesmith Talent Plus) automatically matches your open job
            requirements with verified candidates.
            <br />
            GT+ will then deliver candidates to your inbox automatically, as and
            when matches appear.
          </p>
        </div>
        <br />
        <br />
        <div>
          <h2>How Does GT+ work?</h2>
        </div>
        <div className={s.gt_steps}>
          <div className={s.arrow_step}>
            <GtStep
              path={Switch}
              textLine1="You choose which job you want"
              textLine2=" to switch GT+ matching on."
            />
            <img src={Arrow} alt="arrow" className={s.arrow} />
          </div>
          <div className={s.arrow_step}>
            <GtStep
              path={Message}
              textLine1="GT+ Success Manager reaches out"
              textLine2=" to discuss all matching criteria."
            />
            <img src={Arrow} alt="arrow" className={s.arrow} />
          </div>
          <div className={s.arrow_step}>
            <GtStep
              path={Verified}
              textLine1="Choose verified candidates"
              textLine2=" you'd like to interview."
            />
            <img src={Arrow} alt="arrow" className={s.arrow} />
          </div>
          <GtStep
            path={Dollar}
            className={s.last_step}
            textLine1="GT+ Matching is free until you decide to hire a GT+ candidate."
            textLine2=" A fee of 14% of the candidate's yearly full time salary is applied"
            textLine3=" when the candidate accepts and starts job."
          />
        </div>
        <br />
        <br />
        <div className={s.gt_footer}>
          <button onClick={() => handleClick("jobs")} className={s.gt_btn}>
            Go to job postings
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

Index.propTypes = {
  handleClick: PropTypes.func,
};

export default Index;
