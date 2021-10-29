/*
 * Verification Card Full
 */

import React from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import VerificationProfile from "../VerificationProfile";
import Button from "../UI/Button";

function VerificationCardFull(props) {
  const {
    makers,
    creditId,
    gameName,
    userId,
    handleRequestVerification,
    gameId,
    userData,
    handleMore,
    isLast,
  } = props;
  const filterMaker = makers && makers.filter((x) => x.makers.id !== userId);
  const makerIds = makers && makers.map((x) => x.makers.id);
  return (
    <div className={s.root}>
      <h3>{gameName.trim().length === 0 ? "Test" : gameName}</h3>
      <div className={s.full}>
        {filterMaker &&
          filterMaker.length > 0 &&
          filterMaker.map((m, idx) => (
            <div className={s.container}>
              <VerificationProfile
                maker={m.makers}
                isRequested={m.isRequested}
                key={idx}
                userId={userId}
                gameName={gameName}
                creditId={creditId}
                gameId={gameId}
                userData={userData}
                handleRequestVerification={handleRequestVerification}
              />
            </div>
          ))}
      </div>
      {!isLast && (
        <div className={s.btn_more}>
          <Button text="More" onClick={() => handleMore(gameId, makerIds)} />
        </div>
      )}
    </div>
  );
}

VerificationCardFull.propTypes = {
  gameName: PropTypes.string,
  makers: PropTypes.array,
  creditId: PropTypes.number,
  userId: PropTypes.number,
  handleRequestVerification: PropTypes.func,
  gameId: PropTypes.number,
  userData: PropTypes.object,
  handleMore: PropTypes.func,
  isLast: PropTypes.bool,
};

export default VerificationCardFull;
