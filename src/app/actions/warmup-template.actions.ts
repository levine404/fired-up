import { Action } from '@ngrx/store';
import { WarmupState } from '../reducers/warmup-template.reducer';

export enum ActionTypes {
  LoadState = '[WM]LoadState',
  CreateWarmupTemplate = 'CreateWarmupTemplate',
  DeleteWarmupTemplate = 'DeleteWarmupTemplate',
  AdjustPercentage = 'AdjustPercentage',
  RemoveSet = 'RemoveSet',
  AddSet = 'AddSet',
  ChangeTemplateName = 'ChangeTemplateName',
  AdjustReps = 'AdjustReps'
}

export class LoadState implements Action {
  readonly type = ActionTypes.LoadState;

  constructor(public payload: WarmupState) {}
}

export class CreateWarmupTemplate implements Action {
  readonly type = ActionTypes.CreateWarmupTemplate;

  constructor() {}
}

export class DeleteWarmupTemplate implements Action {
  readonly type = ActionTypes.DeleteWarmupTemplate;

  constructor(public payload: string) {}
}

export class AdjustPercentage implements Action {
  readonly type = ActionTypes.AdjustPercentage;

  constructor(public payload: { templateId: string, setIndex: number, value: number }) {}
}

export class RemoveSet implements Action {
  readonly type = ActionTypes.RemoveSet;

  constructor(public payload: { templateId: string, setIndex: number }) {}
}

export class AddSet implements Action {
  readonly type = ActionTypes.AddSet;

  constructor(public payload: { templateId: string }) {}
}

export class AdjustReps implements Action {
  readonly type = ActionTypes.AdjustReps;

  constructor(public payload: { templateId: string, setIndex: number, value: number }) {}
}

export class ChangeTemplateName implements Action {
  readonly type = ActionTypes.ChangeTemplateName;

  constructor(public payload: { templateId: string, value: string }) {}
}

export type ActionsUnion = LoadState |
  CreateWarmupTemplate |
  DeleteWarmupTemplate |
  AdjustPercentage |
  RemoveSet |
  AddSet |
  AdjustReps |
  ChangeTemplateName;
