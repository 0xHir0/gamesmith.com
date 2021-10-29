/*
 * Button component
 */

import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";

import s from "./styles.module.scss";

const Button = ({
  text,
  color = "yellow",
  to,
  disabled,
  newTab,
  className,
  icon = null,
  id,
  ...rest
}) =>
  to ? (
    to.charAt(0) === "/" ? (
      <Link
        to={to}
        title={text}
        disabled={disabled}
        target={newTab ? "_blank" : ""}
        className={`btn ${s.root} ${color} ${className || ""}`}
        {...rest}
      >
        {text}
      </Link>
    ) : (
      <a
        href={to}
        title={text}
        disabled={disabled}
        target={newTab ? "_blank" : ""}
        className={`btn ${s.root} ${color} ${className || ""}`}
        {...rest}
      >
        {text}
      </a>
    )
  ) : (
    <button
      id={id}
      title={text}
      disabled={disabled}
      className={`btn ${s.root} ${color} ${className || ""}`}
      {...rest}
    >
      {icon && <img src={icon}></img>}
      <div>{text}</div>
    </button>
  );

Button.propTypes = {
  //text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["yellow", "blue", "transparent"]),
  to: PropTypes.string,
  disabled: PropTypes.bool,
  newTab: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
