export enum Feature {
  App = 'App',
  Route1 = 'Route1',
  Route2 = 'Route2',
  DoSomething = 'DoSomething',
}

export enum Source {
  Application = 'Application',
  Api = 'Api'
}

export const enum Event {
  LoadBar = 'LoadBarShift',
  LoadBarFailure = 'LoadBarFailure',
  LoadBarSuccess = 'LoadBarSuccess',
}

export interface IActionType {
  readonly feature: Feature;
  readonly source: Source;
  readonly event: Event;
}

export class ActionType extends String implements IActionType {

  private constructor(
    readonly feature: Feature,
    readonly source: Source,
    readonly event: Event
  ) {
    super(feature
      .concat('|')
      .concat(source)
      .concat('|')
      .concat(event)
    );
  }

  static create(feature: Feature, source: Source, event: Event): ActionType {
    return new ActionType(feature, source, event);
  }
}
