/*
 * Request card
 */

import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { acceptRequest, rejectRequest } from "containers/App/actions";

import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";

import s from "./styles.module.scss";

const RequestCard = ({
  id,
  firstName,
  avatar = "",
  lastName = "",
  role = "",
  company = "",
  onAccept,
  onReject,
}) => {
  const linkTo = `/maker/${id}`;

  return (
    <div className={s.root}>
      <div className={s.flex}>
        <div className={s.maker}>
          <Avatar
            className={s.avatar}
            linkTo={linkTo}
            image={avatar}
            firstName={firstName}
            lastName={lastName}
          />
          <Link to={linkTo}>
            <h1>{`${firstName} ${lastName}`}</h1>
            {role && (
              <h3>
                <i className="icon-briefcase"></i>
                {role}
              </h3>
            )}
            {company && <p>{company}</p>}
          </Link>
        </div>
        <div className={s.info}>
          <Button
            onClick={() => onAccept(id)}
            className={s.button}
            text="Accept"
          />
          <Button
            onClick={() => onReject(id)}
            className={s.button}
            text="Ignore"
            color="transparent"
          />
        </div>
      </div>
    </div>
  );
};

RequestCard.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  avatar: PropTypes.string,
  role: PropTypes.string,
  company: PropTypes.string,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onAccept: (id) => dispatch(acceptRequest(id)),
  onReject: (id) => dispatch(rejectRequest(id)),
}))(RequestCard);
