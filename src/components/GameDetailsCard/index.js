/*
 * Game Details card
 */

import React from "react";
import PropTypes from "prop-types";
import Tippy from '@tippyjs/react';
import { roundArrow } from "tippy.js"
import 'tippy.js/dist/svg-arrow.css';
import { Link } from "react-router";
import moment from "moment";
import Button from "components/UI/Button";
import GameCreditInfoCard from "components/GameCreditInfoCard";
import s from "./styles.module.scss";
import ReactTooltip from "react-tooltip";
import verifyIconNew from "../../data/icons/verifyIcon.png";
import verifiedIconNew from "../../data/icons/verifiedIconNew.png";
import { checkAuthToken, filterAwards } from "../../utils";
import trophy from "../../data/icons/awards_icons/trophy.png"

// New platform Icons
import android from "../../data/icons/platform_icons_new/android-logo.png";
import apple from "../../data/icons/platform_icons_new/apple-big-logo.png";
import augmentedReality from "../../data/icons/platform_icons_new/augmented-reality.png";
import googleStadia from "../../data/icons/platform_icons_new/Google-Stadia.png";
import switchIco from "../../data/icons/platform_icons_new/nintendo-switch.png";
import virtualreality from "../../data/icons/platform_icons_new/virtual-reality.png";
import browser from "../../data/icons/platform_icons_new/web .png";
import windows from "../../data/icons/platform_icons_new/windows-logo-silhouette.png";
import xbox from "../../data/icons/platform_icons_new/xbox.png";
import playstation from "../../data/icons/platform_icons_new/icon.png";
import { BACKEND_RAIL } from "utils/index";
// For New Platform Icons
const getIcon = (icon) => {
  switch (icon) {
    case "windows":
      return windows;
    case "playstation":
      return playstation;
    case "xbox":
      return xbox;
    case "switch":
      return switchIco;
    case "browser":
      return browser;
    case "android":
      return android;
    case "ios":
      return apple;
    case "ar":
      return augmentedReality;
    case "vr":
      return virtualreality;
    case "google-stadia":
      return googleStadia;
  }
};

class GameDetailsCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      largeBgImg: this.props.imageLg,
    };
  }

  animateButton = (event, id) => {
    event.preventDefault();
    document.getElementById(id).classList.remove(s.animate);
    document.getElementById(id).classList.add(s.animate);
    setTimeout(() => {
      document.getElementById(id).classList.remove(s.animate);
    }, 500);
  };

  componentDidMount() {
    if (this.props.gameID) {
      fetch(`${BACKEND_RAIL}/games/get_game_data?id=${this.props.gameID}`)
        .then((r) => r.json())
        .then((data) => {
          const bUrl = data.data[0].game_card_art;

          if (bUrl) this.setState(() => ({ largeBgImg: bUrl }));
        });
    }
  }

  render() {
    const {
      user,
      gameID,
      makerName,
      title,
      endDate,
      studio = "",
      image = "",
      location = "",
      platforms = "",
      isRealUser,
      onEditExp,
      onDeleteExp,
      makerID,
      userID,
      onInvite,
      onVerifyCredit,
      credit,
      onUnverifyCredit,
      onDispute,
      disputed,
      creditID,
      verified,
      timesVerfied,
      imageLg = "",
      imageSm = "",
      width,
      startDate,
      underNda,
      renderMoreCreditInfo,
      makerSkills,
      currRole,
      onSignIn,
      openGetVerified,
      awards
    } = this.props;
    const MAX = width < 767 ? 4 : 6;
    const platformList = platforms.map((p) => getIcon(p.displayName));
//    const verifyIcon = <i className={`icon-star ${s.verifyBlack}`} />;
    const verifyIcon = <span className={s.verified}> &#x2605;</span>;
    // const disputeIcon = disputed ? <i className={`fa-exclamation-circle fa ${s.verifyCheck}`}/> : <i className={`fa-caret-down fa ${s.verifyCheck}  ${s.disputedColor}`}/>;
    const disputeIcon = disputed ? (
      <i className={`fa-exclamation-circle fa ${s.verifyCheck}`} />
    ) : (
      <i className={`fa fa-flag fa-xl ${s.verifyCheck}  ${s.disputedColor}`} />
    );
    let filteredAwards;
   // console.log("Este es ",awards)
    if (awards) {
      filteredAwards = filterAwards(awards)
    }

    return (
      <div>
        <div className={s.root}>
          <Link>
            <div className={s.overlay}></div>
            <div
              className={s.content}
              style={{
                backgroundImage: `url('${
                  width < 767
                  ? imageSm.replace(/^http:\/\//i, "https://")
                  : this.state.largeBgImg.replace(/^http:\/\//i, "https://")
                }')`,
              }}
              >
              <div className={`${s.title}`}>
                <h1>
                  <Link to={`/game/${gameID}`} className={s.anchor}>
                    {title}
                  </Link>
                  {makerID !== userID ? (
                    <span
                      className={`${s.marginLeft} ${s.verifyIconSize} ${s.verifyColor}`}
                    >
                      {`(${timesVerfied}`}
                      {/* <font color='yellow' style={{paddingLeft: '5px', fontSize: '15px'}}>⋆</font> */}
                      <i className="fas fa-star" style={{fontSize: '13px', color: 'yellow',marginTop:'0px', marginLeft: '5px', marginRight: 0}}></i>
                  )
                    </span>
                  ): <span className={`${s.marginLeft} ${s.verifyIconSize} ${s.verifyColor}`}>{`(${timesVerfied}`} 
                   <i className="fas fa-star" style={{ textAlign:'center', fontSize: '13px',color: 'yellow', paddingBottom:'0px',marginLeft: '5px', marginRight: 0}}></i>
                  )</span>}
                  
                  {filteredAwards.length?  filteredAwards.map(award => {
                    console.log(gameID)
                    if (award.gameId === gameID) {
                      return (
                        <Tippy arrow={roundArrow} interactive={true} className={s.awards} content={<span>{award.vendor} | {award.category} {award.year}</span>} >
                          <img className={s.trophy} src={trophy} alt="icon" />
                        </Tippy>
                      )}}
                  ): ''}
                  {!!userID &&
                    width > 768 &&
                    makerID !== userID &&
                    !disputed && (
                      <span className={`${s.verifyButtonVerification}`}></span>
                    )}
                </h1>

                {!!userID &&
                  width > 768 &&
                  makerID !== userID &&
                  !disputed &&
                  !user.recruiter && (
                    <div>
                      <Button
                        id={`bubbly${gameID}`}
                        style={{ lineHeight: "17px" }}
                        className={`${s.verifyButtonNew} ${s.bubblyButton}`}
                        icon={verified ? verifiedIconNew : verifyIconNew}
                        onClick={(event) => {
                          this.animateButton(event, `bubbly${gameID}`);
                          checkAuthToken()
                            ? isRealUser
                              ? verified
                                ? onUnverifyCredit(creditID, makerID)
                                : onVerifyCredit("yes", creditID, makerID)
                              : onInvite(makerID)
                            : onSignIn();
                        }}
                        text={verified ? "Unverify" : "Verify"}
                      />
                    </div>
                  )}
                {userID &&
                  width > 768 &&
                  makerID === userID &&
                  !disputed &&
                  !user.recruiter && (
                    <div>
                      <Button
                        style={{ lineHeight: "17px" }}
                        className={s.get_verify_btn}
                        onClick={() =>
                          checkAuthToken()
                            ? isRealUser
                              ? verified
                                ? onUnverifyCredit(creditID, makerID)
                                : openGetVerified({
                                    option: "yes",
                                    creditID,
                                    makerID,
                                    gameID,
                                    title,
                                    makerName,
                                  })
                              : onInvite(makerID)
                            : onSignIn()
                        }
                        text={verified ? "Verified" : "Get Verified"}
                      />
                    </div>
                  )}
                {disputed
                  ? ""
                  : width > 870 &&
                    makerID !== userID &&
                    !verified &&
                    user.maker && (
                      <div
                        className={`${s.verifyButton} ${s.disputeFontSize} ${s.pullRight}`}
                        data-tip="Dispute Game Credit"
                        onClick={() =>
                          !!userID && checkAuthToken()
                            ? isRealUser
                              ? onDispute(
                                  creditID,
                                  makerID,
                                  title,
                                  studio,
                                  makerName
                                )
                              : onInvite(makerID)
                            : onSignIn()
                        }
                      >
                        {disputeIcon}
                      </div>
                    )}
              </div>
              {studio && <p>{studio}</p>}
              {platforms && (
                <div className={s.platforms}>
                  {platforms.map((p, idx) => (
                    <img
                      data-tip={p.displayName.toUpperCase()}
                      alt="icon"
                      key={idx}
                      className={s.platform}
                      src={`${getIcon(p.displayName)}`}
                    />
                  ))}
                </div>
              )}
              <div className={s.buttonsContainer}>
                {makerID === userID && (
                  <Button
                    to="/maker/me"
                    onClick={() =>
                      checkAuthToken() ? onEditExp(credit) : onSignIn()
                    }
                    className={s.buttonerEdit}
                    text="Edit"
                    color="transparent"
                  />
                )}
                {makerID === userID && (
                  <Button
                    to="/maker/me"
                    onClick={() =>
                      checkAuthToken()
                        ? onDeleteExp(creditID, title)
                        : onSignIn()
                    }
                    className={s.buttoner}
                    text="Delete"
                    color="transparent"
                  />
                )}
                {disputed
                  ? ""
                  : width < 870 &&
                    makerID !== userID &&
                    !verified && (
                      <span
                        className={`${s.verifyButton} ${s.disputeFontSize}`}
                        data-tip="Dispute Game Credit"
                        style={{ marginTop: "1rem" }}
                        onClick={() =>
                          checkAuthToken()
                            ? isRealUser
                              ? onDispute(
                                  creditID,
                                  makerID,
                                  title,
                                  studio,
                                  makerName
                                )
                              : onInvite(makerID)
                            : onSignIn()
                        }
                      >
                        {disputeIcon}
                      </span>
                    )}
                {!!userID ||
                  (width < 768 && makerID !== userID && !disputed && (
                    <span
                      className={`${s.verifyButton} ${s.verifyBorder} ${s.badge}`}
                      data-tip={verified ? "Unverify Credit" : "Verify Credit"}
                      onClick={() =>
                        checkAuthToken()
                          ? isRealUser
                            ? verified
                              ? onUnverifyCredit(creditID, makerID)
                              : onVerifyCredit("yes", creditID, makerID)
                            : onInvite(makerID)
                          : onSignIn()
                      }
                    >
                      {verifyIcon} {verified ? "Unverify" : "Verify1"}
                    </span>
                  ))}
                {width <= 767 && (
                  <a
                    id={`moreInfoBtn${creditID}`}
                    onClick={() => renderMoreCreditInfo(creditID)}
                    className={`${s.buttoner} ${s.moreInfoBtn} moreInfoBtn`}
                    color="transparent"
                  >
                    MORE INFORMATION
                  </a>
                )}
              </div>
            </div>
            <div className={s.extra}>
              {startDate && (
                <p className={s.gameCard}>
                  {moment(` ${startDate.year}`, "YYYY").format("YYYY")}
                </p>
              )}
              {endDate && (
                <p className={s.gameCard}>
                  {endDate.year === new Date().getFullYear()
                    ? "Present"
                    : moment(`${endDate.year}`, "YYYY").format("YYYY")}
                </p>
              )}
              {location && (
                <p className={s.location}>
                  {location}
                </p>
              )}
              <a
                id={`moreInfoBtn${creditID}`}
                onClick={() => renderMoreCreditInfo(creditID)}
                className={`${s.buttoner} ${s.moreInfoBtn} moreInfoBtn`}
                color="transparent"
              >
                MORE INFORMATION
              </a>
            </div>
          </Link>
          <ReactTooltip place="top" type="light" effect="float" />
        </div>
        <GameCreditInfoCard
          credit={credit}
          creditId={creditID}
          currRole={currRole}
          makerSkills={makerSkills}
        />
      </div>
    );
  }
}

