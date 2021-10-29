/*
 * MultiJobSearchForm component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import signature from "./img/signature.svg";
import work from "./img/work.svg";
import location from "./img/location.svg";
import search from "./img/search.svg";
import filter from "./img/filter.svg";
import close from "./img/close.svg";
import refresh from "./img/refresh.svg";
import Button from "../UI/Button";

import s from "./styles.module.scss";
import CustomJobSelector from "../UI/CustomJobSelector";

class MultiJobSearchForm extends Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      term: "",
      family: [],
      location: [],
      studio: [],
      employment: [],
      queryF: [],
      queryL: [],
      queryS: [],
      queryE: [],
      defaultLocationText: "Choose Location",
      locationText: [],
      defaultFamilyText: "What's your passion?",
      familyText: [],
      defaultStudioText: "Choose Studio",
      studioText: [],
      defaultEmploymentText: "Choose Employment",
      employmentText: [],
      isShowFilters: false,
      filterCount: 0,
      countL: 0,
      countF: 0,
      countE: 0,
    };
  }
  componentWillMount() {
    const {
      family,
      locations,
      studios,
      employments,
      queryF,
      queryL,
      queryS,
      queryE,
    } = this.props;
    this.setState({
      family,
      location: locations,
      studio: studios,
      employment: employments,
      queryF,
      queryL,
      queryS,
      queryE,
    });
    this.setState({
      familyText: this.getSelectedtext(family),
      locationText: this.getSelectedtext(locations),
      employmentText: this.getSelectedtext(employments),
    });
  }
  getSelectedtext = (data) => {
    const dataSelected = data.filter((da) => da.isSelected === true);
    const dataMap = dataSelected.map((dm) => dm.label);
    return dataMap;
  };
  handleFamilySelection = (value, id, flag) => {
    if (!flag) {
      const loc = [...this.state.familyText];
      loc.push(value);
      this.setState({ familyText: loc });
      const familyData = [...this.state.family];
      const fff = familyData.map((ff) => {
        if (ff.label === value) {
          ff.isSelected = true;
        }
        return ff;
      });
      this.setState({ family: fff });
      this.props.onUpdateSearchFilter(
        fff,
        this.state.location,
        this.state.employment
      );
      if (!this.state.queryF.includes(id)) {
        this.state.queryF.push(id);
        this.props.onSearch(
          this.state.queryF,
          this.state.queryL,
          this.state.queryE,
          this.state.term
        );
      }
    } else {
      let loc = [...this.state.familyText];
      loc = loc.filter((x) => x !== value);
      this.setState({ familyText: loc });
      const familyData = [...this.state.family];
      const fff = familyData.map((ff) => {
        if (ff.label === value) {
          ff.isSelected = false;
        }
        return ff;
      });
      this.setState({ family: fff });
      this.props.onUpdateSearchFilter(
        fff,
        this.state.location,
        this.state.employment
      );
      if (this.state.queryF.includes(id)) {
        this.setState({ queryF: this.state.queryF.filter((x) => x !== id) });
        this.props.onSearch(
          this.state.queryF.filter((x) => x !== id),
          this.state.queryL,
          this.state.queryE,
          this.state.term
        );
      }
    }
  };
  handleLocationSelection = (value, id, flag) => {
    if (!flag) {
      const loc = [...this.state.locationText];
      loc.push(value);
      this.setState({ locationText: loc });
      const familyData = [...this.state.location];
      const fff = familyData.map((ff) => {
        if (ff.label === value) {
          ff.isSelected = true;
        }
        return ff;
      });
      this.props.onUpdateSearchFilter(
        this.state.family,
        fff,
        this.state.employment
      );
      if (!this.state.queryL.includes(id)) {
        this.state.queryL.push(id);
        this.props.onSearch(
          this.state.queryF,
          this.state.queryL,
          this.state.queryE,
          this.state.term
        );
      }
    } else {
      let loc = [...this.state.locationText];
      loc = loc.filter((x) => x !== value);
      this.setState({ locationText: loc });
      const familyData = [...this.state.location];
      const fff = familyData.map((ff) => {
        if (ff.label === value) {
          ff.isSelected = false;
        }
        return ff;
      });
      this.props.onUpdateSearchFilter(
        this.state.family,
        fff,
        this.state.employment
      );
      if (this.state.queryL.includes(id)) {
        // this.state.queryL.pop(id);
        this.setState({ queryL: this.state.queryL.filter((x) => x !== id) });
        this.props.onSearch(
          this.state.queryF,
          this.state.queryL.filter((x) => x !== id),
          this.state.queryE,
          this.state.term
        );
      }
    }
  };
  handleTermChange = (value) => {
    this.setState({ term: value });
    this.props.onSearch(
      this.state.queryF,
      this.state.queryL,
      this.state.queryE,
      value
    );
  };
  // handleStudioSelection = (value, id, flag) => {
  //   if (!flag) {
  //     const loc = [...this.state.studioText];
  //     loc.push(value);
  //     this.setState({ studioText: loc });
  //     const familyData = [...this.state.studio];
  //     const fff = familyData.map((ff) => {
  //       if (ff.label === value) {
  //         ff.isSelected = true;
  //       }
  //       return ff;
  //     });
  //     this.props.onUpdateSearchFilter(this.state.family, this.state.location, fff);
  //     if (!this.state.queryS.includes(id)) {
  //       this.state.queryS.push(id);
  //       this.props.onSearch(this.state.queryF, this.state.queryL, this.state.queryS);
  //     }
  //   } else {
  //     let loc = [...this.state.studioText];
  //     loc = loc.filter(x => x !== value);
  //     this.setState({ studioText: loc });
  //     const familyData = [...this.state.studio];
  //     const fff = familyData.map((ff) => {
  //       if (ff.label === value) {
  //         ff.isSelected = false;
  //       }
  //       return ff;
  //     });
  //     this.props.onUpdateSearchFilter(this.state.family, this.state.location, fff);
  //     if (this.state.queryS.includes(id)) {
  //       // this.state.queryS.pop(id);
  //       this.setState({ queryS: this.state.queryS.filter(x => x !== id) });
  //       this.props.onSearch(this.state.queryF, this.state.queryL, this.state.queryS.filter(x => x !== id));
  //     }
  //   }
  // }
  handleEmploymentSelection = (value, id, flag) => {
    if (!flag) {
      const loc = [...this.state.employmentText];
      loc.push(value);
      this.setState({ employmentText: loc });
      const familyData = [...this.state.employment];
      const fff = familyData.map((ff) => {
        if (ff.label === value) {
          ff.isSelected = true;
        }
        return ff;
      });
      this.props.onUpdateSearchFilter(
        this.state.family,
        this.state.location,
        fff
      );
      if (!this.state.queryE.includes(id)) {
        this.state.queryE.push(id);
        this.props.onSearch(
          this.state.queryF,
          this.state.queryL,
          this.state.queryE,
          this.state.term
        );
      }
    } else {
      let loc = [...this.state.employmentText];
      loc = loc.filter((x) => x !== value);
      this.setState({ employmentText: loc });
      const familyData = [...this.state.employment];
      const fff = familyData.map((ff) => {
        if (ff.label === value) {
          ff.isSelected = false;
        }
        return ff;
      });
      this.props.onUpdateSearchFilter(
        this.state.family,
        this.state.location,
        fff
      );
      if (this.state.queryE.includes(id)) {
        // this.state.queryE.pop(id);
        this.setState({ queryE: this.state.queryE.filter((x) => x !== id) });
        this.props.onSearch(
          this.state.queryF,
          this.state.queryL,
          this.state.queryE.filter((x) => x !== id),
          this.state.term
        );
      }
    }
  };
  renderText = (data, label) => {
    const length = data.length;
    const dataString = data.join(", ");
    if (length > 4) {
      return `${data.length} ${label} selected`;
    } else {
      return dataString;
    }
  };
  hideFilters = (e) => {
    if (e.target.id === "cross") {
      this.setState(
        { isShowFilters: !this.state.isShowFilters, filterCount: 0 },
        () => this.handleTotalCount(this.state.filterCount)
      );
    }
  };
  handleTotalCount = () => {
    let value = 0;
    if (this.state.countF > 0) {
      value += 1;
    }
    if (this.state.countL > 0) {
      value += 1;
    }
    if (this.state.countE > 0) {
      value += 1;
    }
    if (value > 0) {
      this.setState({ filterCount: value });
    }
  };
  handleFilterCount = (countFilter, counterLabel) => {
    if (counterLabel === "Location") {
      this.setState({ countL: countFilter });
    } else if (counterLabel === "Job Category") {
      this.setState({ countF: countFilter });
    } else if (counterLabel === "Employment Type") {
      this.setState({ countE: countFilter });
    }
  };
  reset = () => {
    let emp = [...this.state.employment];
    emp = emp.map((x) => {
      x.isSelected = false;
      return x;
    });
    let fam = [...this.state.family];
    fam = fam.map((x) => {
      x.isSelected = false;
      return x;
    });
    let loc = [...this.state.location];
    loc = loc.map((x) => {
      x.isSelected = false;
      return x;
    });
    this.setState({
      employment: emp,
      location: loc,
      family: fam,
      filterCount: 0,
      countL: 0,
      countF: 0,
      countE: 0,
    });
    this.props.onUpdateSearchFilter(
      this.state.family,
      this.state.location,
      this.state.employment
    );
    this.props.onSearch([], [], [], "");
  };
  applyFilters = () => {};
  render() {
    return (
      <div className={s.root}>
        {!this.state.isShowFilters ? (
          <div className={`row ${s.filters}`}>
            <div className={s.responsiveInput}>
              <div className={s.searchBar}>
                <i className="fa fa-search"></i>
                <input
                  className={s.searchInput}
                  type="text"
                  onChange={(e) => this.handleTermChange(e.target.value)}
                  placeholder="Search by job title or keyword"
                />
              </div>
              
            </div>
            <Button
              icon={filter}
              onClick={(e) => {
                this.setState({ isShowFilters: !this.state.isShowFilters });
                e.preventDefault();
              }}
              alt="icon"
              className={s.filterButton}
            />
            {this.state.filterCount > 0 ? (
              <div className={s.filterCount}>{this.state.filterCount}</div>
            ) : (
              ""
            )}
            <div className={s.responsiveFilters}>
              <CustomJobSelector
                icon={location}
                label="Location"
                type="location"
                option={this.state.location}
                onUpdateQuery={this.handleLocationSelection}
              />
            </div>
            <div className={s.responsiveFilters}>
              <CustomJobSelector
                icon={work}
                label="Job Category"
                type="family"
                option={this.state.family}
                onUpdateQuery={this.handleFamilySelection}
              />
            </div>
            <div className={s.responsiveFilters}>
              <CustomJobSelector
                icon={signature}
                label="Employment Type"
                type="employment"
                option={this.state.employment}
                onUpdateQuery={this.handleEmploymentSelection}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={`row ${s.filters}`}>
          {this.state.isShowFilters ? (
            <div className={s.mobileResponsiveFilters}>
              <div className={s.filterTitle}>
                <img
                  src={close}
                  alt="Icon"
                  className={s.icon}
                  id="cross"
                  onClick={(e) => this.hideFilters(e)}
                />
                <label className={s.label}>Filters</label>
                {this.state.countF > 0 ||
                this.state.countL > 0 ||
                this.state.countE > 0 ? (
                  <Button
                    text="Reset"
                    icon={refresh}
                    className={s.resetButton}
                    onClick={this.reset}
                  />
                ) : (
                  ""
                )}
              </div>
            
              <div>
                <CustomJobSelector
                  icon={location}
                  label="Location"
                  type="location"
                  option={this.state.location}
                  onUpdateQuery={this.handleLocationSelection}
                  handleCount={this.handleFilterCount}
                  count={this.state.countL}
                />
              </div>
              <div>
                <CustomJobSelector
                  icon={work}
                  label="Job Category"
                  type="family"
                  option={this.state.family}
                  onUpdateQuery={this.handleFamilySelection}
                  handleCount={this.handleFilterCount}
                  count={this.state.countF}
                />
              </div>
              <div>
                <CustomJobSelector
                  icon={signature}
                  label="Employment Type"
                  type="employment"
                  option={this.state.employment}
                  onUpdateQuery={this.handleEmploymentSelection}
                  handleCount={this.handleFilterCount}
                  count={this.state.countE}
                />
              </div>
              {/*{this.state.countF > 0 || this.state.countL > 0 || this.state.countE > 0 ?*/}
              {/*  <Button text="Apply Filters" className={s.applyFilterButton} onClick={this.applyFilters}/> : ''}*/}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

MultiJobSearchForm.propTypes = {
  family: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  locations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  studios: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  employments: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  queryF: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  queryL: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  queryE: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  queryS: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onSearch: PropTypes.func,
  onGetJobFilters: PropTypes.func,
  onUpdateSearchFilter: PropTypes.func,
};

export default MultiJobSearchForm;
