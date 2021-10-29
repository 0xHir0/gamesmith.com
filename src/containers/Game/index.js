/*
 * Game makers container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router";
import { isEmpty, debounce } from "lodash";
import browser from "bowser";
import { checkAuthToken } from "../../utils";
// import people from './img/p.png'
import Button from "components/UI/Button";
import { BACKEND_URL } from "utils/index";
import {
  gameRequest,
  gameInformationRequest,
  gameMakersRequest,
  nextPageRequest,
  gameMakerSearch,
  toggleSearch,
  clearGames,
  makerExpRequest,
} from "./actions";

import { connectRequest } from "containers/App/actions";
import { selectUser } from "containers/App/selectors";

import {
  selectGame,
  selectMaker,
  selectIsFetching,
  selectIsInfoFetching,
  selectIsLastPage,
  selectIsSearching,
  selectSearch,
  selectGameInformation,
} from "./selectors";

import {
  openAddExp,
  openMemberInvite,
  openSignIn,
} from "containers/Modals/actions";

import MakersCard from "components/MakersCard";
import s from "./styles.module.scss";
import addUserIcon from "data/icons/add-user.png";
import joinTeamIcon from "data/icons/join-team.png";
import editExpIcon from "data/icons/pen.png";
import { getGameURLFromId } from "../../utils/hashingFunction";
// import img1 from './img/warconcept.jpg';
//import id from "chai-enzyme/src/assertions/id";
import UsersIcon from "./img/users.png";
import BackgroundArt from "./img/game-art.jpg";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUpdated: false,
      profileImg: false,
      imgCheck: true,
      lastName: [],
      gameIdUrl: this.getGameIdFromUrl(),
      forceRender: false,
    };
  }

  componentDidMount() {
    const {
      params: { gameID },
      onGetGame,
      onGetMakersOfGame,
      isSearching,
      onGetGameInformation,
      dispatch,
    } = this.props;
    if (!isSearching) {
      onGetGame(gameID);
      onGetMakersOfGame(gameID);
      dispatch(onGetGameInformation(gameID));
    }
    window.addEventListener("scroll", this.handleNextPageRequest);
  }

  getGameIdFromUrl() {
    const path = window.location.pathname;
    return path.split("/")[path.split("/").length - 1];
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { game, gameInformation } = this.props;

    if (prevProps.game.id !== game.id || prevProps.gameInformation.developers !== gameInformation.developers) {
      if (
        document.getElementById("gameBg") &&
        gameInformation &&
        this.state.imgCheck
      ) {
        if (gameInformation && gameInformation.backgroundImg) {
          document.getElementById(
            "gameBg"
          ).style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 20%, rgba(0, 0, 0, 1)), url('${gameInformation.backgroundImg}')`;
        } else if (game && game.id && this.state.imgCheck) {
          this.imageExists(
            getGameURLFromId(game.id.toString(), "1920x1080"),
            "imgUpdated"
          );
          this.imageExists(
            getGameURLFromId(game.id.toString(), "550x520"),
            "profileImg"
          );
          document.getElementById(
            "gameBg"
          ).style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 20%, rgba(0, 0, 0, 1)), url('${getGameURLFromId(
            game.id.toString(),
            "1920x1080"
          )}')`;
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleNextPageRequest);
    if (this.props.isSearching) {
      this.props.onToggleSearch();
    }
    this.props.onClearGames();
  }

  handleNextPageRequest = () => {
    const {
      params: { gameID },
      onGetNextPage,
      isFetching,
      isLastPage,
      makers,
      isSearching,
      search,
    } = this.props;
    const query = this.searchInput?.value;
    const url = isSearching ? `searchmember/${gameID}/${query}`
      : checkAuthToken() ? 
      `game/${gameID}/makers`
      : `game/${gameID}/makers`
      // : `game/${gameID}/basicmakers`;
    const offset = isSearching ? search.length : makers.length;
    if (
      (window.innerHeight + this.getScrollYPosition()) /
        document.body.scrollHeight >=
      0.95
    ) {
      !isFetching && !isLastPage && onGetNextPage(url, offset); // eslint-disable-line
    }
  };

  getScrollYPosition = () => {
    const scrollLength =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    return scrollLength;
  };

  handleSearch = debounce(this.props.gameMakerSearch, 300);

  handleRedirect = (path) => {
    if (checkAuthToken()) {
      this.props.history.push(path);
    } else {
      this.props.dispatch(openSignIn());
    }
  };

  imageExists = (imageSrc, type) => {
    console.log("src ::", type);
    var img = new Image();
    img.onload = () => {
      return true;
    };
    img.onerror = () => {
      this.setState({ [type]: true });
      return false;
    };
    this.setState({ imgCheck: false });
    img.src = imageSrc;
  };

  render() {
    const {
      user,
      doc,
      game,
      gameInformation,
      isFetching,
      makers,
      onConnect,
      onMemberInvite,
      onAddExp,
      onGetExperience,
      onSignIn,
      isSearching,
      search,
      onToggleSearch,
      isInfoFetching,
    } = this.props;

    const isJoinedTeam = makers.filter((m) => m.id === user.id);
    const company = user
      ? user.recruiter
        ? user.recruiter.currCompany
        : "Studio Company"
      : "";

    if (document.getElementById("gameBg") && gameInformation) {
      this.state.imgUpdated
        ? (document.getElementById(
            "gameBg"
          ).style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 20%, rgba(0, 0, 0, 1)), url('${BackgroundArt}')`)
        : "";
    }
    return (
      <div role="main" className={s.root}>
        {isInfoFetching && isFetching ? (
          <div style={{ textAlign: "center" }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h3>Loading</h3>
            <div className="loader">
              <div />
              <div />
              <div />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        ) : (
          <div>
            <div className={s.gameInfo}>
              <div className={s.background} id="gameBg">
                <nav className={s.nav}>
                  <Link to="/games" style={{display:'flex', alignItems:'center', justifyContent:'left'}}>
                  <font color='#f8e81c' style={{fontSize: '20px', marginRight: "10px",}}>←</font>
                   Back to Games
                  </Link>
                </nav>
                {gameInformation && gameInformation.boxArt ? (
                  <img
                    className={s.profileImage}
                    src={gameInformation.boxArt}
                    alt={"Game Image"}
                  />
                ) : gameInformation && gameInformation.backgroundImg ? (
                  <img
                    className={s.profileImage}
                    src={gameInformation.backgroundImg}
                    alt={"Game Image"}
                  />
                ) : !this.state.profileImg && game && game.id ? (
                  <img
                    className={s.profileImage}
                    src={getGameURLFromId(game.id.toString(), "550x520")}
                    alt={"Game Image"}
                  />
                ) : (
                  ""
                )}
                {
                  <div className={s.top}>
                    <h3>{game.name || ""}</h3>
                    <div className={s.btnBox}>
                      {/*{!isFetching && ((isEmpty(isJoinedTeam) && user.maker) || isEmpty(user)) && <Button className={browser && browser.safari ? `${s.joinButton} ${s.only_safari}` : `${s.joinButton} ${s.except_safari}`} text="Join Team" color="transparent" icon={joinTeamIcon} onClick={() => checkAuthToken() ? onAddExp(game.name, game.makers.currCompany, false, '') : onSignIn()} />}*/}
                      {!isFetching && !isEmpty(isJoinedTeam) && user.maker && (
                        <Button
                          onClick={() =>
                            checkAuthToken()
                              ? onGetExperience(user.id, game.id)
                              : onSignIn()
                          }
                          className={
                            browser && browser.safari
                              ? `${s.addUserButton} ${s.only_safari}`
                              : `${s.addUserButton} ${s.except_safari}`
                          }
                          color="transparent"
                          text="Edit Experience"
                          icon={editExpIcon}
                        />
                      )}
                      {user &&
                        user.maker &&
                        isEmpty(isJoinedTeam) &&
                        !isFetching && (
                          <Button
                            className={
                              browser && browser.safari
                                ? `${s.joinButton} ${s.only_safari}`
                                : `${s.joinButton} ${s.except_safari}`
                            }
                            text="Join Team"
                            color="transparent"
                            icon={joinTeamIcon}
                            onClick={() =>
                              checkAuthToken()
                                ? onAddExp(
                                    game.name,
                                    game.makers.currCompany,
                                    false,
                                    ""
                                  )
                                : onSignIn()
                            }
                          />
                        )}
                      {user && user.maker && !isFetching && (
                        <Button
                          className={
                            browser && browser.safari
                              ? `${s.addUserButton} ${s.only_safari}`
                              : `${s.addUserButton} ${s.except_safari}`
                          }
                          text="Invite Member"
                          color="transparent"
                          icon={addUserIcon}
                          onClick={() =>
                            checkAuthToken()
                              ? onMemberInvite(
                                  user.id,
                                  game.id,
                                  game.name,
                                  company
                                )
                              : onSignIn()
                          }
                        />
                      )}
                    </div>
                    <div className={s.searchBox}>
                      <hr className={s.hr}></hr>
                      <div className={s.search}>
                        <input
                          type="text"
                          placeholder="Search for team member"
                          onChange={(e) => {
                            if (checkAuthToken()) {
                              this.handleSearch(e.target.value, game.id);
                              !isSearching ? onToggleSearch() : "";
                            } else {
                              this.props.dispatch(openSignIn());
                            }
                          }}
                          ref={(input) => (this.searchInput = input)}
                        />
                        <i className="icon-search" />
                      </div>
                      <hr className={s.hr}></hr>
                    </div>
                    {gameInformation && gameInformation.isIgdbArt && (
                      <div className={s.infoBox}>
                        <div className={s.info}>
                          <h4 className={s.infoH}>Information</h4>
                          <ul>
                            {gameInformation && gameInformation.developers && (
                              <li>
                                <span className={s.infoKey}>Developers: </span>
                                <span className={s.infoText}>
                                  {gameInformation.developers}
                                </span>
                              </li>
                            )}
                            {gameInformation && gameInformation.publisher && (
                              <li>
                                <span className={s.infoKey}>Publishers: </span>
                                <span className={s.infoText}>
                                  {gameInformation.publisher}
                                </span>
                              </li>
                            )}
                            {gameInformation &&
                              gameInformation.genres &&
                              !isEmpty(gameInformation.genres) && (
                                <li>
                                  <span className={s.infoKey}>Genres: </span>
                                  <span className={s.infoText}>
                                    {gameInformation.genres}
                                  </span>
                                </li>
                              )}
                            {gameInformation && gameInformation.ReleaseDate && (
                              <li>
                                <span className={s.infoKey}>
                                  Release Date:{" "}
                                </span>
                                <span className={s.infoText}>
                                  {new Date(
                                    parseInt(gameInformation.ReleaseDate) * 1000
                                  ).toDateString()}
                                </span>
                              </li>
                            )}
                            {gameInformation && gameInformation.platform && (
                              <li>
                                <span className={s.infoKey}>Platforms: </span>
                                <span className={s.infoText}>
                                  {gameInformation.platform}
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className={s.rating}>
                          <div>
                            {gameInformation && gameInformation.rating > 0 && (
                              <div className={s.badge}>
                                <p className={s.badgeVal}>
                                  {gameInformation &&
                                    gameInformation.rating &&
                                    parseInt(gameInformation.rating)}
                                </p>
                              </div>
                            )}
                            {gameInformation &&
                              gameInformation.ratingCritics > 0 && (
                                <div className={s.ratingCount}>
                                  Based on{" "}
                                  {gameInformation &&
                                    gameInformation.ratingCritics &&
                                    gameInformation.ratingCritics}{" "}
                                  critics rating
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                }
              </div>
              {gameInformation && gameInformation.isIgdbArt && (
                <hr className={s.line}></hr>
              )}
              {<br />}
              <div className={s.count}>
                <img className={s.people} src={UsersIcon} alt="icon" />{" "}
                {gameInformation && gameInformation.totalDev
                  ? gameInformation.totalDev
                  : "2534"}{" "}
                people helped create this game
              </div>
            </div>
            <div className={s.makers}>
              {console.log('here', makers)}
              {checkAuthToken() ? (isSearching ? search : makers).map((m, idx) => {
                    return (
                      <MakersCard
                        jobFamilyName={m.jobFamilyName}
                        user={user}
                        key={idx}
                        id={m.id}
                        currID={!isEmpty(user) ? user.id : -1}
                        awards={m.awards}
                        avatar={m.imgUrl}
                        lastName={m.lastName}
                        firstName={m.firstName}
                        width={doc.width}
                        currRole={m.currRole}
                        currGame={m.currGame}
                        currCompany={m.currCompany}
                        isSubscribe={
                          m.additionalInfo &&
                          m.additionalInfo.length > 0 &&
                          m.additionalInfo[0]
                            ? m.additionalInfo[0]["isSubscribe"]
                            : false
                        }
                        connection={
                          m.connected
                            ? "yes"
                            : m.connectPending
                            ? "pending"
                            : "no"
                        }
                        claimed={m.claimed}
                        onConnect={onConnect}
                        page="game"
                        location={m.location}
                        workCategories={m.workCategories}
                        gameID={game.id}
                        latestGameId={
                          m.additionalInfo && m.additionalInfo[0].latestGameId
                        }
                        imageSm={
                          m.additionalInfo
                            ? m.additionalInfo[0].latestGameId
                              ? getGameURLFromId(
                                  m.additionalInfo[0].latestGameId.toString(),
                                  "550x740"
                                ).replace(/^http:\/\//i, "https://")
                              : getGameURLFromId(
                                  Math.floor(
                                    Math.random() * 3000 + 0
                                  ).toString(),
                                  "550x740"
                                ).replace(/^http:\/\//i, "https://")
                            : null
                        }
                        imageLg={
                          m.additionalInfo
                            ? m.additionalInfo[0].latestGameId
                              ? getGameURLFromId(
                                  m.additionalInfo[0].latestGameId.toString(),
                                  "1500x400"
                                ).replace(/^http:\/\//i, "https://")
                              : getGameURLFromId(
                                  Math.floor(
                                    Math.random() * 3000 + 0
                                  ).toString(),
                                  "550x740"
                                ).replace(/^http:\/\//i, "https://")
                            : null
                        }
                        timesVerified={m.verified ? m.verified : null}
                        platforms={
                          m.additionalInfo && m.additionalInfo[0].platformList
                            ? m.additionalInfo[0].platformList
                            : null
                        }
                        onSignIn={onSignIn}
                        handleRedirect={this.handleRedirect}
                      />
                    );
                  })
                : (makers && makers).map((m, idx) => {
                  // console.log('here', makers)
                    return (
                      <MakersCard
                        jobFamilyName={m.jobFamilyName}
                        user={user}
                        key={idx}
                        id={m.id}
                        currID={-1}
                        awards={m.awards}
                        avatar={m.imgUrl}
                        latestGameId={
                          m.additionalInfoExtended &&
                          m.additionalInfoExtended[0].latestGameId
                        }
                        firstName={m.firstName}
                        lastName={this.state.lastName[m.id]}
                        width={doc.width}
                        location={m.location}
                        workCategories={m.workCategories}
                        currRole={m.currRole}
                        currGame={
                          m.additionalInfoExtended &&
                          m.additionalInfoExtended[0].latestGameName
                        }
                        // currCompany={m.currCompany}
                        isSubscribe={
                          m.additionalInfoExtended &&
                          m.additionalInfoExtended[0]
                            ? m.additionalInfoExtended[0]["isSubscribe"]
                            : false
                        }
                        // connection={m.connected ? 'yes' : m.connectPending ? 'pending' : 'no'}
                        claimed={m.claimed}
                        onConnect={onConnect}
                        imageSm={
                          m.additionalInfoExtended
                            ? m.additionalInfoExtended[0].latestGameId
                              ? getGameURLFromId(
                                  m.additionalInfoExtended[0].latestGameId.toString(),
                                  "550x740"
                                )
                              : getGameURLFromId(
                                  Math.floor(
                                    Math.random() * 3000 + 0
                                  ).toString(),
                                  "550x740"
                                )
                            : null
                        }
                        imageLg={
                          m.additionalInfoExtended
                            ? m.additionalInfoExtended[0].latestGameId
                              ? getGameURLFromId(
                                  m.additionalInfoExtended[0].latestGameId.toString(),
                                  "1500x400"
                                )
                              : getGameURLFromId(
                                  Math.floor(
                                    Math.random() * 3000 + 0
                                  ).toString(),
                                  "550x740"
                                )
                            : null
                        }
                        timesVerified={
                          m.additionalInfoExtended
                            ? m.additionalInfoExtended[0].timesVerified
                            : null
                        }
                        page="game"
                        additionalInfo={m.additionalInfo}
                        platforms={
                          m.additionalInfoExtended &&
                          m.additionalInfoExtended[0].platformList
                            ? m.additionalInfoExtended[0].platformList
                            : null
                        }
                        gameID={game.id}
                        onSignIn={onSignIn}
                        handleRedirect={this.handleRedirect}
                      />
                       
                         
                         
                    );
                  })}

              {!isFetching && !isSearching && makers.length === 0 && (
                <h3>This game has no makers to display</h3>
              )}
              {isFetching && !isInfoFetching && (
                <div style={{ textAlign: "center" }}>
                  <h3>Loading</h3>
                  <div className="loader">
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              )}
              {isSearching && !isFetching && search.length === 0 && (
                <div>
                  <h3>Makers not found</h3>
                </div>
              )}
            </div>
            <br />
            <br />
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  params: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  onGetNextPage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  makers: PropTypes.array.isRequired,
  game: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onGetGame: PropTypes.func.isRequired,
  onGetMakersOfGame: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onAddExp: PropTypes.func.isRequired,
  onMemberInvite: PropTypes.func.isRequired,
  onGetExperience: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  gameMakerSearch: PropTypes.func.isRequired,
  onToggleSearch: PropTypes.func.isRequired,
  onClearGames: PropTypes.func,
  isSearching: PropTypes.bool,
  onGetGameInformation: PropTypes.func,
  dispatch: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    isFetching: selectIsFetching(),
    isInfoFetching: selectIsInfoFetching(),
    isLastPage: selectIsLastPage(),
    user: selectUser(),
    game: selectGame(),
    makers: selectMaker(),
    isSearching: selectIsSearching(),
    search: selectSearch(),
    gameInformation: selectGameInformation(),
  }),
  (dispatch) => ({
    dispatch,
    onGetGame: (id) => dispatch(gameRequest(id)),
    onGetMakersOfGame: (id) => dispatch(gameMakersRequest(id)),
    onSignIn: () => dispatch(openSignIn()),
    onGetNextPage: (url, offset) => dispatch(nextPageRequest(url, offset)),
    onConnect: ({ id, page, gameID }) =>
      dispatch(connectRequest({ id, page, gameID })),
    onMemberInvite: (id, gameId, game, company) =>
      dispatch(openMemberInvite(id, gameId, game, company, "Game Contributor")),
    onAddExp: (title, studio, isNewGame, searchQuery) =>
      dispatch(
        openAddExp({
          gameTitle: title,
          studioName: studio,
          page: "game",
          isNewGame: isNewGame,
          searchQuery: searchQuery,
        })
      ),
    onGetExperience: (id, gameID) => dispatch(makerExpRequest(id, gameID)),
    gameMakerSearch: (query, gameID) =>
      dispatch(gameMakerSearch(query, gameID)),
    onToggleSearch: () => dispatch(toggleSearch()),
    onClearGames: () => dispatch(clearGames()),
    onGetGameInformation: (id) => dispatch(gameInformationRequest(id)),
  })
)(Game);
