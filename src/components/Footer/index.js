/*
 * Footer component
 */

import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";
import logo from "../../containers/Header/svg/GS_ID_Lockup.svg";
import s from "./styles.module.scss";
import { checkAuthToken } from "../../utils";

import img0 from "data/icons/new_mobile_footer_icons/one.png";
import img1 from "data/icons/new_mobile_footer_icons/two.png";
import img2 from "data/icons/new_mobile_footer_icons/three.png";
import img3 from "data/icons/new_mobile_footer_icons/four.png";
import img4 from "data/icons/new_mobile_footer_icons/five.png";

const ismobile = window.innerWidth <= 1150;

const SVGFiller = (props) => (
  <div className={s.footer_filler} style={{ margin: "auto" }}>
    <div className={s.toBlock}>
      <Link to="/home">
        <img
          className="buttonMobileMenu"
          onClick={(e) => (toggleMenuButtons(), (e.target.style.filter = ""))}
          style={
            window.location.pathname.indexOf("home") != -1
              ? {}
              : { filter: "brightness(0) invert(1)" }
          }
          src={img0}
          alt="1"
        />
      </Link>
      <font>Home</font>
    </div>

    <div className={s.toBlock}>
      <Link to="/games">
        <img
          className="buttonMobileMenu"
          onClick={(e) => (toggleMenuButtons(), (e.target.style.filter = ""))}
          style={
            window.location.pathname.indexOf("games") != -1
              ? {}
              : { filter: "brightness(0) invert(1)" }
          }
          src={img1}
          alt="1"
        />
      </Link>
      <font>Games</font>
    </div>

    <div className={s.toBlock}>
      <Link to="/makers">
        <img
          className="buttonMobileMenu"
          onClick={(e) => (toggleMenuButtons(), (e.target.style.filter = ""))}
          style={
            window.location.pathname.indexOf("makers") != -1
              ? {}
              : { filter: "brightness(0) invert(1)" }
          }
          src={img2}
          alt="1"
        />
      </Link>
      <font>Makers</font>
    </div>

    <div className={s.toBlock}>
      <Link to="/jobs">
        <img
          className="buttonMobileMenu"
          onClick={(e) => (toggleMenuButtons(), (e.target.style.filter = ""))}
          style={
            window.location.pathname.indexOf("job") != -1
              ? {}
              : { filter: "brightness(0) invert(1)" }
          }
          src={img3}
          alt="1"
        />
      </Link>
      <font>Jobs</font>
    </div>

    <div className={s.toBlock}>
      <Link to="/maker/me">
        <img
          className="buttonMobileMenu"
          onClick={(e) => (toggleMenuButtons(), (e.target.style.filter = ""))}
          style={
            window.location.pathname.indexOf("maker/me") != -1
              ? {}
              : { filter: "brightness(0) invert(1)" }
          }
          src={img4}
          alt="1"
        />
      </Link>
      <font>My Profile</font>
    </div>

    <div className={s.toBlock} style={{ visibility: "hidden" }}>
      <Link to="/maker/me">
        <img
          id="offsetterMsg"
          className="buttonMobileMenu"
          onClick={(e) => (toggleMenuButtons(), (e.target.style.filter = ""))}
          style={
            window.location.pathname.indexOf("maker/me") != -1
              ? {}
              : { filter: "brightness(0) invert(1)" }
          }
          src={img4}
          alt="1"
        />
      </Link>
      <font>My Profile</font>
    </div>
  </div>
);

