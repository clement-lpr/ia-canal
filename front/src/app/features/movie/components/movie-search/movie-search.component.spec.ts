import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { MockProvider, MockProviders } from 'ng-mocks';

import { SearchForm } from '@features/movie/forms';
import { MovieFacade } from '@features/movie/movie.facade';
import { MaterialModule } from '@shared/shared.module';
import { MovieSearchComponent } from './movie-search.component';

describe('MovieFormComponent', () => {
  let component: MovieSearchComponent;

  let spectator: Spectator<MovieSearchComponent>;

  let movieFacadeStub: Partial<MovieFacade> = {
    searchForm: new FormGroup<SearchForm>({
      searchValue: new FormControl(''),
      searchHistory: new FormControl(''),
      movieConsultationHistory: new FormControl(''),
    }),
  };

  const createComponent = createComponentFactory({
    component: MovieSearchComponent,
    imports: [ReactiveFormsModule, MaterialModule],
    providers: [MockProviders(Store), MockProvider(MovieFacade, movieFacadeStub, 'useValue')],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(spectator.query('form[data-test="search-form"]')).toBeTruthy();
  });
});
