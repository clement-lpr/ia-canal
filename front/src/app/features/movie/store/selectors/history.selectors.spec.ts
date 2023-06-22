import { Movie } from '@core/models';

import { historyInitialState } from '../reducers/history.reducer';
import {
  selectIsSearchHistoryEnabled,
  selectMovieConsultationHistory,
  selectSearchHistory,
} from './history.selectors';

describe('History Selector', () => {
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

  describe('selectMovieConsultationHistory', () => {
    it('should select movieConsultationHistory', () => {
      const result = selectMovieConsultationHistory.projector({
        ...historyInitialState,
        movieConsultationHistory: moviesMock,
      });
      expect(result).toEqual(moviesMock);
    });
  });

  describe('selectIsSearchHistoryEnabled', () => {
    it('should return true when searchMovie history filled', () => {
      const result = selectIsSearchHistoryEnabled.projector({
        ...historyInitialState,
        searchHistory: moviesMock.map((movie) => movie.title),
      });
      expect(result).toEqual(true);
    });
  });

  describe('selectSearchHistory', () => {
    it('should select selectHistory', () => {
      const result = selectSearchHistory.projector({
        ...historyInitialState,
        searchHistory: moviesMock.map((movie) => movie.title),
      });
      expect(result).toEqual(moviesMock.map((movie) => movie.title));
    });
  });
});
