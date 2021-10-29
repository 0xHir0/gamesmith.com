/*
 * About container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openSignUp } from "containers/Modals/actions";
import s from "./styles.module.scss";
import { createStructuredSelector } from "reselect";

import Button from "components/UI/Button";
import Batman from "./img/batman.png";

import { checkAuthToken } from "utils";
const YoutubeVideo = require("react-youtube-video");

const About = ({ onApply }) => (
  <main role="main">
    <div id="root">
      <div id="sub-heading" className={s.sub_heading_container}>
        <p className={s.sub_heading}>
          Studios and publishers rely on Gamesmith everyday to spot talent,
          teams and games
        </p>
      </div>
      <div id="heading" className={s.heading_container}>
        <h1 className={s.heading}>What is Gamesmith?</h1>
      </div>
      <div className={s.container}>
        <div className={s.box}>
          <div className={s.img_container}>
            <YoutubeVideo
              url={"https://youtu.be/qoP4fDgSf_0"}
              height={window.innerWidth < 765 ? "320px" : "528px"}
              width={"100%"}
            />
          </div>
          <div className={s.content_container}>
            <div className={s.content}>
              <h2 className={s.vertical_center}>
                <span className={s.list}>1</span>
                <span className={s.text_over}>Apply</span>
              </h2>
              <h2 className={s.vertical_center}>
                <span className={s.list}>2</span>
                <span className={s.text_over}>Vetted</span>
              </h2>
              <p className={s.custom_color}>
                If you have worked within the digital entertainment industry for
                more than 3 years or have shipped a game then you shall receive
                an invite to join.
              </p>
              <h2 className={s.vertical_center}>
                <span className={s.list}>3</span>
                <span className={s.text_over}>Claim your industry Credits</span>
              </h2>
              <ul className={s.custom_color}>
                <li>
                  Join and stay connected with over 200,000 vetted game
                  professionals and companies.
                </li>
                <li>
                  Showcase your work, build your professional profile, join
                  teams, connect and verify industry peers.
                </li>
              </ul>
              <h2 className={s.vertical_center}>
                <span className={s.list}>4</span>
                <span className={s.text_over}>Discover and be discovered</span>
              </h2>
              <p className={s.custom_color}>
                Peers, Fans, Jobs, Studios, Manufactures, Funding, Publishers,
                Networks, stay connected.
              </p>
            </div>
          </div>
          <div className={s.apply_button}>
            {!checkAuthToken() ? (
              <div>
                <Button onClick={onApply} text="apply" className={s.button} />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={s.batman}>
            <img alt="Batman" src={Batman} />
          </div>
        </div>
      </div>
    </div>
  </main>
);

About.propTypes = {
  onApply: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onApply: () => dispatch(openSignUp()),
}))(About);
