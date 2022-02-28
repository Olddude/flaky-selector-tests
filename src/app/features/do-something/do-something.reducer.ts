import { IDoSomethingState } from '../../models/do-something-state';

export interface State {
  readonly [url: string]: IDoSomethingState;
}

export const initialState: State = {

};
