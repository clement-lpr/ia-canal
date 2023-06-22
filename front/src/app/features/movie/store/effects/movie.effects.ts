import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '@core/models';
import { MovieSearchCriteria } from '@features/movie/enums';
import { MovieService } from '@features/movie/services/movie.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { JsonConvert } from 'json2typescript';
import { Observable, map, of } from 'rxjs';
import { catchError, exhaustMap, switchMap, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { RoutesPath } from '@core/enums';
import { CookieService } from 'ngx-cookie-service';
import * as fromActions from '../actions';

@Injectable()
export class MovieEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly jsonConvert: JsonConvert,
    private readonly movieService: MovieService,
    private readonly router: Router,
    private readonly cookieService: CookieService,
  ) {}

  public searchMoviesByTitle$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.MovieSearch),
      switchMap(({ searchLabel }) => {
        return of(
          fromActions.MoviesLoad({ query: searchLabel || '', sortBy: MovieSearchCriteria.TITLE }),
        );
      }),
    );
  });

  public loadMovies$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.MoviesLoad),
      exhaustMap(({ query, sortBy }) =>
        this.movieService.getMovies(this.cookieService.get('token'), query, sortBy).pipe(
          map((movies) =>
            fromActions.MoviesLoadComplete({
              movies: this.jsonConvert.deserializeArray(movies, Movie),
            }),
          ),
          catchError((error: HttpErrorResponse) => of(fromActions.MoviesLoadError({ error }))),
        ),
      ),
    );
  });

  public redirectToErrorPageWhenApiError$: Observable<Action> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.MoviesLoadError),
        tap(() => this.router.navigate([RoutesPath.ERROR_PAGE], { skipLocationChange: true })),
      );
    },
    { dispatch: false },
  );

  public logoutFromMovie$: Observable<Action> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.MoviesLogout),
        tap(() => {
          this.cookieService.deleteAll();
          this.router.navigate([RoutesPath.AUTHENTICATION_PAGE]);
        }),
      );
    },
    { dispatch: false },
  );
}
