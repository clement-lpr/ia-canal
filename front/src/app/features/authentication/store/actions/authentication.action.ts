import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@features/movie/interfaces';
import { createAction, props } from '@ngrx/store';

export enum AuthenticationActionType {
  LOGOUT = '[Authentication] Logout',

  LOGIN = '[Authentication] Login',
  LOGIN_COMPLETE = '[Authentication] Login Complete',
  LOGIN_ERROR = '[Authentication] Login Error',
}

export const Login = createAction(AuthenticationActionType.LOGIN, props<{ user: User }>());

export const Logout = createAction(AuthenticationActionType.LOGOUT);

export const LoginComplete = createAction(
  AuthenticationActionType.LOGIN_COMPLETE,
  props<{ token: string }>(),
);

export const LoginError = createAction(
  AuthenticationActionType.LOGIN_ERROR,
  props<{ error: HttpErrorResponse }>(),
);
