import { Movie } from '@core/models';
import { createAction, props } from '@ngrx/store';

import { ActionsTypes } from './actions';

export const MovieSearch = createAction(
  ActionsTypes.HISTORY_MOVIE_SEARCH,
  props<{ searchLabel: string | null }>(),
);

export const MovieViewed = createAction(ActionsTypes.HISTORY_MOVIE_VIEW, props<{ movie: Movie }>());
