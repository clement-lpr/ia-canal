import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '@core/models';
import { MovieSearchCriteria } from '@features/movie/enums';
import { createAction, props } from '@ngrx/store';
import { ActionsTypes } from './actions';

export const MoviesLogout = createAction(ActionsTypes.MOVIES_LOGOUT);

export const MoviesLoad = createAction(
  ActionsTypes.MOVIES_LOAD,
  props<{ query: string; sortBy: MovieSearchCriteria | undefined }>(),
);

export const MoviesLoadComplete = createAction(
  ActionsTypes.MOVIES_LOAD_COMPLETE,
  props<{ movies: Movie[] }>(),
);

export const MoviesLoadError = createAction(
  ActionsTypes.MOVIES_LOAD_ERROR,
  props<{ error: HttpErrorResponse | null }>(),
);
