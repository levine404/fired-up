import * as fromExerciseSetActions from '../actions/exercise-set.actions';
import { ExerciseSetInterface } from '../../types/exercise-set';

export interface ExerciseSetState {
  sets: ExerciseSetInterface[];
}

export const initialState: ExerciseSetState = {
  sets: []
};
export function reducer(
  state = initialState,
  action: fromExerciseSetActions.ActionsUnion
): ExerciseSetState {
  switch (action.type) {

    case fromExerciseSetActions.ActionTypes.LoadState: {
      return {
        ...action.payload
      };
    }

    case fromExerciseSetActions.ActionTypes.CreateExerciseSet: {
      return {
        ...state,
        sets: [
          ...state.sets,
          {
            id: 'eid' + Date.now(),
            name: 'New Set',
            unit: 'kg',
            type: 'bar',
            set: {
              bar: 0,
              plates: []
            }
          }
        ]
      };
    }

    case fromExerciseSetActions.ActionTypes.DeleteExerciseSet: {
      const setIndex = state.sets.findIndex(set => {
        return set.id === action.payload;
      });
      if (setIndex !== -1) {
        return {
          ...state,
          sets: [
            ...state.sets.slice(0, setIndex),
            ...state.sets.slice(setIndex + 1)
          ]
        };
      } else {
        return {
          ...state
        };
      }
    }

    case fromExerciseSetActions.ActionTypes.AdjustWeight: {
      const setIndex = state.sets.findIndex(set => {
        return set.id === action.payload.setId;
      });
      if (setIndex !== -1) {
        const adjustedSet: ExerciseSetInterface = {
          ...state.sets[setIndex],
          set: {
            ...state.sets[setIndex].set,
            plates: [
              ...state.sets[setIndex].set.plates.slice(0, action.payload.plateIndex),
              {
                weight: action.payload.value,
                count: state.sets[setIndex].set.plates[action.payload.plateIndex].count
              },
              ...state.sets[setIndex].set.plates.slice(action.payload.plateIndex + 1),
            ]
          }
        };
        return {
          ...state,
          sets: [
            ...state.sets.slice(0, setIndex),
            adjustedSet,
            ...state.sets.slice(setIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    case fromExerciseSetActions.ActionTypes.RemoveWeight: {
      const setIndex = state.sets.findIndex(set => {
        return set.id === action.payload.setId;
      });
      if (setIndex !== -1) {
        const adjustedSet: ExerciseSetInterface = {
          ...state.sets[setIndex],
          set: {
            ...state.sets[setIndex].set,
            plates: [
              ...state.sets[setIndex].set.plates.slice(0, action.payload.plateIndex),
              ...state.sets[setIndex].set.plates.slice(action.payload.plateIndex + 1)
            ]
          }
        };
        return {
          ...state,
          sets: [
            ...state.sets.slice(0, setIndex),
            adjustedSet,
            ...state.sets.slice(setIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    case fromExerciseSetActions.ActionTypes.AdjustCount: {
      const setIndex = state.sets.findIndex(set => {
        return set.id === action.payload.setId;
      });
      if (setIndex !== -1) {
        const adjustedSet: ExerciseSetInterface = {
          ...state.sets[setIndex],
          set: {
            ...state.sets[setIndex].set,
            plates: [
              ...state.sets[setIndex].set.plates.slice(0, action.payload.plateIndex),
              {
                count: action.payload.value,
                weight: state.sets[setIndex].set.plates[action.payload.plateIndex].weight
              },
              ...state.sets[setIndex].set.plates.slice(action.payload.plateIndex + 1),
            ]
          }
        };
        return {
          ...state,
          sets: [
            ...state.sets.slice(0, setIndex),
            adjustedSet,
            ...state.sets.slice(setIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    case fromExerciseSetActions.ActionTypes.AddWeight: {
      const setIndex = state.sets.findIndex(set => {
        return set.id === action.payload;
      });
      if (setIndex !== -1) {
        const adjustedSet: ExerciseSetInterface = {
          ...state.sets[setIndex],
          set: {
            ...state.sets[setIndex].set,
            plates: [
              ...state.sets[setIndex].set.plates,
              {
                count: 0,
                weight: 0
              }
            ]
          }
        };
        return {
          ...state,
          sets: [
            ...state.sets.slice(0, setIndex),
            adjustedSet,
            ...state.sets.slice(setIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    case fromExerciseSetActions.ActionTypes.ChangeSetName: {
      const setIndex = state.sets.findIndex(set => {
        return set.id === action.payload.setId;
      });
      if (setIndex !== -1) {
        const adjustedSet: ExerciseSetInterface = {
          ...state.sets[setIndex],
          name: action.payload.value
        };
        return {
          ...state,
          sets: [
            ...state.sets.slice(0, setIndex),
            adjustedSet,
            ...state.sets.slice(setIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    case fromExerciseSetActions.ActionTypes.AdjustBarWeight: {
      const setIndex = state.sets.findIndex(set => {
        return set.id === action.payload.setId;
      });
      if (setIndex !== -1) {
        const adjustedSet: ExerciseSetInterface = {
          ...state.sets[setIndex],
          set: {
            ...state.sets[setIndex].set,
            bar: action.payload.value
          }
        };
        return {
          ...state,
          sets: [
            ...state.sets.slice(0, setIndex),
            adjustedSet,
            ...state.sets.slice(setIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    case fromExerciseSetActions.ActionTypes.ToggleUnit: {
      const setIndex = state.sets.findIndex(set => {
        return set.id === action.payload;
      });
      if (setIndex !== -1) {
        const adjustedSet: ExerciseSetInterface = {
          ...state.sets[setIndex],
          unit: state.sets[setIndex].unit === 'kg'
            ? 'lb'
            : 'kg'
        };
        return {
          ...state,
          sets: [
            ...state.sets.slice(0, setIndex),
            adjustedSet,
            ...state.sets.slice(setIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    default: {
      return state;
    }

  }
}

export const getAllExerciseSets = (state: ExerciseSetState) => state.sets;
export const getExerciseSetById = (state: ExerciseSetState, props: { id: string }) =>
  state.sets.find(set => set.id === props.id);
