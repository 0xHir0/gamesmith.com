/*
 * Employers container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import EmployerForm from "components/EmployerForm";
import Supporters from "components/Supporters";

import s from "./styles.module.scss";
import { applyAsEmployerRequest } from "./actions";
import studioPageLogo from "./img/studioPageLogo.png";
import talentLogo from "./img/talentToolIcon.png";
import mccree from "./img/mccree-528px-portrait.png";
import tracer from "./img/Tracer-339px-portrait.png";
import Button from "../../components/UI/Button";
import { openAddStudio } from "../Modals/actions";

class Employers extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(applyAsEmployerRequest({ values, resolve, reject }));
    });

  render() {
    const { onAddStudio } = this.props;
    return (
      <main role="main" className={s.root}>
        <div className={s.wrapper}>
          <div className={s.topTextContainer}>
            <div className={s.topText}>
              <h1>
                The world's elite game professionals are at your fingertips!{" "}
              </h1>
              <h3 className={s.subtitle}>
                Access the world's largest game professional network.
              </h3>
              <h4 className={s.lastSubtitle}>
                Studios and publishers rely on Gamesmith everyday to spot
                talent, teams and games
              </h4>
            </div>
          </div>
          <div className={s.sectionOne}>
            <div className={`${s.sectionOneheading}`}>
              <img src={mccree} className={s.mcree} />
              <h1 className={s.howItWorks}>Here is how it works...</h1>
            </div>
            <div className={s.sectionOneListContainer}>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-6">
                  <div className={s.listItems}>
                    <ol>
                      <li style={{ color: "yellow", marginBottom: "1rem" }}>
                        <span style={{ color: "white" }}>
                          Create Your Free Studio Page
                        </span>{" "}
                        <span>
                          {" "}
                          <Button
                            className={s.addStudioButton}
                            onClick={() => onAddStudio("Studio")}
                            text={"Add Your Studio"}
                          />
                        </span>
                      </li>
                      <li style={{ color: "yellow", marginBottom: "1rem" }}>
                        <span style={{ color: "white" }}>
                          When you're ready to start recruiting, simply upgrade
                          to our talent tools
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
              <div className={s.studioPagecontainer}>
                <div className={s.studioBrand}>
                  <img className={s.studioLogo} src={studioPageLogo} />
                  <div>
                    <h3 style={{ color: "yellow" }}>Studio Page</h3>
                  </div>
                </div>
                <div className={s.studioDescription}>
                  <p>
                    Creating a Studio page provides the opportunity to promote
                    your game, services, brand, recruit top talent, and share
                    important, interesting, and useful updates to the game
                    industry community.
                  </p>
                </div>
                <div className={s.studioServices}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className={s.service}>
                        <span className={s.serviceItem}>Studio First:</span>{" "}
                        Market your studio before 200,000+ vetted game
                        professionals
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={s.service}>
                        <span className={s.serviceItem}>Showcase:</span> Embed
                        Your Game Tailers. Let the professional community,
                        publishers and fans see your work
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className={s.service}>
                        <span className={s.serviceItem}>
                          Improve Search Ranking:
                        </span>{" "}
                        Optimize your Gamesmith Studio page by company size,
                        location, releases and platforms
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={s.service}>
                        <span className={s.serviceItem}>Opportunity:</span>{" "}
                        Gamesmith is considered one of the best lead generating
                        platforms in games: Create opportunities and make the
                        all-important business connections
                      </div>
                    </div>
                  </div>
                </div>
                <div className={s.bottomMostText}>
                  <p>
                    {" "}
                    * Anyone with a studio or with a shipped game who has a
                    company email address, can create a Gamesmith Studio page
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*= =================================== Section two TALENT TOOLS =========================================*/}
          <div className={s.sectionTwo}>
            <div className={s.toolsPagecontainer}>
              <div className={s.studioBrand}>
                <img className={s.studioLogo} src={talentLogo} />
                <div>
                  <h3 style={{ color: "yellow" }}>Talent Tools</h3>
                </div>
              </div>
              <div className={s.toolsDescription}>
                <p>
                  We know it takes time to build a team - and we are here to
                  help you cut through your workload and start making smarter
                  hires faster.
                </p>
                <div>
                  <h4 style={{ color: "yellow" }}>
                    Every member of Gamesmith has:{" "}
                  </h4>
                  <ul style={{ marginLeft: "1rem" }}>
                    <li>Shipped a Game or</li>
                    <li>Has worked for a studio for more than three years.</li>
                    <li>Has Peer to peer verified work history.</li>
                  </ul>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    textAlign: "center",
                    marginTop: "2rem",
                  }}
                >
                  <p style={{ color: "yellow", fontWeight: "500" }}>
                    {" "}
                    Once you gain access to our talent tools you will have...
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <img src={tracer} className={s.tracer} />
                    </div>
                    <div className="col-md-6">
                      <div className={s.talentTools}>
                        <div className={s.tools}>
                          <h5> Profile Browsing:</h5>
                          <p>
                            Identify individuals by game titles, platforms,
                            industry verifications and more...{" "}
                          </p>
                        </div>
                        <div className={s.tools}>
                          <h5> Job Posting:</h5>
                          <p>
                            Post as few or as many jobs as you wish. All
                            applicants are sent directly to your inbox.
                          </p>
                        </div>
                        <div className={s.tools}>
                          <h5>Access Game Filters:</h5>
                          <p>
                            Delve deep by using our game filters. Filter by game
                            title, platform, past studio, current studio role
                            and more...
                          </p>
                        </div>
                        <div className={s.tools}>
                          <h5>Access Global View:</h5>
                          <p>
                            Chat with candidates before they move to the open
                            market. Global view allows you to identify
                            candidates open to new opportunities.
                          </p>
                        </div>
                        <div className={s.tools}>
                          <h5>Featured Postings:</h5>
                          <p>
                            Your jobs move to the top of the list. It's a busy
                            market with an insatiable demand for the top talent.
                          </p>
                        </div>
                        <div className={s.tools}>
                          <h5>Featured Studio Listing:</h5>
                          <p>
                            Move your Studio to the top of the the list. Take
                            the competitive advantage.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EmployerForm onSubmit={this.onSubmit} />
        <div className={s.feedbackSection}>
          <h3 style={{ fontWeight: "500" }}>Do you have any questions?</h3>
          <p style={{ fontSize: "1.2rem" }}>
            Feel free to ask any questions that you may have{" "}
          </p>
          <div className={s.feedbackBottom}>
            <div className="row">
              <div className={s.feedbackbottom}>
                <div className="row">
                  <div className="col-md-12">
                    <span style={{ padding: "2rem" }}>
                      {" "}
                      <a
                        style={{ color: "white" }}
                        href="mailto:sales@gamesmith.com"
                        target="_blank"
                      >
                        sales@gamesmith.com
                      </a>{" "}
                    </span>{" "}
                    <span style={{ padding: "2rem" }}>
                      <a
                        style={{ color: "white" }}
                        href="mailto:support@gamesmith.com"
                        target="_blank"
                      >
                        support@gamesmith.com
                      </a>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Supporters page="employers" />
      </main>
    );
  }
}

Employers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onAddStudio: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onAddStudio: (studio) => dispatch(openAddStudio(studio)),
}))(Employers);
