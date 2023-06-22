import { Movie } from '@core/models';
import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';

export interface HistoryState {
  searchLabel: string | null;
  searchHistory: (string | null)[];

  movieConsultationHistory: (Movie | null)[];
}

export const historyInitialState: HistoryState = {
  searchLabel: '',
  searchHistory: [],
  movieConsultationHistory: [],
};

export const HistoryReducers = createReducer(
  historyInitialState,
  // History
  on(
    fromActions.MovieSearch,
    (state: HistoryState, { searchLabel }): HistoryState => ({
      ...state,
      searchHistory: [...state.searchHistory, searchLabel],
      searchLabel,
    }),
  ),

  on(
    fromActions.MovieViewed,
    (state: HistoryState, { movie }): HistoryState => ({
      ...state,
      movieConsultationHistory: [...state.movieConsultationHistory, movie],
    }),
  ),
);
