/*
 * Settings selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the settings state domain
const selectSettingsDomain = () => state => state.get('settings');

// Default selector used by Settings
const selectSettings = () => createSelector(
  selectSettingsDomain(),
  state => state.toJS()
);
const selectStudio = () => createSelector(
  selectSettingsDomain(),
  state => state.get('studioData')
)

const selectExpYear = () => createSelector(
  selectSettingsDomain(),
  state => state.get('expYear')
)

const selectExpMonth = () => createSelector(
  selectSettingsDomain(),
  state => state.get('expMonth')
)

const selectCardLast4 = () => createSelector(
  selectSettingsDomain(),
  state => state.get('cardLast4')
)

const selectNextBillingDate = () => createSelector(
  selectSettingsDomain(),
  state => state.get('nextBillingDate')
)


// export default selectSettings;
export {
  selectSettings,
  selectStudio,
  selectExpYear,
  selectExpMonth,
  selectCardLast4,
  selectNextBillingDate,
};
