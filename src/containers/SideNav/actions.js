/*
 * Side nav actions
 */

import {
  SHOW_NAV,
  HIDE_NAV,
} from './constants';

export function showSideNav() {
  return {
    type: SHOW_NAV,
  };
}

export function hideSideNav() {
  return {
    type: HIDE_NAV,
  };
}
