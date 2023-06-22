import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesPath } from '@core/enums';
import { ErrorComponent } from '@shared/components/error/error.component';

export const routes: Routes = [
  {
    path: RoutesPath.AUTHENTICATION_PAGE,
    loadChildren: () =>
      import('./features/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: RoutesPath.MOVIES_PAGE,
    loadChildren: () => import('./features/movie/movie.module').then((m) => m.MovieModule),
  },
  {
    path: '',
    redirectTo: RoutesPath.AUTHENTICATION_PAGE,
    pathMatch: 'full',
  },
  {
    path: RoutesPath.ERROR_PAGE,
    component: ErrorComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
