export interface IFoo {
  readonly name: string;
}

export class Foo implements IFoo {
  constructor(
    readonly name: string,
  ) { }

}

