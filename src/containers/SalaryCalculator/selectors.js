/*
 * SalaryCalculator selectors
 */

import { createSelector } from 'reselect';


// Direct selector to the people state domain
const selectSalaryCalculatorDomain = () => state => state.get('salary');

// Default selector used by People
const selectSalary = () => createSelector(
  selectSalaryCalculatorDomain(),
  state => state.get('salary').toJS()
);


const selectValue = () => createSelector(
  selectSalaryCalculatorDomain(),
  state => state.get('value')
);

const selectCurrentSalary = () => createSelector(
  selectSalaryCalculatorDomain(),
  state => state.get('currentSalary')
);

const selectTitle = () => createSelector(
  selectSalaryCalculatorDomain(),
  state => state.get('title')
);

const selectIsSearching = () => createSelector(
  selectSalaryCalculatorDomain(),
  state => state.get('isSearching')
);

const selectIsFetching = () => createSelector(
  selectSalaryCalculatorDomain(),
  state => state.get('isFetching')
);

const selectJobs = () => createSelector(
  selectSalaryCalculatorDomain(),
  state => state.get('jobs')
);

const selectFlag = () => createSelector(
  selectSalaryCalculatorDomain(),
  state => state.get('flag')
);

const selectTitles = () => createSelector(
  selectSalaryCalculatorDomain(),
  state => state.get('titles')
);

// export selectPeople and selectSearch
export {
  selectIsSearching,
  selectIsFetching,
  selectValue,
  selectTitle,
  selectSalary,
  selectCurrentSalary,
  selectJobs,
  selectFlag,
  selectTitles,
};
