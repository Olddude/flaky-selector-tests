Hello dear community,  
we encounter flakiness when executing unit tests in our project.
we would appreciate any help or input on that issue.

# Issue
```do-something.effects.spec.ts``` and ```do-something.selectors.spec.ts``` unit tests seem to run into fixture data conflict when executed multiple times.

# Code
[do-something.selectors.spec.fixture.ts][4]
```
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
```
[do-something.selectors.spec.ts][5]
```
import { Foo } from '../../models/foo';
import { selectFoo } from './do-something.selectors';
import { DoSomethingSelectorsFixture } from './do-something.selectors.spec.fixture';

describe('DoSomethingFoo Selectors', () => {
  describe('select foo', () => {
    it('should return foo', () => {

      // Arrange
      const fixture = new DoSomethingSelectorsFixture();
      fixture.setupDoSomethingState();

      // Act
      const result = selectFoo(fixture.getStateForFeature());

      // Assert
      expect(result).not.toBeNull();
      expect(result).not.toBeUndefined();
      expect(result).toEqual(fixture.state.foo as Foo);
    });
  });
});
```
[do-something.effects.spec.fixture.ts][6]
```
import { Bar, IBar } from '../../models/bar';
import { Foo } from '../../models/foo';

interface Fixture {
  readonly foo: Foo,
  readonly bar: IBar
}

export const fixture: Fixture = {
  foo: new Foo(
    'first'
  ),
  bar: new Bar(
    123
  )
};
```
[do-something.effects.spec.ts][7]
```
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { DEFAULT_ROUTER_FEATURENAME } from '@ngrx/router-store';
import { TypedAction } from '@ngrx/store/src/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { DoSomethingApiService } from '../../api/do-something-api.service';
import { Feature } from '../../models/event';
import {
  loadBar,
  loadBarSuccess,
} from './do-something.actions';
import { DoSomethingEffects } from './do-something.effects';
import { fixture } from './do-something.effects.spec.fixture';
import {
  selectFoo
} from './do-something.selectors';

describe('DoSomethingFooEffects', () => {
  let actions$: Observable<TypedAction<string>>;
  let effects: DoSomethingEffects;
  let store: MockStore;
  let apiService: DoSomethingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'tab2',
            children: []
          }
        ])
      ],
      providers: [
        DoSomethingEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            [DEFAULT_ROUTER_FEATURENAME]: {
              state: {
                url: '/myUrl',
              },
            },
            [Feature.DoSomething]: {
              ['/myUrl']: undefined
            }
          },
        }),
        {
          provide: DoSomethingApiService,
          useFactory: (): Partial<DoSomethingApiService> => ({
            getBarOfFoo: () => of(undefined)
          }),
        }
      ],
    });

    effects = TestBed.inject(DoSomethingEffects);
    store = TestBed.inject(MockStore);
    apiService = TestBed.inject(DoSomethingApiService);
  });

  describe('loadBarOfFoo', () => {
    it('should return loadBarOfFooSuccess on success', async () => {
      // Arrange
      store.overrideSelector(selectFoo, fixture.foo);
      spyOn(
        apiService,
        'getBarOfFoo'
      ).and.returnValue(of(fixture.bar));
      actions$ = of(
        loadBar({ url: 'test' })
      );

      // Act
      const output =
        await effects.loadBarOfFoo$.toPromise();

      // Assert
      expect(output).toEqual(
        loadBarSuccess({
          url: '/myUrl',
          bar: fixture.bar,
        })
      );
    });
  });
});
```

# Karma Unit Test Log Output
```
Chrome Headless 98.0.4758.109 (Mac OS 10.15.7): Executed 0 of 2 SUCCESS (0 
Chrome Headless 98.0.4758.109 (Mac OS 10.15.7): Executed 1 of 2 SUCCESS (0 
Chrome Headless 98.0.4758.109 (Mac OS 10.15.7) DoSomethingFoo Selectors select foo should return foo FAILED
        Error: Expected $.name = 'first' to equal 'second'.
            at <Jasmine>
            at UserContext.<anonymous> (src/app/features/do-something/do-something.selectors.spec.ts:19:22)
            at ZoneDelegate.invoke (node_modules/zone.js/dist/zone.js:400:1)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/dist/zone-testing.js:301:43)
Chrome Headless 98.0.4758.109 (Mac OS 10.15.7): Executed 2 of 2 (1 FAILED) (0 secs / 0.055 secs)
Chrome Headless 98.0.4758.109 (Mac OS 10.15.7) DoSomethingFoo Selectors select foo should return foo FAILED
        Error: Expected $.name = 'first' to equal 'second'.
            at <Jasmine>
            at UserContext.<anonymous> (src/app/features/do-something/do-something.selectors.spec.ts:19:22)
            at ZoneDelegate.invoke (node_modules/zone.js/dist/zone.js:400:1)
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/dist/zone-testi
Chrome Headless 98.0.4758.109 (Mac OS 10.15.7): Executed 2 of 2 (1 FAILED) (0.072 secs / 0.055 secs)
TOTAL: 1 FAILED, 1 SUCCESS
TOTAL: 1 FAILED, 1 SUCCESS
```
# Repository
https://github.com/Olddude/flaky-selector-tests

# Technology
 - [angular][1]
 - [ngrx][2]
 - [karma][3]

  [1]: https://angular.io
  [2]: https://ngrx.io/guide/store/testing
  [3]: https://karma-runner.github.io/latest/index.html
  [4]: https://github.com/Olddude/flaky-selector-tests/blob/master/src/app/features/do-something/do-something.selectors.spec.fixture.ts 
  [5]: https://github.com/Olddude/flaky-selector-tests/blob/master/src/app/features/do-something/do-something.selectors.spec.ts
  [6]: https://github.com/Olddude/flaky-selector-tests/blob/master/src/app/features/do-something/do-something.effects.spec.fixture.ts
  [7]: https://github.com/Olddude/flaky-selector-tests/blob/master/src/app/features/do-something/do-something.effects.spec.ts

  
