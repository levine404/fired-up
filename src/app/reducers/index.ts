import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromWarmupTemplateReducer from '../reducers/warmup-template.reducer';
import * as fromExerciseSetReducer from '../reducers/exercise-set.reducer';
import * as fromStatusReducer from '../reducers/status.reducer';

export interface State {
  status: fromStatusReducer.StatusState;
  warmupTemplates: fromWarmupTemplateReducer.WarmupState;
  exerciseSets: fromExerciseSetReducer.ExerciseSetState;
}

export const reducers: ActionReducerMap<State> = {
  status: fromStatusReducer.reducer,
  warmupTemplates: fromWarmupTemplateReducer.reducer,
  exerciseSets: fromExerciseSetReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const getStatusState = (state: State) => state.status;
export const getWarmupTemplateState = (state: State) => state.warmupTemplates;
export const getExerciseSetState = (state: State) => state.exerciseSets;

export const getAllWarmupTemplates = createSelector(
  getWarmupTemplateState,
  fromWarmupTemplateReducer.getAllWarmupTemplates
);

export const getWarmupTemplateById = createSelector(
  getWarmupTemplateState,
  fromWarmupTemplateReducer.getWarmupTemplateById
);

export const getAllExerciseSets = createSelector(
  getExerciseSetState,
  fromExerciseSetReducer.getAllExerciseSets
);

export const getExerciseSetById = createSelector(
  getExerciseSetState,
  fromExerciseSetReducer.getExerciseSetById
);
