/*
 * Client container
 */

import React from "react";
import PropTypes from "prop-types";

import Button from "components/UI/Button";

import img_client_amazon from "./img/amazon-games-black.png";
import img_client_jamcity from "./img/jamcity-250.png";
import img_client_playdead from "./img/playdead_logo.png";
import img_client_playstation from "./img/playstation-studios-black.png";
import img_client_roblox from "./img/Roblox_Red.png";
import img_client_saber from "./img/Saber_Interactive-Logo_wine.png";
import img_client_timi from "./img/TiMi_Studios_Logo.png";
import img_client_ubisoft from "./img/Ubisoft-Black.png";
import img_vr_glass from "./img/vrglass.jpg";

import girl from "./img/girls.png";
import logo from "./img/logo.png";
import { Link } from "react-router";
import { openAddStudio } from "containers/Modals/actions";
import s from "./styles.module.scss";
import { autofill } from "redux-form/lib/actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAuth } from "containers/App/selectors";

const ClientCard = (props) => {
  return (
    <div className={s.clientBGCol}>
      <img src={props.imagesrc} />
      <h4>{props.clientname}</h4>
    </div>
  );
};

const Client = ({ onApply, authenticated }) => (
  <main role="main" className={s.root}>
    <section className={s.full}>
      <div className={s.miniHeader}>
        <Link to="/">
          <img className={s.logo} src={logo} alt={"Logo"} />
        </Link>
      </div>
      <div className={s.home}>
        <h2>
          Join the world's leading brands in{<br />} the digital entertainment
          industry
        </h2>
        {<br />}
        {!authenticated && (
          <Button
            onClick={() => onApply("Studio")}
            text="Create your studio page"
            className={s.button}
          />
        )}
      </div>
      <div className={s.build}>
        <div className={s.buildLeft}>
          <br />
          <br />
          <h3>
            Join over 1000+
            <br /> studios | $139 per
            <br /> month
          </h3>
          <br />
          <br />
          <div className={s.innerStudioSection}>
            <h4>Create Your Studio Page</h4>
            <p>
              Help game professionals learn about your brand, business services
              and job opportunities by creating your company page.
            </p>
            <p>
              Showcase your business to those who matter in the digital
              entertainment industry by adding rich media such as images videos
              and digital arts.
            </p>
          </div>
          <div className={s.innerStudioSection}>
            <h4>Unlimited Job Postings</h4>
            <p>
              Put your job opportunities in front of the right people. <br />
              Reduce your cost and time to hire. Meet the elite in games.
            </p>
          </div>
          <div className={s.innerStudioSection}>
            <h4>GT-Sync</h4>
            <p>
              Sit back and relax as GT-Sync tracks your studio job listing
              updates and provides near real-time sync with the Gamesmith
              database. Once set up, there’s no need to replicate postings on
              Gamesmith.
            </p>
          </div>
          <div className={s.innerStudioSection}>
            <h4>Analytics</h4>
            <p>
              Gain a better understanding of your studio's performance through
              visitor analytics. Visitor analytics highlights page views, unique
              visitors, with comparable data for the last 7/30/90 days. Analyze
              visitor traffic, measure and compare your studio performance and
              analyze trends over time.
            </p>
          </div>
          <div className={s.innerStudioSection}>
            <h4>Tools</h4>
            <p>
              Once you are a member, you’ll gain full access to our community,
              message boards, studio messaging and gain the ability to upgrade
              to Gamesmith’s powerful recruiting tools.
            </p>
          </div>
          <div className={s.buttonContainer}>
            {!authenticated && (
              <Button
                onClick={onApply}
                text="Create your studio page"
                className={s.buttonAlt}
                style={{ background: "transparent" }}
              />
            )}
          </div>
          <br /> <br /> <br /> <br />
        </div>
        <div
          className={s.buildRight}
          style={{ background: `url(${img_vr_glass})` }}
        ></div>
      </div>
      <div className={s.work}>
        <h3>Meet Our Clients</h3>
        <br />
        <div className={s.containerLimit}>
          <ClientCard
            imagesrc={img_client_playstation}
            clientname={"PlayStation Studios"}
          />
          <ClientCard imagesrc={img_client_ubisoft} clientname={"Ubisoft"} />
          <ClientCard
            imagesrc={img_client_amazon}
            clientname={"Amazon Games"}
          />
          <ClientCard imagesrc={img_client_roblox} clientname={"Roblox"} />
        </div>

        <div className={s.containerLimit}>
          <ClientCard imagesrc={img_client_jamcity} clientname={"Jam City"} />
          <ClientCard imagesrc={img_client_timi} clientname={"TiMi Studios"} />
          <ClientCard
            imagesrc={img_client_saber}
            clientname={"Saber Interactive"}
          />
          <ClientCard imagesrc={img_client_playdead} clientname={"Playdead"} />
        </div>
      </div>
    </section>
  </main>
);

Client.propTypes = {
  onApply: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default connect(
  createStructuredSelector({
    authenticated: selectAuth(),
  }),
  (dispatch) => ({
    dispatch,
    onApply: (studio) => dispatch(openAddStudio(studio)),
  })
)(Client);
