import { NgModule } from '@angular/core';
import {
  DEFAULT_ROUTER_FEATURENAME,
  NavigationActionTiming,
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { RootState } from '.';
import { DoSomethingApiService } from './api/do-something-api.service';

@NgModule({
  imports: [
    // NGRX
    StoreModule.forRoot<RootState>({}, {
      metaReducers: [
      ]
    }),
    StoreModule.forFeature(DEFAULT_ROUTER_FEATURENAME, routerReducer),
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    DoSomethingApiService,
  ]
})
export class AppModule { }
