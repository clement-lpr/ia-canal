import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

import { Movie } from '@core/models';
import { of } from 'rxjs';

import { SearchForm } from '@features/movie/forms';
import { MovieFacade } from '@features/movie/movie.facade';
import { MaterialModule } from '@shared/shared.module';
import { MovieListComponent } from './movie-list.component';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let spectator: Spectator<MovieListComponent>;
  let moviesMock: Movie[] = [
    { id: 1, title: 'movie1' },
    { id: 2, title: 'movie2' },
  ];

  let movieFacadeStub: Partial<MovieFacade> = {
    searchForm: new FormGroup<SearchForm>({
      movieConsultationHistory: new FormControl(''),
      searchHistory: new FormControl(''),
      searchValue: new FormControl(''),
    }),
    movies$: of(moviesMock),
  };

  const createComponent = createComponentFactory({
    component: MovieListComponent,
    imports: [ReactiveFormsModule, MaterialModule],
    providers: [MockProvider(MovieFacade, movieFacadeStub, 'useValue')],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
