/*
 * TribeHome container
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectJwtToken, selectUser } from "containers/App/selectors";
import {
  getAccountIdByNameRequest,
  saveSlugRequest,
} from "containers/App/actions";

import s from "./styles.module.scss";

class TribeHome extends React.Component {
  // eslint-disable-line no-unused-vars
  componentDidMount() {
    const { user, onSaveSlugRequest } = this.props;
    window.addEventListener("message", (event) => {
      if (event.origin.startsWith("https://gamesmith.tribe.so")) {
        if (event.data.id) {
          if (user && user.maker) {
            this.props.history.push(`/maker/${event.data.id}`);
          } else {
            this.props.history.push("/recruiter");
          }
        } else if (event.data.name) {
          if (user && (user.maker || user.recruiter)) {
            this.props.onGetAccountId(event.data.name);
          } else {
            this.props.history.push("/?login");
          }
        } else if (event.data.isLoaded) {
          onSaveSlugRequest(user.id);
        }
      } else {
        return;
      }
    });
  }

  render() {
    const { jwtToken } = this.props;
    const HEADER_HEIGHT = document.getElementById("auth-nav")
      ? document.getElementById("auth-nav").offsetHeight
      : 0;
    const ismobile = window.innerWidth <= 1150;
    return (
      <main role="main" className={s.root}>
        <div id="wherex" className={s.tribe_container}>
          <iframe
            id="tribeCon"
            src={`https://gamesmith.tribe.so/embed/home?jwt=${jwtToken}`}
            frameBorder="0"
            width="100%"
            style={{
              minHeight: "300px",
              width: "100%",
              border: "none",
              height: `calc(100vh - ${HEADER_HEIGHT}px)`,
              marginBottom: ismobile ? "69px" : "0rem",
            }}
            allowTransparency="true"
          ></iframe>
        </div>
      </main>
    );
  }
}

TribeHome.propTypes = {
  params: PropTypes.object.isRequired,
  jwtToken: PropTypes.string,
  user: PropTypes.object.isRequired,
  //history: PropTypes.object.isRequired,
  onGetAccountId: PropTypes.func.isRequired,
  onSaveSlugRequest: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    jwtToken: selectJwtToken(),
    user: selectUser(),
  }),
  (dispatch) => ({
    dispatch,
    onGetAccountId: (name) => dispatch(getAccountIdByNameRequest(name)),
    onSaveSlugRequest: (id) => dispatch(saveSlugRequest(id)),
  })
)(TribeHome);
