/*
 * Verify container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { verifyRequest } from "./actions";
import { makerRequest } from "containers/Maker/actions";
import { openAvailability } from "containers/Modals/actions";

import { selectMaker } from "containers/Maker/selectors";
import { selectUser } from "containers/App/selectors";

import GameVerifyCard from "components/GameVerifyCard";
import Button from "components/UI/Button";

import s from "./styles.module.scss";

class Verify extends Component {
  componentWillMount() {
    const {
      user: { id },
      onGetMaker,
    } = this.props;
    onGetMaker(id);
  }

  onVerify = (id, decision) => {
    const { onVerifyRequest } = this.props;
    onVerifyRequest({ id, decision });
  };

  onNext = () => {
    const { dispatch } = this.props;
    dispatch(openAvailability());
  };

  render() {
    const {
      maker: { credits },
    } = this.props;

    return (
      <main role="main" className={s.root}>
        <div className={s.top}>
          <h1>You've been busy</h1>
          <p>To be recognized, we need to build your professional profile.</p>
          <p>Can you confirm whether or not you worked on these games?</p>
        </div>
        <div className={s.games}>
          {credits &&
            credits.length > 0 &&
            credits.map((g, idx) => (
              <GameVerifyCard
                key={idx}
                id={g.id}
                role={g.role && g.role.name}
                game={g.game && g.game.name}
                company={g.company && g.company.name}
                onVerify={this.onVerify}
              />
            ))}
          <Button className={s.btn} text="Next" onClick={this.onNext} />
        </div>
      </main>
    );
  }
}

Verify.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  maker: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  // params: PropTypes.object.isRequired,
  onGetMaker: PropTypes.func.isRequired,
  onVerifyRequest: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    maker: selectMaker(),
  }),
  (dispatch) => ({
    dispatch,
    onGetMaker: (id) => dispatch(makerRequest(id)),
    onVerifyRequest: ({ id, decision }) =>
      dispatch(verifyRequest({ id, decision })),
  })
)(Verify);
