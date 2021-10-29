/*
 * Unsubscribe actions
 */

 import {
   UNSUBSCRIBE_REQUEST,
   UNSUBSCRIBE_SUCCESS,
   UNSUBSCRIBE_ERROR,
 } from './constants';

 // Unsubscribe email action creators
 export function unsubscribeRequest(code) {
   return {
     type: UNSUBSCRIBE_REQUEST,
     payload: {
       code,
     },
   };
 }
 export function unsubscribeSuccess(message) {
   return {
     type: UNSUBSCRIBE_SUCCESS,
     message,
   };
 }
 export function unsubscribeError(error) {
   return {
     type: UNSUBSCRIBE_ERROR,
     payload: error,
   };
 }
