/*
 * CompanyEmployees selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the companyEmployees state domain
const selectCompanyEmployeesDomain = () => state => state.get('companyEmployees');

// Default selector used by CompanyEmployees
const selectCompanyEmployees = () => createSelector(
  selectCompanyEmployeesDomain(),
  state => state.get('makers').toJS()
);

const selectIsFetching = () => createSelector(
  selectCompanyEmployeesDomain(),
  state => state.get('isFetching')
);

const selectIsLastPage = () => createSelector(
  selectCompanyEmployeesDomain(),
  state => state.get('isLastPage')
);


export {
  selectCompanyEmployees,
  selectIsLastPage,
  selectIsFetching,
};
