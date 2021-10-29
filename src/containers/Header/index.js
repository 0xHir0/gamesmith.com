/*
 * Header component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router";
import { push } from "react-router-redux";
import DropdownMenu from "react-dd-menu";
import { createStructuredSelector } from "reselect";
import { isEmpty } from "lodash";
import up from "./img/upp.png";
import down from "./img/downn.png";
import GamesmithLogo from "./img/Gamesmith-logo.png";
import gamesmithBlack from "./svg/gsBlack.svg";
import gamesmithWhite from "./svg/GS_ID_gamesmithWhite.svg";
import boostStar from "./img/boost_star.png";

import {
  logoutRequest,
  pendingRequest,
  pendingTeamRequest,
} from "containers/App/actions";
import { togglePartner } from "../Ecosystem/actions";
import { showSideNav } from "containers/SideNav/actions";
import {
  openSignIn,
  openSignUp,
  openDirectSignUp,
  openMessage,
  openCheckInbox,
  openRegistered,
  openRequested,
  openCheckDetails,
  openAvailability,
} from "containers/Modals/actions";
import { openMenu, closeMenu } from "./actions";

import { hideFilterNav } from "containers/People/actions";

import {
  selectAuth,
  selectUser,
  selectRequests,
  selectTeamRequests,
} from "containers/App/selectors";
import { selectIsOpen } from "./selectors";

import { getUserData } from "utils";

import Avatar from "components/UI/Avatar";

import logomob from "./svg/GS_ID_Lockupmob.svg";
import logomobalt from "./svg/GS_ID_Lockupmobalt.svg";
import s from "./styles.module.scss";
import Button from "../../components/UI/Button";
import chatIcon from "../Maker/img/chat.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available: false,
      isPage: false,
      isClicked: true,
      isToolClicked: false,
      isOpen: false,
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  getOffset = (element) => {
    if (element != null) {
      const bounding = element.getBoundingClientRect();
      return {
        top: bounding.top + document.body.scrollTop,
        left: bounding.left + document.body.scrollLeft,
      };
    }
  };

  handleScroll = () => {
    const navHeader = document.getElementById("fixed-header");
    const authNav = document.getElementById("auth-nav");
    const unauthNav = document.getElementById("unauth-nav");
    const startElement = document.getElementById("sec2");
    const scrollValue = 150;

    if (navHeader != null && startElement != null) {
      const offset = this.getOffset(startElement);
      const windowsScrollTop = window.pageYOffset;
      // if (windowsScrollTop >= offset.top) {
      if (windowsScrollTop >= scrollValue) {
        if (authNav != null) {
          navHeader.classList.remove(
            "transparent__app-containers-Header-styles__lpZKO"
          );
        } else if (unauthNav != null) {
          navHeader.classList.remove(
            "home__app-containers-Header-styles__1klet"
          );
          navHeader.classList.remove("_1kletu3kH9siPkA8Wdc0Iz");
        }
        navHeader.classList.add("navbar-fixed-background");
      } else {
        navHeader.classList.remove("navbar-fixed-background");
        if (authNav != null) {
          navHeader.classList.add(
            "transparent__app-containers-Header-styles__lpZKO"
          );
        } else if (unauthNav != null) {
          navHeader.classList.add("home__app-containers-Header-styles__1klet");
          navHeader.classList.add("_1kletu3kH9siPkA8Wdc0Iz");
        }
      }
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    const {
      location: { query },
      dispatch,
      user,
      authenticated,
      redirectToOnboarding,
      onSignIn,
      onMessage,
      onGetTeamRequests,
      onCheckInbox,
      onRegistered,
      onRequested,
      onAvailability,
      onCheckDetails,
      onGetRequests,
    } = this.props;
    if ({}.hasOwnProperty.call(query, "login")) {
      onSignIn();
    } else if ({}.hasOwnProperty.call(query, "proceedonboarding")) {
      localStorage.setItem("onboardingProcess", true);
      dispatch(push("/"));
      redirectToOnboarding(user);
    } else if ({}.hasOwnProperty.call(query, "error")) {
      if (query.code === 40002) {
        onMessage(
          "LogIn Failed",
          "Linkedin auth failed. Please check if the code is incorrect/expired."
        );
      } else if (query.code === 40003) {
        onMessage(
          "Not Registered",
          "You must receive an invite email and click on the claim button to register"
        );
      } else if (query.code === 40004) {
        onMessage(
          "Wrong Credentials",
          "No user found with the given credentials."
        );
      } else if (query.code === 40005) {
        onMessage("Disabled", "User has disabled messaging preferences.");
      } else if (query.code === 40010) {
        onMessage(
          "OnBoarding Issue",
          "Complete your onboarding by clicking on link send to you in email."
        );
      } else {
        openMessage();
      }
    } else if ({}.hasOwnProperty.call(query, "unauthorized")) {
      onMessage(
        "Unauthorized",
        "Your credentials have expired, please log in again."
      );
    } else if ({}.hasOwnProperty.call(query, "checkInbox")) {
      onCheckInbox(query.email);
    } else if ({}.hasOwnProperty.call(query, "checkDetails") && getUserData()) {
      onCheckDetails();
    } else if ({}.hasOwnProperty.call(query, "registered")) {
      onRegistered();
    } else if ({}.hasOwnProperty.call(query, "requested")) {
      onRequested();
    } else if ({}.hasOwnProperty.call(query, "availability") && getUserData()) {
      onAvailability();
    } else if ({}.hasOwnProperty.call(query, "updated")) {
      onMessage("Profile Updated!", "blank");
    } else if ({}.hasOwnProperty.call(query, "resetpassword")) {
      onMessage("Success", "Password successfully changed.");
    } else if ({}.hasOwnProperty.call(query, "welcome")) {
      onMessage("Welcome to Gamesmith!", "blank");
    } else if (authenticated) {
      if (!isEmpty(user)) onGetRequests();
      if (!!user.maker) onGetTeamRequests();
    } else if ({}.hasOwnProperty.call(query, "onboarding")) {
      localStorage.setItem("onboarding", query.onboarding);
      // onSignIn();
      dispatch(push("/onboarding"));
    }
    document.addEventListener("click", this.handleClickOutside);

    // localStorage userData to be used for onboarding then sent to the custom lambda function
    if (!{}.hasOwnProperty.call(localStorage, "onboardingObj")) {
      const getViewPort = `${window.screen.width} x ${window.screen.height}`;
      const getUserAgent = navigator.userAgent;
      const queryString = window.location.search
        .slice(1)
        .split("&")
        .map((p) => p.split("="))
        .reduce((obj, pair) => {
          const [key, value] = pair.map(decodeURIComponent);
          return { ...obj, [key]: value };
        }, {});
      const onboardingObj = {
        environment: {
          Ismobile: !(window.screen.width > 1050),
          Useragent: getUserAgent,
          Referrer: document.referrer,
          Path: window.location.pathname,
          Viewport: getViewPort,
        },
        queryString,
      };
      fetch("https://api.ipify.org/?format=json")
        .then((response) => response.json())
        .then((data) => {
          onboardingObj.environment.Ip = data.ip;
          localStorage.setItem("onboardingObj", JSON.stringify(onboardingObj));
        });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.isToolClicked)
        this.setState({ isToolClicked: !this.state.isToolClicked });
    }
  }
  componentDidUpdate(prevProps) {
    const {
      location: { query },
      dispatch,
      user,
      authenticated,
      redirectToOnboarding,
      onSignIn,
      onMessage,
      onGetTeamRequests,
      onCheckInbox,
      onRegistered,
      onRequested,
      onAvailability,
      onCheckDetails,
      onGetRequests,
    } = this.props;
    if ({}.hasOwnProperty.call(query, "login")) {
      dispatch(push("/makers"));
      onSignIn();
    } else if ({}.hasOwnProperty.call(query, "proceedonboarding")) {
      localStorage.setItem("onboardingProcess", true);
      dispatch(push("/"));
      redirectToOnboarding(user);
    } else if ({}.hasOwnProperty.call(query, "error")) {
      onMessage();
    } else if ({}.hasOwnProperty.call(query, "unauthorized")) {
      onMessage(
        "Unauthorized",
        "Your credentials have expired, please log in again."
      );
    } else if ({}.hasOwnProperty.call(query, "checkInbox")) {
      onCheckInbox();
    } else if ({}.hasOwnProperty.call(query, "checkDetails") && getUserData()) {
      onCheckDetails(query.email);
    } else if ({}.hasOwnProperty.call(query, "registered")) {
      onRegistered();
    } else if ({}.hasOwnProperty.call(query, "requested")) {
      onRequested();
    } else if ({}.hasOwnProperty.call(query, "availability") && getUserData()) {
      onAvailability();
    } else if ({}.hasOwnProperty.call(query, "updated")) {
      onMessage("Profile Updated!", "blank");
    } else if ({}.hasOwnProperty.call(query, "welcome")) {
      onMessage("Welcome to Gamesmith!", "blank");
    } else if (authenticated !== prevProps.authenticated) {
      if (!isEmpty(user)) onGetRequests();
      // !!user.maker ? onGetTeamRequests() : '';
    } else if ({}.hasOwnProperty.call(query, "resetpassword")) {
      onMessage("Success", "Password successfully changed.");
    } else if ({}.hasOwnProperty.call(query, "onboarding")) {
      localStorage.setItem("onboarding", query.onboarding);
      // onSignIn();
      dispatch(push("/onboarding"));
    }
  }

  handleButton = () => {
    this.setState({ available: !this.state.available });
  };

  closeWindow = () => {
    const { dispatch } = this.props;
    if (window.opener) {
      window.opener.location = "/";
      // window.close();
    } else {
      dispatch(push("/"));
    }
  };
  clickHandler = () => {
    this.props.onTogglePartners();
    this.setState({ isClicked: !this.state.isClicked });
  };
  clickToolHandler = (e) => {
    this.setState({ isToolClicked: true });
  };
  handleMouseLeave = () => {
    this.setState({ isToolClicked: !this.state.isToolClicked });
  };
  showApplozic = () => {
    document.getElementById("mck-sidebox-launcher") &&
      document.getElementById("mck-sidebox-launcher").children[0].click();
  };
  redirectsToNetworking() {
    this.props.dispatch(push("/networking"));
  }

  render() {
    const { available } = this.state;
    const ismobile = window.innerWidth <= 1150;
    const pathName = window.location.pathname;
    const {
      location: { pathname },
      user,
      requests,
      isOpen,
      onOpenMenu,
      onCloseMenu,
      onShowNav,
      teamRequests,
      onSignIn,
      onSignUp,
      onDirectSignUp,
      onLogout,
      authenticated,
      step,
    } = this.props;
    const u = user.maker || user.recruiter || {};
    const link = user.recruiter ? "recruiter" : "maker/me";
    const menuOptions = {
      isOpen,
      className: `header-dropdown ${s.menu} ${isOpen ? s.active : ""}`,
      close: onCloseMenu,
      closeOnInsideClick: false,
      enterTimeout: 150,
      leaveTimeout: 150,
      toggle: (
        <Avatar
          onClick={isOpen ? onCloseMenu : onOpenMenu}
          className={s.avatar}
          image={u.imgUrl || u.logo}
          firstName={u.firstName}
          lastName={u.lastName}
          withText
        />
      ),
    };

    const header = (
      <div>
        {!authenticated ? (
          window.location.pathname === "/" ? (
            <header
              className={`${s.root} ${s.home_white} ${
                window.location.pathname == "/" ? "noalt" : s.alt
              }`}
              id="fixed-header"
            >
              <label
                htmlFor="nav-toggle"
                className={`${s.toggle} ${s.toggleHome}`}
                onClick={onShowNav}
              ></label>
              {
                <Link
                  style={{ flex: "0 0 auto", margin: "auto" }}
                  to={{ pathname: "https://gamesmith.com" }}
                  target="_self"
                >
                  <img
                    className={s.logo}
                    src={gamesmithBlack}
                    style={
                      ismobile ? { display: "none" } : { display: "block" }
                    }
                    alt="Gamesmith"
                  />
                  <img
                    className={`${
                      window.location.pathname != "/" ? s.logoalt : s.logo
                    } `}
                    style={
                      !ismobile
                        ? { display: "none" }
                        : {
                            display: "block",
                            margin: "auto",
                            marginTop: "10px",
                          }
                    }
                    src={window.location.pathname != "/" ? logomobalt : logomob}
                    alt="Gamesmith"
                  />
                </Link>
              }
              <nav
                className={` ${s.nav} ${s.setNav} ${s.navUnauth}`}
                style={{ background: "white" }}
                id="auth-nav"
              >
                <div className={s.blank}></div>
                <div className={`${s.forLarge} ${s.nav_width}`}>
                  <div className={s.nav_center}>
                    <div style={{ display: "inline-block" }}>
                      <Link
                        className={
                          pathname.indexOf("home") === 1 ? s.active : ""
                        }
                        to="/home"
                      >
                        Tribe
                      </Link>
                      <div className={s.dots}></div>
                    </div>
                    <Link
                      className={
                        pathname.indexOf("games") === 1 ? s.active : ""
                      }
                      to="/games"
                    >
                      Games
                    </Link>
                    <div className={s.dots}></div>
                    <Link
                      className={
                        pathname.indexOf("makers") === 1 ? s.active : ""
                      }
                      to="/makers"
                    >
                      Makers
                    </Link>
                    <div className={s.dots}></div>
                    <Link
                      to="/studios"
                      className={
                        pathname.indexOf("studios") === 1 ? s.active : ""
                      }
                      style={{ paddingRight: "10px" }}
                    >
                      Studios
                    </Link>
                    <div className={s.dots}></div>
                    <Link
                      to="/jobs"
                      className={pathname.indexOf("jobs") === 1 ? s.active : ""}
                      style={{ paddingRight: "10px" }}
                    >
                      Jobs
                    </Link>
                    {<div style={{ display: "inline-block" }}></div>}
                    <div className={s.dots}></div>
                    <div
                      className={
                        this.state.isToolClicked
                          ? `${s.toolsHeader} ${s.toolsActive}`
                          : s.toolsHeader
                      }
                      onClick={() => this.clickToolHandler()}
                      onMouseEnter={(e) => this.clickToolHandler(e)}
                      onMouseOver={(e) => this.clickToolHandler(e)}
                      ref={this.setWrapperRef}
                    >
                      <div className={s.toolsHeader}>Tools</div>
                      {this.state.isToolClicked && (
                        <div
                          style={{ opacity: "1" }}
                          className={s.toolsMenuUnauth}
                          onMouseLeave={() => this.handleMouseLeave()}
                        >
                          <li style={{ opacity: "1" }}>
                            <Link to="/salarycalculator">
                              Salary Calculator
                            </Link>
                          </li>
                          <li style={{ opacity: "1" }}>
                            <a
                              href="http://devmap.gamesmith.com/"
                              target="_blank"
                            >
                              Game Dev Map
                            </a>
                          </li>
                          <li style={{ opacity: "1" }}>
                            <a
                              href="http://devmap.gamesmith.com/?view=university"
                              target="_blank"
                            >
                              Education Map
                            </a>
                          </li>
                          <li style={{ opacity: "1" }}>
                            <a
                              href="https://gamesmith-57813a.easywp.com/"
                              target="_blank"
                            >
                              Blog
                            </a>
                          </li>
                          <li style={{ opacity: "1" }}>
                            <Link to="/vfx">VFX/CG</Link>
                          </li>
                          <li style={{ opacity: "1" }}>
                            <Link to="/ecosystem">Ecosystem</Link>
                          </li>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={s.nav_right}>
                  <div>
                    <Button
                      text="Sign In"
                      onClick={onSignIn}
                      className={s.buttonWhite}
                    />
                  </div>
                </div>
              </nav>
            </header>
          ) : window.location.pathname === "/signup" ? (
            <header
              className={`${s.root} ${s.home_black} ${
                window.location.pathname === "/signup" ? s.alt : "noalt"
              }`}
              id="fixed-header"
            >
              <label
                htmlFor="nav-toggle"
                className={s.toggle}
                onClick={onShowNav}
              ></label>
              {
                <Link
                  style={{ flex: "0 0 auto", margin: "auto" }}
                  to={{ pathname: "https://gamesmith.com" }}
                  target="_self"
                >
                  <img
                    className={s.logo}
                    src={gamesmithWhite}
                    style={
                      ismobile ? { display: "none" } : { display: "block" }
                    }
                    alt="Gamesmith"
                  />
                  <img
                    className={`${
                      window.location.pathname !== "/" ? s.logoalt : s.logo
                    } `}
                    style={
                      !ismobile
                        ? { display: "none" }
                        : {
                            display: "block",
                            margin: "auto",
                            marginTop: "10px",
                          }
                    }
                    src={window.location.pathname != "/" ? logomobalt : logomob}
                    alt="Gamesmith"
                  />
                </Link>
              }
              <nav className={` ${s.nav} ${s.setNav}`} id="auth-nav">
                <div className={s.blank}></div>
                <div className={`${s.forLarge} ${s.nav_width}`}>
                  <div className={s.nav_center}>
                    <div className={s.signUpCenter}>
                      <div
                        className={step === 1 || step === 0 ? s.navForm : ""}
                      >
                        <span
                          className={
                            step === 1 || step === 0
                              ? s.stepCountEnable
                              : s.stepCountDisable
                          }
                        >
                          1
                        </span>
                        <span className={s.signUpMenu}>CREATE PROFILE</span>
                      </div>
                      <div className={step === 2 ? s.navForm : ""}>
                        <span
                          className={
                            step === 2 ? s.stepCountEnable : s.stepCountDisable
                          }
                        >
                          2
                        </span>
                        <span className={s.signUpMenu}>ADD OPPORTUNITIES</span>
                      </div>
                      <div className={step === 3 ? s.navForm : ""}>
                        <span
                          className={
                            step === 3 ? s.stepCountEnable : s.stepCountDisable
                          }
                        >
                          3
                        </span>
                        <span className={s.signUpMenu}>ADD GAME</span>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
          ) : (
            <header
              className={`${s.root} ${s.home_black} ${
                window.location.pathname === "/signup" ? "noalt" : s.alt
              }`}
              id="fixed-header"
            >
              <label
                htmlFor="nav-toggle"
                className={s.toggle}
                onClick={onShowNav}
              ></label>
              {
                <Link
                  style={{ flex: "0 0 auto", margin: "auto" }}
                  to={{ pathname: "https://gamesmith.com" }}
                  target="_self"
                >
                  <img
                    className={s.logo}
                    src={gamesmithWhite}
                    style={
                      ismobile ? { display: "none" } : { display: "block" }
                    }
                    alt="Gamesmith"
                  />
                  <img
                    className={`${
                      window.location.pathname !== "/" ? s.logoalt : s.logo
                    } `}
                    style={
                      !ismobile
                        ? { display: "none" }
                        : {
                            display: "block",
                            margin: "auto",
                            marginTop: "10px",
                          }
                    }
                    src={window.location.pathname != "/" ? logomobalt : logomob}
                    alt="Gamesmith"
                  />
                </Link>
              }
              {!authenticated && window.location.pathname !== "/signin" ? (
                <Button
                  text="Sign In"
                  onClick={onSignIn}
                  className={s.buttonYellowSmall}
                />
              ) : (
                ""
              )}
              <nav className={` ${s.nav} ${s.setNav}`} id="auth-nav">
                <div className={s.blank}></div>
                <div className={`${s.forLarge} ${s.nav_width}`}>
                  <div className={s.nav_center}>
                    <div style={{ display: "inline-block" }}>
                      {pathName === "/home" ? (
                        <a
                          className={
                            pathname.indexOf("home") === 1 ? s.active : ""
                          }
                          href="/home"
                        >
                          Tribe
                        </a>
                      ) : (
                        <Link
                          className={
                            pathname.indexOf("home") === 1 ? s.active : ""
                          }
                          to="/home"
                        >
                          Tribe
                        </Link>
                      )}
                      <div className={s.dots}></div>
                    </div>
                    <Link
                      className={
                        pathname.indexOf("games") === 1 ? s.active : ""
                      }
                      to="/games"
                    >
                      Games
                    </Link>
                    <div className={s.dots}></div>
                    <Link
                      className={
                        pathname.indexOf("makers") === 1 ? s.active : ""
                      }
                      to="/makers"
                    >
                      Makers
                    </Link>
                    <div className={s.dots}></div>
                    <Link
                      to="/studios"
                      style={{ paddingRight: "10px" }}
                      className={
                        pathname.indexOf("studios") === 1 ? s.active : ""
                      }
                    >
                      Studios
                    </Link>
                    <div className={s.dots}></div>
                    <Link
                      to="/jobs"
                      style={{ paddingRight: "10px" }}
                      className={pathname.indexOf("jobs") === 1 ? s.active : ""}
                    >
                      Jobs
                    </Link>
                    {<div style={{ display: "inline-block" }}></div>}
                    <div className={s.dots}></div>
                    <div
                      className={
                        this.state.isToolClicked
                          ? `${s.toolsHeader} ${s.toolsActive}`
                          : s.toolsHeader
                      }
                      onClick={() => this.clickToolHandler()}
                      onMouseEnter={(e) => this.clickToolHandler(e)}
                      onMouseOver={(e) => this.clickToolHandler(e)}
                      ref={this.setWrapperRef}
                    >
                      <div className={s.toolsHeader}>Tools</div>
                      {this.state.isToolClicked && (
                        <div
                          style={{ opacity: "1" }}
                          className={s.toolsMenu}
                          onMouseLeave={() => this.handleMouseLeave()}
                        >
                          <li style={{ opacity: "1" }}>
                            <Link to="/salarycalculator">
                              Salary Calculator
                            </Link>
                          </li>
                          <li style={{ opacity: "1" }}>
                            <a
                              href="http://devmap.gamesmith.com/"
                              target="_blank"
                            >
                              Game Dev Map
                            </a>
                          </li>
                          <li style={{ opacity: "1" }}>
                            <a
                              href="http://devmap.gamesmith.com/?view=university"
                              target="_blank"
                            >
                              Education Map
                            </a>
                          </li>
                          <li style={{ opacity: "1" }}>
                            <a
                              href="https://gamesmith-57813a.easywp.com/"
                              target="_blank"
                            >
                              Blog
                            </a>
                          </li>
                          <li style={{ opacity: "1" }}>
                            <Link to="/vfx">VFX/CG</Link>
                          </li>
                          <li style={{ opacity: "1" }}>
                            <Link to="/ecosystem">Ecosystem</Link>
                          </li>
                        </div>
                      )}
                    </div>
                    {authenticated ? (
                      <Link
                        className={
                          pathname.indexOf("messaging") === 1 ? s.active : ""
                        }
                        onClick={() => this.showApplozic()}
                      >
                        Messaging<span id="applozic-badge-count"></span>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {authenticated ? (
                  <DropdownMenu {...menuOptions}>
                    <li>
                      <Link to={`/${link}`} onClick={onCloseMenu}>
                        {user && user.recruiter ? "My Studio" : "Profile"}
                      </Link>
                    </li>
                    {user && user.maker && (
                      <li>
                        <Link to="/requests" onClick={onCloseMenu}>
                          Requests
                          {((requests && requests.length > 0) ||
                            (teamRequests && teamRequests.length > 0)) && (
                            <small>
                              ({requests.length + teamRequests.length})
                            </small>
                          )}
                        </Link>
                      </li>
                    )}
                    {user && user.maker && (
                      <li>
                        <Link to="/networking" onClick={onCloseMenu}>
                          Networking
                        </Link>
                      </li>
                    )}
                    {user && user.recruiter && (
                      <li>
                        <Link to="/analytics" onClick={onCloseMenu}>
                          Analytics
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link to="/settings" onClick={onCloseMenu}>
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/faqs"
                        className={
                          pathname.indexOf("faqs") === 1 ? s.active : ""
                        }
                      >
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <a onClick={onLogout}>Sign Out</a>
                    </li>
                  </DropdownMenu>
                ) : (
                  <div className={s.nav_right}>
                    <div>
                      {window.location.pathname !== "/signin" ? (
                        <Button
                          text="Sign In"
                          onClick={onSignIn}
                          className={s.buttonYellow}
                        />
                      ) : null}
                    </div>
                  </div>
                )}
              </nav>
            </header>
          )
        ) : (
          <header
            className={`${s.root} ${s.home_black} ${
              window.location.pathname == "/" ? "noalt" : s.alt
            }`}
            id="fixed-header"
          >
            <label
              htmlFor="nav-toggle"
              className={s.toggle}
              onClick={onShowNav}
            ></label>
            {
              <Link
                style={{ flex: "0 0 auto", margin: "auto" }}
                to={{ pathname: "https://gamesmith.com" }}
                target="_self"
              >
                <img
                  className={s.logo}
                  src={gamesmithWhite}
                  style={ismobile ? { display: "none" } : { display: "block" }}
                  alt="Gamesmith"
                />
                <img
                  className={`${
                    window.location.pathname !== "/" ? s.logoalt : s.logo
                  } `}
                  style={
                    !ismobile
                      ? { display: "none" }
                      : { display: "block", margin: "auto", marginTop: "10px" }
                  }
                  src={window.location.pathname != "/" ? logomobalt : logomob}
                  alt="Gamesmith"
                />
              </Link>
            }
            {!authenticated ? (
              <Button
                text="Sign In"
                onClick={onSignIn}
                className={s.buttonYellowSmall}
              />
            ) : (
              <Button
                text="Sign Out"
                onClick={onLogout}
                className={s.buttonYellowSmall}
              />
            )}
            <nav className={` ${s.nav} ${s.setNav}`} id="auth-nav">
              <div className={s.blank}></div>
              <div className={`${s.forLarge} ${s.nav_width}`}>
                <div className={s.nav_center}>
                  <div style={{ display: "inline-block" }}>
                    {pathName === "/home" ? (
                      <a
                        className={
                          pathname.indexOf("home") === 1 ? s.active : ""
                        }
                        href="/home"
                      >
                        Tribe
                      </a>
                    ) : (
                      <Link
                        className={
                          pathname.indexOf("home") === 1 ? s.active : ""
                        }
                        to="/home"
                      >
                        Tribe
                      </Link>
                    )}
                    <div className={s.dots}></div>
                  </div>
                  <Link
                    className={pathname.indexOf("games") === 1 ? s.active : ""}
                    to="/games"
                  >
                    Games
                  </Link>
                  <div className={s.dots}></div>
                  <Link
                    className={pathname.indexOf("makers") === 1 ? s.active : ""}
                    to="/makers"
                  >
                    Makers
                  </Link>
                  <div className={s.dots}></div>
                  <Link
                    to="/studios"
                    style={{ paddingRight: "10px" }}
                    className={
                      pathname.indexOf("studios") === 1 ? s.active : ""
                    }
                  >
                    Studios
                  </Link>
                  <div className={s.dots}></div>
                  <Link
                    to="/jobs"
                    style={{ paddingRight: "10px" }}
                    className={pathname.indexOf("jobs") === 1 ? s.active : ""}
                  >
                    Jobs
                  </Link>
                  {<div style={{ display: "inline-block" }}></div>}
                  <div className={s.dots}></div>
                  <div
                    className={
                      this.state.isToolClicked
                        ? `${s.toolsHeader} ${s.toolsActive}`
                        : s.toolsHeader
                    }
                    onClick={() => this.clickToolHandler()}
                    onMouseEnter={(e) => this.clickToolHandler(e)}
                    onMouseOver={(e) => this.clickToolHandler(e)}
                    ref={this.setWrapperRef}
                  >
                    <div className={s.toolsHeader}>Tools</div>
                    {this.state.isToolClicked && (
                      <div
                        style={{ opacity: "1" }}
                        className={s.toolsMenu}
                        onMouseLeave={() => this.handleMouseLeave()}
                      >
                        <li style={{ opacity: "1" }}>
                          <Link to="/salarycalculator">Salary Calculator</Link>
                        </li>
                        <li style={{ opacity: "1" }}>
                          <a
                            href="http://devmap.gamesmith.com/"
                            target="_blank"
                          >
                            Game Dev Map
                          </a>
                        </li>
                        <li style={{ opacity: "1" }}>
                          <a
                            href="http://devmap.gamesmith.com/?view=university"
                            target="_blank"
                          >
                            Education Map
                          </a>
                        </li>
                        <li style={{ opacity: "1" }}>
                          <a
                            href="https://gamesmith-57813a.easywp.com/"
                            target="_blank"
                          >
                            Blog
                          </a>
                        </li>
                        <li style={{ opacity: "1" }}>
                          <Link to="/vfx">VFX/CG</Link>
                        </li>
                        <li style={{ opacity: "1" }}>
                          <Link to="/ecosystem">Ecosystem</Link>
                        </li>
                      </div>
                    )}
                  </div>
                  {authenticated ? (
                    <div className={s.verification}>
                      <Link
                        className={
                          pathname.indexOf("messaging") === 1 ? s.active : ""
                        }
                        onClick={() => this.showApplozic()}
                      >
                        Messaging<span id="applozic-badge-count"></span>
                      </Link>
                      <div className={s.dots}></div>
                      {user && user.maker ? (
                        <Button
                          text="Boost my score"
                          className={s.verificationButton}
                          icon={boostStar}
                          onClick={() => this.redirectsToNetworking()}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {authenticated ? (
                <DropdownMenu {...menuOptions}>
                  <li>
                    <Link to={`/${link}`} onClick={onCloseMenu}>
                      {user && user.recruiter ? "My Studio" : "Profile"}
                    </Link>
                  </li>
                  {user && user.maker && (
                    <li>
                      <Link to="/requests" onClick={onCloseMenu}>
                        Requests
                        {((requests && requests.length > 0) ||
                          (teamRequests && teamRequests.length > 0)) && (
                          <small>
                            ({requests.length + teamRequests.length})
                          </small>
                        )}
                      </Link>
                    </li>
                  )}
                  {user && user.maker && (
                    <li>
                      <Link to="/networking" onClick={onCloseMenu}>
                        Networking
                      </Link>
                    </li>
                  )}
                  {user && user.recruiter && (
                    <li>
                      <Link to="/analytics" onClick={onCloseMenu}>
                        Analytics
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/settings" onClick={onCloseMenu}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faqs"
                      className={pathname.indexOf("faqs") === 1 ? s.active : ""}
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <a onClick={onLogout}>Sign Out</a>
                  </li>
                </DropdownMenu>
              ) : (
                <div className={s.nav_right}>
                  <div>
                    <Button
                      text="Sign In"
                      onClick={onSignIn}
                      className={s.buttonYellow}
                    />
                  </div>
                </div>
              )}
            </nav>
          </header>
        )}
      </div>
    );

    return header;
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  requests: PropTypes.array.isRequired,
  teamRequests: PropTypes.array.isRequired,
  authenticated: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpenMenu: PropTypes.func.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onDirectSignUp: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
  onCheckInbox: PropTypes.func.isRequired,
  onCheckDetails: PropTypes.func.isRequired,
  onRegistered: PropTypes.func.isRequired,
  onRequested: PropTypes.func.isRequired,
  onAvailability: PropTypes.func.isRequired,
  onShowNav: PropTypes.func.isRequired,
  onGetRequests: PropTypes.func.isRequired,
  onGetTeamRequests: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  redirectToOnboarding: PropTypes.func.isRequired,
  // onCheckPartner: PropTypes.func.isRequired,
  onTogglePartners: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    authenticated: selectAuth(),
    isOpen: selectIsOpen(),
    user: selectUser(),
    requests: selectRequests(),
    teamRequests: selectTeamRequests(),
  }),
  (dispatch) => ({
    dispatch,
    onTogglePartners: () => dispatch(togglePartner()),
    // onCheckPartner: () => dispatch(checkPartner()),
    onOpenMenu: () => dispatch(openMenu()),
    onCloseMenu: () => dispatch(closeMenu()),
    onSignIn: () => dispatch(openSignIn()),
    onSignUp: () => dispatch(openSignUp()),
    onDirectSignUp: () => dispatch(openDirectSignUp()),
    onMessage: (title, message) => dispatch(openMessage(title, message)),
    onCheckInbox: (email) => dispatch(openCheckInbox(email)),
    onCheckDetails: () => dispatch(openCheckDetails()),
    redirectToOnboarding: (user) => dispatch(openCheckDetails(user)),
    onRegistered: () => dispatch(openRegistered()),
    onRequested: () => dispatch(openRequested()),
    onAvailability: () => dispatch(openAvailability()),
    onShowNav: () => {
      dispatch(hideFilterNav());
      dispatch(showSideNav());
    },
    onGetRequests: () => dispatch(pendingRequest()),
    onGetTeamRequests: () => dispatch(pendingTeamRequest()),
    onLogout: () => {
      dispatch(closeMenu());
      dispatch(logoutRequest());
    },
  })
)(Header);
