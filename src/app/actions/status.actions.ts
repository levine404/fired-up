import { Action } from '@ngrx/store';
import { ExerciseSetInterface } from 'src/types/exercise-set';
import { WarmupTemplateInterface } from 'src/types/warmup-template';
import { StatusState } from '../reducers/status.reducer';

export enum ActionTypes {
  LoadState = '[ST]LoadState',
  CreateWarmupSets = 'CreateWarmupSets',
  ToggleSetAsComplete = 'ToggleSetAsComplete',
  Reset = 'Reset',
  SetTargetWeight = 'SetTargetWeight',
  SetTemplate = 'SetTemplate',
  SetExercise = 'SetExercise',
  SetName = 'SetName',
  FinishWarmup = 'FinishWarmup',
  Save = 'Save',
  RemoveSave = 'RemoveSave',
  ToggleUnit = 'ToggleUnit',
  InitApp = 'InitApp'
}

export class LoadState implements Action {
  readonly type = ActionTypes.LoadState;

  constructor(public payload: StatusState) {}
}

export class CreateWarmupSets implements Action {
  readonly type = ActionTypes.CreateWarmupSets;

  constructor() {}
}

export class ToggleSetAsComplete implements Action {
  readonly type = ActionTypes.ToggleSetAsComplete;

  constructor(public payload: number) {}
}

export class Reset implements Action {
  readonly type = ActionTypes.Reset;

  constructor() {}
}

export class SetTargetWeight implements Action {
  readonly type = ActionTypes.SetTargetWeight;

  constructor(public payload: number) {}
}

export class FinishWarmup implements Action {
  readonly type = ActionTypes.FinishWarmup;

  constructor() {}
}

export class Save implements Action {
  readonly type = ActionTypes.Save;

  constructor() {}
}

export class RemoveSave implements Action {
  readonly type = ActionTypes.RemoveSave;

  constructor(public payload: number) {}
}

export class ToggleUnit implements Action {
  readonly type = ActionTypes.ToggleUnit;

  constructor() {}
}

export class InitApp implements Action {
  readonly type = ActionTypes.InitApp;

  constructor() {}
}

export class SetExercise implements Action {
  readonly type = ActionTypes.SetExercise;

  constructor(public payload: ExerciseSetInterface) {}
}

export class SetTemplate implements Action {
  readonly type = ActionTypes.SetTemplate;

  constructor(public payload: WarmupTemplateInterface) {}
}

export class SetName implements Action {
  readonly type = ActionTypes.SetName;

  constructor(public payload: string) {}
}

export type ActionsUnion = LoadState |
  CreateWarmupSets |
  ToggleSetAsComplete |
  Reset |
  SetTargetWeight |
  FinishWarmup |
  Save |
  RemoveSave |
  ToggleUnit |
  InitApp |
  SetExercise |
  SetTemplate |
  SetName;
