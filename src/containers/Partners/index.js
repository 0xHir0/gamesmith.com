/*
 * Partners container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import s from "./styles.module.scss";
import StudioCard from "components/StudioCard";
import { createStructuredSelector } from "reselect";
import { checkAuthToken } from "../../utils";
import { openParnterMessage } from "../Modals/actions";

import {
  partnersRequest,
  studioSearch,
  toggleSearch,
  nextPageRequest,
} from "./actions";
import bannerPlaceholder from "../../data/images/banner-placeholder.png";
import logoPlaceholder from "../../data/images/logo-placeholder.jpg";
import {
  selectStudios,
  selectSearch,
  selectIsSearching,
  selectIsFetching,
  selectOffset,
  selectIsLastPage,
} from "./selectors";

class Partners extends Component {
  state = {
    isFunding: false,
  };

  componentDidMount() {
    const { onGetStudios } = this.props;
    if (this.props.params.name === "Funding") {
      onGetStudios(this.props.params.name);

      this.setState({
        isFunding: true,
      });
    } else {
      onGetStudios(this.props.params.name);
    }
    const addEvent = window.attachEvent || window.addEventListener;
    addEvent("scroll", this.handleNextPageRequest);
  }

  componentWillUnmount() {
    const removeEvent = window.detachEvent || window.removeEventListener;
    removeEvent("scroll", this.handleNextPageRequest);
  }

  handleNextPageRequest = () => {
    const {
      getNextPage,
      isFetching,
      isSearching,
      isLastPage,
      search,
      studios,
    } = this.props;
    const url = isSearching ? "" : "browse/studios";
    const offset = isSearching ? search.length : studios.length;
    if (
      (window.innerHeight + this.getScrollYPosition()) /
        document.body.scrollHeight >=
      0.95
    ) {
      !isFetching && !isLastPage && getNextPage(url, offset, "");
    }
  };

  getScrollYPosition = () => {
    const scrollLength =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    return scrollLength;
  };

  render() {
    const {
      studios,
      search,
      isFetching,
      isSearching,
      isLastPage,
      onPartnerMessage,
    } = this.props;

    return (
      <main role="main" className={s.root}>
        <h1 className={s.topHeading}>
          {this.props.params.name != "PRMarketing"
            ? this.props.params.name
            : "PR/Marketing"}
        </h1>
        {checkAuthToken() === false && this.state.isFunding
          ? (isSearching ? search : studios).map((st, idx) => (
              <div className={s.fundingfilter}>
                <StudioCard
                  key={idx}
                  id={st.id}
                  slug={st.slug}
                  name={st.name}
                  location={st.location || "set location"}
                  logo={st.logo == "" ? logoPlaceholder : st.logo}
                  bannerUrl={
                    st.bannerUrl == "" ? bannerPlaceholder : st.bannerUrl
                  }
                  isAuth={checkAuthToken() ? true : false}
                  onSignIn={onPartnerMessage}
                  partnerName={"funding"}
                />
              </div>
            ))
          : (isSearching ? search : studios).map((st, idx) => (
              <div>
                <StudioCard
                  key={idx}
                  id={st.id}
                  slug={st.slug}
                  name={st.name}
                  location={st.location || "set location"}
                  logo={st.logo == "" ? logoPlaceholder : st.logo}
                  bannerUrl={
                    st.bannerUrl == "" ? bannerPlaceholder : st.bannerUrl
                  }
                />
              </div>
            ))}

        {!isFetching && !isSearching && studios.length === 0 && (
          <h3>There are no designs to display</h3>
        )}
        {isFetching && (
          <div>
            <h3>Loading</h3>
            <div className="loader">
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
        {isLastPage && studios.length !== 0 && <h3>No more results</h3>}
      </main>
    );
  }
}

Partners.propTypes = {
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  isFetching: PropTypes.bool.isRequired,
  isSearching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  studios: PropTypes.array.isRequired,
  search: PropTypes.array.isRequired,
  onGetStudios: PropTypes.func.isRequired,
  studiosSearch: PropTypes.func.isRequired,
  onToggleSearch: PropTypes.func.isRequired,
  getNextPage: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  onSignIn: PropTypes.func,
  onPartnerMessage: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    studios: selectStudios(),
    search: selectSearch(),
    isSearching: selectIsSearching(),
    isFetching: selectIsFetching(),
    offset: selectOffset(),
    isLastPage: selectIsLastPage(),
  }),
  (dispatch) => ({
    dispatch,
    onGetStudios: (partner) => dispatch(partnersRequest(partner)),
    studiosSearch: (query) => dispatch(studioSearch(query)),
    onToggleSearch: () => dispatch(toggleSearch()),
    getNextPage: (url, offset, query) =>
      dispatch(nextPageRequest(url, offset, query)),
    onPartnerMessage: () =>
      dispatch(
        openParnterMessage(
          "invite",
          "Members Only: Please sign in or apply for membership to access this section",
          "blank",
          "blank"
        )
      ),
  })
)(Partners);
