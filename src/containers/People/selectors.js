/*
 * People selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the people state domain
const selectPeopleDomain = () => state => state.get('people');

// Default selector used by People
const selectPeople = () => createSelector(
  selectPeopleDomain(),
  state => state.get('people').toJS()
);
// const selectLocation = () => createSelector(
//   selectPeopleDomain(),
//   state => state.get('location').toJS()
// );
// const selectLanguages = () => createSelector(
//   selectPeopleDomain(),
//   state => state.get('languages').toJS()
// );
const selectSearch = () => createSelector(
  selectPeopleDomain(),
  state => state.get('search').toJS()
);
const selectIsSearching = () => createSelector(
  selectPeopleDomain(),
  state => state.get('isSearching')
);
const selectOffset = () => createSelector(
  [selectPeople(), selectSearch(), selectIsSearching()],
  (people, search, isSearching) => (isSearching ? search : people).length
);
const selectIsFetching = () => createSelector(
  selectPeopleDomain(),
  state => state.get('isFetching')
);
const selectIsLastPage = () => createSelector(
  selectPeopleDomain(),
  state => state.get('isLastPage')
);

const selectShowFilter = () => createSelector(
  selectPeopleDomain(),
  state => state.get('showFilters')
);

const selectSearchedPeopleCount = () => createSelector(
  selectPeopleDomain(),
  state => state.get('count')
);


// export selectPeople and selectSearch
export {
  selectPeople,
  selectSearch,
  selectIsSearching,
  selectOffset,
  selectIsFetching,
  selectIsLastPage,
  // selectLocation,
  // selectLanguages,
  selectShowFilter,
  selectSearchedPeopleCount,
};
