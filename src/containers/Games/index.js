/*
 * Games container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { createStructuredSelector } from "reselect";

import {
  gamesRequest,
  gamesSearch,
  toggleSearch,
  nextPageRequest,
  makerGamesRequest,
  makerExpRequest,
} from "./actions";

import {
  selectGames,
  selectIsFetching,
  selectIsSearching,
  selectIsLastPage,
  selectSearch,
  selectMakerGames,
  selectQuery,
} from "./selectors";

import {
  openAddExp,
  openDeleteExp,
  openSignIn,
} from "containers/Modals/actions";

import GameCard from "components/GameCard";

import Button from "components/UI/Button";

import { getGameURLFromId } from "../../utils/hashingFunction";

import { selectUser } from "containers/App/selectors";

import s from "./styles.module.scss";
import { checkAuthToken } from "../../utils";

class Games extends Component {
  constructor(props) {
    super(props);
    this.timeOut = 0;
    this.state = {
      showScroller: false,
      searchInput: "",
    };
  }
  componentDidMount() {
    const addEvent = window.attachEvent || window.addEventListener;
    const { isSearching, user, onGetMakerGames, query } = this.props;
    query && this.setState({ searchInput: query });
    if (!isSearching) {
      this.props.getGames();
    }
    if (!!user.maker) {
      onGetMakerGames(user.id);
    }

    addEvent("scroll", this.handleNextPageRequest);
  }

  componentWillUnmount() {
    const removeEvent = window.detachEvent || window.removeEventListener;
    removeEvent("scroll", this.handleNextPageRequest);
    // if (this.props.isSearching) {
    //   this.props.onToggleSearch();
    // }
  }

  handleNextPageRequest = () => {
    const { getNextPage, isFetching, isSearching, isLastPage, search, games } =
      this.props;
    const url = isSearching ? "searchgame" : "browse/games";
    const query = this.state.searchInput;
    const offset = isSearching ? search.length : games.length;
    if (
      (window.innerHeight + this.getScrollYPosition()) /
        document.body.scrollHeight >=
      0.95
    ) {
      !isFetching && !isLastPage && getNextPage(url, offset, query);
    }
    if (this.getScrollYPosition() >= 710) {
      this.setState({
        showScroller: true,
      });
    } else {
      this.setState({
        showScroller: false,
      });
    }
  };

  getScrollYPosition = () => {
    const scrollLength =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    return scrollLength;
  };

  doSearch = (val) => {
    this.setState({ searchInput: val });
    if (this.timeOut) clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.props.gamesSearch(val);
    }, 500);
  };
  scrollPage() {
    document.getElementById("scorlldivGames").scrollIntoView(true);
  }

  handleRedirect = (path) => {
    if (checkAuthToken()) {
      this.props.history.push(path);
    } else {
      this.props.dispatch(openSignIn());
    }
  };

  render() {
    const {
      doc,
      games,
      search,
      isFetching,
      isSearching,
      isLastPage,
      user,
      onSignIn,
      onToggleSearch,
      makerCreditIds,
      onAddExp,
      onDeleteExp,
      onGetExperience,
    } = this.props;
    const query = this.state.searchInput && this.state.searchInput;
    return (
      <main role="main" className={s.root}>
        <div id="scorlldivGames"></div>
        <div className={s.top}>
          <h3>Games</h3>
          <div className={s.search}>
            <input
              type="text"
              onChange={(e) => {
                this.doSearch(e.target.value);
                if (!isSearching) onToggleSearch();
              }}
              placeholder="Game Title"
              value={this.state.searchInput}
            />
            <i className="fa fa-search" />
          </div>
        </div>
        <div className={s.games}>
          {(isSearching ? search : games).map((g, idx) => ( 
            <GameCard
              key={idx}
              userID={user.id}
              idx={idx}
              awards={g.awards}
              gameID={g.id}
              title={g.name}
              studio={g.publisher}
              width={doc.width}
              makerCount={g.makerCount}
              makers={g.makers}
              searchQuery={query}
              imageSm={getGameURLFromId(g.id.toString(), "550x520")}
              imageLg={getGameURLFromId(g.id.toString(), "2500x300")}
              bgdImage={g.gameCardArt ? g.gameCardArt : null}
              isMaker={!!user.maker ? true : false}
              isMakersGame={makerCreditIds.includes(g.id) ? true : false}
              onAddExp={onAddExp}
              onDeleteExp={onDeleteExp}
              onGetExperience={onGetExperience}
              onSignIn={onSignIn}
              handleRedirect={this.handleRedirect}
            />
          ))}
          {!isFetching && !isSearching && games.length === 0 && (
            <div>
              <h3>There are no games to display</h3>
              {checkAuthToken() && !!user.maker ? (
                <Button
                  text="Add Game"
                  onClick={() => onAddExp("", "", true)}
                />
              ) : (
                ""
              )}
            </div>
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
          {isSearching && !isFetching && search.length === 0 && (
            <div className={s.searchResult}>
              <h3>Game not found</h3>
              {checkAuthToken() && !!user.maker ? (
                <div>
                  <Button
                    text="Add Game"
                    onClick={() => onAddExp(query, "", true)}
                  />
                  <h4>
                    Take the glory, <br /> claim the game now!
                  </h4>
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          {isLastPage && !isSearching && <h3>No more results</h3>}
        </div>

        {this.state.showScroller ? (
          <div onClick={() => this.scrollPage()} className={s.float}>
            <i className={`fa fa-arrow-up ${s["my-float"]}`}></i>
          </div>
        ) : (
          ""
        )}
      </main>
    );
  }
}

Games.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    isSuperuser: PropTypes.bool,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  isFetching: PropTypes.bool.isRequired,
  isSearching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  games: PropTypes.array.isRequired,
  search: PropTypes.array.isRequired,
  // message: PropTypes.string.isRequired,
  getGames: PropTypes.func.isRequired,
  gamesSearch: PropTypes.func.isRequired,
  onToggleSearch: PropTypes.func.isRequired,
  getNextPage: PropTypes.func.isRequired,
  onAddExp: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  makerCreditIds: PropTypes.array.isRequired,
  onGetMakerGames: PropTypes.func.isRequired,
  onDeleteExp: PropTypes.func.isRequired,
  onGetExperience: PropTypes.func.isRequired,
  query: PropTypes.string,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    games: selectGames(),
    isFetching: selectIsFetching(),
    isLastPage: selectIsLastPage(),
    isSearching: selectIsSearching(),
    search: selectSearch(),
    makerCreditIds: selectMakerGames(),
    query: selectQuery(),
  }),
  (dispatch) => ({
    dispatch,
    onGetMakerGames: (id) => dispatch(makerGamesRequest(id)),
    getGames: () => dispatch(gamesRequest()),
    onSignIn: () => dispatch(openSignIn()),
    onAddExp: (title, studio, isNewGame, searchQuery) =>
      dispatch(
        openAddExp({
          gameTitle: title,
          studioName: studio,
          page: "games",
          isNewGame,
          searchQuery,
        })
      ),
    onGetExperience: (id, gameID) => dispatch(makerExpRequest(id, gameID)),
    gamesSearch: (query) => dispatch(gamesSearch(query)),
    onToggleSearch: () => dispatch(toggleSearch()),
    onDeleteExp: (gameID, title, searchQuery) =>
      dispatch(
        openDeleteExp({ gameID, gameTitle: title, page: "games", searchQuery })
      ),
    getNextPage: (url, offset, query) =>
      dispatch(nextPageRequest(url, offset, query)),
  })
)(Games);
