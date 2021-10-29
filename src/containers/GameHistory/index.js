/*
 * Game history container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link, Redirect } from "react-router";
import { getGameURLFromId } from "../../utils/hashingFunction";

import {
  makerRequest,
  creditRequest,
  verifyCreditRequest,
  unverifyCreditRequest,
} from "containers/Maker/actions";
import {
  openAddExp,
  openInvite,
  openDeleteExp,
  openEditExp,
  openDispute,
  openSignIn,
} from "containers/Modals/actions";

import { selectUser } from "containers/App/selectors";
import { selectMaker, selectMakerCredits } from "containers/Maker/selectors";
import GameDetailsCard from "components/GameDetailsCard";
import addGameIconColored from "../../data/icons/addgamenew.png";
import addGameNewIcon from "../../data/icons/addGameNEwIcon.png";
import Button from "components/UI/Button";

import s from "./styles.module.scss";

class GameHistory extends Component {
  constructor() {
    super();
    this.state = { isOnAddGame: false };
  }
  componentWillMount() {
    const {
      params: { makerID },
      user,
      onGetMaker,
    } = this.props;
    onGetMaker(makerID === "me" ? user.id : makerID);
  }

  componentWillUpdate(nextProps) {
    const {
      params: { makerID },
      user,
      onGetMaker,
    } = this.props;
    const nextID = nextProps.params.makerID;
    if (nextProps.params.makerID !== makerID) {
      onGetMaker(nextID === "me" ? user.id : nextID);
    }
  }

  renderMoreCreditInfo = (creditId) => {
    const applicantButton = document.getElementById(`moreInfoBtn${creditId}`);
    applicantButton.innerText === "MORE INFORMATION"
      ? (applicantButton.innerHTML = "HIDE INFORMATION")
      : (applicantButton.innerHTML = "MORE INFORMATION");
    document.getElementById(`creditId${creditId}`).classList.toggle("hidden");
  };
  handleGameIconChange() {
    this.setState({ isOnAddGame: true });
  }
  handleOnMouseOutGame() {
    this.setState({ isOnAddGame: false });
  }
  redirectToGamesPage() {
    window.location.replace("/games");
  }

  render() {
    const {
      params: { makerID },
      doc,
      user,
      maker,
      makerCredits,
      onAddExp,
      onDeleteExp,
      onEditExp,
      onInvite,
      onVerifyCredit,
      onDispute,
      onUnverifyCredit,
      onSignIn,
    } = this.props;
    const m = maker || {};
    const u = user || {};
    const verified =
      makerCredits &&
      makerCredits.reduce((score, credit) => score + credit.score, 0) > 0;
    const timesVerified =
      verified &&
      makerCredits.reduce((score, credit) => score + credit.score, 0);
    const totalVerfiedGames =
      timesVerified &&
      makerCredits.reduce(
        (score, credit) => (credit.score > 0 ? score + 1 : score),
        0
      );
    return (
      <main role="main" className={s.root}>
        <nav className={s.nav}>
          <Link to={`/maker/${makerID}`} style={{display:'flex', alignItems:'center'}}>
          <font color='#f8e81c' style={{fontSize: '20px', marginRight: "10px"}}>←</font>
            Back to Profile
          </Link>
          {/* <a onClick={onAddExp}>Add New</a> */}
        </nav>
        <div className={s.top}>
          <h1>Game History!</h1>
        </div>
        {makerCredits && (
          <div>
            {/* <p><font color='yellow'>★</font></p> */}
            <i className="fas fa-star" style={{fontSize: '13px',color: 'yellow', marginLeft: '5px', marginRight: 0}}></i>
            {totalVerfiedGames || 0}/{makerCredits ? makerCredits.length : 0}
            VERIFIED
          </div>
        )}
        <Button
          text="Add Games"
          style={
            window.location.pathname.indexOf("maker/me") != -1
              ? {}
              : { display: "none" }
          }
          className={s.addGameButton}
          icon={this.state.isOnAddGame ? addGameIconColored : addGameNewIcon}
          onMouseEnter={() => this.handleGameIconChange()}
          onMouseLeave={() => this.handleOnMouseOutGame()}
          onClick={() => this.redirectToGamesPage()}
        />
        <div className={s.games}>
          {makerCredits && makerCredits.length > 0 ? (
            makerCredits.map((g, idx) => (
              <GameDetailsCard
                key={idx}
                gameID={g.game && g.game.id}
                awards={m.awards}
                makerID={m.id}
                makerName={`${m.firstName} ${m.lastName || ""}`}
                endDate={g.endDate}
                underNda={g.underNda}
                location={g.location}
                platforms={g.platforms}
                title={g.game && g.game.name}
                studio={g.company}
                onDeleteExp={onDeleteExp}
                onEditExp={onEditExp}
                onSignIn={onSignIn}
                userID={u.id}
                creditID={g.id}
                isRealUser={m.claimed}
                onInvite={onInvite}
                onVerifyCredit={onVerifyCredit}
                onUnverifyCredit={onUnverifyCredit}
                onDispute={onDispute}
                disputed={g.creditDispute && true}
                verified={g.verification}
                timesVerfied={g.score}
                width={doc.width}
                imageSm={getGameURLFromId(g.game.id.toString(), "550x520")}
                imageLg={getGameURLFromId(g.game.id.toString(), "2500x300")}
                credit={g}
                renderMoreCreditInfo={this.renderMoreCreditInfo}
                makerSkills={m.skills}
                currRole={m.currRole}
              />
            ))
          ) : (
            <h3>There are no games to display</h3>
          )}
        </div>
      </main>
    );
  }
}

GameHistory.propTypes = {
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  params: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  maker: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  makerCredits: PropTypes.array.isRequired,
  onGetMaker: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
  onAddExp: PropTypes.func.isRequired,
  onDeleteExp: PropTypes.func.isRequired,
  onEditExp: PropTypes.func.isRequired,
  onVerifyCredit: PropTypes.func.isRequired,
  onUnverifyCredit: PropTypes.func.isRequired,
  onDispute: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    maker: selectMaker(),
    makerCredits: selectMakerCredits(),
  }),
  (dispatch) => ({
    dispatch,
    onGetMaker: (id) => dispatch(makerRequest(id)),
    onInvite: (id) => dispatch(openInvite(id)),
    onAddExp: () => dispatch(openAddExp()),
    onDeleteExp: (gameID, title) =>
      dispatch(openDeleteExp({ gameID, gameTitle: title, page: "maker" })),
    onEditExp: (credit) => dispatch(openEditExp(credit)),
    onVerifyCredit: (decision, id, makerId) =>
      dispatch(verifyCreditRequest(decision, id, makerId)),
    onUnverifyCredit: (creditId, makerID) =>
      dispatch(unverifyCreditRequest(creditId, makerID)),
    onDispute: (creditId, makerID, title, studio, makerName) =>
      dispatch(openDispute(creditId, makerID, title, studio, makerName)),
    onSignIn: () => dispatch(openSignIn()),
  })
)(GameHistory);
