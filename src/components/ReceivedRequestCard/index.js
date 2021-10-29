/*
 * ReceivedRequest Component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";

class ReceivedRequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      index,
      userId,
      requestorId,
      firstName,
      lastName,
      imgUrl,
      gameId,
      gameName,
      creditId,
      onVerifyCredit,
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
            <span className={s.highlight}>{firstName}</span> wants you to verify
            their work on <span className={s.highlight}>{gameName}</span>.
          </p>
        </div>
        <div className={s.buttons}>
          <div>
            <Button
              text="Verify"
              className={s.verifyButton}
              onClick={() => {
                onVerifyCredit("yes", creditId, userId, "");
              }}
            />
          </div>
          <div className={s.space}></div>
          <div>
            <Button
              text="Ignore"
              className={s.ignoreButton}
              onClick={() => {
                handleWithdrawRequest(
                  requestorId,
                  creditId,
                  userId,
                  "received"
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReceivedRequestCard.propTypes = {
  index: PropTypes.number,
  userId: PropTypes.number,
  requestorId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  imgUrl: PropTypes.string,
  gameId: PropTypes.number,
  gameName: PropTypes.string,
  creditId: PropTypes.number,
  onVerifyCredit: PropTypes.func,
  handleWithdrawRequest: PropTypes.func,
};
export default ReceivedRequestCard;
