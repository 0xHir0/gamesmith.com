/*
 * CustomJobSelector component
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";

import JobSelectorOption from "../JobSelectorOptions";
import angleDown from "./img/angleDown.svg";
import angleUp from "./img/angleUp.svg";
class CustomJobSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isClicked: false,
      isCheckedCount: 0,
      filterCount: 0,
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.isOpen) this.setState({ isOpen: !this.state.isOpen });
    }
  }
  handleSelect = (checked) => {
    if (this.props.count >= 0) {
      if (checked) {
        this.setState({ filterCount: this.props.count + 1 }, () =>
          this.props.handleCount(this.state.filterCount, this.props.label)
        );
      } else {
        this.setState({ filterCount: this.props.count - 1 }, () =>
          this.props.handleCount(this.state.filterCount, this.props.label)
        );
      }
    } else {
      if (checked) {
        this.setState({ isCheckedCount: (this.state.isCheckedCount += 1) });
      } else {
        this.setState({ isCheckedCount: (this.state.isCheckedCount -= 1) });
      }
    }
  };
  renderVal = (e) => {
    if (e.target.id === "hotspot") {
      this.setState({ isOpen: !this.state.isOpen });
      // this.setState({ isClicked: true });
    }
  };
  render() {
    const {
      search,
      icon,
      label,
      type,
      option,
      onUpdateQuery,
      handleCount,
      count,
    } = this.props;
    return (
      <div
        className={s.root}
        ref={this.setWrapperRef}
        id="hotspot"
        onClick={(e) => this.renderVal(e)}
      >
        <div
          className={s.title}
          id="hotspot"
          onClick={(e) => this.renderVal(e)}
        >
          <img
            src={icon}
            alt="Icon"
            className={s.icon}
            id="hotspot"
            onClick={(e) => this.renderVal(e)}
          />
          <label
            className={
              this.state.isCheckedCount ? s.selected_label : s.custom_label
            }
            id="hotspot"
            onClick={(e) => this.renderVal(e)}
          >
            {label}
          </label>
          {count > 0 ? <div className={s.counter}>{count}</div> : ""}
          {label !== "Location" && (
            <img
              src={this.state.isOpen ? angleUp : angleDown}
              alt="Icon"
              className={s.angleDown}
              id="hotspot"
              onClick={(e) => this.renderVal(e)}
            />
          )}
        </div>
        <div className={this.state.isOpen ? s.list_option : ""}>
          <div className={s.scroll}>
            {this.state.isOpen && option && option.length > 0
              ? option.map((op, idx) => (
                  <JobSelectorOption
                    value={op.label}
                    key={idx}
                    isSelected={op.isSelected}
                    id={op.value}
                    updateQuery={onUpdateQuery}
                    onSelect={this.handleSelect}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

CustomJobSelector.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  option: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  onUpdateQuery: PropTypes.func,
  handleCount: PropTypes.func,
  count: PropTypes.number,
};

export default CustomJobSelector;
