/*
 * Game selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the game state domain
const selectGameDomain = () => state => state.get('game');

// Default selector used by Game
const selectGame = () => createSelector(
  selectGameDomain(),
  state => state.get('game').toJS()
);

const selectGameInformation = () => createSelector(
  selectGameDomain(),
  state => state.get('gameInformation')
);

const selectMaker = () => createSelector(
  selectGameDomain(),
  state => state.get('makers').toJS()
);

const selectIsFetching = () => createSelector(
  selectGameDomain(),
  state => state.get('isFetching')
);

const selectIsLastPage = () => createSelector(
  selectGameDomain(),
  state => state.get('isLastPage')
);

const selectIsSearching = () => createSelector(
  selectGameDomain(),
  state => state.get('isSearching')
);
const selectIsInfoFetching = () => createSelector(
  selectGameDomain(),
  state => state.get('isInfoFetching')
);

const selectSearch = () => createSelector(
  selectGameDomain(),
  state => state.get('search').toJS()
);

// export default selectGame;
export {
  selectGame,
  selectMaker,
  selectIsFetching,
  selectIsLastPage,
  selectIsSearching,
  selectSearch,
  selectGameInformation,
  selectIsInfoFetching,
};
