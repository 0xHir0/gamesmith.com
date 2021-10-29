/*
 * GameDetails container
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import selectGameDetails from "./selectors";

import s from "./styles.module.scss";

const GameDetails = ({ params: { gameID } }) => (
  <main role="main" className={s.root}>
    Details for game with ID: {gameID}
  </main>
);

GameDetails.propTypes = {
  params: PropTypes.object.isRequired,
};

export default connect(selectGameDetails(), (dispatch) => ({
  dispatch,
}))(GameDetails);
