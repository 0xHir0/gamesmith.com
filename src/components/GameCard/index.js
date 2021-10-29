/*
 * Game card
 */

import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";
import { checkAuthToken } from "../../utils";

import Button from "components/UI/Button";
import Avatar from "components/UI/Avatar";
import ReactTooltip from "react-tooltip";
import icon from "data/icons/add-users-interface.png";
import editExpIcon from "data/icons/edit-experience-icon.png";
import star from "data/icons/star.png";
import trophy from "../../data/icons/awards_icons/trophy.png"
import s from "./styles.module.scss";
import { push } from "react-router-redux";
import { filterAwards } from "../../utils"
function verifyTeam(gameId, title) {
  localStorage.setItem("gameId", gameId);
  localStorage.setItem("gameTitle", title);
  window.location.replace("/networking?");
}
const GameCard = ({
  gameID,
  title,
  width,
  makerCount,
  makers,
  studio,
  imageSm = "",
  imageLg = "",
  bgdImage = "",
  userID,
  isMakersGame,
  onSignIn,
  isMaker,
  onAddExp,
  searchQuery,
  onDeleteExp,
  onGetExperience,
  handleRedirect,
  awards
}) => {
  // maximum number of makers to display based on layout style
  const MAX = width < 707 ? 4 : 6;
  let makersWrapper;
  let button;
  let awardsWrapper;
  if (isMakersGame) {
    button = (
      <div className={s.buttons}>
        <Button
          onClick={() =>
            checkAuthToken() ? onGetExperience(userID, gameID) : onSignIn()
          }
          className={s.editExpButton}
          text="Edit Experience"
          icon={editExpIcon}
        />
        <Button
          text="Verify Team"
          className={s.editExpButton}
          icon={star}
          onClick={() =>
            checkAuthToken() ? verifyTeam(gameID, title) : onSignIn()
          }
        />
      </div>
    );
  } else {
    button = (
      <Button
        onClick={() =>
          checkAuthToken()
            ? onAddExp(title, studio, false, searchQuery)
            : onSignIn()
        }
        className={s.joinButton}
        text="Join Team"
        icon={icon}
      />
    );
  }

  if (makers) {
    makersWrapper = (
      <div className={s.makers}>
        {makers.map(
          (m, idx) =>
            idx < MAX && (
              <Avatar
                key={idx}
                className={s.avatar}
                image={m.imgUrl}
                firstName={m.firstName}
                lastName={m.lastName}
                linkTo={`maker/${m.id}`}
                handleRedirect={handleRedirect}
              />
            )
        )}
        {makerCount && makers && makerCount > makers.length && (
          <p className={s.more}>and {makerCount - makers.length} more</p>
        )}
      </div>
    );
  }

  if (awards) {
    let filteredAwards = filterAwards(awards)
    awardsWrapper =
      filteredAwards.length ? (
        <span className={`${s.awards}`}>
          <img className={s.trophy} src={trophy} alt="icon" />
          {filteredAwards.length > 1 ? (
            <small>{filteredAwards.length} awards</small>
          ) : (
            <small> 1 award </small>
          )}
        </span>) : (
        null
      )
  }
  return (
    <div className={s.root}>
      <div className={s.overlay}></div>
      <div
        className={s.content}
        style={{
          backgroundImage: bgdImage
            ? `url(${bgdImage})`
            : `url('${
                width <= 707
                  ? imageSm.replace(/^http:\/\//i, "https://")
                  : imageLg.replace(/^http:\/\//i, "https://")
              }')`,
        }}
      >
        <div className={s.info}>
          <div className={s.gameTitle}>
            <Link to={`/game/${gameID}`}>
              <h1>{title}</h1>
              {width >= 520 && awardsWrapper}
            </Link>
            {isMaker && (
              <div
                className={s.gameButton}
                data-tip={
                  isMakersGame
                    ? "Remove this game from my profile"
                    : "Add this game to my profile"
                }
                onClick={() =>
                  isMakersGame
                    ? onDeleteExp(gameID, title, searchQuery)
                    : onAddExp(title, studio, false, searchQuery)
                }
              >
                <ReactTooltip place="top" type="light" effect="solid" />
              </div>
            )}
          </div>
          {makersWrapper}
          {width < 519 && awardsWrapper}
        </div>
        {isMaker ? button : !!userID ? "" : button}
      </div>
      <a href={`/game/${gameID}`}>
        <button>
          <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png' />
        </button>
      </a>
    </div>
  );
};

GameCard.propTypes = {
  gameID: PropTypes.number.isRequired,
  userID: PropTypes.number,
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  studio: PropTypes.string,
  makers: PropTypes.array,
  makerCount: PropTypes.number,
  imageSm: PropTypes.string,
  imageLg: PropTypes.string,
  isMakersGame: PropTypes.bool.isRequired,
  isMaker: PropTypes.bool.isRequired,
  onAddExp: PropTypes.func.isRequired,
  onDeleteExp: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onGetExperience: PropTypes.func.isRequired,
  awards: PropTypes.array
};

export default GameCard;
