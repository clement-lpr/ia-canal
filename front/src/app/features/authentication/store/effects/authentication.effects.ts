import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoutesPath } from '@core/enums';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, map, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthenticationService } from '@features/authentication/services';
import { CookieService } from 'ngx-cookie-service';
import * as fromActions from '../actions';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authenticationService: AuthenticationService,
    private readonly cookieService: CookieService,
    private readonly router: Router,
  ) {}

  public authenticate$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.Login),
      switchMap(({ user }) =>
        this.authenticationService.authenticate(user).pipe(
          tap((response) => this.cookieService.set('token', response.token)),
          map((response) => fromActions.LoginComplete({ token: response.token })),
          catchError((error: HttpErrorResponse) => of(fromActions.LoginError({ error }))),
        ),
      ),
    );
  });

  public logout$: Observable<Action> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.Logout),
        tap(() => {
          this.cookieService.delete('token');
          this.router.navigate([RoutesPath.AUTHENTICATION_PAGE]);
        }),
      );
    },
    { dispatch: false },
  );

  public redirectToMoviesPageWhenLoginComplete$: Observable<Action> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.LoginComplete),
        tap(() => this.router.navigate([RoutesPath.MOVIES_PAGE])),
      );
    },
    { dispatch: false },
  );

  public redirectToErrorPageWhenApiError$: Observable<Action> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.LoginError),
        tap(() => this.router.navigate([RoutesPath.ERROR_PAGE], { skipLocationChange: true })),
      );
    },
    { dispatch: false },
  );
}
