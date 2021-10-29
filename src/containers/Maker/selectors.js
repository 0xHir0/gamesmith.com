/*
 * Maker selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the maker state domain
const selectMakerDomain = () => state => state.get('maker');

// Default selector used by Maker
// const selectMaker = () => createSelector(
//   selectMakerDomain(),
//   substate => substate.toJS()
// );


const selectMaker = () => createSelector(
  selectMakerDomain(),
  state => state.get('maker').toJS()
);

const selectMakerCredits = () => createSelector(
  selectMakerDomain(),
  state => state.get('makerCredits').toJS()
);
const selectIsFetching = () => createSelector(
  selectMakerDomain(),
  state => state.get('isFetching')
);

const selectIsCvUploaded = () => createSelector(
  selectMakerDomain(),
  state => state.get('isCvUploaded')
)
const selectIsCvDeleted = () => createSelector(
  selectMakerDomain(),
  state => state.get('isDeleted')
)

// export default selectMaker;
export {
  selectMaker,
  selectMakerCredits,
  selectIsFetching,
  selectIsCvUploaded,
  selectIsCvDeleted,
};
