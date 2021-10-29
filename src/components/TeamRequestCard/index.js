import React from "react";
import PropTypes from "prop-types";

import Button from "components/UI/Button";
import Avatar from "../UI/Avatar";

import s from "./styles.module.scss";
import { Link } from "react-router";

const TeamRequestCard = ({
  id,
  recruiterId,
  firstName,
  lastName,
  width,
  gameTitle,
  gameID,
  publisher = "",
  imageSm,
  imageLg,
  onAccept,
  onReject,
}) => {
  const maker = `/maker/${recruiterId}`;
  const game = `/game/${gameID}`;
  return (
    <div className={s.root}>
      <Link className={s.flex}>
        <div
          className={s.maker}
          style={{
            backgroundImage: `url('${
              width < 767
                ? imageSm.replace(/^http:\/\//i, "https://")
                : imageLg.replace(/^http:\/\//i, "https://")
            }')`,
          }}
        >
          <Avatar
            className={s.avatar}
            linkTo={maker}
            firstName={firstName}
            lastName={lastName}
          />
          <p>
            <Link to={maker} className={s.linkTo}>
              {firstName} {lastName}
            </Link>{" "}
            invited you to join{" "}
            <Link to={game} className={s.linkTo}>
              {gameTitle}
            </Link>
          </p>
        </div>
        <div className={s.info}>
          <Button
            text="Accept"
            className={s.button}
            onClick={() => onAccept(id, gameTitle, publisher, false)}
          />
          <Button
            text="Ignore"
            className={s.button}
            color="transparent"
            onClick={() => onReject(id)}
          />
        </div>
      </Link>
    </div>
  );
};

TeamRequestCard.propTypes = {
  id: PropTypes.number.isRequired,
  gameID: PropTypes.number.isRequired,
  recruiterId: PropTypes.number.isRequired,
  gameTitle: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  imageSm: PropTypes.string,
  imageLg: PropTypes.string,
  publisher: PropTypes.string,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default TeamRequestCard;
