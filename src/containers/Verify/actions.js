/*
 * Verify actions
 */

 import {
   VERIFY_REQUEST,
   VERIFY_SUCCESS,
   VERIFY_ERROR,
 } from './constants';

 // verify action creators
 export function verifyRequest(data) {
   return {
     type: VERIFY_REQUEST,
     payload: data,
   };
 }
 export function verifySuccess(message) {
   return {
     type: VERIFY_SUCCESS,
     message,
   };
 }
 export function verifyError(message) {
   return {
     type: VERIFY_ERROR,
     message,
   };
 }
