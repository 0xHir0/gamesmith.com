/*
 * Join actions
 */

 import {
   MAKER_JOIN_REQUEST,
   MAKER_JOIN_SUCCESS,
   MAKER_JOIN_ERROR,
 } from './constants';

 // maker join action creators
 export function makerJoinRequest(data) {
   return {
     type: MAKER_JOIN_REQUEST,
     payload: data,
   };
 }
 export function makerJoinSuccess(message) {
   return {
     type: MAKER_JOIN_SUCCESS,
     message,
   };
 }
 export function makerJoinError(error) {
   return {
     type: MAKER_JOIN_ERROR,
     payload: error,
   };
 }
