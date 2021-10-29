/*
 * ecosystem selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the studios state domain
const selectEcosystemDomain = () => state => state.get('ecosystem');

// Default selector used by Studios
const selectStudios = () => createSelector(
  selectEcosystemDomain(),
  state => state.get('categstudios').toJS()
);

const selectSearch = () => createSelector(
  selectEcosystemDomain(),
  state => state.get('search').toJS()
);

const selectIsSearching = () => createSelector(
  selectEcosystemDomain(),
  state => state.get('isSearching')
);

const selectIsFetching = () => createSelector(
  selectEcosystemDomain(),
  state => state.get('isFetching')
);

const selectOffset = () => createSelector(
  [selectStudios(), selectSearch(), selectIsSearching()],
  (studios, search, isSearching) => (isSearching ? search : studios).length
);

const selectIsLastPage = () => createSelector(
  selectEcosystemDomain(),
  state => state.get('isLastPage')
);
const selectPartners = () => createSelector(
  selectEcosystemDomain(),
  state => state.get('partners').toJS()
);
const selectTogglePartners = () => createSelector(
  selectEcosystemDomain(),
  state => state.get('togglePartner')
);


export {
  selectStudios,
  selectSearch,
  selectIsSearching,
  selectIsFetching,
  selectOffset,
  selectIsLastPage,
  selectPartners,
  selectTogglePartners,
};