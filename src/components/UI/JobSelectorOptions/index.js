/*
 * JobSelectorOptions component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import emptySquare from "./img/emptySquare.png";
import markedSquare from "./img/markedSquare.png";

class JobSelectorOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: false };
  }
  componentWillMount() {
    this.setState({ isChecked: this.props.isSelected });
  }
  onToggleCheckbox = () => {
    const { updateQuery } = this.props;
    this.setState({ isChecked: !this.state.isChecked }, () =>
      this.props.onSelect(this.state.isChecked)
    );
    this.props.updateQuery(
      this.props.value,
      this.props.id,
      this.state.isChecked
    );
  };
  render() {
    const { value, isSelected, updateQuery, id, onSelect } = this.props;
    return (
      <div onClick={this.onToggleCheckbox} className={s.list_item}>
        <img
          src={this.state.isChecked ? markedSquare : emptySquare}
          alt="icon"
          className={s.checkBox}
        />
        <span
          className={
            this.state.isChecked ? s.text_color_selected : s.text_color
          }
        >
          {value}
        </span>
      </div>
    );
  }
}

JobSelectorOptions.propTypes = {
  value: PropTypes.string,
  isSelected: PropTypes.bool,
  updateQuery: PropTypes.func,
  id: PropTypes.number,
  onSelect: PropTypes.func,
};

export default JobSelectorOptions;
