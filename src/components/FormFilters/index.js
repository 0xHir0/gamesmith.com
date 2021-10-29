/*
 *Form Filters
 */

import React from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import circleGrey from "./img/round-grey.svg";
import circleYellow from "./img/round-yellow.svg";

class FormFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isJobFamilyLess: false,
      isPlatformLess: false,
      isChecked: false,
    };
  }
  handleClick() {
    this.setState({ isChecked: !this.state.isChecked });
  }
  render() {
    const { name, data } = this.props;
    if (data && data.length > 5) {
      return (
        <div className={s.column}>
          <h5>{name}</h5>
          <div>
            <ul>
              {data.map((item) => (
                <li onClick={() => this.handleClick()}>
                  <img
                    src={this.state.isChecked ? circleYellow : circleGrey}
                    alt="circle"
                    className={s.radioButton}
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h5>{name}</h5>
          <div>
            <ul>
              {data.map((item) => (
                <li onClick={() => this.handleClick()}>
                  <img
                    src={this.state.isChecked ? circleYellow : circleGrey}
                    alt="circle"
                    className={s.radioButton}
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }
}
FormFilters.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string.isRequired,
};

export default FormFilters;
