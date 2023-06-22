import { Status } from '@core/enums';
import { Movie } from '@core/models';
import { initialStatus } from '@features/movie/interfaces';

import { movieInitialState } from '../reducers/movie-list.reducers';
import {
  selectMovieListLoadingStatus,
  selectMovieListStatus,
  selectMovies,
  selectMoviesLength,
} from './movie.selectors';

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

  describe('selectMovies', () => {
    it('should select movies list', () => {
      const result = selectMovies.projector({
        ...movieInitialState,
        movies: moviesMock,
      });
      expect(result).toEqual(moviesMock);
    });
  });

  describe('selectMoviesLength', () => {
    it('should select movies list length', () => {
      const result = selectMoviesLength.projector({
        ...movieInitialState,
        movies: moviesMock,
      });
      expect(result).toEqual(moviesMock.length);
    });
  });

  describe('selectMoviesLoadingStatus', () => {
    it('should select moviesLoadingStatus', () => {
      const result = selectMovieListLoadingStatus.projector({
        ...movieInitialState,
      });
      expect(result).toEqual(movieInitialState.moviesLoadingStatus);
    });
  });

  describe('selectMoviesStatus', () => {
    it('should select movies status', () => {
      const result = selectMovieListStatus.projector(initialStatus);
      expect(result).toBe(Status.INITIAL);
    });
  });
});
