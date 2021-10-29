/*
 * VerificationRequests selectors
 */

import { createSelector } from 'reselect';

const selectVerificationRequestsDomain = () => state => state.get('verificationRequests');

const selectUserGames = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('userGames')
);

const selectGameMakers = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('gameMakers')
);

const selectGameMakersCount = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('counter')
);

const selectIsUserGamesFetching = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('isUserGamesFetching')
);

const selectIsGameMakersFetching = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('isGameMakersFetching')
);

const selectIsNextGameMakersFetching = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('isNextGamaMakersFetching')
);

const selectNextOffsetFetching = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('nextOffset')
);

const selectUserReceivedRequests = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('receivedRequest')
);

const selectUserPendingRequests = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('pendingRequest')
);

const selectUserVerifications = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('userVerifications')
);

const selectUserVerificationFetching = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('isUserVerificationsFetching')
);


const selectVerificationCount = () => createSelector(
  selectVerificationRequestsDomain(),
  state => state.get('verificationCount')
);


export {
  selectUserGames,
  selectGameMakers,
  selectIsUserGamesFetching,
  selectIsGameMakersFetching,
  selectUserReceivedRequests,
  selectUserPendingRequests,
  selectUserVerifications,
  selectUserVerificationFetching,
  selectVerificationCount,
  selectGameMakersCount,
  selectIsNextGameMakersFetching,
  selectNextOffsetFetching,
};
