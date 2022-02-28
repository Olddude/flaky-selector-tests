export interface IBar {
  readonly count: number;
}

export class Bar implements IBar {

  constructor(
    readonly count: number,
  ) {
  }

}