GameDetailsCard.propTypes = {
  user: PropTypes.object,
  gameID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  platforms: PropTypes.array.isRequired,
  studio: PropTypes.string,
  endDate: PropTypes.object,
  startDate: PropTypes.object,
  image: PropTypes.string,
  location: PropTypes.string,
  onDeleteExp: PropTypes.func,
  onEditExp: PropTypes.func,
  makerID: PropTypes.number,
  userID: PropTypes.number,
  creditID: PropTypes.number,
  onVerifyCredit: PropTypes.func,
  onUnverifyCredit: PropTypes.func,
  onSignIn: PropTypes.func,
  onDispute: PropTypes.func,
  verified: PropTypes.bool,
  underNda: PropTypes.bool,
  isRealUser: PropTypes.bool,
  disputed: PropTypes.bool,
  imageLg: PropTypes.string,
  imageSm: PropTypes.string,
  width: PropTypes.number.isRequired,
  openGetVerified: PropTypes.func,
  makerName: PropTypes.string,
  animateButton: PropTypes.func,
  onInvite: PropTypes.func,
  credit: PropTypes.object,
  timesVerfied: PropTypes.number,
  renderMoreCreditInfo: PropTypes.func,
  currRole: PropTypes.string,
  awards: PropTypes.array
};

export default GameDetailsCard;
