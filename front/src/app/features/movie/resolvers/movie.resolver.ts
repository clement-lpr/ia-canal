import { Injectable } from '@angular/core';
import { Status } from '@core/enums';
import { MoviesLoad, selectMovieListStatus } from '@features/movie/store';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';

import { MovieSearchCriteria } from '../enums';

@Injectable()
export class MovieResolver {
  constructor(private readonly store: Store) {}

  public resolve(): Observable<boolean> {
    return this.store.select(selectMovieListStatus).pipe(
      tap((status) => {
        if (status === Status.INITIAL) {
          this.store.dispatch(MoviesLoad({ query: '', sortBy: MovieSearchCriteria.EMPTY }));
        }
      }),
      map(() => true),
    );
  }
}
