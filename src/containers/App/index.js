/*
 * App container
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";

import Helmet from "react-helmet";
import { throttle } from "lodash";
import ReactPixel from "react-facebook-pixel";
import { getUserData, loadScript, addUserToGroup } from "../../utils/index";

import Header from "containers/Header";
import Footer from "components/Footer";
import SideNav from "containers/SideNav";
import SignUp from "containers/SignUp";
import { connect } from "react-redux";
import { selectAuth, applozicMsgCount } from "./selectors";

import Modals from "containers/Modals";
import { openExceedLimit } from "containers/Modals/actions";
import {
  addApplozicCountRequest,
  getApplozicCountRequest,
  getJwtTokenRequest,
} from "./actions";
import { selectStudio } from "../Recruiter/selectors";
import s from "./styles.module.scss";
import { createStructuredSelector } from "reselect";
import { getRecruiterStudioRequest } from "../Recruiter/actions";

const RESIZE = "resize";

class App extends Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    window: { height: 0, width: 0 },
    document: { height: 0, width: 0 },
    tabClickCount: 0,
    step: 0,
  };

  componentDidMount() {
    // resize event listener for win/doc width/height
    ReactPixel.pageView();
    this.props.dispatch(getApplozicCountRequest());
    this.onResize();
    this.onResizeThrottled = throttle(this.onResize, 250);
    window.addEventListener(RESIZE, this.onResizeThrottled);

    if (this.props.authenticated) {
      const user = getUserData();
      this.props.onJwtTokenRequest(user.id);
      this.startApplozic();

      if (user && user.maker) {
        window.gamesmith = {
          UserID: user.id,
          studio: { name: user.studioSlug },
          studioId: user.studioId,
          studioSlug: user.studioSlug,
        };
      } else {
        this.props.onStudioRequest(user.recruiter.companyId);
        window.gamesmith = {
          UserID: user.id,
          studio: { name: user.studioSlug },
          studioId: user.studioId,
          studioSlug: user.studioSlug,
        };
      }
      const singUp = localStorage.getItem("signUp");
      if (singUp === "true") {
        localStorage.removeItem("signUp");
        const retrievedObject = localStorage.getItem("onboardingObj");
        if (retrievedObject) {
          console.log("SEND_TO_SERVER: ", JSON.parse(retrievedObject));
          fetch(
            "https://b5pzxfr6a9.execute-api.us-west-2.amazonaws.com/signupAttributes",
            {
              method: "POST",
              body: JSON.stringify({
                user_id: user.email,
                data: [retrievedObject],
              }),
            }
          )
            .then((response) => {
              response.text().then((result) => {
                console.log(result);
              });
            })
            .catch((err) => {
              console.error(err);
            });
          ReactPixel.track("RegistrationComplete");
          window.gtag("event", "conversion", {
            send_to: "AW-667973581/EV-9CI_Og8QBEM3vwb4C",
          });
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE, this.onResizeThrottled);
  }

  onResize = () => {
    const win = window;
    const doc = document;
    const body = doc.documentElement;
    this.setState({
      window: {
        height: win.innerHeight,
        width: win.innerWidth,
      },
      document: {
        height: body.clientHeight,
        width: body.clientWidth,
      },
    });
  };
  startApplozic = () => {
    const user = getUserData();
    const that = this;
    window.applozic.init({
      appId: "gamesmith299bb298412053414de4322b1a13315b", // Get your App ID from https://console.applozic.com/settings/install
      userId: user.id, // Logged in user's id, a unique identifier for user
      accessToken: "test", // Enter password here for the userId passed above, read this if you want to add additional security by verifying password from your server https://www.applozic.com/docs/configuration.html#access-token-url
      userName: user.maker
        ? `${user.maker.firstName} ${user.maker.lastName}`
        : `${user.recruiter.firstName} ${user.recruiter.lastName}`, // User's display name
      imageLink: "", // User's profile picture url
      email: user.email, // optional
      contactNumber: "", // optional, pass with internationl code eg: +13109097458
      desktopNotification: true,
      source: "1", // optional, WEB(1),DESKTOP_BROWSER(5), MOBILE_BROWSER(6)
      notificationIconLink: "https://www.applozic.com/favicon.ico", // Icon to show in desktop notification, replace with your icon
      authenticationTypeId: 1, // 1 for password verification from Applozic server and 0 for access Token verification from your server
      locShare: true, // to enable location sharing
      googleApiKey: "AIzaSyDKfWHzu9X7Z2hByeW4RRFJrD9SizOzZt4", // your project google api key
      unreadCountOnchatLauncher: true, // if true, will show unread count on chat widget
      googleMapScriptLoaded: false, // true if your app already loaded google maps script
      mapStaticAPIkey: "AIzaSyCWRScTDtbt8tlXDr6hiceCsU83aS2UuZw",
      autoTypeSearchEnabled: true, // set to false if you don't want to allow sending message to user who is not in the contact list
      loadOwnContacts: true, // set to true if you want to populate your own contact list (see Step 4 for reference)
      olStatus: false, // set to true for displaying a green dot in chat screen for users who are online
      onInit(response, data) {
        if (response === "success") {
          addUserToGroup(user.id); // add user to default group (makers)

          document
            .getElementById("mck-sidebox-launcher")
            .addEventListener("click", (event) => {
              document.getElementById("mck-sidebox").style.visibility =
                "visible";
              //   that.setState({ tabClickCount: that.state.tabClickCount + 1 });
              //   if (that.props.applozicMsgCount < 10) {
              //     document.getElementById('mck-sidebox').style.visibility = 'visible';
              //     that.props.dispatch(addApplozicCountRequest());
              //   } else if (that.props.studio.licenseType === 'team-plan' && that.props.applozicMsgCount < 50) {
              //     document.getElementById('mck-sidebox').style.visibility = 'visible';
              //     that.props.dispatch(addApplozicCountRequest());
              //   } else if (that.props.studio.licenseType === 'pro-plan' && that.props.applozicMsgCount < 75) {
              //     document.getElementById('mck-sidebox').style.visibility = 'visible';
              //     that.props.dispatch(addApplozicCountRequest());
              //   } else if (that.props.studio.licenseType === 'enterprise-plan' && that.props.applozicMsgCount < 175) {
              //     document.getElementById('mck-sidebox').style.visibility = 'visible';
              //     that.props.dispatch(addApplozicCountRequest());
              //   } else {
              //     that.props.dispatch(addApplozicCountRequest());
              //     document.getElementById('mck-sidebox').style.visibility = 'hidden';
              //     that.props.dispatch(openExceedLimit({ message: 'You have reached your message limit.' }));
              //   }
              // }
              event.preventDefault();
            });
          if (window.innerWidth <= 1150) {
            const calcRight = () =>
              (document.querySelector(".mck-sidebox-launcher").style.right = `${
                window.innerWidth -
                document.querySelector("#offsetterMsg").getBoundingClientRect()
                  .right -
                10
              }px`);
            calcRight();
            document.querySelector(".mck-sidebox-launcher").style.visibility =
              "visible";
            window.onresize = function (event) {
              calcRight();
            };
          }
        } else {
        }
      },
      contactDisplayName(otherUserId) {
        return "";
      },
      contactDisplayImage(otherUserId) {
        return "";
      },
      onTabClicked(response) {},
    });
  };
  handleStep = (value) => {
    this.setState({ step: value });
  };

  render() {
    const ismobile = window.innerWidth <= 1150;
    const { children, location } = this.props;
    const page = cloneElement(children, {
      win: this.state.window,
      doc: this.state.document,
    });

    return (
      <div className={s.root}>
        <Helmet
          titleTemplate="%s - Gamesmith"
          defaultTitle="Gamesmith"
          meta={[{ name: "description", content: "The Place for Game Makers" }]}
        />
        {this.props.location.pathname === "/signup" ? (
          <div>
            <Header location={location} step={this.state.step} />
            <SideNav />
            <SignUp handleStep={this.handleStep} />
          </div>
        ) : (
          <div>
            <Header location={location} />
            <SideNav />
            {page}
          </div>
        )}
        {ismobile ? (
          <Footer location={location} />
        ) : (
          this.props.location.pathname === "/" && <Footer location={location} />
        )}
        <Modals location={location} params={this.props.params} />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  checkCategories: PropTypes.func,
  onJwtTokenRequest: PropTypes.func,
  onStudioRequest: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    authenticated: selectAuth(),
    applozicMsgCount: applozicMsgCount(),
    studio: selectStudio(),
  }),
  (dispatch) => ({
    dispatch,
    onStudioRequest: (id) => dispatch(getRecruiterStudioRequest(id)),
    onJwtTokenRequest: (id) => dispatch(getJwtTokenRequest(id)),
  })
)(App);
