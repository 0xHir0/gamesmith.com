/*
 * Jobs actions
 */

import {
  EMPLOYER_APPLY_REQUEST,
} from './constants';

export function applyAsEmployerRequest(data) {
  return {
    type: EMPLOYER_APPLY_REQUEST,
    payload: data
  };
}