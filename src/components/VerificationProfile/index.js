/*
 * Verification Profile
 */

import React from "react";
import s from "./styles.module.scss";
import Button from "../UI/Button";
import Avatar from "../UI/Avatar";
function shorten(str, maxLen, separator = " ") {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}

class VerificationCardFull extends React.Component {
  animateButton = (event, id) => {
    event.preventDefault();
    document.getElementById(id).classList.add(s.animate);
  };
  render() {
    const {
      role,
      maker,
      isRequested,
      handleRequestVerification,
      userId,
      gameName,
      creditId,
      gameId,
      userData,
    } = this.props;
    const userName = `${userData.maker.firstName} ${userData.maker.lastName}`;
    return (
      <div className={s.root}>
        <Avatar
          className={s.avatar}
          image={maker.imgUrl}
          firstName={maker.firstName}
          lastName={maker.lastName}
        />
        <h4>{maker.firstName}</h4>
        <p className={s.v_pr_sub_subheading}>
          {maker.currRole.trim().length === 0
            ? "Not Set"
            : shorten(maker.currRole, 36)}
        </p>
        {isRequested === -1 ? (
          <Button
            id={`bubbly${maker.id}`}
            text="Request"
            className={`${s.verifyButton} ${s.bubblyButton}`}
            onClick={(event) => {
              this.animateButton(event, `bubbly${maker.id}`);
              handleRequestVerification({
                users: [maker.id],
                gameID: gameId,
                creditID: creditId,
                makerID: userId,
                title: gameName,
                makerName: userName,
              });
            }}
          />
        ) : (
          <Button text="Request Sent" className={s.sent_btn} onClick="" />
        )}
      </div>
    );
  }
}
VerificationCardFull.propTypes = {};

export default VerificationCardFull;
