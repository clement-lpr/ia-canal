import { Movie } from '@core/models';
import { initialStatus, User } from '@features/movie/interfaces';

import { HttpErrorResponse } from '@angular/common/http';
import { Login, LoginComplete, LoginError, Logout } from '../actions';
import {
  AuthenticationReducers,
  AuthenticationState,
  initialState,
} from './authentication.reducers';

describe('Movie Reducers', () => {
  let moviesMock: Movie[];
  let tokenMock: string;
  let usernameMock: User;
  let errorResponseMock: HttpErrorResponse;

  beforeEach(() => {
    tokenMock = 'ee49e013-0a70-4c71-ad85-fe588cc40689';
    moviesMock = [
      { id: 1, title: 'movie1' },
      { id: 2, title: 'movie2' },
    ];
    usernameMock = {
      password: 'pswd',
      username: 'usr',
    };
    errorResponseMock = new HttpErrorResponse({
      error: 'failed',
    });
  });

  describe('Login', () => {
    it('should change authenticationLoadingStatus isLoading when Login dispatched', () => {
      const state = initialState;
      const action = Login({ user: usernameMock });
      const expected: AuthenticationState = {
        ...initialState,
        authenticationLoadingStatus: {
          ...initialStatus,
          isLoading: true,
        },
      };
      expect(AuthenticationReducers(state, action)).toEqual(expected);
    });
  });

  describe('LoginComplete', () => {
    it('should change authenticationLoadingStatus isLoaded and token when Login dispatched', () => {
      const state = initialState;
      const action = LoginComplete({ token: tokenMock });
      const expected: AuthenticationState = {
        ...initialState,
        token: tokenMock,
        authenticationLoadingStatus: {
          ...initialStatus,
          isLoaded: true,
        },
      };
      expect(AuthenticationReducers(state, action)).toEqual(expected);
    });
  });

  describe('LoginError', () => {
    it('should change authenticationLoadingStatus error when LoginError dispatched', () => {
      const state = initialState;
      const action = LoginError({ error: errorResponseMock });
      const expected: AuthenticationState = {
        ...initialState,
        authenticationLoadingStatus: {
          ...initialStatus,
          error: errorResponseMock,
        },
      };
      expect(AuthenticationReducers(state, action)).toEqual(expected);
    });
  });

  describe('Logout', () => {
    it('should change authenticationLoadingStatus token when Logout dispatched', () => {
      const state = initialState;
      const action = Logout();
      const expected: AuthenticationState = {
        ...initialState,
        token: '',
        authenticationLoadingStatus: {
          ...initialStatus,
        },
      };
      expect(AuthenticationReducers(state, action)).toEqual(expected);
    });
  });
});
