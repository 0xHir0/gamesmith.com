/*
 * Partners selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the studios state domain
const selectStudiosDomain = () => state => state.get('studios');

// Default selector used by Studios
const selectStudios = () => createSelector(
  selectStudiosDomain(),
  state => state.get('studios').toJS()
);

const selectSearch = () => createSelector(
  selectStudiosDomain(),
  state => state.get('search').toJS()
);

const selectIsSearching = () => createSelector(
  selectStudiosDomain(),
  state => state.get('isSearching')
);

const selectIsFetching = () => createSelector(
  selectStudiosDomain(),
  state => state.get('isFetching')
);

const selectOffset = () => createSelector(
  [selectStudios(), selectSearch(), selectIsSearching()],
  (studios, search, isSearching) => (isSearching ? search : studios).length
);

const selectIsLastPage = () => createSelector(
  selectStudiosDomain(),
  state => state.get('isLastPage')
);

export {
  selectStudios,
  selectSearch,
  selectIsSearching,
  selectIsFetching,
  selectOffset,
  selectIsLastPage,
};