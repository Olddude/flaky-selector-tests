import { DEFAULT_ROUTER_FEATURENAME, RouterReducerState } from '@ngrx/router-store';

import { IDoSomethingState } from '../../models/do-something-state';
import { Feature } from '../../models/event';
import { Foo } from '../../models/foo';
import * as fromDoSomething from './do-something.reducer';

interface ITestData {
  readonly foo: Foo;
}

const testData: ITestData = {
  foo: new Foo(
    'second'
  )
};


export class DoSomethingSelectorsFixture {
  state: IDoSomethingState;

  getStateForFeature() {
    const mockRouterUrl = '/tab2/restore';
    return {
      [DEFAULT_ROUTER_FEATURENAME]: {
        state: {
          url: mockRouterUrl
        }
      } as RouterReducerState,
      [Feature.DoSomething]: {
        ...fromDoSomething.initialState,
        [mockRouterUrl]: this.state
      }
    };
  }

  setupDoSomethingState() {
    this.state = {
      foo: testData.foo,
      bar: undefined
    } as IDoSomethingState;
  }
}
