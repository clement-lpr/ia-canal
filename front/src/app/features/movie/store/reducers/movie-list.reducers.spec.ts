import { Movie } from '@core/models';
import { initialStatus } from '@features/movie/interfaces';

import { HttpErrorResponse } from '@angular/common/http';
import { MovieSearchCriteria } from '@features/movie/enums';
import { MoviesLoad, MoviesLoadComplete, MoviesLoadError } from '../actions';
import { MovieListState, MovieReducers, movieInitialState } from './movie-list.reducers';

describe('Movie list Reducers', () => {
  let errorResponseMock: HttpErrorResponse;
  let movieSearchCriteriaMock: MovieSearchCriteria;
  let moviesMock: Movie[];
  let searchLabelMock: string;
  let tokenMock: string;

  beforeEach(() => {
    searchLabelMock = 'searchLabelMock';
    tokenMock = 'ee49e013-0a70-4c71-ad85-fe588cc40689';
    errorResponseMock = new HttpErrorResponse({
      error: 'failed',
    });
    movieSearchCriteriaMock = MovieSearchCriteria.TITLE;
    moviesMock = [
      { id: 1, title: 'movie1' },
      { id: 2, title: 'movie2' },
    ];
  });

  it('should change loading status when MoviesLoad dispatched', () => {
    const state = movieInitialState;
    const action = MoviesLoad({ query: searchLabelMock, sortBy: movieSearchCriteriaMock });
    const expected: MovieListState = {
      ...movieInitialState,
      moviesLoadingStatus: {
        ...initialStatus,
        isLoading: true,
      },
    };
    expect(MovieReducers(state, action)).toEqual(expected);
  });

  it('should fill movies when MoviesLoadComplete dispatched', () => {
    const state = movieInitialState;
    const action = MoviesLoadComplete({ movies: moviesMock });
    const expected: MovieListState = {
      ...movieInitialState,
      movies: moviesMock,
      moviesLoadingStatus: {
        ...initialStatus,
        isLoaded: true,
      },
    };
    expect(MovieReducers(state, action)).toEqual(expected);
  });

  it('should fill movies when MoviesLoadComplete dispatched', () => {
    const state = movieInitialState;
    const action = MoviesLoadError({ error: errorResponseMock });
    const expected: MovieListState = {
      ...movieInitialState,
      moviesLoadingStatus: {
        ...initialStatus,
        error: errorResponseMock,
      },
    };
    expect(MovieReducers(state, action)).toEqual(expected);
  });
});
