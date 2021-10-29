/*
 * Veirification Request container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import s from "./styles.module.scss";
import GameMakerList from "../../components/GameMakerList";
import ReceivedRequestCard from "../../components/ReceivedRequestCard";
import PendingRequestCard from "../../components/PendingRequestCard";
import VerificationsCard from "../../components/VerificationsCard";
import VerificationCard from "../../components/VerificationCard";
import Button from "../../components/UI/Button";
import { Redirect } from "react-router";
import { checkAuthToken, getUserData } from "../../utils";
import { openSignIn } from "../Modals/actions";
import {
  verifyCreditTokenRequest,
  ignoreVerificationRequest,
  sendInviteRequest,
  getMoreMakerRequest,
  removeCredit,
  searchGameMakersRequest,
} from "../App/actions";
import {
  selectUserCredit,
  selectGamesAndMakers,
  selectIsFetchingMaker,
} from "../App/selectors";
import { unverifyCreditRequest, verifyCreditRequest } from "../Maker/actions";
import {
  getUserReceivedRequests,
  getUserGamesRequests,
  getGameMakersRequest,
  nextPageGetGameMakersRequest,
  getUserPendingRequests,
  withdrawVerificationRequest,
  getUserVerificationsRequest,
  getGameMakersSuccess,
} from "./actions";
import {
  selectUserGames,
  selectIsUserGamesFetching,
  selectIsGameMakersFetching,
  selectGameMakers,
  selectUserReceivedRequests,
  selectUserPendingRequests,
  selectUserVerifications,
  selectUserVerificationFetching,
  selectVerificationCount,
  selectGameMakersCount,
  selectIsNextGameMakersFetching,
  selectNextOffsetFetching,
} from "./selectors";

import Tick from "./img/Tick.gif";
import p from "../Home/img/p.png";
import addGameNewIcon from "../../data/icons/addGameNEwIcon.png";

class VerificationRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: (getUserData() && getUserData().id) || null,
      userData: getUserData(),
      isAccepting: false,
      search: "",
      option: "",
      receivedRequestsCard: true,
      selectedGame: "",
      selectedCreditId: 0,
      selectedGameId: 0,
      selectedGameTitle: "",
      showGames: false,
      count: -1,
      searched: false,
      page: 1,
    };
  }
  componentDidMount() {
    const {
      location: { query },
      history,
      onTokenVerify,
      onGetUserGames,
      userGames,
      onReceivedRequests,
      onPendingRequests,
      onGetUserVerifications,
    } = this.props;
    const { userId } = this.state;
    if (!checkAuthToken()) {
      localStorage.setItem(
        "verifyUrl",
        window.location.pathname + window.location.search
      );
      history.push("/?login");
      return;
    }
    if (query.code) onTokenVerify(query.code);
    if (query.accept_verification) this.setState({ isAccepting: true });
    const verifyGame = localStorage.getItem("gameId");
    const verifyGameName = localStorage.getItem("gameTitle");
    const makerGameName = localStorage.getItem("makerGameTitle");
    const makerGameId = localStorage.getItem("makerGameId");
    if (verifyGame) {
      if (verifyGameName) {
        this.setState({ selectedGameTitle: verifyGameName, searched: true });
        localStorage.removeItem("gameTitle");
      }
      onGetUserGames(userId, verifyGame);
      localStorage.removeItem("gameId");
    } else if (makerGameId) {
      this.setState({ selectedGameId: makerGameId });
      if (makerGameName) {
        this.setState({ selectedGameTitle: makerGameName, searched: true });
        localStorage.removeItem("makerGameTitle");
      }
      onGetUserGames(userId, makerGameId);
      localStorage.removeItem("makerGameId");
    } else {
      onGetUserGames(userId);
    }
    onReceivedRequests(userId);
    onPendingRequests(userId);
    onGetUserVerifications(userId);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { searched, search } = this.state;
    const { userGames } = this.props;
    const addEvent = document.getElementById("verificationCenter");
    if (search == "") {
      addEvent &&
        addEvent.addEventListener("scroll", this.handleNextPageRequest);
    }

    if (searched === false) {
      if (userGames && userGames.length > 0)
        this.setState({
          selectedCreditId: userGames[0].credit_id,
          selectedGameId: userGames[0].id,
          selectedGameTitle: userGames[0].name,
          searched: true,
        });
    }
  }

  componentWillUnmount() {
    const { onRemoveCredit } = this.props;
    onRemoveCredit();
  }
  onSelectGame = (e, userId, creditId, gameId, gameTitle, searchTerm) => {
    const { userGames } = this.props;
    this.setState({
      showGames: !this.state.showGames,
      page: 1,
      count: -1,
      search: "",
    });
    if (this.state.showGames) {
      this.setState({
        selectedCreditId: creditId,
        selectedGameId: gameId,
        selectedGameTitle: gameTitle,
      });
      this.props.onGetGameMakers(
        userId,
        gameId,
        searchTerm,
        gameTitle,
        creditId
      );
    } else {
      this.setState({
        selectedCreditId: userGames[0].credit_id,
        selectedGameId: userGames[0].id,
        selectedGameTitle: userGames[0].name,
      });
    }
    e.preventDefault();
  };
  onMakerSearch = (e, userId, gameTitle, gameId, searchTerm) =>
    new Promise((resolve, reject) => {
      e.preventDefault();
      const { selectedCreditId } = this.state;
      const { dispatch } = this.props;
      this.setState({ count: -1 });
      dispatch(
        getGameMakersRequest(
          userId,
          gameId,
          searchTerm,
          gameTitle,
          selectedCreditId,
          resolve,
          reject
        )
      );
    }).then(() => {
      const { dispatch, gameMakers } = this.props;
      let pcount = 0;
      if (gameMakers && gameMakers.length > 0 && searchTerm) {
        const searchedMakers = this.props.gameMakers.map((i) =>
          i.makerId !== userId
            ? i.firstName.toLowerCase().includes(searchTerm.toLowerCase())
              ? i
              : {}
            : {}
        );
        searchedMakers.map((i) => (i.creditId ? (pcount = pcount + 1) : ""));
        this.setState({ count: pcount });
        dispatch(getGameMakersSuccess(searchedMakers));
      }
    });
  handleNextPageRequest = () => {
    const {
      userId,
      selectedGameId,
      selectedCreditId,
      selectedGameTitle,
      page,
      search,
    } = this.state;
    const { nextOffset, isNextGameMakersFetching } = this.props;
    const center = document.getElementById("verificationCenter");
    if (
      center.scrollHeight - center.scrollTop === center.clientHeight &&
      isNextGameMakersFetching &&
      nextOffset &&
      search == ""
    ) {
      this.props.onGetNextPageGameMakers(
        userId,
        selectedGameId,
        "",
        selectedGameTitle,
        selectedCreditId,
        page
      );
      this.setState({ page: this.state.page + 1 });
    }
  };
  handleVerifyCredit = (decision, creditIt, userId) => {
    const {
      location: { query },
      onVerifyCredit,
    } = this.props;
    onVerifyCredit(decision, creditIt, userId, query.code);
  };
  handleIgnoreRequest = () => {
    const {
      location: { query },
      onIgnoreVerification,
    } = this.props;
    onIgnoreVerification(query.code);
  };
  handleWithdrawRequest = () => {
    const {
      location: { query },
      onIgnoreVerification,
    } = this.props;
    onIgnoreVerification(query.code);
  };
  selectOption = () => {
    const op = document.getElementById("mySelect").value;
    this.setState({ option: op });
  };
  changeRequestCards = () => {
    this.setState({ receivedRequestsCard: !this.state.receivedRequestsCard });
  };
  redirectToGamesPage() {
    window.location.replace("/games");
  }
  render() {
    const {
      data: { user, credit, isVerified },
      userGames,
      isUserGamesFetching,
      gameMakers,
      gamesAndMakers,
      isGameMakersFetching,
      isNextGameMakersFetching,
      onRequestVerification,
      isFetchingMaker,
      onMoreMakerRequest,
      handleMakerSearch,
      onReceivedRequests,
      receivedRequests,
      onPendingRequests,
      pendingRequests,
      onVerifyCredit,
      onUnverifyCredit,
      onWithdrawRequest,
      onIgnoreVerification,
      userVerifications,
      isUserVerificationsFetching,
      verificationCount,
      makersCount,
      nextOffset,
    } = this.props;
    const { userId, userData, isAccepting, search } = this.state;
    // const userName = user ? `${user.firstName} ${user.lastName}` : '';
    // const selectedGame = userGames && userGames.length > 0 ? userGames[0] : '';

    return (
      <main className={s.root}>
        {/*{*/}
        {/*  isAccepting &&*/}
        {/*    <div className={s.congrats_block}>*/}
        {/*      <h1>Congratulations on being verified!</h1>*/}
        {/*      <img src={Tick} alt="tick" />*/}
        {/*    </div>*/}
        {/*}*/}
        {/*{*/}
        {/*  credit && <VerificationCard*/}
        {/*    userId={userId}*/}
        {/*    maker={user}*/}
        {/*    displayImg={user && user.imgUrl}*/}
        {/*    verified={userName}*/}
        {/*    credit={credit}*/}
        {/*    onVerifyCredit={this.handleVerifyCredit}*/}
        {/*    onIgnoreVerify={this.handleIgnoreRequest}*/}
        {/*    isVerified={isVerified}/>*/}
        {/*}*/}
        <div>
          {isUserGamesFetching && userGames && userGames.length > 0 ? (
            <h2 className={s.title}>VERIFICATION CENTER</h2>
          ) : (
            ""
          )}
          <h2 className={s.verifications}>
            You currently have{" "}
            <span style={{ color: "#f6dc34" }}>{verificationCount}</span>{" "}
            {verificationCount > 1 ? "verifications" : "verification"}
          </h2>
          <div className={s.verificationRow}>
            <div className={s.col1}></div>
            <div className={s.col2}>
              {!isUserGamesFetching && (
                <div>
                  <br />
                  <h3>Loading</h3>
                  <div className="loader">
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              )}
              {isUserGamesFetching ? (
                userGames && userGames.length > 0 ? (
                  <div className={s.colCenterColoured}>
                    <div className={s.box}>
                      {userGames.length > 1 ? (
                        <div
                          className={s.gameBox}
                          onClick={(e) =>
                            this.onSelectGame(
                              e,
                              userId,
                              this.state.selectedCreditId,
                              this.state.selectedGameId,
                              this.state.selectedGameTitle,
                              ""
                            )
                          }
                        >
                          <span className={s.selectedGame}>
                            {this.state.selectedGameTitle}
                          </span>
                          <i
                            className={
                              this.state.showGames
                                ? "fa fa-angle-up"
                                : "fa fa-angle-down"
                            }
                          ></i>
                        </div>
                      ) : (
                        <div className={s.singleGameBox}>
                          {this.state.selectedGameTitle}
                        </div>
                      )}
                      {this.state.showGames && (
                        <div className={s.gamesBox}>
                          {userGames.map(
                            (i, index) =>
                              index !== 0 && (
                                <div
                                  className={s.gameNames}
                                  onClick={(e) =>
                                    this.onSelectGame(
                                      e,
                                      userId,
                                      i.credit_id,
                                      i.id,
                                      i.name,
                                      ""
                                    )
                                  }
                                >
                                  {i.name}
                                </div>
                              )
                          )}
                        </div>
                      )}
                    </div>
                    <form onSubmit={null} id="formClear">
                      <div className={s.searchBox}>
                        <div className={s.searchBar}>
                          <input
                            className={s.searchInput}
                            type="text"
                            value={search}
                            onChange={(e) => {
                              this.setState({ search: e.target.value });
                            }}
                            placeholder="Search for people"
                          />
                          <button
                            onClick={(e) =>
                              this.onMakerSearch(
                                e,
                                userId,
                                this.state.selectedGameTitle,
                                this.state.selectedGameId,
                                search
                              )
                            }
                            className={s.search_icon}
                          >
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className={s.makers}>
                      <div className={s.user_list} id="verificationCenter">
                        {this.state.count > -1 ? (
                          <h5>{this.state.count} people</h5>
                        ) : makersCount ? (
                          <h5>{makersCount} people</h5>
                        ) : (
                          ""
                        )}
                        {gameMakers && gameMakers.length > 0
                          ? gameMakers.map((u, idx) =>
                              userId !== u.makerId && u.makerId ? (
                                <GameMakerList
                                  index={idx}
                                  gameCreditId={this.state.selectedCreditId}
                                  gameTitle={u.gameTitle}
                                  creditId={u.creditId}
                                  gameId={u.gameId}
                                  makerId={u.makerId}
                                  firstName={u.firstName}
                                  lastName={u.lastName}
                                  role={u.role}
                                  imgUrl={u.imgUrl}
                                  verified={u.verified}
                                  requested={u.requested}
                                  userData={userData}
                                  userId={userId}
                                  handleRequestVerification={
                                    onRequestVerification
                                  }
                                  handleWithdrawRequest={onWithdrawRequest}
                                  onVerifyCredit={onVerifyCredit}
                                  onUnverifyCredit={onUnverifyCredit}
                                />
                              ) : (
                                ""
                              )
                            )
                          : ""}
                        {!isGameMakersFetching && <p>loading...</p>}
                        {!isNextGameMakersFetching && <p>loading...</p>}
                        {!nextOffset && <p>No more makers</p>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={s.colCenterSimple}>
                    <h2>Your game history is empty.</h2>
                    <p>
                      To be verified for your work you need to add games that
                      you have worked on or helped launch.
                    </p>
                    <p>
                      Join the teams from the game's page and fill out your
                      personal profile" Discover the teams here
                    </p>
                    <Button
                      text="Add Games"
                      className={s.addGameButton}
                      icon={addGameNewIcon}
                      onClick={() => this.redirectToGamesPage()}
                    />
                  </div>
                )
              ) : (
                ""
              )}
            </div>
            <div className={s.col3}></div>
          </div>
        </div>
        {isUserGamesFetching && userGames && userGames.length > 0 ? (
          <div>
            <h2 className={s.title}>VERIFICATION REQUESTS</h2>
            <div className={s.flex}>
              <Button
                text="Received"
                className={
                  this.state.receivedRequestsCard === true
                    ? s.selectedButton
                    : s.unselectedButton
                }
                onClick={this.changeRequestCards}
              />
              <div className={s.space}></div>
              <Button
                text="Pending"
                className={
                  this.state.receivedRequestsCard === false
                    ? s.selectedButton
                    : s.unselectedButton
                }
                onClick={this.changeRequestCards}
              />
            </div>
            <div className={s.requests}>
              {this.state.receivedRequestsCard ? (
                <div className={`row ${s.cardRow}`}>
                  {receivedRequests && receivedRequests.length > 0 ? (
                    receivedRequests.map((u, index) =>
                      u.firstName && u.lastName ? (
                        <div
                          className={`col-md-4 col-sm-12 col-xs-12 ${s.cardCol}`}
                        >
                          <ReceivedRequestCard
                            index={index}
                            userId={userId}
                            requestorId={u.requestorId}
                            firstName={u.firstName}
                            lastName={u.lastName}
                            imgUrl={u.imgUrl}
                            gameId={u.gameId}
                            gameName={u.gameName}
                            creditId={u.creditId}
                            onVerifyCredit={onVerifyCredit}
                            handleWithdrawRequest={onWithdrawRequest}
                          />
                        </div>
                      ) : (
                        ""
                      )
                    )
                  ) : (
                    <div className="col-md-12">
                      <br />
                      <br />
                      <br />
                      <p>You have no received requests.</p>
                      <br />
                      <br />
                      <br />
                    </div>
                  )}
                </div>
              ) : (
                <div className={`row ${s.cardRow}`}>
                  {pendingRequests && pendingRequests.length > 0 ? (
                    pendingRequests.map((u, index) =>
                      u.firstName && u.lastName ? (
                        <div
                          className={`col-md-4 col-sm-12 col-xs-12 ${s.cardCol}`}
                        >
                          <PendingRequestCard
                            index={index}
                            userId={userId}
                            requesteeId={u.requesteeId}
                            firstName={u.firstName}
                            lastName={u.lastName}
                            imgUrl={u.imgUrl}
                            gameId={u.gameId}
                            gameName={u.gameName}
                            creditId={u.creditId}
                            onVerifyCredit={onVerifyCredit}
                            handleWithdrawRequest={onWithdrawRequest}
                          />
                        </div>
                      ) : (
                        ""
                      )
                    )
                  ) : (
                    <div className="col-md-12">
                      <br />
                      <br />
                      <br />
                      <p>You have no pending requests.</p>
                      <br />
                      <br />
                      <br />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/*<h2>VERIFICATION ACTIVITY LOG</h2>*/}
            {/*<div className={s.requests}>*/}
            {/*  <div className="row">*/}
            {/*    {userVerifications && userVerifications.length > 0 ? userVerifications.map((i, index) => (i.gameName ?*/}
            {/*      <div className={'col-md-4 col-sm-12 col-xs-12'}>*/}
            {/*        <VerificationsCard*/}
            {/*          index={index}*/}
            {/*          userId={userId}*/}
            {/*          gameName={i.gameName}*/}
            {/*          creditId={i.creditId}*/}
            {/*          verifiedById={i.verifiedById}*/}
            {/*          verifiedByFirstName={i.verifiedByFirstName}*/}
            {/*          verifiedByLastName={i.verifiedByLastName}*/}
            {/*          verifiedByImgURl={i.verifiedByImgURl}*/}
            {/*          verifiedId={i.verifiedId}*/}
            {/*          verifiedFirstName={i.verifiedFirstName}*/}
            {/*          verifiedLastName={i.verifiedLastName}*/}
            {/*          verifiedImgUrl={i.verifiedImgUrl}*/}
            {/*          createdAt={i.created_at}/>*/}
            {/*      </div> : '')) : <div className="col-md-12">*/}
            {/*        <br/>*/}
            {/*        <br/>*/}
            {/*        <br/>*/}
            {/*        <p>You have no verification history.</p>*/}
            {/*        <br/>*/}
            {/*        <br/>*/}
            {/*        <br/>*/}
            {/*      </div>}*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        ) : (
          ""
        )}
      </main>
    );
  }
}

VerificationRequests.propTypes = {
  userGames: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  gameMakers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isGameMakersFetching: PropTypes.bool,
  onSignIn: PropTypes.func,
  onTokenVerify: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  gamesAndMakers: PropTypes.array,
  onRequestVerification: PropTypes.func,
  isFetchingMaker: PropTypes.bool,
  isUserGamesFetching: PropTypes.bool,
  location: PropTypes.object,
  onIgnoreVerification: PropTypes.func,
  onVerifyCredit: PropTypes.func,
  params: PropTypes.object,
  history: PropTypes.object,
  onMoreMakerRequest: PropTypes.func,
  onRemoveCredit: PropTypes.func,
  onGetUserGames: PropTypes.func,
  onGetGameMakers: PropTypes.func,
  onReceivedRequests: PropTypes.func,
  onPendingRequests: PropTypes.func,
  verificationCount: PropTypes.number,
  dispatch: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    isFetchingMaker: selectIsFetchingMaker(),
    data: selectUserCredit(),
    gamesAndMakers: selectGamesAndMakers(),
    userGames: selectUserGames(),
    isUserGamesFetching: selectIsUserGamesFetching(),
    gameMakers: selectGameMakers(),
    isGameMakersFetching: selectIsGameMakersFetching(),
    isNextGameMakersFetching: selectIsNextGameMakersFetching(),
    nextOffset: selectNextOffsetFetching(),
    receivedRequests: selectUserReceivedRequests(),
    pendingRequests: selectUserPendingRequests(),
    userVerifications: selectUserVerifications(),
    isUserVerificationsFetching: selectUserVerificationFetching(),
    verificationCount: selectVerificationCount(),
    makersCount: selectGameMakersCount(),
  }),
  (dispatch) => ({
    dispatch,
    onSignIn: () => dispatch(openSignIn()),
    onTokenVerify: (code) => dispatch(verifyCreditTokenRequest(code)),
    onVerifyCredit: (decision, id, makerID, code) =>
      dispatch(verifyCreditRequest(decision, id, makerID, code)),
    onUnverifyCredit: (creditId, makerID) =>
      dispatch(unverifyCreditRequest(creditId, makerID)),
    onWithdrawRequest: (userId, creditId, makerId, received) =>
      dispatch(
        withdrawVerificationRequest(userId, creditId, makerId, received)
      ),
    onIgnoreVerification: (code) => dispatch(ignoreVerificationRequest(code)),
    onRequestVerification: (data) =>
      dispatch(sendInviteRequest(data, "Verification")),
    onMoreMakerRequest: (gameId, makerIds) =>
      dispatch(getMoreMakerRequest({ gameId, makerIds })),
    onReceivedRequests: (id) => dispatch(getUserReceivedRequests(id)),
    onPendingRequests: (id) => dispatch(getUserPendingRequests(id)),
    onRemoveCredit: () => dispatch(removeCredit()),
    onSearchGameMakers: (makerId, gameId, searchTerm, creditId) =>
      dispatch(
        searchGameMakersRequest({ makerId, gameId, searchTerm, creditId })
      ),
    onGetUserGames: (id, verifyGame) =>
      dispatch(getUserGamesRequests(id, verifyGame)),
    onGetGameMakers: (userId, gameId, searchTerm, gameTitle, creditId) =>
      dispatch(
        getGameMakersRequest(userId, gameId, searchTerm, gameTitle, creditId)
      ),
    onGetNextPageGameMakers: (
      userId,
      gameId,
      searchTerm,
      gameTitle,
      creditId,
      page
    ) =>
      dispatch(
        nextPageGetGameMakersRequest(
          userId,
          gameId,
          searchTerm,
          gameTitle,
          creditId,
          page
        )
      ),
    onGetUserVerifications: (id) => dispatch(getUserVerificationsRequest(id)),
  })
)(VerificationRequests);
