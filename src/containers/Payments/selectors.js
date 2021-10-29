/*
 * Payments selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the payments state domain
const selectPaymentsDomain = () => state => state.get('payments');

// Default selector used by Payments
const selectPayments = () => createSelector(
  selectPaymentsDomain(),
  substate => substate.toJS()
);

export default selectPayments;
