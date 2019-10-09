import { ExerciseSetInterface } from '../../types/exercise-set';

export const defaultExerciseSets: ExerciseSetInterface[] = [
  {
    id: 'Imperial Set',
    name: 'Imperial Set',
    type: 'bar',
    unit: 'lb',
    set: {
      bar: 45,
      plates: [
        {
          weight: 45,
          count: 12
        },
        {
          weight: 35,
          count: 6
        },
        {
          weight: 25,
          count: 6
        },
        {
          weight: 15,
          count: 4
        },
        {
          weight: 10,
          count: 4
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
          count: 4
        }
      ]
    }
  },
  {
    id: 'Metric Set',
    name: 'Metric Set',
    type: 'bar',
    unit: 'kg',
    set: {
      bar: 20,
      plates: [
        {
          weight: 25,
          count: 12
        },
        {
          weight: 20,
          count: 6
        },
        {
          weight: 15,
          count: 6
        },
        {
          weight: 10,
          count: 4
        },
        {
          weight: 7.5,
          count: 4
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
          count: 4
        }
      ]
    }
  }
];
