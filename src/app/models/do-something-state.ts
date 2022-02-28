import { IBar } from './bar';
import { IFoo } from './foo';

export interface IDoSomethingState {
  readonly foo: IFoo;
  readonly bar: IBar;
}
