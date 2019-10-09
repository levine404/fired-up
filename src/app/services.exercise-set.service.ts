import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';

import * as ExerciseSetActions from './actions/exercise-set.actions';
import { State, getAllExerciseSets, getExerciseSetById } from './reducers';
import { ExerciseSetInterface } from 'src/types/exercise-set';
import { ExerciseSetState } from './reducers/exercise-set.reducer';

@Injectable({
  providedIn: 'root'
})
export class ExerciseSetService {
  public exerciseSets: Observable<ExerciseSetInterface[]>;
  public loaded: boolean;

  constructor(private storage: Storage, private store: Store<State>) {
    this.loaded = false;
    this.exerciseSets = this.store.select(getAllExerciseSets);
    this.exerciseSets.subscribe(sets => {
      if (this.loaded) {
        this.storage.set('exerciseSets', sets);
      }
      this.loaded = true;
    });
  }

  getAllWarmupTemplates(): Observable<ExerciseSetInterface[]> {
    return this.store.select(getAllExerciseSets);
  }

  getExerciseSetById(id: string): Observable<ExerciseSetInterface> {
    return this.store.select(getExerciseSetById, {
      id
    });
  }

  createExerciseSet(): void {
    this.store.dispatch(new ExerciseSetActions.CreateExerciseSet());
  }

  deleteExerciseSet(setId: string): void {
    this.store.dispatch(new ExerciseSetActions.DeleteExerciseSet(setId));
  }

  addWeight(setId: string): void {
    this.store.dispatch(new ExerciseSetActions.AddWeight(setId));
  }

  adjustWeight(setId: string, plateIndex: number, value: number) {
    this.store.dispatch(new ExerciseSetActions.AdjustWeight({ setId, plateIndex, value }));
  }

  removeWeight(setId: string, plateIndex: number) {
    this.store.dispatch(new ExerciseSetActions.RemoveWeight({ setId, plateIndex }));
  }

  adjustCount(setId: string, plateIndex: number, value: number) {
    this.store.dispatch(new ExerciseSetActions.AdjustCount({ setId, plateIndex, value }));
  }

  changeSetName(setId: string, value: string): void {
    this.store.dispatch(new ExerciseSetActions.ChangeSetName({ setId, value }));
  }

  adjustBarWeight(setId: string, value: number): void {
    this.store.dispatch(new ExerciseSetActions.AdjustBarWeight({ setId, value }));
  }

  toggleUnit(setId: string): void {
    this.store.dispatch(new ExerciseSetActions.ToggleUnit(setId));
  }

  loadState(state: ExerciseSetState): void {
    this.store.dispatch(new ExerciseSetActions.LoadState(state));
  }
}
