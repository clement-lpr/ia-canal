import { Status } from '@core/enums';
import { createSelector } from '@ngrx/store';

import { LoadingStatus } from '@core/interfaces';
import * as fromReducers from '../reducers';
import * as fromAuthentication from '../reducers/authentication.reducers';

export const selectToken = createSelector(
  fromReducers.selectAuthentication,
  (state: fromAuthentication.AuthenticationState): string => {
    return state.token;
  },
);

export const selectAuthenticationLoadingStatus = createSelector(
  fromReducers.selectAuthentication,
  (state: fromAuthentication.AuthenticationState): LoadingStatus => {
    return state.authenticationLoadingStatus;
  },
);

export const selectAuthenticationStatus = createSelector(
  selectAuthenticationLoadingStatus,
  (status: LoadingStatus) => {
    if (status.isLoading) {
      return Status.PROCESSING;
    }
    if (status.isLoaded) {
      return status.error ? Status.FAIL : Status.SUCCESS;
    }
    return Status.INITIAL;
  },
);
