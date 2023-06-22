import { Status } from '@core/enums';
import { Movie } from '@core/models';
import { initialStatus } from '@features/movie/interfaces';
import { initialState } from '../reducers/authentication.reducers';
import {
  selectAuthenticationLoadingStatus,
  selectAuthenticationStatus,
  selectToken,
} from './authentication.selectors';

describe('Movie Selector', () => {
  let moviesMock: Movie[];
  let searchLabelMock: string;
  let tokenMock: string;

  beforeEach(() => {
    searchLabelMock = 'searchLabelMock';
    tokenMock = 'ee49e013-0a70-4c71-ad85-fe588cc40689';
    moviesMock = [
      { id: 1, title: 'movie1' },
      { id: 2, title: 'movie2' },
    ];
  });

  describe('selectAuthenticationLoadingStatus', () => {
    it('should select authenticationLoadingStatus', () => {
      const result = selectAuthenticationLoadingStatus.projector({
        ...initialState,
        authenticationLoadingStatus: initialStatus,
      });
      expect(result).toEqual(initialState.authenticationLoadingStatus);
    });
  });

  describe('selectToken', () => {
    it('should select token', () => {
      const result = selectToken.projector({
        ...initialState,
        token: tokenMock,
      });
      expect(result).toEqual(tokenMock);
    });
  });

  describe('selectAuthenticationStatus', () => {
    it('should select movies status', () => {
      const result = selectAuthenticationStatus.projector(initialStatus);
      expect(result).toBe(Status.INITIAL);
    });
  });
});
