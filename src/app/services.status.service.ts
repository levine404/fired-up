import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';

import * as StatusActions from './actions/status.actions';
import { State, getStatusState } from './reducers';
import { ExerciseSetInterface } from 'src/types/exercise-set';
import { StatusState } from './reducers/status.reducer';
import { WarmupTemplateInterface } from 'src/types/warmup-template';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  public status: Observable<StatusState>;
  public loaded: boolean;

  constructor(
    private storage: Storage,
    private store: Store<State>
  ) {
    this.loaded = false;
    this.status = this.store.select(getStatusState);
    this.status.subscribe(status => {
      if (this.loaded) {
        this.storage.set('status', status);
      }
      this.loaded = true;
    });
  }

  getStatusState(): Observable<StatusState> {
    return this.store.select(getStatusState);
  }

  createWarmupSets(): void {
    this.store.dispatch(new StatusActions.CreateWarmupSets());
  }

  setTargetWeight(weight: number): void {
    this.store.dispatch(new StatusActions.SetTargetWeight(weight));
  }

  finishWarmup(): void {
    this.store.dispatch(new StatusActions.FinishWarmup());
  }

  toggleSetAsComplete(setIndex: number): void {
    this.store.dispatch(new StatusActions.ToggleSetAsComplete(setIndex));
  }

  save(): void {
    this.store.dispatch(new StatusActions.Save());
  }

  removeSave(saveIndex: number): void {
    this.store.dispatch(new StatusActions.RemoveSave(saveIndex));
  }

  toggleUnit(): void {
    this.store.dispatch(new StatusActions.ToggleUnit());
  }

  initApp(): void {
    this.store.dispatch(new StatusActions.InitApp());
  }

  loadState(state: StatusState): void {
    this.store.dispatch(new StatusActions.LoadState(state));
  }

  setExerciseSet(set: ExerciseSetInterface): void {
    this.store.dispatch(new StatusActions.SetExercise(set));
  }

  setTemplate(template: WarmupTemplateInterface): void {
    this.store.dispatch(new StatusActions.SetTemplate(template));
  }

  setName(name: string): void {
    this.store.dispatch(new StatusActions.SetName(name));
  }

}
