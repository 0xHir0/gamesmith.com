/*
 * VerificationsCard Component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import Avatar from "../UI/Avatar";

class VerificationsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      index,
      userId,
      creditId,
      gameName,
      verifiedById,
      verifiedByFirstName,
      verifiedByLastName,
      verifiedByImgURl,
      verifiedId,
      verifiedFirstName,
      verifiedLastName,
      verifiedImgUrl,
      createdAt,
    } = this.props;
    return (
      <div className={s.root}>
        {verifiedById === userId ? (
          <div>
            <div className={s.row}>
              <Avatar
                className={s.avatar}
                firstName={verifiedFirstName}
                lastName={verifiedLastName}
                image={verifiedImgUrl}
              />
            </div>
            <div className={s.verificationLine}>
              <p className={s.verification}>
                You've verified{" "}
                <span className={s.highlight}>{verifiedFirstName}</span> for
                their work on <span className={s.highlight}>{gameName}</span>
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className={s.row}>
              <Avatar
                className={s.avatar}
                firstName={verifiedByFirstName}
                lastName={verifiedByLastName}
                image={verifiedByImgURl}
              />
            </div>
            <div className={s.verificationLine}>
              <p className={s.verification}>
                <span className={s.highlight}>{verifiedByFirstName}</span> have
                verified you for your work on{" "}
                <span className={s.highlight}>{gameName}</span>.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

VerificationsCard.propTypes = {
  index: PropTypes.number,
  gameName: PropTypes.string,
  userId: PropTypes.number,
  creditId: PropTypes.number,
  verifiedById: PropTypes.number,
  verifiedByFirstName: PropTypes.string,
  verifiedByLastName: PropTypes.string,
  verifiedByImgURl: PropTypes.string,
  verifiedId: PropTypes.number,
  verifiedFirstName: PropTypes.string,
  verifiedLastName: PropTypes.string,
  verifiedImgUrl: PropTypes.string,
  createdAt: PropTypes.string,
};
export default VerificationsCard;
