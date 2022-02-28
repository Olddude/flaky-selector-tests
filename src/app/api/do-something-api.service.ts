import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IBar } from '../models/bar';
import { IFoo } from '../models/foo';

@Injectable()
export class DoSomethingApiService {

  getBarOfFoo(foo: IFoo): Observable<IBar> {
    return of(undefined);
  }
}
