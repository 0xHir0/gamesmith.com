/*
 * Paid filters form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import browser from "bowser";
import option from "./img/option.png";
import Button from "components/UI/Button";
import Input from "components/UI/Input";
import Select from "components/UI/Select";
import MultiSelect from "components/UI/MultiSelect";
import AutoComplete from "components/UI/AutoComplete";
import AutoCompletePaidFilter from "components/UI/AutoCompletePaidFilter";
import CountrySelect from "components/UI/CountrySelect";
import JobFamilyData from "../../data/jobFamily";
import jobPlatforms from "../../data/platforms";
import hourlyRate from "../../data/hourlyRate";
import verificationScore from "../../data/verificationScore";
import s from "./styles.module.scss";
import p from "../../containers/Home/img/p.png";
import { addSubscriber } from "../../containers/App/actions";
import platformsList from "../../data/studioPlatforms";
import FormFilters from "../FormFilters";
import searchMakerFilters from "../../data/searchMakerFilters";
import circleYellow from "../FormFilters/img/round-yellow.svg";
import workCategories from "../../data/workCategories";
import emptySquare from "./img/emptySquare.png";
import markedSquare from "./img/markedSquare.png";
import circleGrey from "../FormFilters/img/round-grey.svg";

export const fields = [
  "name",
  "filterBy",
  "currCompany",
  "pastCompany",
  "platform",
  "jobTitle",
  "gameTitle",
  "country",
  "city",
  "state",
  "verificationFilter",
  "language",
];

// const defualtValues = { name : '', currCompany : '', pastCompany : '', filterBy: 'verified', isFree: false, gameTitle: '', platform: '', jobTitle: '', country: '', city: '', state: '', verificationFilter: '', language: ''}

const clearAll = () => {
  window.location.replace("/makers");
};

class PaidFiltersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isJobFamilyLess: false,
      isPlatformLess: false,
      isShowFilters: false,
      isWorkCategory: false,
      isChecked: false,
      isSearchFilters: false,
      isFilterLess: false,
      location: "",
      termError: false,
      geoCountryId: "US",
      value: [],
      workCategoryIds: [],
    };
  }
  componentDidMount() {
    const divToBlur = document.getElementById("divToBlur");
    const blurFiler = document.getElementById("blurrFilter");
    if (blurFiler) {
      blurFiler.style.height = `${divToBlur.clientHeight}px`;
      blurFiler.style.width = `${divToBlur.clientWidth}px`;
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const divToBlur = document.getElementById("divToBlur");
    const blurFiler = document.getElementById("blurrFilter");
    if (blurFiler) {
      blurFiler.style.height = `${divToBlur.clientHeight}px`;
      blurFiler.style.width = `${divToBlur.clientWidth}px`;
    }
  }
  onSubmitSubscribeRequest = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(addSubscriber(values.email));
    });
  setRedirection = (location) => {
    this.props.history.push(location);
  };
  setGeoCountryId = (val) => {
    this.setState({
      geoCountryId: val,
    });
  };
  submitValues = () => {
    const {
      fields: {
        name,
        filterBy,
        currCompany,
        pastCompany,
        location,
        platform,
        jobTitle,
        gameTitle,
        country,
        city,
        state,
        verificationFilter,
        language,
      },
    } = this.props;
    if (!!this.props.term) {
      this.setState({ isShowFilters: false, termError: false });
      this.props.handleSearch(
        currCompany.value,
        pastCompany.value,
        gameTitle.value,
        country.value,
        this.state.geoCountryId,
        language.value,
        this.state.location
      );
    } else {
      this.setState({ termError: true });
    }
  };
  handleFilterLess = () => {
    if (this.state.isFilterLess) {
      window.scroll(0, 0);
    }
    this.setState({ isFilterLess: !this.state.isFilterLess });
  };
  handleWorkCategories = () => {
    if (this.state.isWorkCategory) {
      window.scroll(0, 0);
    }
    this.setState({ isWorkCategory: !this.state.isWorkCategory });
  };
  handlePlatformLess = () => {
    if (this.state.isPlatformLess) {
      const elmnt = document.getElementById("seeMore");
      elmnt.scrollIntoView();
    }
    this.setState({ isPlatformLess: !this.state.isPlatformLess });
  };
  handleClick = (id) => {
    const newArr = [...this.state.workCategoryIds];
    if (newArr.includes(id)) {
      newArr.splice(newArr.indexOf(id), 1);
    } else {
      newArr.push(id);
    }
    this.setState({ workCategoryIds: newArr });
  };
  clearSeach = () => {
    this.props.handlePlatformChange("all");
    this.props.handleVerificationChange("all");
    this.props.handleRateChange("all");
    this.props.handleFilterChange("Most Verified");
    this.props.handleTermChange("");
    this.setState({ workCategoryIds: [] });
  };
  handleJobFamilyLess = () => {
    if (this.state.isJobFamilyLess) {
      const elmnt = document.getElementById("showMore");
      elmnt.scrollIntoView();
    }
    // this.setState({value: this.})
    this.setState({ isJobFamilyLess: !this.state.isJobFamilyLess });
  };
  render() {
    const {
      fields: {
        name,
        filterBy,
        currCompany,
        pastCompany,
        platform,
        jobTitle,
        gameTitle,
        country,
        city,
        state,
        verificationFilter,
        language,
      },
      handleSubmit,
      filter,
      handleFilterChange,
      handleCategoryChange,
      family,
      handleFamilyChange,
      platforms,
      handlePlatformChange,
      rate,
      handleRateChange,
      verification,
      countryOptions,
      handleVerificationChange,
      term,
      handleTermChange,
      onGetSuggestions,
      maker,
    } = this.props;
    return (
      <form className={s.root} onSubmit={handleSubmit} id="formClear">
        <div className={s.searchBox}>
          <div className={s.searchBar}>
            <input
              className={s.searchInput}
              type="text"
              value={term}
              onChange={(e) => handleTermChange(e.target.value)}
              placeholder="Search for game professionals"
            />
            <button className={s.search_icon}>
            <i onClick={this.submitValues} className="fa fa-search"></i>
            </button>
          </div>
          {/*<div>*/}
          {/*  <Button className={s.filterButton} text="Filters" onClick={(e) => { this.setState({ isShowFilters: !this.state.isShowFilters }); e.preventDefault(); }}/>*/}
          {/*</div>*/}
        </div>
        {this.state.isShowFilters ? (
          <div className={s.hr}>
            <hr></hr>
            <div className={s.filters}>
              <div className={s.row} id="paidFilters">
                <div className={s.JobFamily} id="showMore">
                  <div className={s.input} id="gameTitle">
                    {browser && browser.msie ? (
                      <Input
                        label="Game Title"
                        open
                        {...gameTitle}
                        placeholder="Search for a game"
                      />
                    ) : (
                      <AutoCompletePaidFilter
                        {...gameTitle}
                        label="Game Title"
                        placeholder="Search for a game"
                        loadOptions={(query, cb) => {
                          onGetSuggestions({ url: "games", query, cb });
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className={s.JobCheck} id="seeMore">
                  <h5>Platform</h5>
                  <ul>
                    <li onClick={() => handlePlatformChange("all")}>
                      <input
                        type="radio"
                        value="all"
                        name="JobPlatform"
                        checked={platforms === "all"}
                      />{" "}
                      <div className={s.check}></div>Any Platform
                    </li>
                    <li onClick={() => handlePlatformChange("Nintendo Switch")}>
                      <input
                        type="radio"
                        value="Nintendo Switch"
                        name="JobPlatform"
                        checked={platforms === "Nintendo Switch"}
                      />
                      <div className={s.check}></div> Nintendo Switch
                    </li>
                    <li onClick={() => handlePlatformChange("PlayStation 4")}>
                      <input
                        type="radio"
                        value="PlayStation 4"
                        name="JobPlatform"
                        checked={platforms === "PlayStation 4"}
                      />{" "}
                      <div className={s.check}></div>PlayStation 4
                    </li>
                    <li onClick={() => handlePlatformChange("Xbox One")}>
                      <input
                        type="radio"
                        value="Xbox One"
                        name="JobPlatform"
                        checked={platforms === "Xbox One"}
                      />
                      <div className={s.check}></div> Xbox One
                    </li>
                  </ul>
                  {this.state.isPlatformLess ? (
                    <ul>
                      <li onClick={() => handlePlatformChange("PlayStation 3")}>
                        <input
                          type="radio"
                          value="PlayStation 3"
                          name="JobPlatform"
                          checked={platforms === "PlayStation 3"}
                        />
                        <div className={s.check}></div> PlayStation 3
                      </li>
                      <li onClick={() => handlePlatformChange("Xbox 360")}>
                        <input
                          type="radio"
                          value="Xbox 360"
                          name="JobPlatform"
                          checked={platforms === "Xbox 360"}
                        />
                        <div className={s.check}></div> Xbox 360
                      </li>
                      <li onClick={() => handlePlatformChange("IOS")}>
                        <input
                          type="radio"
                          value="IOS"
                          name="JobPlatform"
                          checked={platforms === "IOS"}
                        />
                        <div className={s.check}></div> IOS
                      </li>
                      <li onClick={() => handlePlatformChange("Android")}>
                        <input
                          type="radio"
                          value="Android"
                          name="JobPlatform"
                          checked={platforms === "Android"}
                        />
                        <div className={s.check}></div> Android
                      </li>
                      <li onClick={() => handlePlatformChange("Browser")}>
                        <input
                          type="radio"
                          value="Browser"
                          name="JobPlatform"
                          checked={platforms === "Browser"}
                        />
                        <div className={s.check}></div> Browser
                      </li>
                      <li
                        onClick={() =>
                          handlePlatformChange("Augmented Reality")
                        }
                      >
                        <input
                          type="radio"
                          value="Augmented Reality"
                          name="JobPlatform"
                          checked={platforms === "Augmented Reality"}
                        />
                        <div className={s.check}></div> Augmented Reality
                      </li>
                      <li onClick={() => handlePlatformChange("DS")}>
                        <input
                          type="radio"
                          value="DS"
                          name="JobPlatform"
                          checked={platforms === "DS"}
                        />
                        <div className={s.check}></div> DS
                      </li>
                      <li onClick={() => handleFamilyChange("PSP")}>
                        <input
                          type="radio"
                          value="PSP"
                          name="PSP"
                          checked={platforms === "PSP"}
                        />
                        <div className={s.check}></div> PSP
                      </li>
                      <li
                        onClick={() => handlePlatformChange("Virtual Reality")}
                      >
                        <input
                          type="radio"
                          value="Virtual Reality"
                          name="JobPlatform"
                          checked={platforms === "Virtual Reality"}
                        />{" "}
                        <div className={s.check}></div>Virtual Reality
                      </li>
                      <li
                        onClick={() =>
                          handlePlatformChange("Personal Computer")
                        }
                      >
                        <input
                          type="radio"
                          value="Personal Computer"
                          name="JobPlatform"
                          checked={platforms === "Personal Computer"}
                        />
                        <div className={s.check}></div> Personal Computer{" "}
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                  <p className={s.seeMore} onClick={this.handlePlatformLess}>
                    {this.state.isPlatformLess ? (
                      <span>See less categories</span>
                    ) : (
                      <span>See all categories </span>
                    )}
                  </p>
                </div>
                <div className={s.JobCheck}>
                  <h5>Verification Score</h5>
                  <ul>
                    <li onClick={() => handleVerificationChange("all")}>
                      <input
                        type="radio"
                        value="all"
                        name="VerificationScore"
                        checked={verification === "all"}
                      />
                      <div className={s.check}></div> Any Verification Score
                    </li>
                    <li onClick={() => handleVerificationChange("10 & below")}>
                      <input
                        type="radio"
                        value="10 & below"
                        name="VerificationScore"
                        checked={verification === "10 & below"}
                      />
                      <div className={s.check}></div>10 & below
                    </li>
                    <li onClick={() => handleVerificationChange("10 - 30")}>
                      <input
                        type="radio"
                        value="10 - 30"
                        name="VerificationScore"
                        checked={verification === "10 - 30"}
                      />
                      <div className={s.check}></div> 10 - 30
                    </li>
                    <li onClick={() => handleVerificationChange("30 - 60")}>
                      <input
                        type="radio"
                        value="30 - 60"
                        name="VerificationScore"
                        checked={verification === "30 - 60"}
                      />
                      <div className={s.check}></div> 30 - 60
                    </li>
                    <li onClick={() => handleVerificationChange("60 & above")}>
                      <input
                        type="radio"
                        value="60 & above"
                        name="VerificationScore"
                        checked={verification === "60 & above"}
                      />
                      <div className={s.check}></div> 60 & above
                    </li>
                  </ul>
                </div>
                <div className={s.JobCheck} id="divToBlur">
                  <div className={s.blurr} id="blurrFilter"></div>
                  <div className={s.betaButton}>
                    <h5>Hourly Rate</h5>
                    <Button className={s.btn} text="In Private Beta" />
                  </div>
                  <ul>
                    <li onClick={() => handleRateChange("all")}>
                      <input
                        type="radio"
                        value="all"
                        name="HourlyRate"
                        checked={rate === "all"}
                      />
                      <div className={s.check}></div> Any Hourly Rate
                    </li>
                    <li onClick={() => handleRateChange("$10 & below")}>
                      <input
                        type="radio"
                        value="$10 & below"
                        name="HourlyRate"
                        checked={rate === "$10 & below"}
                      />
                      <div className={s.check}></div> $10 & below
                    </li>
                    <li onClick={() => handleRateChange("$10 - $30")}>
                      <input
                        type="radio"
                        value="$10 - $30"
                        name="HourlyRate"
                        checked={rate === "$10 - $30"}
                      />
                      <div className={s.check}></div> $10 - $30
                    </li>
                    <li onClick={() => handleRateChange("$30 - $60")}>
                      <input
                        type="radio"
                        value="$30 - $60"
                        name="HourlyRate"
                        checked={rate === "$30 - $60"}
                      />
                      <div className={s.check}></div> $30 - $60
                    </li>
                    <li onClick={() => handleRateChange("$60 & above")}>
                      <input
                        type="radio"
                        value="$60 & above"
                        name="HourlyRate"
                        checked={rate === "$60 & above"}
                      />
                      <div className={s.check}></div> $60 & above
                    </li>
                  </ul>
                </div>
              </div>
              <div className={s.row}>
                <div className={s.JobFamily}>
                  <br />
                  <br />
                  <div className={s.input} id="language">
                    {browser && browser.msie ? (
                      <Input
                        label="Language"
                        open
                        {...language}
                        placeholder="Search Languages"
                      />
                    ) : (
                      <AutoCompletePaidFilter
                        {...language}
                        label="Language"
                        placeholder="Search Languages"
                        isWhite
                        loadOptions={(query, cb) => {
                          onGetSuggestions({ url: "language", query, cb });
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className={s.JobFamily}>
                  <br />
                  <br />
                  <div className={s.input} id="currCompany">
                    {browser && browser.msie ? (
                      <Input label="Past Company" open {...currCompany} />
                    ) : (
                      <AutoCompletePaidFilter
                        {...currCompany}
                        label="Current Company"
                        placeholder="Add a current company"
                        loadOptions={(query, cb) => {
                          onGetSuggestions({ url: "currCompany", query, cb });
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className={s.JobFamily}>
                  <br />
                  <br />
                  <div className={s.input} id="location">
                    {browser && browser.msie ? (
                      <Input label="Location" open {...pastCompany} />
                    ) : (
                      <AutoCompletePaidFilter
                        {...pastCompany}
                        label="Location"
                        placeholder="Search Location"
                        loadOptions={(query, cb) => {
                          onGetSuggestions({ url: "location", query, cb });
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className={s.JobFamily}>
                  <div className={s.input} id="country">
                    <h5
                      style={{
                        float: "left",
                        fontSize: "medium",
                        fontWeight: "lighter",
                      }}
                    >
                      Country
                    </h5>
                    <CountrySelect
                      id="countryId"
                      cId="US"
                      options={countryOptions}
                      setGeoCountryId={this.setGeoCountryId}
                      className="countries"
                      label="Country"
                      placeholder="Select Country..."
                      {...country}
                    />
                  </div>
                </div>
              </div>
              <div className={s.row}>
                <div className={s.JobFamily}>
                  <br />
                  <br />
                  <div className={s.input} id="pastCompany">
                    {browser && browser.msie ? (
                      <Input label="Past Company" open {...pastCompany} />
                    ) : (
                      <AutoCompletePaidFilter
                        {...pastCompany}
                        label="Past Company"
                        placeholder="Add a previous company"
                        loadOptions={(query, cb) => {
                          onGetSuggestions({ url: "pastCompany", query, cb });
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={s.row}>
                <div className={s.searchButtons}>
                  <Button
                    text="Close Filters"
                    className={s.button}
                    onClick={(e) => {
                      this.setState({
                        isShowFilters: !this.state.isShowFilters,
                      });
                      e.preventDefault();
                    }}
                  />
                  <Button
                    text="Clear"
                    className={s.button}
                    onClick={this.clearSeach}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={s.filters2}>
            {/*<div className={s.workCategories}>*/}
            {/*  <div className={s.search}>*/}
            {/*    <Button className={s.button2} text="Interested in" color="transparent" onClick={this.handleWorkCategories}/>*/}
            {/*    {*/}
            {/*      this.state.isWorkCategory ? <ul className={s.workCategoriesList}>*/}
            {/*          {workCategories.map(item =>*/}
            {/*            <li key={item.id} onClick={() => this.handleClick(item.id)}>*/}
            {/*              <img src={this.state.workCategoryIds.includes(item.id) ? markedSquare : emptySquare} alt="square" className={s.radioButton}/>*/}
            {/*              {item.label}*/}
            {/*            </li>*/}
            {/*          )}*/}
            {/*        <hr className={s.hr}></hr>*/}
            {/*        <a className={s.clear} onClick={() => this.clearSeach()}>Clear</a>*/}
            {/*        <Button className={s.saveButton} text="Save" onClick={(e) => { this.setState({ isWorkCategory: !this.state.isWorkCategory }); e.preventDefault(); }}/>*/}
            {/*      </ul> : ''*/}
            {/*    }*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className={s.divider} id="seeFilters">
              <label
                className={s.searchedLabel}
                onClick={this.handleFilterLess}
              >
                Sort by: {filter}
                <span className={s.filterIcon}>
                  <i className="fa fa-angle-down"></i>
                </span>
              </label>
              {this.state.isFilterLess ? (
                <ul className={s.SortBylist}>
                  <li onClick={() => handleFilterChange("Best Match")}>
                    <input
                      type="radio"
                      value="Best Match"
                      name="jobfilters"
                      checked={filter === "Best Match"}
                    />{" "}
                    <div className={s.circle}></div> Best Match
                  </li>
                  <li onClick={() => handleFilterChange("Most Verified")}>
                    <input
                      type="radio"
                      value="Most Verified"
                      name="jobfilters"
                      checked={filter === "Most Verified"}
                    />
                    <div className={s.circle}></div> Most Verified
                  </li>
                  {/*<li onClick={() => handleFilterChange('Most Games')}><input type="radio" value="Most Games" name="jobfilters" checked={filter === 'Most Games'}/> <div className={s.circle}></div> Most Games</li>*/}
                  {/*<li onClick={() => handleFilterChange('Most Connected')}><input type="radio" value="Most Connected" name="jobfilters" checked={filter === 'Most Connected'}/><div className={s.circle} ></div> Most Connected</li>*/}
                  {/*<li onClick={() => handleFilterChange('Most Searched')}><input type="radio" value="Most Searched" name="jobfilters" checked={filter === 'Most Searched'}/> <div className={s.circle}></div> Most Searched</li>*/}
                </ul>
              ) : (
                " "
              )}
            </div>
          </div>
        )}
      </form>
    );
  }
}

PaidFiltersForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // locationData: PropTypes.object.isRequired,
  // onClearFields: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
};

export default PaidFiltersForm = reduxForm({
  form: "paidFilters",
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(PaidFiltersForm);
