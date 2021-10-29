/*
 * Avatar component
 */

import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";

import s from "./styles.module.scss";

const Avatar = ({
  linkTo,
  image,
  firstName = "",
  lastName,
  withText,
  className,
  isDisable,
  handleRedirect,
  ...rest
}) => {
  const initials = `${firstName.slice(0, 1)}${
    lastName ? `${lastName.slice(0, 1)}` : ""
  }`;
  return linkTo ? (
    <div onClick={() => handleRedirect(linkTo)} {...rest} className="divLink">
      <div className={`${s.wrapper} ${s.safari_only} ${className || ""}`}>
        {image ? (
          <img
            className={s.avatar}
            src={image.replace(/^http:\/\//i, "https://")}
            alt={initials}
          />
        ) : (
          <div>{initials}</div>
        )}
      </div>
      {withText && `${firstName}${lastName ? ` ${lastName.slice(0, 1)}` : ""}`}
    </div>
  ) : (
    <Link className={`${isDisable ? s.isDisabled : s.isEnabled}`} {...rest}>
      <div className={`${s.wrapper} ${className || ""}`}>
        {image ? (
          <img
            className={s.avatar}
            src={image.replace(/^http:\/\//i, "https://")}
            alt={initials}
          />
        ) : (
          <div>{initials}</div>
        )}
      </div>
      {withText && `${firstName}${lastName ? ` ${lastName.slice(0, 1)}` : ""}`}
    </Link>
  );
};

Avatar.propTypes = {
  linkTo: PropTypes.string,
  image: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  withText: PropTypes.bool,
  className: PropTypes.string,
  isDisable: PropTypes.bool,
};

export default Avatar;
