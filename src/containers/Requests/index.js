/*
 * Requests container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router";

import { pendingRequest, pendingTeamRequest } from "containers/App/actions";
import { selectRequests, selectTeamRequests } from "containers/App/selectors";
import RequestCard from "components/RequestCard";
import TeamRequestCard from "components/TeamRequestCard";
import {
  openAddExp,
  openConfirmRejectTeamRequest,
} from "containers/Modals/actions";
import { getGameURLFromId } from "../../utils/hashingFunction";
import s from "./styles.module.scss";

class Requests extends Component {
  componentWillMount() {
    const { onGetRequests, onGetTeamRequests } = this.props;
    onGetRequests();
    onGetTeamRequests();
  }

  render() {
    const { requests, teamRequests, doc, onAccept, onReject } = this.props;
    return (
      <main role="main" className={s.root}>
        <nav className={s.nav}>
          <Link to="/maker/me">
            {/* <i className="icon-arrow-left" /> */}
            <font color='#f8e81c' style={{fontSize: '20px', margin:"0 auto", marginRight: "10px", paddingBottom:'10px'}}>←</font>
            Back to Profile
          </Link>
        </nav>
        <div className={s.top}>
          <h1>Connection Requests</h1>
        </div>
        <div className={s.requests}>
          {requests && requests.length > 0 ? (
            requests[0] && requests[0].makers ? (
              requests[0].makers.map((p, idx) => (
                <RequestCard
                  key={idx}
                  id={p.id}
                  avatar={p.imgUrl}
                  firstName={p.firstName}
                  lastName={p.lastName}
                  role={p.currRole}
                  company={p.currCompany}
                />
              ))
            ) : (
              ""
            )
          ) : (
            <h3>You don't have any pending connection requests.</h3>
          )}
          {requests && requests.length > 0
            ? requests[0] && requests[0].recruiter
              ? requests[0].recruiter.map((p, idx) => (
                  <RequestCard
                    key={idx}
                    id={p.id}
                    avatar={p.imgUrl}
                    firstName={p.firstName}
                    lastName={p.lastName}
                    role={p.currRole}
                    company={p.currCompany}
                  />
                ))
              : ""
            : ""}
        </div>
        <div className={s.top}>
          <h1>Team Requests</h1>
        </div>
        <div className={s.requests}>
          {teamRequests && teamRequests.length > 0 ? (
            teamRequests.map((p, idx) => (
              <TeamRequestCard
                id={p.id}
                avatar={p.imgUrl}
                recruiterId={p.recruiterId}
                firstName={p.firstName}
                lastName={p.lastName}
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

Requests.propTypes = {
  requests: PropTypes.array.isRequired,
  teamRequests: PropTypes.array.isRequired,
  onGetRequests: PropTypes.func.isRequired,
  onGetTeamRequests: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};

export default connect(
  createStructuredSelector({
    requests: selectRequests(),
    teamRequests: selectTeamRequests(),
  }),
  (dispatch) => ({
    dispatch,
    onGetRequests: (id) => dispatch(pendingRequest(id)),
    onGetTeamRequests: (id) => dispatch(pendingTeamRequest(id)),
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
)(Requests);
