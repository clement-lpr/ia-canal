import { Movie } from '@core/models';
import { createSelector } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromHistory from '../reducers/history.reducer';

export const selectMovieConsultationHistory = createSelector(
  fromReducers.selectHistory,
  (state: fromHistory.HistoryState): (Movie | null)[] => {
    return state.movieConsultationHistory;
  },
);

export const selectIsSearchHistoryEnabled = createSelector(
  fromReducers.selectHistory,
  (state: fromHistory.HistoryState): boolean => {
    return state.searchHistory.length > 0;
  },
);

export const selectIsMovieConsultationHistoryEnabled = createSelector(
  fromReducers.selectHistory,
  (state: fromHistory.HistoryState): boolean => {
    return state.movieConsultationHistory.length > 0;
  },
);

export const selectSearchHistory = createSelector(
  fromReducers.selectHistory,
  (state: fromHistory.HistoryState): (string | null)[] => {
    return state.searchHistory;
  },
);
