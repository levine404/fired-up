import { Action } from '@ngrx/store';
import { ExerciseSetState } from '../reducers/exercise-set.reducer';

export enum ActionTypes {
  LoadState = '[EX]LoadState',
  CreateExerciseSet = 'CreateExerciseSet',
  DeleteExerciseSet = 'DeleteExerciseSet',
  AddWeight = 'AddWeight',
  AdjustWeight = 'AdjustWeight',
  RemoveWeight = 'RemoveWeight',
  AdjustCount = 'AdjustCount',
  ChangeSetName = 'ChangeSetName',
  AdjustBarWeight = 'AdjustBarWeight',
  ToggleUnit = 'ToggleUnit'
}
export class LoadState implements Action {
  readonly type = ActionTypes.LoadState;

  constructor(public payload: ExerciseSetState) {}
}

export class CreateExerciseSet implements Action {
  readonly type = ActionTypes.CreateExerciseSet;

  constructor() {}
}

export class DeleteExerciseSet implements Action {
  readonly type = ActionTypes.DeleteExerciseSet;

  constructor(public payload: string) {}
}

export class AddWeight implements Action {
  readonly type = ActionTypes.AddWeight;

  constructor(public payload: string) {}
}

export class AdjustWeight implements Action {
  readonly type = ActionTypes.AdjustWeight;

  constructor(public payload: { setId: string, plateIndex: number, value: number }) {}
}

export class RemoveWeight implements Action {
  readonly type = ActionTypes.RemoveWeight;

  constructor(public payload: { setId: string, plateIndex: number }) {}
}

export class AdjustCount implements Action {
  readonly type = ActionTypes.AdjustCount;

  constructor(public payload: { setId: string, plateIndex: number, value: number }) {}
}

export class ChangeSetName implements Action {
  readonly type = ActionTypes.ChangeSetName;

  constructor(public payload: { setId: string, value: string }) {}
}

export class AdjustBarWeight implements Action {
  readonly type = ActionTypes.AdjustBarWeight;

  constructor(public payload: { setId: string, value: number }) {}
}

export class ToggleUnit implements Action {
  readonly type = ActionTypes.ToggleUnit;

  constructor(public payload: string) {}
}

export type ActionsUnion = LoadState |
  CreateExerciseSet |
  DeleteExerciseSet |
  AddWeight |
  AdjustWeight |
  RemoveWeight |
  AdjustCount |
  ChangeSetName |
  AdjustBarWeight |
  ToggleUnit;
