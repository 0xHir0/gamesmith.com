/*
 * ecosystem selectors
 */

import { createSelector } from 'reselect';

const selectSignUpDomain = () => state => state.get('signUp');

const selectIsError = () => createSelector(
  selectSignUpDomain(),
  state => state.get('isError')
);

const selectCvUrl = () => createSelector(
  selectSignUpDomain(),
  state => state.get('cvUrl')
);


export {
  selectIsError,
  selectCvUrl,
};
