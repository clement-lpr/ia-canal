import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { MockComponent } from 'ng-mocks';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MovieSearchComponent } from '../movie-search/movie-search.component';
import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let spectator: Spectator<MovieComponent>;

  const createComponent = createComponentFactory({
    component: MovieComponent,
    declarations: [MockComponent(MovieListComponent), MockComponent(MovieSearchComponent)],
  });

  beforeEach(async () => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
