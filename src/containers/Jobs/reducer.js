/*
 * Jobs reducer
 */

import { fromJS } from 'immutable';
import { orderBy, map, startCase, toLower } from 'lodash';
import JobFamily from '../../data/jobPassions';
import employment from '../../data/employment';
import {
  JOBS_REQUEST,
  JOBS_SUCCESS,
  JOBS_ERROR,
  TOGGLE_SEARCH,
  SEARCH_JOBS_REQUEST,
  SEARCH_JOBS_SUCCESS,
  SEARCH_JOBS_ERROR,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  CLEAR_SEARCH_PEOPLE,
  GEO_LOCATION_REQUEST,
  GEO_LOCATION_SUCCESS,
  GEO_LOCATION_ERROR,
  GET_JOBS_DATA_TYPE_REQUEST,
  GET_JOBS_DATA_TYPE_SUCCESS,
  JOBS_SORTER_REQUEST,
  SEARCH_JOBS_FILTER,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  isFetchingFilter: false,
  isSearching: false,
  isLastPage: false,
  jobs: [],
  search: [],
  message: '',
  location: {},
  family: fromJS(jobsToArray(JobFamily)),
  locations: [],
  studios: [],
  employments: fromJS(jobsToArray(employment)),
  sorter: 'repostedAt',
  sortType: 'desc',
  isSearchingJob: false,
  queryF: [],
  queryL: [],
  queryS: [],
  queryE: [],
  jobCountries: [],
  queryText: '',
});

function jobsReducer(state = initialState, action) {
  switch (action.type) {
    case JOBS_REQUEST:
      return state
        .set('isSearchingJob', false)
        .set('isFetching', true)
        .set('isSearching', false)
        .set('message', '');
    case JOBS_SUCCESS:
      const sortedJobs = orderBy(action.data, [state.get('sorter')], [state.get('sortType')]);
      const jobCountries = sortedJobs && sortedJobs.length > 0 && sortedJobs.map(job => job.address && job.address.country);
      const uniqJobcountries = jobCountries.filter(cn => cn && cn.length > 1);
      const uniqueJobcountries = Array.from(new Set(uniqJobcountries)).sort();
      return state
        .set('isFetching', false)
        .set('jobs', fromJS(sortedJobs))
        .set('jobCountries', locationToArray(uniqueJobcountries))
        .set('message', '');
    case JOBS_SORTER_REQUEST:
      const { data, sorter, type, isSearch } = action.payload;
      const onSort = sorter === 'title' ? 'role.name' : sorter === 'family' ? 'jobFamilies' : sorter === 'location' ? 'address.city' : 'company.name';
      const bySort = type ? 'asc' : 'desc';
      const sortedData = orderBy(data, [onSort], [bySort]);
      const sortTarget = isSearch ? 'search' : 'jobs';
      return state
        .set(sortTarget, fromJS(sortedData))
        .set('message', '')
        .set('sorter', onSort)
        .set('sortType', bySort);
    case JOBS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case GEO_LOCATION_REQUEST:
      return state
        .set('isFetching', false)
        .set('isSearching', false)
        .set('message', '');
    case GEO_LOCATION_SUCCESS:
      const customOption = { label: 'All', value: '' };
      action.data.country.unshift(customOption);
      action.data.state.unshift(customOption);
      action.data.city.unshift(customOption);
      return state
        .set('isFetching', false)
        .set('location', fromJS(action.data))
        .set('message', '');
    case GEO_LOCATION_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case TOGGLE_SEARCH:
      return state
        .set('isSearching', !state.get('isSearching'));
    case SEARCH_JOBS_REQUEST:
      return state
        .set('isSearchingJob', true)
        .set('isFetching', true)
        .set('isLastPage', false)
        .set('isSearching', true)
        .set('search', fromJS([]))
        .set('message', '')
        .set('queryText', action.payload.queryT)
        .set('queryF', Array.isArray(action.payload.query.queryF) ? fromJS(action.payload.query.queryF) : fromJS([]))
        .set('queryL', Array.isArray(action.payload.query.queryL) ? fromJS(action.payload.query.queryL) : fromJS([]))
        .set('queryE', Array.isArray(action.payload.query.queryE) ? fromJS(action.payload.query.queryE) : fromJS([]));
    case SEARCH_JOBS_SUCCESS:
      const sortedSearch = orderBy(action.data, [state.get('sorter')], [state.get('sortType')]);
      return state
        .set('isFetching', false)
        .set('search', Array.isArray(sortedSearch) ? fromJS(sortedSearch) : fromJS([]))
        .set('isLastPage', action.data.length < 20)
        .set('message', '');
    case SEARCH_JOBS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case NEXT_PAGE_REQUEST:
      return state
        .set('isFetching', true);
    case NEXT_PAGE_SUCCESS: {
      const target = state.get('isSearching') ? 'search' : 'jobs';
      return state
        .set('isFetching', false)
        .set(target, fromJS(orderBy(state.get(target).concat(action.data).toJS(), [state.get('sorter')], [state.get('sortType')])))
        .set('isLastPage', action.data.length < 20)
        .set('message', '');
    }
    case NEXT_PAGE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case CLEAR_SEARCH_PEOPLE:
      return state
        .set('isFetching', false)
        .set('search', fromJS([]))
        .set('isLastPage', false)
        .set('isSearching', false);
    case GET_JOBS_DATA_TYPE_REQUEST:
      return state
        .set('isFetchingFilter', true)
        .set('isFetching', true)
        .set('isSearching', false)
        .set('message', '');
    case GET_JOBS_DATA_TYPE_SUCCESS:
      const LocationData = state.get('locations').toJS() && state.get('locations').toJS().length ? state.get('locations') : fromJS(locationToArray(action.data.locations));
      // const StudioData = state.get('studios').toJS() && state.get('studios').toJS().length ? state.get('studios') : fromJS(studioToArray(action.data.studios));
      return state
        .set('isFetchingFilter', false)
        .set('locations', LocationData)
        // .set('studios', StudioData);
    case SEARCH_JOBS_FILTER:
      return state
        .set('family', fromJS(action.payload.familyList))
        .set('locations', fromJS(action.payload.locationList))
        // .set('studios', fromJS(action.payload.studioList))
        .set('employments', fromJS(action.payload.employmentList));
    default:
      return state;
  }
}

function studioToArray(data) {
  const result = data && data.length > 0 ? map(data, (val) => {
    return { label: val.name, value: val.id, isSelected: false };
  }) : '';
  return result;
}
function locationToArray(data) {
  const result = data && data.length > 1 ? map(data, (val) => {
    return { label: startCase(toLower(val)), value: val, isSelected: false };
  }) : '';
  return result;
}
function jobsToArray(data){
  const result = map(data, (val) => {
    return { label: val.label, value: val.value, isSelected: false };
  });
  return result;
}

export default jobsReducer;
