/*
 * Connections container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router";

import { makerRequest } from "containers/Maker/actions";

import { selectUser } from "containers/App/selectors";
import { selectMaker } from "containers/Maker/selectors";

import MakersCard from "components/MakersCard";

import s from "./styles.module.scss";
import { getGameURLFromId } from "../../utils/hashingFunction";
import { checkAuthToken } from "../../utils";
import { openOutOfClicks, openSignIn } from "../Modals/actions";

class Connections extends Component {
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
  handleRedirect = (path) => {
    if (window.count <= 14) {
      if (checkAuthToken()) {
        this.props.history.push(path);
      } else {
        this.props.dispatch(openSignIn());
      }
    } else {
      this.props.dispatch(openOutOfClicks());
    }
  };

  render() {
    const {
      params: { makerID },
      user,
      doc,
      maker,
    } = this.props;
    const m = maker || {};

    return (
      <main role="main" className={s.root}>
        <nav className={s.nav}>
          <Link to={`/maker/${makerID}`} style={{display:'flex', alignItems:'center'}}>
          <font color='#f8e81c' style={{fontSize: '20px', marginRight: "10px"}}>←</font>
            Back to Profile
          </Link>
        </nav>
        <div className={s.top}>
          <h1>Industry Connections</h1>
        </div>
        <div className={s.makers}>
          {m.connections && m.connections.length > 0 ? (
            m.connections.map((p, idx) => (
              <MakersCard
                key={idx}
                id={p.id}
                currID={!!user.id ? user.id : -1}
                awards={p.awards}
                avatar={p.imgUrl}
                firstName={p.firstName}
                currRole={p.currRole}
                currGame={p.currGame}
                width={doc.width}
                currCompany={p.currCompany}
                page="connections"
                connection={
                  makerID === "me" || p.connected
                    ? "yes"
                    : p.connectPending
                    ? "pending"
                    : ""
                }
                claimed={p.claimed}
                imageSm={
                  p.latest_game_id
                    ? getGameURLFromId(
                        p.latest_game_id
                          .toString()
                          .replace(/^http:\/\//i, "https://"),
                        "550x740"
                      )
                    : getGameURLFromId(
                        Math.floor(Math.random() * 3000 + 0)
                          .toString()
                          .replace(/^http:\/\//i, "https://"),
                        "550x740"
                      )
                }
                imageLg={
                  p.latest_game_id
                    ? getGameURLFromId(
                        p.latest_game_id
                          .toString()
                          .replace(/^http:\/\//i, "https://"),
                        "1500x400"
                      )
                    : getGameURLFromId(
                        Math.floor(Math.random() * 3000 + 0)
                          .toString()
                          .replace(/^http:\/\//i, "https://"),
                        "550x740"
                      )
                }
                handleRedirect={this.handleRedirect}
              />
            ))
          ) : (
            <h3>
              {makerID === "me"
                ? "You haven't connected with any other makers yet."
                : "This maker hasn't connected with any others yet."}
            </h3>
          )}
        </div>
      </main>
    );
  }
}

Connections.propTypes = {
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
    dispatch: PropTypes.func,
  }).isRequired,
  maker: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onGetMaker: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    maker: selectMaker(),
  }),
  (dispatch) => ({
    dispatch,
    onGetMaker: (id) => dispatch(makerRequest(id)),
  })
)(Connections);
