/*
 * Games selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the games state domain
const selectGamesDomain = () => state => state.get('games');

// Default selector used by Games
const selectGames = () => createSelector(
  selectGamesDomain(),
  state => state.get('games').toJS()
);

const selectIsFetching = () => createSelector(
  selectGamesDomain(),
  state => state.get('isFetching')
);

const selectIsSearching = () => createSelector(
  selectGamesDomain(),
  state => state.get('isSearching')
);

const selectMakerGames = () => createSelector(
  selectGamesDomain(),
  state => state.get('makerGameIds').toJS()
);

const selectIsLastPage = () => createSelector(
  selectGamesDomain(),
  state => state.get('isLastPage')
);

const selectSearch = () => createSelector(
  selectGamesDomain(),
  state => state.get('search').toJS()
);
const selectQuery = () => createSelector(
  selectGamesDomain(),
  state => state.get('query')
);


export {
  selectGames,
  selectIsFetching,
  selectIsSearching,
  selectIsLastPage,
  selectSearch,
  selectMakerGames,
  selectQuery,
};
