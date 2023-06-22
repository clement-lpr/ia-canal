import { LoadingStatus, initialStatus } from '@features/movie/interfaces';
import { createReducer, on } from '@ngrx/store';

import { Movie } from '@core/models';
import * as fromActions from '../actions';

export interface MovieListState {
  movies: Movie[];
  moviesLoadingStatus: LoadingStatus;
}

export const movieInitialState: MovieListState = {
  movies: [],
  moviesLoadingStatus: initialStatus,
};

export const MovieReducers = createReducer(
  movieInitialState,
  // Movie list
  on(
    fromActions.MoviesLoad,
    (state: MovieListState): MovieListState => ({
      ...state,
      moviesLoadingStatus: {
        ...initialStatus,
        isLoading: true,
      },
    }),
  ),
  on(
    fromActions.MoviesLoadComplete,
    (state: MovieListState, { movies }): MovieListState => ({
      ...state,
      moviesLoadingStatus: {
        ...initialStatus,
        isLoaded: true,
      },
      movies: movies,
    }),
  ),
  on(
    fromActions.MoviesLoadError,
    (state: MovieListState, { error }): MovieListState => ({
      ...state,
      moviesLoadingStatus: {
        ...initialStatus,
        error,
      },
    }),
  ),
);
