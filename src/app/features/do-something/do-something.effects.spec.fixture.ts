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
