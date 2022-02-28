import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { getSelectors } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { DoSomethingApiService } from '../../api/do-something-api.service';
import * as DoSomethingActions from './do-something.actions';
import {
  selectFoo,
} from './do-something.selectors';


const { selectUrl } = getSelectors();

@Injectable()
export class DoSomethingEffects {

  loadBarOfFoo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DoSomethingActions.loadBar),
      concatLatestFrom(() => [
        this.store.select(selectUrl),
        this.store.select(selectFoo)
      ]),
      switchMap(([_action, url, fooBase]) => {
        return this.apiService.getBarOfFoo(fooBase).pipe(
          map((Bar) => DoSomethingActions.loadBarSuccess({ url, bar: Bar })),
          catchError((messages) => of(DoSomethingActions.loadBarFailure({ url, messages })))
        );
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly apiService: DoSomethingApiService,
  ) { }

}
