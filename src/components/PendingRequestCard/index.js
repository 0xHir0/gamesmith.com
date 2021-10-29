/*
 * ReceivedRequest Component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
//import createPropTypes from 'redux-form/lib/createPropTypes';

class PendingRequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      index,
      userId,
      requesteeId,
      firstName,
      lastName,
      imgUrl,
      gameId,
      gameName,
      creditId,
      handleWithdrawRequest,
    } = this.props;
    return (
      <div className={s.root}>
        <div className={s.row}>
          <Avatar
            className={s.avatar}
            firstName={firstName}
            lastName={lastName}
            image={imgUrl}
          />
        </div>
        <div className={s.verificationLine}>
          <p className={s.verification}>
            You've requested <span className={s.highlight}>{firstName}</span> to
            verify you for your work on{" "}
            <span className={s.highlight}>{gameName}</span>.
          </p>
        </div>
        <div className={s.button}>
          <div>
            <Button
              text="Withdraw"
              className={s.withdrawButton}
              onClick={() => {
                handleWithdrawRequest(userId, creditId, requesteeId);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

PendingRequestCard.propTypes = {
  index: PropTypes.number,
  userId: PropTypes.number,
  requesteeId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  imgUrl: PropTypes.string,
  gameId: PropTypes.number,
  gameName: PropTypes.string,
  creditId: PropTypes.number,
  handleWithdrawRequest: PropTypes.func,
};
export default PendingRequestCard;
