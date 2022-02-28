import { DEFAULT_ROUTER_FEATURENAME, RouterReducerState } from '@ngrx/router-store';

import { State as DoSomething } from './features/do-something/do-something.reducer';
import { Feature } from './models/event';

export interface RootState {
  readonly [DEFAULT_ROUTER_FEATURENAME]?: RouterReducerState;
  readonly [Feature.DoSomething]?: DoSomething;
}