const toggleMenuButtons = (props) => {
  const all = document.querySelectorAll(".buttonMobileMenu");
  all.forEach((i) => {
    i.style.filter = "brightness(0) invert(1)";
  });
};
const Footer = ({ location }) => (
  <div>
    {!checkAuthToken() ? (
      <div className={s.bottomBar}>
        <SVGFiller />
      </div>
    ) : (
      <div className={s.bottomBar}>
        <SVGFiller />
      </div>
    )}
    {window.location.pathname !== "/home" ? (
      checkAuthToken() ? (
        <footer style={ismobile ? { display: "none" } : {}} className={s.root}>
          <div className={s.flexItem}>
            <div>
              <img
                className={s.logo}
                src={logo}
                alt=""
                style={
                  window.innerWidth > 768
                    ? { marginTop: "-2.4rem" }
                    : { marginTop: "1.6rem" }
                }
              />
            </div>
            <p>
              Gamesmith is a discovery platform focused on showcasing the top
              tier of the industry talent working across the games spectrum.
            </p>
          </div>
          <div className={s.flexItem}>
            <h3>Helpful links</h3>
            <div className={s.helpfulLinks}>
              <div className={s.linkContOne}>
                <li>
                  <Link to="about"> About</Link>
                </li>
                <li>
                  <Link to="games">Games</Link>
                </li>
                <li>
                  <Link to="makers">Makers</Link>
                </li>
                <li>
                  <Link to="studios"> Studios</Link>
                </li>
                <li>
                  <Link to="jobs">Jobs</Link>
                </li>
                <li>
                  <a href="http://devmap.gamesmith.com/" target="_blank">
                    Game Dev Map
                  </a>
                </li>
                <li>
                  <a
                    href="http://devmap.gamesmith.com/?view=university"
                    target="_blank"
                  >
                    Education Map
                  </a>
                </li>
              </div>
              <div className={s.linkContOne}>
                <li>
                  <Link className={s.links} to="vfx">
                    VFX/CG
                  </Link>
                </li>
                <li>
                  <Link to="ecosystem">Ecosystem</Link>
                </li>

                <li>
                  <Link to="salaryCalculator">Salary Calculator</Link>
                </li>

                <li>
                  <Link to="/terms">Terms & Privacy</Link>
                </li>

                <li>
                  <Link to="/faqs">FAQ</Link>
                </li>

                <li>
                  <a href="https://gamesmith-57813a.easywp.com/" target="blank">
                    Blog
                  </a>
                </li>
              </div>
            </div>
          </div>
          <div className={s.flexItem}>
            <h3>Contact Us</h3>
            <p>
              Sales:{" "}
              <a
                href="mailto:sales@gamesmith.com"
                className={s.socialMediaLinks}
              >
                sales@gamesmith.com
              </a>
            </p>
            <p>
              Support:{" "}
              <a
                href="mailto:support@gamesmith.com"
                className={s.socialMediaLinks}
              >
                support@gamesmith.com
              </a>
            </p>
            <div>
              <span style={{ margin: "0.3rem" }}>
                <a
                  href="https://www.facebook.com/gamesmithinc/"
                  target="_blank"
                >
                  <i className={`fa fa-facebook ${s.socialMediaLinks}`} />
                </a>
              </span>
              <span style={{ margin: "0.3rem" }}>
                <a
                  href="https://www.instagram.com/gamesmith.inc/"
                  target="_blank"
                >
                  <i className={`fa fa-instagram ${s.socialMediaLinks}`} />
                </a>
              </span>
              <span style={{ margin: "0.3rem" }}>
                <a href="https://twitter.com/GameSmith_Inc" target="_blank">
                  <i className={`fa fa-twitter ${s.socialMediaLinks}`} />
                </a>
              </span>
              <span style={{ margin: "0.3rem" }}>
                <a
                  href="https://www.linkedin.com/company/gamesmith"
                  target="_blank"
                >
                  <i className={`fa fa-linkedin ${s.socialMediaLinks}`} />
                </a>
              </span>
              <span style={{ margin: "0.3rem" }}>
                <a
                  href="https://www.youtube.com/channel/UCsYIuWcHg5MhgNKyGBIjSsg"
                  target="_blank"
                >
                  <i className={`fa fa-youtube ${s.socialMediaLinks}`} />
                </a>
              </span>
              <span style={{ margin: "0.3rem" }}>
                <a href="https://discord.gg/444DwQe" target="_blank">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="discord"
                    className={`svg-inline--fa fa-discord fa-w-14  ${s.discordIcon}`}
                    role="img"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z"
                    ></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </footer>
      ) : (
        <footer style={ismobile ? { display: "none" } : {}} className={s.root}>
          <br />
          <br />
          <div className={s.flexItem}>
            <div>
              <img
                className={s.logo}
                src={logo}
                alt=""
                style={{ marginTop: "-2rem" }}
              />
            </div>
            <p>
              Gamesmith is a discovery platform focused on showcasing the top
              tier of the industry talent working across the games spectrum.
            </p>
          </div>
          <div className={s.flexItem_nonsecure}>
            <h3>Helpful links</h3>
            <div className={s.helpfulLinks}>
              <div>
                <li>
                  <Link to="jobs"><font color='white'>Jobs</font></Link>
                </li>
                <li>
                  <a href="http://devmap.gamesmith.com/" target="_blank">
                    <font color='white'>Dev Map</font>
                  </a>
                </li>
                <li>
                  <Link to="/faqs"><font color='white'>FAQ</font></Link>
                </li>
                <li>
                  <a href="https://gamesmith-57813a.easywp.com/" target="blank">
                    <font color='white'>Blog</font>
                  </a>
                </li>
                <li>
                  <Link to="/terms">
                    <font color='white'>
                    Terms & Privacy
                    </font>
                    </Link>
                </li>
              </div>
            </div>
          </div>
          <div className={s.flexItem} style={{ marginTop: "-0.6rem" }}>
            <h3>Contact us</h3>
            <p>
              Sales:{" "}
              <a
                href="mailto:sales@gamesmith.com"
                className={s.socialMediaLinks}
              >
                sales@gamesmith.com
              </a>
            </p>
            <p>
              Support:{" "}
              <a
                href="mailto:support@gamesmith.com"
                className={s.socialMediaLinks}
              >
                support@gamesmith.com
              </a>
            </p>
            <div>
              <span style={{ margin: "0.3rem" }}>
                <a
                  href="https://www.facebook.com/gamesmithinc/"
                  target="_blank"
                >
                  <i className={`fa fa-facebook ${s.socialMediaLinks}`} />
                </a>
              </span>
              <span style={{ margin: "0.3rem" }}>
                <a
                  href="https://www.instagram.com/gamesmith.inc/"
                  target="_blank"
                >
                  <i className={`fa fa-instagram ${s.socialMediaLinks}`} />
                </a>
              </span>
              <span style={{ margin: "0.3rem" }}>
                <a href="https://twitter.com/GameSmith_Inc" target="_blank">
                  <i className={`fa fa-twitter ${s.socialMediaLinks}`} />
                </a>
              </span>
              <span style={{ margin: "0.3rem" }}>
                <a
                  href="https://www.linkedin.com/company/gamesmith"
                  target="_blank"
                >
                  <i className={`fa fa-linkedin ${s.socialMediaLinks}`} />
                </a>
              </span>
              <span style={{ margin: "0.3rem" }}>
                <a
                  href="https://www.youtube.com/channel/UCsYIuWcHg5MhgNKyGBIjSsg"
                  target="_blank"
                >
                  <i className={`fa fa-youtube ${s.socialMediaLinks}`} />
                </a>
              </span>
              <span style={{ margin: "0.3rem" }}>
                <a href="https://discord.gg/444DwQe" target="_blank">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="discord"
                    className={`svg-inline--fa fa-discord fa-w-14  ${s.discordIcon}`}
                    role="img"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z"
                    ></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </footer>
      )
    ) : null}
    {window.location.pathname !== "/home" && (
      <div className={s.btmText}>
        <p>&copy; {new Date().getFullYear()} Gamesmith. All Rights Reserved</p>
      </div>
    )}
  </div>
);
Footer.propTypes = {
  location: PropTypes.object.isRequired,
};
export default Footer;
