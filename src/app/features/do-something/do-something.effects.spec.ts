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
