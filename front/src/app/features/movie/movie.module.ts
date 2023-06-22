import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieFacade } from '@features/movie/movie.facade';
import { AuthenticationService, MovieService } from '@features/movie/services';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

import { CookieService } from 'ngx-cookie-service';
import { MovieDialogComponent } from './components/movie-dialog/movie-dialog.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import * as effects from './store/effects';
import * as fromMovie from './store/reducers';

@NgModule({
  declarations: [MovieComponent, MovieDialogComponent, MovieListComponent, MovieSearchComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromMovie.movieKey, fromMovie.movieReducers),
    EffectsModule.forFeature([...effects.list]),
  ],
  providers: [MovieService, AuthenticationService, MovieFacade, CookieService],
})
export class MovieModule {}
