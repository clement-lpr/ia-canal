import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Movie } from '@core/models';
import * as fromStore from '@features/movie/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';

import { SearchForm } from './forms';

@UntilDestroy()
@Injectable()
export class MovieFacade {
  public searchForm: FormGroup<SearchForm> = new FormGroup<SearchForm>({
    searchValue: new FormControl(''),
    searchHistory: new FormControl(''),
    movieConsultationHistory: new FormControl({ disabled: true, value: '' }),
  });

  public movies$: Observable<Movie[]> = this.store.select(fromStore.selectMovies);

  public movieConsultationHistory$: Observable<(Movie | null)[]> = this.store.select(
    fromStore.selectMovieConsultationHistory,
  );

  public moviesLength$: Observable<number> = this.store.select(fromStore.selectMoviesLength);

  public searchHistory$: Observable<(string | null)[]> = this.store.select(
    fromStore.selectSearchHistory,
  );

  public isSearchHistoryDisplayed$: Observable<boolean> = this.store.select(
    fromStore.selectIsSearchHistoryEnabled,
  );

  public isMovieConsultationHistoryDisplayed$: Observable<boolean> = this.store.select(
    fromStore.selectIsMovieConsultationHistoryEnabled,
  );

  public isMoviesLoading$: Observable<boolean> = this.store.select(fromStore.selectIsMoviesLoading);

  public get searchValue(): FormControl<string | null> {
    return this.searchForm.controls.searchValue;
  }

  public get searchHistory(): FormControl<string | null> {
    return this.searchForm.controls.searchHistory;
  }

  public get movieConsultationHistory(): FormControl<string | null> {
    return this.searchForm.controls.movieConsultationHistory;
  }

  constructor(private readonly store: Store) {
    this.searchValue.valueChanges
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((searchLabel) => {
        this.store.dispatch(fromStore.MovieSearch({ searchLabel }));
      });

    this.searchHistory.valueChanges.subscribe((search) => {
      this.searchValue.setValue(search);
    });

    this.isMovieConsultationHistoryDisplayed$.subscribe((isDisplayed) => {
      if (isDisplayed) {
        this.movieConsultationHistory.enable();
      }
    });
  }

  public updateMovieConsultationHistory(movie: Movie) {
    this.store.dispatch(fromStore.MovieViewed({ movie }));
  }

  public logout(): void {
    this.store.dispatch(fromStore.MoviesLogout());
  }
}
