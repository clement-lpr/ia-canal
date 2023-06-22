import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Movie } from '@core/models';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

import { MaterialModule } from '@shared/shared.module';
import { MovieDialogComponent } from './movie-dialog.component';

describe('MovieDialogComponent', () => {
  let component: MovieDialogComponent;
  let spectator: Spectator<MovieDialogComponent>;
  let movieMock: Movie = {
    title: '10,000 B.C.',
    usGross: 94784201,
    worldwideGross: 269065678,
    usDvdSales: 27044045,
    productionBudget: 105000000,
    releaseDate: 'Mar 07 2008',
    distributor: 'Warner Bros.',
    genre: 'Adventure',
    director: 'Roland Emmerich',
    rotenRating: 9,
    imdbRating: 5.8,
    votes: 134,
    id: 1060,
  };

  const createComponent = createComponentFactory({
    component: MovieDialogComponent,
    imports: [FormsModule, ReactiveFormsModule, MaterialModule],
    providers: [
      MockProvider(MatDialog, MatDialog, 'useClass'),
      MockProvider(MAT_DIALOG_DATA, { movie: movieMock }, 'useValue'),
    ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
