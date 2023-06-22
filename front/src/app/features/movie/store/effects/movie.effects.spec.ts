import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '@core/models';
import { AuthenticationResponse } from '@features/movie/interfaces';
import { AuthenticationService, MovieService } from '@features/movie/services';
import { MovieEffects } from '@features/movie/store/effects';
import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator/jest';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { MockProvider } from 'ng-mocks';
import { ReplaySubject, take, throwError } from 'rxjs';

import { MovieSearchCriteria } from '@features/movie/enums';
import * as fromActions from '../actions';

describe('Movies Effects', () => {
  let actions$ = new ReplaySubject<Action>(1);
  let authenticationResponseMock: AuthenticationResponse;
  let errorResponseMock: HttpErrorResponse;
  let jsonConvert: JsonConvert;
  let movieEffects: MovieEffects;
  let movieSearchCriteriaMock: MovieSearchCriteria;
  let moviesMock: Movie[];
  let searchLabelMock: string;
  let spectator: SpectatorService<MovieEffects>;
  let tokenMock: string;

  const creatEffect = createServiceFactory({
    service: MovieEffects,
    providers: [
      provideMockActions(() => actions$),
      provideMockStore({}),
      MockProvider(JsonConvert),
      MockProvider(MovieService, {
        getMovie: jest.fn(),
        getMovies: jest.fn(),
      }),
      {
        provide: JsonConvert,
        useFactory: (): JsonConvert => {
          const jsonConvertMock = new JsonConvert();
          jsonConvertMock.operationMode = OperationMode.ENABLE;
          jsonConvertMock.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
          jsonConvertMock.ignorePrimitiveChecks = true;
          return jsonConvertMock;
        },
      },
      MockProvider(AuthenticationService, {
        authent: jest.fn(),
      }),
    ],
  });

  beforeEach(async () => {
    spectator = creatEffect({});
    searchLabelMock = 'searchLabelMock';
    tokenMock = 'ee49e013-0a70-4c71-ad85-fe588cc40689';
    authenticationResponseMock = { token: tokenMock };
    jsonConvert = spectator.inject<JsonConvert>(JsonConvert);
    errorResponseMock = new HttpErrorResponse({
      error: 'failed',
    });
    movieSearchCriteriaMock = MovieSearchCriteria.TITLE;
    moviesMock = [
      { id: 1, title: 'movie1' },
      { id: 2, title: 'movie2' },
    ];
    movieEffects = spectator.service;
  });

  describe('searchMoviesByTitle', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject<Action>(1);
    });

    it('should return MovieLoad when MovieSearch action dispatched', (done) => {
      actions$.next(fromActions.MovieSearch({ searchLabel: searchLabelMock }));

      const expected = fromActions.MoviesLoad({
        query: searchLabelMock,
        sortBy: movieSearchCriteriaMock,
      });

      movieEffects.searchMoviesByTitle$.pipe(take(1)).subscribe((action) => {
        expect(action).toEqual(expected);
        done();
      });
    });
  });

  describe('loadMovies', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject<Action>(1);
    });

    it('should dispatch LoginError when authenticationService returns an error ', (done) => {
      actions$.next(
        fromActions.MoviesLoad({ query: searchLabelMock, sortBy: movieSearchCriteriaMock }),
      );

      const movieService: SpyObject<MovieService> = spectator.inject(MovieService);

      movieService.getMovies.mockReturnValue(throwError(() => errorResponseMock));

      const spy = jest.spyOn(movieService, 'getMovies');

      const expected = fromActions.MoviesLoadError({
        error: errorResponseMock,
      });

      movieEffects.loadMovies$.pipe(take(1)).subscribe((action) => {
        expect(action).toEqual(expected);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('loadLoggedInMovies', () => {
    beforeEach(() => {
      actions$ = new ReplaySubject<Action>(1);
    });

    it('should return MoviesLoadError when MoviesLoadLogin action is dispatched and getMovies throws an error', (done) => {
      actions$.next(
        fromActions.MoviesLoad({
          query: searchLabelMock,
          sortBy: movieSearchCriteriaMock,
        }),
      );

      const movieService: SpyObject<MovieService> = spectator.inject(MovieService);

      movieService.getMovies.mockReturnValue(throwError(() => errorResponseMock));

      const spy = jest.spyOn(movieService, 'getMovies');

      const expected = fromActions.MoviesLoadError({
        error: errorResponseMock,
      });

      movieEffects.loadMovies$.pipe(take(1)).subscribe((action) => {
        expect(action).toEqual(expected);
        expect(spy).toHaveBeenCalledTimes(2);
        done();
      });
    });
  });
});
