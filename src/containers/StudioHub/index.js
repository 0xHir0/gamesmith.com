/*
 * StudioHub container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router";

import Logo343 from "./img/343_logo.png";
import GamesLogo from "./img/games.png";
import NinjaLogo from "./img/ninja_theory.png";
import OpertunityLogo from "./img/opportunity.png";
import ParadoxLogo from "./img/Paradox_logo.png";
import VideoGameLogo from "./img/videogame.png";
import StudioHubForm from "../../components/StudioHubForm";
import JoyStickLogo from "./img/joystick.png";
import ColdIron from "./img/coldiron .png";
import Funcom from "./img/fun-com.png";
import CPlay from "./img/c-play.png";

import { studioHubRequest } from "../App/actions";

import s from "./styles.module.scss";

class StudioHub extends Component {
  handleSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(studioHubRequest(values, resolve, reject));
    });
  render() {
    return (
      <main role="main" className={s.root}>
        <div className={s.container}>
          <div>
            <img
              src={JoyStickLogo}
              alt="Joy Stick Logo"
              className={s.top_logo}
            />
            <h2>
              Introducing The Studio Hub<sup>TM</sup>
            </h2>
            <p className={s.color_p}>
              Get your Studio in front of the most vetted game professionals
              community worldwide
            </p>
            <div className={s.custom_color}>
              <p>WHOAH!</p>
              <p>
                We are very sorry but we have been totally overwhelmed with the
                demand for studio pages.
              </p>
              <p>
                At the moment, we are taking between 24-36 hours to get back to
                each studio.
              </p>
              <p>Please fill out the form and we'll reach out to you ASAP!</p>
            </div>
            <div className={s.form}>
              <div className="row">
                <div className="col-sm-offset-3 col-sm-6">
                  <StudioHubForm onSubmit={this.handleSubmit} />
                </div>
              </div>
            </div>
            <p>
              By submitting this form, you agree to our{" "}
              <span className={s.custom_color}>
                <Link to="/terms">Terms, Conditions and Privacy Policy</Link>
              </span>
            </p>
            <h4 className={s.trusted_by}>Trusted by</h4>
            <div>
              <img src={Logo343} alt="343 Industries Logo" className={s.logo} />
              <img src={ParadoxLogo} alt="Paradox Logo" className={s.logo} />
              <img src={NinjaLogo} alt="Ninja Logo" className={s.logo} />
              <img src={Funcom} alt="Funcom Logo" className={s.logo} />
              <img src={CPlay} alt="CounterPlay" className={s.logo} />
              <img src={ColdIron} alt="Cold Iron Logo" className={s.logo} />
            </div>
          </div>
        </div>
        <div className={s.studio_hub_footer}>
          <div className="row">
            <div className="col-sm-offset-1 col-sm-3">
              <div>
                <img
                  src={GamesLogo}
                  alt="Games Logo"
                  className={s.footer_logo}
                />
              </div>
              <div>
                <h3 className={s.footer_heading}>Studio First</h3>
              </div>
              <div>
                <p>Market your Studio to 200,000+ vetted Game Professionals</p>
              </div>
            </div>
            <div className="col-sm-offset-1 col-sm-3">
              <div>
                <img
                  src={VideoGameLogo}
                  alt="Show case"
                  className={s.footer_logo}
                />
              </div>
              <div>
                <h3 className={s.footer_heading}>Showcase</h3>
              </div>
              <div>
                <p>
                  Let the professional community, publishers, and fans see your
                  work
                </p>
              </div>
            </div>
            <div className="col-sm-offset-1 col-sm-3">
              <div>
                <img
                  src={OpertunityLogo}
                  alt="Opertunity Logo"
                  className={s.footer_logo}
                />
              </div>
              <div>
                <h3 className={s.footer_heading}>Opportunity</h3>
              </div>
              <div>
                <p>
                  Create opportunities and make the all-important business
                  connections
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
StudioHub.propTypes = {
  params: PropTypes.object.isRequired,
};

export default connect((dispatch) => ({
  dispatch,
}))(StudioHub);
