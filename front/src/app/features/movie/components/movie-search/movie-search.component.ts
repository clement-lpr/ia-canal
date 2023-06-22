import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Movie } from '@core/models';
import { SearchForm } from '@features/movie/forms';
import { MovieFacade } from '@features/movie/movie.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSearchComponent {
  @HostBinding('class') public readonly classAttribute = 'flex justify-center gap-4';

  public readonly searchHistory$: Observable<(string | null)[]> = this.movieFacade.searchHistory$;

  public readonly movieConsultationHistory$: Observable<(Movie | null)[]> =
    this.movieFacade.movieConsultationHistory$;

  public get searchForm(): FormGroup<SearchForm> {
    return this.movieFacade.searchForm;
  }

  constructor(private readonly movieFacade: MovieFacade) {}

  public onLogout(): void {
    this.movieFacade.logout();
  }
}
