/*
 * Jobs selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the jobs state domain
const selectJobsDomain = () => state => state.get('jobs');

// Default selector used by Jobs
const selectJobs = () => createSelector(
  selectJobsDomain(),
  state => state.get('jobs').toJS()
);

// Default selector used by Jobs
const selectLocation = () => createSelector(
  selectJobsDomain(),
  state => state.get('location').toJS()
);
const selectSearch = () => createSelector(
  selectJobsDomain(),
  state => state.get('search').toJS()
);
const selectIsSearching = () => createSelector(
  selectJobsDomain(),
  state => state.get('isSearching')
);
const selectIsFetching = () => createSelector(
  selectJobsDomain(),
  state => state.get('isFetching')
);
const selectOffset = () => createSelector(
  [selectJobs(), selectSearch(), selectIsSearching()],
  (jobs, search, isSearching) => (isSearching ? search : jobs).length
);
const selectIsLastPage = () => createSelector(
  selectJobsDomain(),
  state => state.get('isLastPage')
);
const selectFamily = () => createSelector(
  selectJobsDomain(),
  state => state.get('family').toJS()
);
const selectEmployments = () => createSelector(
  selectJobsDomain(),
  state => state.get('employments').toJS()
);
const selectLocations = () => createSelector(
  selectJobsDomain(),
  state => state.get('locations').toJS()
);
const selectStudios = () => createSelector(
  selectJobsDomain(),
  state => state.get('studios')
);
const selectIsFetchingFilter = () => createSelector(
  selectJobsDomain(),
  state => state.get('isFetchingFilter')
);

const selectQueryF = () => createSelector(
  selectJobsDomain(),
  state => state.get('queryF').toJS()
);
const selectQueryL = () => createSelector(
  selectJobsDomain(),
  state => state.get('queryL').toJS()
);
const selectQueryS = () => createSelector(
  selectJobsDomain(),
  state => state.get('queryS').toJS()
);
const selectQueryE = () => createSelector(
  selectJobsDomain(),
  state => state.get('queryE').toJS()
);
const selectIsJobSearching = () => createSelector(
  selectJobsDomain(),
  state => state.get('isSearchingJob')
);
const selectJobCountries = () => createSelector(
  selectJobsDomain(),
  state => state.get('jobCountries')
)
const selectQueryText = () => createSelector(
  selectJobsDomain(),
  state => state.get('queryText')
)

// export selectPeople and selectSearch
export {
  selectJobs,
  selectSearch,
  selectIsSearching,
  selectIsFetching,
  selectOffset,
  selectIsLastPage,
  selectLocation,
  selectFamily,
  selectEmployments,
  selectLocations,
  selectStudios,
  selectIsFetchingFilter,
  selectQueryF,
  selectQueryL,
  selectQueryS,
  selectQueryE,
  selectIsJobSearching,
  selectJobCountries,
  selectQueryText,
};
