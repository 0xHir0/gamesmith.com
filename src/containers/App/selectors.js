/*
 * App selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the app state domain
const selectAppDomain = () => state => state.get('app');

// Default selector used by App
const selectApp = () => createSelector(
  selectAppDomain(),
  substate => substate.toJS()
);

const selectAuth = () => createSelector(
  selectAppDomain(),
  state => state.get('authenticated')
);

const selectUser = () => createSelector(
  selectAppDomain(),
  state => state.get('user').toJS()
);

const selectRequests = () => createSelector(
  selectAppDomain(),
  state => state.get('requests').toJS()
);

const selectTeamRequests = () => createSelector(
  selectAppDomain(),
  state => state.get('teamRequests').toJS()
);

const selectCountries = () => createSelector(
  selectAppDomain(),
  state => state.get('countries').toJS()
);

const selectStates = () => createSelector(
  selectAppDomain(),
  state => state.get('states').toJS()
);

const selectCities = () => createSelector(
  selectAppDomain(),
  state => state.get('cities').toJS()
);

const selectIsFetchingCountries = () => createSelector(
  selectAppDomain(),
  state => state.get('isFetchingCountries')
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route');

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectHasMakerCV = () => createSelector(
  selectAppDomain(),
  state => state.get('hasMakerCV')
);
const selectisPaidStudio = () => createSelector(
  selectAppDomain(),
  state => state.get('isPaidStudio')
);

const selectCVOptionSelected = () => createSelector(
  selectAppDomain(),
  state => state.get('selectedCvOption')
);

const hasGotOption = () => createSelector(
  selectAppDomain(),
  state => state.get('isClickedCV')
);

const applozicMsgCount = () => createSelector(
  selectAppDomain(),
  state => state.get('applozicMsgCount')
);

const selectProfileViewCount = () => createSelector(
  selectAppDomain(),
  state => state.get('profileViewCount')
);

const selectIsFetchingMaker = () => createSelector(
  selectAppDomain(),
  state => state.get('isFetchingMaker')
);
const selectIsSearchingMaker = () => createSelector(
  selectAppDomain(),
  state => state.get('isFetchingMaker')
);

const selectIsFetchingToken = () => createSelector(
  selectAppDomain(),
  state => state.get('isFetchingToken')
);
const selectUserCredit = () => createSelector(
  selectAppDomain(),
  state => state.get('userCredit')
);

const selectGameMakers = () => createSelector(
  selectAppDomain(),
  // eslint-disable-next-line no-confusing-arrow
  state => state.get('isSearchingMaker') ? state.get('searchMakers').toJS() : state.get('gameMakers').toJS()
);

const selectGamesAndMakers = () => createSelector(
  selectAppDomain(),
  state => state.get('gamesAndMakers').toJS()
);

const selectJwtToken = () => createSelector(
  selectAppDomain(),
  state => state.get('jwtToken')
);

export default selectApp;
export {
  selectAuth,
  selectUser,
  selectRequests,
  selectLocationState,
  selectCountries,
  selectStates,
  selectTeamRequests,
  selectCities,
  selectIsFetchingCountries,
  selectHasMakerCV,
  selectisPaidStudio,
  selectCVOptionSelected,
  hasGotOption,
  applozicMsgCount,
  selectProfileViewCount,
  selectIsFetchingMaker,
  selectGameMakers,
  selectIsSearchingMaker,
  selectIsFetchingToken,
  selectUserCredit,
  selectGamesAndMakers,
  selectJwtToken,
};
