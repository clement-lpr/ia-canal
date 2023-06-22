import { createReducer, on } from '@ngrx/store';

import { LoadingStatus, initialStatus } from '@core/interfaces';
import * as fromActions from '../actions';

export interface AuthenticationState {
  authenticationLoadingStatus: LoadingStatus;
  token: string;
}

export const initialState: AuthenticationState = {
  authenticationLoadingStatus: initialStatus,
  token: '',
};

export const AuthenticationReducers = createReducer(
  initialState,
  // Authentication
  on(
    fromActions.Login,
    (state: AuthenticationState): AuthenticationState => ({
      ...state,
      authenticationLoadingStatus: {
        ...initialStatus,
        isLoading: true,
      },
    }),
  ),
  on(
    fromActions.LoginComplete,
    (state: AuthenticationState, { token }): AuthenticationState => ({
      ...state,
      authenticationLoadingStatus: {
        ...initialStatus,
        isLoaded: true,
      },
      token,
    }),
  ),
  on(
    fromActions.LoginError,
    (state: AuthenticationState, { error }): AuthenticationState => ({
      ...state,
      authenticationLoadingStatus: {
        ...initialStatus,
        error,
      },
    }),
  ),
  on(
    fromActions.Logout,
    (state: AuthenticationState): AuthenticationState => ({
      ...state,
      authenticationLoadingStatus: initialStatus,
      token: '',
    }),
  ),
);
