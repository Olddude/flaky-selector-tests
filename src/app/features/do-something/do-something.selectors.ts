import { getSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Feature } from '../../models/event';
import { Foo } from '../../models/foo';
import * as fromDoSomething from './do-something.reducer';

const { selectUrl } = getSelectors();

export const selectDoSomethingFooState = createFeatureSelector<fromDoSomething.State>(
  Feature.DoSomething
);

export const selectCurrentCancelledFoo = createSelector(
  selectDoSomethingFooState,
  selectUrl,
  (state, url) => state?.[url]
);

export const selectFoo = createSelector(
  selectCurrentCancelledFoo,
  state => {
    if (state?.foo === undefined)
      return undefined;

    return new Foo(
      state?.foo.name
    );
  }
);
