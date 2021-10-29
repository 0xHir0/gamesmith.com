/*
 * Verification card
 */

import React from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import Button from "../UI/Button";
import Avatar from "../UI/Avatar";

class VerificationCard extends React.Component {
  animateButton = (event, id) => {
    event.preventDefault();
    document.getElementById(id).classList.remove(s.animate);
    document.getElementById(id).classList.add(s.animate);
    setTimeout(() => {
      document.getElementById(id).classList.remove(s.animate);
    }, 500);
  };
  render() {
    const {
      displayImg,
      verified,
      credit,
      onVerifyCredit,
      isVerified,
      onIgnoreVerify,
      maker,
    } = this.props;
    return (
      <div className={s.root}>
        <div className="row">
          <div className={`col-lg-2 ${s.bg1} ${s.msg}`}>
            <Avatar
              className={s.avatar}
              image={maker.imgUrl}
              firstName={maker.firstName}
              lastName={maker.lastName}
            />
          </div>
          <div className={`col-lg-5 ${s.bg1} ${s.msg1}`}>
            <p className={s.text_align}>
              Verify {verified}'s work on {credit && credit.game}?
            </p>
          </div>
          <div className={`${s.bg2} ${s.msg} col-lg-5`}>
            {isVerified && (
              <Button text="Verified" className={s.verifyButton} onClick="" />
            )}
            {!isVerified && (
              <Button
                id={`bubbly${maker.id}`}
                text="Verify"
                className={`${s.verifyButton} ${s.bubblyButton}`}
                onClick={(event) => {
                  this.animateButton(event, `bubbly${maker.id}`);
                  onVerifyCredit("yes", credit.creditId, credit.userId);
                }}
              />
            )}
            {!isVerified && (
              <Button
                text="Ignore"
                className={s.ignoreButton}
                onClick={onIgnoreVerify}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

VerificationCard.propTypes = {};

export default VerificationCard;
