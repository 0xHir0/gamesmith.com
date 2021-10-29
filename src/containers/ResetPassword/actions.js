/*
 * Reset Password actions
 */

 import {
   RESET_PASSWORD_REQUEST,
   RESET_PASSWORD_SUCCESS,
   RESET_PASSWORD_ERROR,
 } from './constants';

 // reset password action creators
 export function resetPasswordRequest(data) {
   return {
     type: RESET_PASSWORD_REQUEST,
     payload: data,
   };
 }
 export function resetPasswordSuccess(message) {
   return {
     type: RESET_PASSWORD_SUCCESS,
     message,
   };
 }
 export function resetPasswordError(error) {
   return {
     type: RESET_PASSWORD_ERROR,
     payload: error,
   };
 }
