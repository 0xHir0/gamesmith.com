/*
 * Prfessional container
 */

import React from "react";
import PropTypes from "prop-types";

import { autofill } from "redux-form/lib/actions";
import Button from "components/UI/Button";
import games from "./img/games.jpg";
import experts from "./img/experts.jpg";
import studios from "./img/studios.jpg";
import man from "./img/p2.png";
import office from "./img/p1.png";
import logo from "./img/logo.svg";
import s from "./styles.module.scss";
import { Link } from "react-router";
import { openSignUp } from "containers/Modals/actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAuth } from "containers/App/selectors";

const Professional = ({ onApply, authenticated }) => (
  <main role="main" className={s.root}>
    <section className={s.full}>
      <div className={s.home}>
        <Link to="/">
          <img className={s.logo} src={logo} alt={"Logo"} />
        </Link>
        <h2 style={{ fontWeight: "lighter" }}>
          Home of the digital entertainment community
        </h2>
        {<br />}
        {!authenticated && (
          <Button
            onClick={onApply}
            text="Get Started - It's free"
            className={s.button}
          />
        )}
      </div>
      <div className={s.connect}>
        <div className={s.connectLeft}>
          <h4>
            Stay connected to the industry{<br />} and never lose a business
            opportunity again
          </h4>
          <p>
            Gamesmith is the discovery platform for the professional digital
            {<br />} entertainment community.
            {!authenticated ? (
              <span onClick={onApply}> Join today </span>
            ) : (
              " Join today"
            )}{" "}
            and connect with hundreds of {<br />}thousands of professionals and
            companies.
          </p>
        </div>
        <div className={s.connectRight}>
          <img src={office} alt={"office"} />
        </div>
      </div>
      <div className={s.work}>
        <h3>How Does It Work?</h3>
        <div className={s.upper}>
          <div className={s.workUpperLeft}>
            <h4>We're In It Together.</h4>
            <p>
              <span>Find the network with</span> {<br />}past and present
              colleagues
            </p>
            <p>
              <span>Discover and join</span> the teams{<br />} and titles you've
              worked on
            </p>
            <p>
              <span>Stay connected</span> to the digital entertainment{<br />}{" "}
              industry.
            </p>
            <div className={s.page}>
              <div className={s.pageLeft}>
                <span>200K+</span>
              </div>
              <div className={s.pageRight}>
                <p>
                  {" "}
                  Network with 200,000{<br />} digital entertainment
                  professionals
                </p>
              </div>
            </div>
          </div>
          <div className={s.workUpperRight}>
            <img src={games} alt={"games"} />
          </div>
        </div>
        <div className={s.middle}>
          <div className={s.workMiddleLeft}>
            <img src={experts} alt={"experts"} />
          </div>
          <div className={s.workMiddleRight}>
            <h4>Get Answers</h4>
            <p>
              <span>Your network is full of industry experts</span>
            </p>
            <p>
              <span>Find the people and knowledge</span> you need to achieve
              your goals,{<br />} stay informed and connect with business
              contacts.
            </p>
            <p>
              <span>Search, discover and connect</span> with industry leaders
              {<br />}
            </p>
            <div className={s.page}>
              <div className={s.pageLeft}>
                <span>87%</span>
              </div>
              <div className={s.pageRight}>
                <p>
                  {" "}
                  of the Gamesmith members have worked {<br />} on and released
                  3 projects or more.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={s.lower}>
          <div className={s.workLowerLeft}>
            <h3>Power Your Career</h3>
            <p>
              <span>Be the first to know</span> when a new project starts
            </p>
            <p>
              <span>Never lose</span> an opportunity again.
            </p>
            <p>
              <span>Be discovered</span> by those who matter{<br />}in digital
              entertainment
            </p>
            <div className={s.page}>
              <div className={s.pageLeft}>
                <span>1000+</span>
              </div>
              <div className={s.pageRight}>
                <p>
                  studios use Gamesmith on a daily basis to spot {<br />}talent
                  and teams.
                </p>
              </div>
            </div>
          </div>
          <div className={s.workLowerRight}>
            <img src={studios} alt={"studios"} height={autofill} />
          </div>
        </div>
      </div>
      <div className={s.join}>
        {!authenticated && (
          <Button
            onClick={onApply}
            text="Get Started - It's free"
            className={s.button}
          />
        )}
        {<br />}
        {<br />}
        <h4 style={{ color: "white" }}>
          Join thousands of comapnies that rely on Gamesmith everyday to{<br />}{" "}
          spot talent, teams and games
        </h4>
        {<br />}
        <div className={s.feedback}>
          <div className={s.feedbackLeft}>
            <img src={man} alt={"man"} height={autofill} />
          </div>
          <div className={s.feedbackRight}>
            <p style={{ color: "white" }}>
              "I was in between contracts and was having difficulty finding
              connections. I signed up for {<br />} Gamesmith and within 4 weeks
              I was in contact with my now current employer."
            </p>
            <p
              style={{
                fontSize: "small",
                fontColor: "white",
                fontWeight: "bold",
              }}
            >
              John Lynch
            </p>
            <p style={{ fontSize: "small" }}>
              Quality Assurance Lead at Bethesda Softworks
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

Professional.propTypes = {
  onApply: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default connect(
  createStructuredSelector({
    authenticated: selectAuth(),
  }),
  (dispatch) => ({
    dispatch,
    onApply: () => dispatch(openSignUp()),
  })
)(Professional);
