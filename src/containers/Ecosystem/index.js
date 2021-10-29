import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Partner from "components/Partner";
import s from "./styles.module.scss";

import StudioCard from "components/StudioCard";
import bannerPlaceholder from "../../data/images/banner-placeholder.png";
import logoPlaceholder from "../../data/images/logo-placeholder.jpg";

import {
  selectStudios,
  selectSearch,
  selectIsSearching,
  selectIsFetching,
  selectOffset,
  selectIsLastPage,
  selectPartners,
  selectTogglePartners,
} from "./selectors";

import {
  studiosRequest,
  studioSearch,
  toggleSearch,
  nextPageRequest,
  checkPartner,
  getPartnerRequest,
} from "./actions";

import { openAddStudio } from "../Modals/actions";

import { selectUser } from "containers/App/selectors";

class Ecosystem extends Component {
  componentDidMount() {
    const { onGetStudios } = this.props;
    onGetStudios();
    const addEvent = window.attachEvent || window.addEventListener;
    this.props.onCheckPartner();
    addEvent("scroll", this.handleNextPageRequest);
  }
  componentWillUnmount() {
    const removeEvent = window.detachEvent || window.removeEventListener;
    removeEvent("scroll", this.handleNextPageRequest);
  }

  getScrollYPosition = () => {
    const scrollLength =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    return scrollLength;
  };

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
  render() {
    const {
      doc,
      partners,
      togglePartners,
      studios,
      isFetching,
      isSearching,
      isLastPage,
    } = this.props;

    return (
      <main role="main" className={s.root}>
        {togglePartners && doc.width > 1024 ? (
          <div className={s.ddPartners}>
            {partners.length > 0 ? (
              <div>
                <Partner
                  onGetPartnerInfo={this.props.onGetPartnerInfo}
                  partners={this.props.partners}
                  doc={doc}
                  onAddStudio={this.props.onAddStudio}
                />
              </div>
            ) : (
              <h3 className={s.noPartners}>There are no partners to display</h3>
            )}
          </div>
        ) : (
          <div>
            {partners.length > 0 && doc.width < 1025 ? (
              <Partner
                onGetPartnerInfo={this.props.onGetPartnerInfo}
                partners={this.props.partners}
                doc={doc}
                onAddStudio={this.props.onAddStudio}
              />
            ) : (
              <div></div>
            )}
          </div>
        )}
        <div className={s.studios}>
          {studios.map((s, idx) => (
            <StudioCard
              key={idx}
              id={s.id}
              slug={s.slug}
              name={s.name}
              location={s.location || "set location"}
              logo={s.logo == "" ? logoPlaceholder : s.logo}
              bannerUrl={s.bannerUrl == "" ? bannerPlaceholder : s.bannerUrl}
            />
          ))}
          {!isFetching && !isSearching && studios.length === 0 && (
            <h3>There are no studios to display</h3>
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
        </div>
      </main>
    );
  }
}

Ecosystem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  onGetPartnerInfo: PropTypes.func.isRequired,
  onCheckPartner: PropTypes.func.isRequired,
  onSignIn: PropTypes.func,
  togglePartners: PropTypes.bool,
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
  onAddStudio: PropTypes.func.isRequired,
  partners: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
export default connect(
  createStructuredSelector({
    user: selectUser(),
    partners: selectPartners(),
    togglePartners: selectTogglePartners(),
    studios: selectStudios(),
    search: selectSearch(),
    isSearching: selectIsSearching(),
    isFetching: selectIsFetching(),
    offset: selectOffset(),
    isLastPage: selectIsLastPage(),
  }),
  (dispatch) => ({
    dispatch,
    onCheckPartner: () => dispatch(checkPartner()),
    onGetPartnerInfo: (partner) => dispatch(getPartnerRequest(partner)),
    onGetStudios: () => dispatch(studiosRequest()),
    studiosSearch: (query) => dispatch(studioSearch(query)),
    onToggleSearch: () => dispatch(toggleSearch()),
    getNextPage: (url, offset, query) =>
      dispatch(nextPageRequest(url, offset, query)),
    onAddStudio: (company) => dispatch(openAddStudio(company)),
  })
)(Ecosystem);
