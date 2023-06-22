import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { take } from 'rxjs';

import { Status } from '@core/enums';
import { MovieSearchCriteria } from '../enums';
import { MoviesLoad, selectMovieListStatus } from '../store';
import { movieInitialState } from '../store/reducers/movie-list.reducers';
import { MovieResolver } from './movie.resolver';

describe('MovieService', () => {
  let spectator: SpectatorService<MovieResolver>;
  let movieResolver: MovieResolver;
  const createService = createServiceFactory({
    service: MovieResolver,
    providers: [
      provideMockStore({
        initialState: movieInitialState,
        selectors: [
          {
            selector: selectMovieListStatus,
            value: Status.INITIAL,
          },
        ],
      }),
    ],
  });

  beforeEach(() => {
    spectator = createService();
    movieResolver = spectator.service;
  });

  it('Should dispatch MovieLoad action when movie state is initial', (done) => {
    const store = spectator.inject(Store);
    const spy = jest.spyOn(store, 'dispatch');

    movieResolver
      .resolve()
      .pipe(take(1))
      .subscribe(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(
          MoviesLoad({ query: '', sortBy: MovieSearchCriteria.EMPTY }),
        );
        done();
      });
  });
});
