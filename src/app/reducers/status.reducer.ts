import * as fromStatusActions from '../actions/status.actions';
import { ExerciseSetInterface } from 'src/types/exercise-set';
import { WarmupTemplateInterface } from 'src/types/warmup-template';
import { ActiveSetInterface } from 'src/types/active-set';
import { SavedWarmupInterface } from 'src/types/saved-warmup';

const getPlates = (
  plates: Array<{ weight: number, count: number }>,
  attemptedWeight: number,
  ratio: number
): {
  usedPlates: number[],
  weight: number,
  isExcessive: boolean
} => {
  let totalWeight = 0;
  let overPlate = 0;
  const usedPlates: number[] = [];
  plates
    .map((plate: { weight: number, count: number }, plateIndex: number) => {
      return {
        weight: plate.weight * ratio * 2,
        count: (plate.count - (plate.count % 2)) / 2,
        plateIndex
      };
    })
    .sort((a: { weight: number, count: number }, b: { weight: number, count: number }) => {
      return b.weight - a.weight;
    })
    .forEach((plate: { weight: number, count: number, plateIndex: number }) => {
      for (let i = 0; i < plate.count; i++) {
        if (plate.weight + totalWeight > attemptedWeight) {
          overPlate = plates[plate.plateIndex].weight;
          break;
        } else {
          totalWeight += plate.weight;
          usedPlates.push(plates[plate.plateIndex].weight);
        }
      }
    });
  const diff = Math.abs(attemptedWeight - totalWeight);
  const per = (attemptedWeight + diff) / attemptedWeight;
  if (per >= 1.02) {
    const overWeight = overPlate * 2 * ratio;
    const totalOver = totalWeight + overWeight;
    const diffOver = Math.abs(totalOver - attemptedWeight);
    const perOver = (attemptedWeight + diffOver) / attemptedWeight;
    if (perOver < per) {
      totalWeight += overWeight;
      usedPlates.push(overPlate);
    }
  }
  const isExcessive = totalWeight / attemptedWeight < 0.98;
  return {
    usedPlates,
    weight: totalWeight,
    isExcessive
  };
};

export interface StatusState {
  name: string;
  progress: 'inactive' | 'active' | 'completed';
  targetWeight: number;
  targetUnit: 'kg' | 'lb';
  exerciseSet: ExerciseSetInterface | null;
  warmupTemplate: WarmupTemplateInterface | null;
  sets: ActiveSetInterface[];
  start: number;
  savedWarmups: SavedWarmupInterface[];
  init: boolean;
}

export const initialState: StatusState = {
  name: '',
  progress: 'inactive',
  targetWeight: 200,
  targetUnit: 'lb',
  exerciseSet: null,
  warmupTemplate: null,
  sets: [],
  start: 0,
  savedWarmups: [],
  init: false
};

