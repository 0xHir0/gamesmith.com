/*
 * GameDetails selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the gameDetails state domain
const selectGameDetailsDomain = () => state => state.get('gameDetails');

// Default selector used by GameDetails
const selectGameDetails = () => createSelector(
  selectGameDetailsDomain(),
  substate => substate.toJS()
);

export default selectGameDetails;
