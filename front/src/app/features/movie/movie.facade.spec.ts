import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { take } from 'rxjs';

import { selectMovies, selectMoviesLength } from '@features/movie/store';

import { Movie } from '@core/models';
import { MovieFacade } from './movie.facade';

describe('MovieService', () => {
  let spectator: SpectatorService<MovieFacade>;
  let moviesMock: Movie[] = [
    { id: 1, title: 'movie1' },
    { id: 2, title: 'movie2' },
  ];

  const createService = createServiceFactory({
    service: MovieFacade,
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: selectMovies,
            value: moviesMock,
          },
          {
            selector: selectMoviesLength,
            value: 2,
          },
        ],
      }),
    ],
  });

  beforeEach(() => (spectator = createService()));

  it('should load movies', (done) => {
    expect(spectator.service.movies$).toBeTruthy();
    spectator.service.movies$.pipe(take(1)).subscribe((movies: Movie[]) => {
      expect(movies.length).toBe(2);
      done();
    });
  });

  it('should return movies length', (done) => {
    expect(spectator.service.moviesLength$).toBeTruthy();
    spectator.service.moviesLength$.pipe(take(1)).subscribe((length: number) => {
      expect(length).toBe(2);
      done();
    });
  });
});