export function reducer(
  state = initialState,
  action: fromStatusActions.ActionsUnion
): StatusState {
  switch (action.type) {

    case fromStatusActions.ActionTypes.LoadState: {
      return {
        ...action.payload
      };
    }

    case fromStatusActions.ActionTypes.InitApp: {
      return {
        ...state,
        init: true
      };
    }

    case fromStatusActions.ActionTypes.CreateWarmupSets: {
      if (state.exerciseSet && state.warmupTemplate) {
        const sets: ActiveSetInterface[] = [];
        const ratio = state.exerciseSet.unit === state.targetUnit
        ? 1
        : state.targetUnit === 'lb'
          ? 2.20462
          : 0.453592;
        const barWeight = state.exerciseSet.set.bar * ratio;
        let lastPlates = [];
        state.warmupTemplate.sets.forEach((set: { percentage: number, reps: number }, setIndex: number) => {
          const attemptedWeight = state.targetWeight * set.percentage / 100;
          let workingWeight = attemptedWeight;
          let plateMath: {
            usedPlates: number[],
            weight: number,
            isExcessive: boolean
          } | undefined;
          if (attemptedWeight > barWeight) {
            plateMath = getPlates(
              state.exerciseSet.set.plates,
              attemptedWeight - barWeight,
              ratio
            );
            workingWeight = plateMath.weight + barWeight;
          } else {
            workingWeight = barWeight;
          }
          let platesRemovedIndex = -1;
          for (let i = 0; i < lastPlates.length; i++) {
            const matchingPlate = plateMath && plateMath.usedPlates[i];
            if (!matchingPlate || matchingPlate !== lastPlates[i]) {
              platesRemovedIndex = i;
              break;
            }
          }
          let platesAddedIndex = -1;
          if (plateMath && plateMath.usedPlates.length) {
            if (platesRemovedIndex === -1) {
              if (lastPlates.length < plateMath.usedPlates.length) {
                platesAddedIndex = lastPlates.length;
              }
            } else {
              platesAddedIndex = platesRemovedIndex;
            }
          }
          const percentage = workingWeight / state.targetWeight * 100;
          sets.push({
            setIndex,
            timeCompleted: 0,
            weight: Math.round(workingWeight * 10) / 10,
            reps: set.reps,
            percentage: Math.round(percentage * 10) / 10,
            platesStart: lastPlates,
            platesRemovedIndex,
            platesAddedIndex,
            platesEnd: plateMath ? plateMath.usedPlates : [],
            isExcessive: plateMath && plateMath.isExcessive,
            isTarget: false
          });
          lastPlates = plateMath ? plateMath.usedPlates : [];
        });

        if (state.targetWeight < barWeight) {
          const percentage = barWeight / state.targetWeight * 100;
          sets.push({
            setIndex: sets.length,
            timeCompleted: 0,
            weight: barWeight,
            reps: 0,
            percentage: Math.round(percentage * 10) / 10,
            platesStart: lastPlates,
            platesRemovedIndex: 0,
            platesAddedIndex: 0,
            platesEnd: [],
            isExcessive: false,
            isTarget: true
          });
        } else {
          const plateMath: {
            usedPlates: number[],
            weight: number,
            isExcessive: boolean
          } | undefined = getPlates(
            state.exerciseSet.set.plates,
            state.targetWeight - barWeight,
            ratio
          );
          const total = (plateMath.weight + barWeight);
          let platesRemovedIndex = -1;
          for (let i = 0; i < lastPlates.length; i++) {
            const matchingPlate = plateMath && plateMath.usedPlates[i];
            if (!matchingPlate || matchingPlate !== lastPlates[i]) {
              platesRemovedIndex = i;
              break;
            }
          }
          let platesAddedIndex = -1;
          if (plateMath && plateMath.usedPlates.length) {
            if (platesRemovedIndex === -1) {
              if (lastPlates.length < plateMath.usedPlates.length) {
                platesAddedIndex = lastPlates.length;
              }
            } else {
              platesAddedIndex = platesRemovedIndex;
            }
          }
          const percentage = total / state.targetWeight * 100;
          sets.push({
            setIndex: sets.length,
            timeCompleted: 0,
            weight: Math.round(total * 10) / 10,
            reps: 0,
            percentage: Math.round(percentage * 10) / 10,
            platesStart: lastPlates,
            platesRemovedIndex,
            platesAddedIndex,
            platesEnd: plateMath ? plateMath.usedPlates : [],
            isExcessive: plateMath.isExcessive,
            isTarget: true
          });
        }
        return {
          ...state,
          start: Date.now(),
          targetWeight: state.targetWeight,
          progress: 'active',
          sets
        };
      } else {
        return {
          ...state
        };
      }
    }

    case fromStatusActions.ActionTypes.SetTargetWeight: {
      return {
        ...state,
        targetWeight: action.payload
      };
    }

    case fromStatusActions.ActionTypes.FinishWarmup: {
      const newSavedWarmup: SavedWarmupInterface = {
        name: state.name,
        targetWeight: state.targetWeight,
        targetUnit: state.targetUnit,
        setName: state.exerciseSet.name,
        templateName: state.warmupTemplate.name,
        time: state.start,
        timeEnd: Date.now(),
        sets: state.sets
      };
      return {
        ...state,
        progress: 'inactive',
        savedWarmups: [
          ...state.savedWarmups,
          newSavedWarmup
        ]
      };
    }

    case fromStatusActions.ActionTypes.ToggleSetAsComplete: {
      return {
        ...state,
        sets: [
          ...state.sets.slice(0, action.payload),
          {
            ...state.sets[action.payload],
            timeCompleted: state.sets[action.payload].timeCompleted
              ? 0
              : Date.now()
          },
          ...state.sets.slice(action.payload + 1)
        ]
      };
    }

    case fromStatusActions.ActionTypes.ToggleUnit: {
      return {
        ...state,
        targetUnit: state.targetUnit === 'kg'
          ? 'lb'
          : 'kg'
      };
    }

    default: {
      return state;
    }

    case fromStatusActions.ActionTypes.RemoveSave: {
      return {
        ...state,
        savedWarmups: [
          ...state.savedWarmups.slice(0, action.payload),
          ...state.savedWarmups.slice(action.payload + 1)
        ]
      };
    }

    case fromStatusActions.ActionTypes.SetExercise: {
      return {
        ...state,
        exerciseSet: action.payload
      };
    }

    case fromStatusActions.ActionTypes.SetTemplate: {
      return {
        ...state,
        warmupTemplate: action.payload
      };
    }

    case fromStatusActions.ActionTypes.SetName: {
      return {
        ...state,
        name: action.payload
      };
    }

  }
}

export const getStatus = (state: StatusState) => state;
