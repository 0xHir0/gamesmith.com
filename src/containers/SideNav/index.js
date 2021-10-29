/*
 * Side nav container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router";
import { createStructuredSelector } from "reselect";

import { getUserData } from "utils";

import { logoutRequest, pendingRequest } from "containers/App/actions";

import { openSignIn } from "containers/Modals/actions";

import { hideSideNav } from "./actions";

import {
  selectRequests,
  selectAuth,
  selectTeamRequests,
} from "containers/App/selectors";
import { selectShowNav } from "./selectors";

import s from "./styles.module.scss";

class SideNav extends Component {
  state = {
    available: false,
    isToolClicked: false,
  };

  onTouchStart = (evt) => {
    const nav = this.nav;
    nav.startX = evt.touches[0].pageX;
    nav.currentX = nav.startX;
    nav.touchingSideNav = true;
    requestAnimationFrame(this.update);
  };

  onTouchMove = (evt) => {
    const nav = this.nav;
    if (!nav.touchingSideNav) return;
    nav.currentX = evt.touches[0].pageX;
    const translateX = Math.min(0, nav.currentX - nav.startX);
    if (translateX < 0) evt.preventDefault();
  };

  onTouchEnd = () => {
    const nav = this.nav;
    const { onHideNav } = this.props;
    if (!nav.touchingSideNav) return;
    nav.touchingSideNav = false;
    const translateX = Math.min(0, nav.currentX - nav.startX);
    nav.style.transform = "";
    if (translateX < 0) onHideNav();
  };

  update = () => {
    const nav = this.nav;
    if (!nav.touchingSideNav) return;
    requestAnimationFrame(this.update);
    const translateX = Math.min(0, nav.currentX - nav.startX);
    nav.style.transform = `translateX(${translateX}px)`;
  };

  handleButton = () => {
    this.setState({ isToolClicked: !this.state.isToolClicked });
  };

  render() {
    const {
      showNav,
      requests,
      teamRequest,
      onHideNav,
      onLogout,
      authenticated,
      onSignIn,
    } = this.props;
    let pathName = window.location.pathname;
    const { isToolClicked } = this.state;
    const user = getUserData();
    const link = user && user.recruiter ? "recruiter" : "maker/me";
    return (
      <aside
        className={s.root}
        style={{ pointerEvents: showNav ? "auto" : "none" }}
      >
        <div
          className={s.overlay}
          style={{ opacity: showNav ? 1 : 0 }}
          onClick={onHideNav}
        ></div>
        <nav
          className={pathName === "/about" ? s.navNew : s.nav}
          style={{ transform: showNav ? "none" : "translateX(102%)" }}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          ref={(c) => {
            this.nav = c;
          }}
        >
          {authenticated ? (
            <div>
              <ul style={{ marginTop: "1rem" }}>
                {/*<li><a href="/about" onClick={onHideNav}>About<i className="fa fa-info" /></a></li>*/}
                <li>
                  <Link to="/games" onClick={onHideNav}>
                    Games
                    <i className="icon-box" />
                  </Link>
                </li>
                <li>
                  <Link to="/makers" onClick={onHideNav}>
                    Makers
                    <i className="icon-head" />
                  </Link>
                </li>
                <li>
                  <Link to="/studios" onClick={onHideNav}>
                    Studios
                    <i className="icon-playstation" />
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={onHideNav}>
                    Jobs
                    <i className="icon-briefcase" />
                  </Link>
                </li>
                <li>
                  <Link to="/vfx" onClick={onHideNav}>
                    VFX/CG<i className="fa fa-film"></i>
                  </Link>
                </li>
                {localStorage.getItem("categories") === "true" ? (
                  <li>
                    <a href="/ecosystem" onClick={onHideNav}>
                      Ecosystem
                      <i className="fa fa-object-group" />
                    </a>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <Link onClick={this.handleButton}>
                    Tools<i className="fa fa-caret-square-o-down"></i>
                  </Link>
                </li>
                {isToolClicked && (
                  <div className={s.showtoolsddMenu}>
                    <ul className={s.toolslist}>
                      <li className={s.toolsitem}>
                        <Link
                          to="/salarycalculator"
                          onClick={onHideNav}
                          className={s.toolMenuOption}
                        >
                          Salary Calculator
                        </Link>
                      </li>
                      <li className={s.toolsitem} style={{ fontSize: "10px" }}>
                        <a
                          href="http://devmap.gamesmith.com/"
                          onClick={onHideNav}
                          className={s.toolMenuOption}
                          target="_blank"
                        >
                          Game Dev Map
                        </a>
                      </li>
                      <li className={s.toolsitem} style={{ fontSize: "10px" }}>
                        <a
                          href="http://devmap.gamesmith.com/?view=university"
                          onClick={onHideNav}
                          className={s.toolMenuOption}
                          target="_blank"
                        >
                          Education Map
                        </a>
                      </li>
                      <li className={s.toolsitem} style={{ fontSize: "10px" }}>
                        <a
                          href="http://devmap.gamesmith.com/"
                          onClick={onHideNav}
                          className={s.toolMenuOption}
                          target="_blank"
                        >
                          Blog
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
              <ul>
                <li>
                  <Link to={`/${link}`} onClick={onHideNav}>
                    {user && user.recruiter ? "Edit Studio" : "Profile"}
                    <i className="icon-layout" />
                  </Link>
                </li>
                {user && !!user.maker && (
                  <li>
                    <Link to="/teamrequests" onClick={onHideNav}>
                      <div>
                        Team Requests
                        {teamRequest && teamRequest.length > 0 && (
                          <small>({teamRequest.length})</small>
                        )}
                      </div>
                      <i className="icon-bell" />
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/settings" onClick={onHideNav}>
                    Settings
                    <i className="icon-cog" />
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" onClick={onHideNav}>
                    FAQ
                    <i className="fa fa-question" />
                  </Link>
                </li>
                <li>
                  <a onClick={onLogout}>
                    Logout
                    <i className="icon-power" />
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <ul style={{ marginTop: "1rem" }}>
                {/*<li><a href="/about" onClick={onHideNav}>About<i className="fa fa-info" /></a></li>*/}
                <li>
                  <Link to="/games" onClick={onHideNav}>
                    Games
                    <i className="icon-box" />
                  </Link>
                </li>
                <li>
                  <Link to="/makers" onClick={onHideNav}>
                    Makers
                    <i className="icon-head" />
                  </Link>
                </li>
                <li>
                  <Link to="/studios" onClick={onHideNav}>
                    Studios
                    <i className="icon-playstation" />
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={onHideNav}>
                    Jobs
                    <i className="icon-briefcase" />
                  </Link>
                </li>
                <li>
                  <Link to="/vfx" onClick={onHideNav}>
                    VFX/CG<i className="fa fa-film"></i>
                  </Link>
                </li>
                {localStorage.getItem("categories") === "true" ? (
                  <li>
                    <a href="/ecosystem" onClick={onHideNav}>
                      Ecosystem
                      <i className="fa fa-object-group" />
                    </a>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <Link onClick={this.handleButton}>
                    Tools<i className="fa fa-caret-square-o-down"></i>
                  </Link>
                </li>
                {isToolClicked && (
                  <div className={s.showtoolsddMenu}>
                    <ul className={s.toolslist}>
                      <li className={s.toolsitem}>
                        <Link
                          to="/salarycalculator"
                          onClick={onHideNav}
                          className={s.toolMenuOption}
                        >
                          Salary Calculator
                        </Link>
                      </li>
                      <li className={s.toolsitem} style={{ fontSize: "10px" }}>
                        <a
                          href="http://devmap.gamesmith.com/"
                          onClick={onHideNav}
                          className={s.toolMenuOption}
                          target="_blank"
                        >
                          Game Dev Map
                        </a>
                      </li>
                      <li className={s.toolsitem} style={{ fontSize: "10px" }}>
                        <a
                          href="http://devmap.gamesmith.com/?view=university"
                          onClick={onHideNav}
                          className={s.toolMenuOption}
                          target="_blank"
                        >
                          Education Map
                        </a>
                      </li>
                      <li className={s.toolsitem} style={{ fontSize: "10px" }}>
                        <a
                          href="http://devmap.gamesmith.com/"
                          onClick={onHideNav}
                          className={s.toolMenuOption}
                          target="_blank"
                        >
                          Blog
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
                <li>
                  <a onClick={onSignIn}>
                    Sign In<i className="fa fa-sign-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          )}
          {/* <Button*/}
          {/* text={available ? 'Go Unavailable' : 'Go Available'}*/}
          {/* color={available ? 'transparent' : 'yellow'}*/}
          {/* onClick={this.handleButton} />*/}
        </nav>
      </aside>
    );
  }
}

SideNav.propTypes = {
  showNav: PropTypes.bool.isRequired,
  requests: PropTypes.array.isRequired,
  teamRequest: PropTypes.array.isRequired,
  onHideNav: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    showNav: selectShowNav(),
    requests: selectRequests(),
    teamRequest: selectTeamRequests(),
    authenticated: selectAuth(),
  }),
  (dispatch) => ({
    dispatch,
    onSignIn: () => dispatch(openSignIn()),
    onHideNav: () => dispatch(hideSideNav()),
    onGetRequests: () => dispatch(pendingRequest()),
    onLogout: () => {
      dispatch(hideSideNav());
      dispatch(logoutRequest());
    },
  })
)(SideNav);
