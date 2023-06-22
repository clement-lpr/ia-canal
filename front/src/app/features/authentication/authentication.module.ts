import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

import { CookieService } from 'ngx-cookie-service';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationFacade } from './authentication.facade';
import { AuthenticationComponent } from './components/authentication.component';
import { AuthenticationService } from './services';
import * as effects from './store/effects';
import * as fromAuthentication from './store/reducers';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromAuthentication.authenticationKey,
      fromAuthentication.authenticationReducers,
    ),
    EffectsModule.forFeature([...effects.list]),
  ],
  providers: [AuthenticationService, AuthenticationFacade, CookieService],
})
export class AuthenticationModule {}
