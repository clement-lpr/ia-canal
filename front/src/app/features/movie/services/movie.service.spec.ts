import { Movie } from '@core/models';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator/jest';

import { MovieSearchCriteria } from '../enums';
import { User } from '../interfaces';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  const createHttp = createHttpFactory(MovieService);
  let movieSearchCriteriaMock: MovieSearchCriteria;
  let moviesMock: Movie[];
  let searchLabelMock: string;
  let spectator: SpectatorHttp<MovieService>;
  let userMock: User = { password: 'password', username: 'username' };
  let tokenMock: string;

  beforeEach(() => {
    spectator = createHttp();
    tokenMock = 'ee49e013-0a70-4c71-ad85-fe588cc40689';
    searchLabelMock = 'searchLabelMock';
    moviesMock = [
      { id: 1, title: 'movie1' },
      { id: 2, title: 'movie2' },
    ];
    movieSearchCriteriaMock = MovieSearchCriteria.IMDB_RATING;
  });

  it('Should load movies from API', () => {
    spectator.service.getMovies(tokenMock, searchLabelMock, movieSearchCriteriaMock).subscribe();
    spectator.expectOne(
      `http://localhost:3000/movies?query=${searchLabelMock}&sortBy=${movieSearchCriteriaMock}`,
      HttpMethod.GET,
    );
  });
});
