/*
 * Recruiter Connections container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router";

import { makerRequest } from "containers/Maker/actions";
import { recruiterConnectionsRequest } from "containers/Recruiter/actions";

import { selectUser } from "containers/App/selectors";
import { selectMaker } from "containers/Maker/selectors";
import { selectRecruiter } from "containers/Recruiter/selectors";

import MakerCard from "components/MakerCard";

import s from "./styles.module.scss";

class RecruiterConnections extends Component {
  componentWillMount() {
    const {
      params: { recruiterID },
      user,
      onGetRecruiter,
    } = this.props;
    onGetRecruiter(recruiterID === user.id ? user.id : recruiterID);
  }

  componentWillUpdate(nextProps) {
    const {
      params: { recruiterID },
      user,
      onGetRecruiter,
    } = this.props;
    const nextID = nextProps.params.recruiterID;
    if (nextProps.params.recruiterID !== recruiterID) {
      onGetRecruiter(nextID === user.id ? user.id : nextID);
    }
  }

  render() {
    const {
      params: { recruiterID },
      user: { id },
      doc,
      recruiter,
    } = this.props;
    const m = recruiter || {};

    return (
      <main role="main" className={s.root}>
        <nav className={s.nav}>
          <Link to={`/recruiter`}>
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
              <MakerCard
                key={idx}
                id={p.id}
                currID={id}
                avatar={p.imgUrl}
                firstName={p.firstName}
                lastName={p.lastName}
                width={doc.width}
                role={p.currRole}
                gameName={p.currGame}
                gameStudio={p.currCompany}
                connection="yes"
                claimed
              />
            ))
          ) : (
            <h3>
              {recruiterID != id
                ? "This recruiter hasn't connected with any others yet."
                : "You haven't connected with any other makers yet."}
            </h3>
          )}
        </div>
      </main>
    );
  }
}

RecruiterConnections.propTypes = {
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
  recruiter: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    location: PropTypes.string,
    currCompany: PropTypes.string,
    connections: PropTypes.array,
  }),
  onGetRecruiter: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    recruiter: selectRecruiter(),
  }),
  (dispatch) => ({
    dispatch,
    onGetRecruiter: (id) => dispatch(recruiterConnectionsRequest(id)),
  })
)(RecruiterConnections);
