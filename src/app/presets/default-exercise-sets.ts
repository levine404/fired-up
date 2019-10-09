import { ExerciseSetInterface } from '../../types/exercise-set';

export const defaultExerciseSets: ExerciseSetInterface[] = [
  {
    id: 'Standard',
    name: 'Standard',
    type: 'dumbbell',
    unit: 'kg',
    set: {
      bar: 20,
      plates: [
        {
          weight: 10,
          count: 6
        },
        {
          weight: 25,
          count: 10
        },
        {
          weight: 5,
          count: 4
        },
        {
          weight: 2.5,
          count: 4
        },
        {
          weight: 1.25,
          count: 5
        }
      ]
    }
  }
];
