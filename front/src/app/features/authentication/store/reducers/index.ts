import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuthentication from './authentication.reducers';

export const authenticationKey = 'authentication';

export interface AuthenticationState {
  [authenticationKey]: fromAuthentication.AuthenticationState;
}

export function authenticationReducers(state: AuthenticationState | undefined, action: Action) {
  return combineReducers({
    [authenticationKey]: fromAuthentication.AuthenticationReducers,
  })(state, action);
}

export const selectAuthenticationState =
  createFeatureSelector<AuthenticationState>(authenticationKey);

export const selectAuthentication = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => {
    return state?.[authenticationKey] || fromAuthentication.initialState;
  },
);
