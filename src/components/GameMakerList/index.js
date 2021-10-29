/*
 * GameMakerList component
 */

import React from "react";
import PropTypes from "prop-types";

import s from "./styles.module.scss";
import Button from "../UI/Button";
import Avatar from "../UI/Avatar";
import star from "./img/star.png";
import starNoFilled from "./img/starnotfilled.png";
import { Link } from "react-router";

class GameMakerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      isRequested: -1,
    };
  }
  componentDidMount() {
    this.setState({
      isVerified: this.props.verified,
      isRequested: this.props.requested,
    });
  }
  verifyCredit = (decision, creditId, userId, token) => {
    this.setState({ isVerified: !this.state.isVerified }, () =>
      this.props.onVerifyCredit(decision, creditId, userId, token)
    );
  };
  unVerifyCredit = (creditId, userId) => {
    this.setState({ isVerified: !this.state.isVerified }, () =>
      this.props.onUnverifyCredit(creditId, userId)
    );
  };
  sendRequest = (makerId, gameId, creditId, userId, gameTitle, userName) => {
    this.setState({ isRequested: !this.state.isRequested }, () =>
      this.props.handleRequestVerification({
        users: [makerId],
        gameID: gameId,
        creditID: creditId,
        makerID: userId,
        title: gameTitle,
        makerName: userName,
      })
    );
  };
  withdrawRequest = (userId, creditId, makerId) => {
    this.setState({ isRequested: !this.state.isRequested }, () =>
      this.props.handleWithdrawRequest(userId, creditId, makerId)
    );
  };
  animateButton = (event, id) => {
    event.preventDefault();
    document.getElementById(id).classList.add(s.animate);
  };
  gotToMakerProfile = () => {
    localStorage.setItem("makerGameId", this.props.gameId);
    localStorage.setItem("makerGameTitle", this.props.gameTitle);
  };
  render() {
    const {
      index,
      gameCreditId,
      gameTitle,
      creditId,
      gameId,
      makerId,
      firstName,
      lastName,
      role,
      imgUrl,
      verified,
      requested,
      userData,
      userId,
      handleRequestVerification,
      handleWithdrawRequest,
      onVerifyCredit,
      onUnverifyCredit,
    } = this.props;
    const { isVerified, isRequested } = this.state;
    const userName = `${userData.maker.firstName} ${userData.maker.lastName}`;
    const linkTo = `/maker/${makerId}`;
    return (
      <div className={s.root1}>
        <div className={`row ${s.flexList}`}>
          <div className="col-md-2 col-sm-2 col-xs-2">
            <Avatar
              className={s.avatar}
              image={imgUrl}
              firstName={firstName}
              lastName={lastName}
            />
          </div>
          <div className={`col-md-4 col-sm-2 col-xs-2 ${s.nameAndRole}`}>
            <Link to={linkTo}>
              <p onClick={this.gotToMakerProfile} className={s.name}>
                {firstName} {lastName}
              </p>
            </Link>
            <p className={s.role}>{role}</p>
          </div>
          <div className="col-md-3 col-sm-4 col-xs-4">
            <Button
              text={isVerified ? "Unverify" : "Verify"}
              className={s.verifyButton}
              icon={isVerified ? starNoFilled : star}
              onClick={() => {
                isVerified
                  ? this.unVerifyCredit(creditId, userId)
                  : this.verifyCredit("yes", creditId, userId, "");
              }}
            />
          </div>
          <div className="col-md-3 col-sm-4 col-xs-4">
            {isRequested === -1 ? (
              <Button
                text="Request"
                className={s.verifyButton}
                icon={star}
                onClick={() =>
                  this.sendRequest(
                    makerId,
                    gameId,
                    gameCreditId,
                    userId,
                    gameTitle,
                    userName
                  )
                }
              />
            ) : isRequested === 0 ? (
              <p>Verified</p>
            ) : (
              <Button text="Sent" className={s.requestSentButton} onClick="" />
            )}
          </div>
        </div>
        <hr></hr>
      </div>
    );
  }
}
GameMakerList.propTypes = {
  index: PropTypes.number,
  gameCreditId: PropTypes.number,
  gameTitle: PropTypes.string,
  creditId: PropTypes.number,
  gameId: PropTypes.number,
  makerId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
  imgUrl: PropTypes.string,
  verified: PropTypes.bool,
  requested: PropTypes.number,
  userData: PropTypes.object,
  userId: PropTypes.number,
  handleRequestVerification: PropTypes.func,
  handleWithdrawRequest: PropTypes.func,
  onVerifyCredit: PropTypes.func,
  onUnverifyCredit: PropTypes.func,
};

export default GameMakerList;
