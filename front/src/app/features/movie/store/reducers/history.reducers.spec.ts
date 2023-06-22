import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '@core/models';
import { MovieSearchCriteria } from '@features/movie/enums';

import { MovieSearch, MovieViewed } from '../actions';
import { HistoryReducers, HistoryState, historyInitialState } from './history.reducer';

describe('Movie Reducers', () => {
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

  it('should change searchHistory and searchLabel when MovieSearch dispatched', () => {
    const state = historyInitialState;
    const action = MovieSearch({ searchLabel: searchLabelMock });
    const expected: HistoryState = {
      ...historyInitialState,
      searchLabel: searchLabelMock,
      searchHistory: [...historyInitialState.searchHistory, searchLabelMock],
    };
    expect(HistoryReducers(state, action)).toEqual(expected);
  });

  it('should fill movies when MoviesLoadComplete dispatched', () => {
    const state = historyInitialState;
    const action = MovieViewed({ movie: moviesMock[0] });
    const expected: HistoryState = {
      ...historyInitialState,
      movieConsultationHistory: [...state.movieConsultationHistory, moviesMock[0]],
    };
    expect(HistoryReducers(state, action)).toEqual(expected);
  });
});
