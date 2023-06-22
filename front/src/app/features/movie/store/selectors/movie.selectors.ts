import { Status } from '@core/enums';
import { Movie } from '@core/models';
import { LoadingStatus } from '@features/movie/interfaces';
import { createSelector } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromMovies from '../reducers/movie-list.reducers';

export const selectMovies = createSelector(
  fromReducers.selectMovieList,
  (state: fromMovies.MovieListState): Movie[] => {
    return state.movies;
  },
);

export const selectMoviesLength = createSelector(
  fromReducers.selectMovieList,
  (state: fromMovies.MovieListState): number => {
    return state.movies.length;
  },
);

export const selectMovieListLoadingStatus = createSelector(
  fromReducers.selectMovieList,
  (state: fromMovies.MovieListState): LoadingStatus => {
    return state.moviesLoadingStatus;
  },
);

export const selectIsMoviesLoading = createSelector(
  fromReducers.selectMovieList,
  (state: fromMovies.MovieListState): boolean => {
    return state.moviesLoadingStatus.isLoading;
  },
);

export const selectMovieListStatus = createSelector(
  selectMovieListLoadingStatus,
  (movieStatus: LoadingStatus) => {
    if (movieStatus.isLoaded) {
      return Status.PROCESSING;
    }
    if (movieStatus.isLoaded) {
      return movieStatus.error ? Status.FAIL : Status.SUCCESS;
    }

    return Status.INITIAL;
  },
);
