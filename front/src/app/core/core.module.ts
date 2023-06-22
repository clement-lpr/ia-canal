import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot([], {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
      },
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: JsonConvert,
      useFactory: (): JsonConvert => {
        const jsonConvert = new JsonConvert();
        jsonConvert.operationMode = OperationMode.ENABLE;
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        jsonConvert.ignorePrimitiveChecks = true;
        return jsonConvert;
      },
    },
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }

  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
    };
  }
}
