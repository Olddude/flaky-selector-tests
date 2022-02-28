import { createAction, props } from '@ngrx/store';
import { Message } from 'primeng/api';

import { IBar } from '../../models/bar';
import { ActionType, Event, Feature, Source } from '../../models/event';

export const loadBar = createAction(
  ActionType.create(
    Feature.DoSomething,
    Source.Application,
    Event.LoadBar
  ).toString(),
  props<{ url: string }>()
);

export const loadBarSuccess = createAction(
  ActionType.create(
    Feature.DoSomething,
    Source.Application,
    Event.LoadBarSuccess
  ).toString(),
  props<{ url: string, bar: IBar }>()
);

export const loadBarFailure = createAction(
  ActionType.create(
    Feature.DoSomething,
    Source.Application,
    Event.LoadBarFailure
  ).toString(),
  props<{ url: string, messages: Message[] }>()
);

