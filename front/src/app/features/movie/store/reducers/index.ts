import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHistory from './history.reducer';
import * as fromMovie from './movie-list.reducers';

export const movieKey = 'movie';
export const movieListKey = 'movieList';
export const historyKey = 'history';

export interface MovieState {
  [movieListKey]: fromMovie.MovieListState;
  [historyKey]: fromHistory.HistoryState;
}

export function movieReducers(state: MovieState | undefined, action: Action) {
  return combineReducers({
    [movieListKey]: fromMovie.MovieReducers,
    [historyKey]: fromHistory.HistoryReducers,
  })(state, action);
}

export const selectMovieState = createFeatureSelector<MovieState>(movieKey);

export const selectMovieList = createSelector(
  selectMovieState,
  (state: MovieState) => state[movieListKey],
);

export const selectHistory = createSelector(
  selectMovieState,
  (state: MovieState) => state[historyKey],
);
