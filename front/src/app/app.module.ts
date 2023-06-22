import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
