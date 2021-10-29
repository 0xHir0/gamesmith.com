/*
 * Requests container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router";

import { pendingTeamRequest } from "containers/App/actions";

import { selectTeamRequests } from "containers/App/selectors";

import {
  openAddExp,
  openConfirmRejectTeamRequest,
} from "containers/Modals/actions";

import TeamRequestCard from "components/TeamRequestCard";

import s from "./styles.module.scss";
import { getGameURLFromId } from "../../utils/hashingFunction";

class TeamRequests extends Component {
  componentWillMount() {
    const { onGetRequests } = this.props;
    onGetRequests();
  }

  render() {
    const { teamRequests, doc, onAccept, onReject } = this.props;
    return (
      <main role="main" className={s.root}>
        <nav className={s.nav}>
          <Link to="/maker/me">
            <i className="icon-arrow-left" />
            Back to Profile
          </Link>
        </nav>
        <div className={s.top}>
          <h1>Team Requests</h1>
        </div>
        <div className={s.requests}>
          {teamRequests && teamRequests.length > 0 ? (
            teamRequests.map((p, idx) => (
              <TeamRequestCard
                id={p.id}
                gameTitle={p.gameName}
                gameID={p.gameId}
                publisher={p.publisher && p.publisher}
                imageSm={getGameURLFromId(p.gameId.toString(), "550x520")}
                imageLg={getGameURLFromId(p.gameId.toString(), "2500x300")}
                width={doc.width}
                onAccept={onAccept}
                onReject={onReject}
              />
            ))
          ) : (
            <h3>You don't have any pending team requests.</h3>
          )}
        </div>
      </main>
    );
  }
}

TeamRequests.propTypes = {
  teamRequests: PropTypes.array.isRequired,
  onGetRequests: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};

export default connect(
  createStructuredSelector({
    teamRequests: selectTeamRequests(),
  }),
  (dispatch) => ({
    dispatch,
    onGetRequests: (id) => dispatch(pendingTeamRequest(id)),
    onAccept: (id, title, studio, isNewGame, searchQuery) =>
      dispatch(
        openAddExp({
          gameTitle: title,
          studioName: studio,
          page: "games",
          isNewGame,
          searchQuery,
          page: "teamRequest",
          gameID: id,
        })
      ),
    onReject: (id) => dispatch(openConfirmRejectTeamRequest(id)),
  })
)(TeamRequests);
