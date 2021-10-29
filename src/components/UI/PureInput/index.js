/*
 * Pure Input component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

class PureInput extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
    const { value, ...rest } = this.props;
    return <input value={value} {...rest} />;
  }
}

PureInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default PureInput;
