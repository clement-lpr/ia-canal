import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './components/movie/movie.component';
import { MovieResolver } from './resolvers';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
    resolve: {
      MovieResolver,
    },
    pathMatch: 'full',
    // canActivate: [MkczovieGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MovieResolver],
})
export class MovieRoutingModule {}
