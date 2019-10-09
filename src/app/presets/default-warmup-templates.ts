import { WarmupTemplateInterface } from '../../types/warmup-template';

export const defaultWarmupTemplates: WarmupTemplateInterface[] = [
  {
    id: 'Standard',
    name: 'Standard',
    sets: [
      {
        percentage: 10,
        reps: 15,
      },
      {
        percentage: 50,
        reps: 8
      },
      {
        percentage: 70,
        reps: 5
      },
      {
        percentage: 80,
        reps: 3
      },
      {
        percentage: 90,
        reps: 1
      }
    ]
  },
  {
    id: 'Quick',
    name: 'Quick',
    sets: [
      {
        percentage: 10,
        reps: 15
      },
      {
        percentage: 60,
        reps: 8
      },
      {
        percentage: 85,
        reps: 3
      }
    ]
  },
  {
    id: 'Max Out',
    name: 'Max Out',
    sets: [
      {
        percentage: 10,
        reps: 10
      },
      {
        percentage: 50,
        reps: 8
      },
      {
        percentage: 70,
        reps: 3
      },
      {
        percentage: 80,
        reps: 2
      },
      {
        percentage: 90,
        reps: 1
      },
      {
        percentage: 95,
        reps: 1
      }
    ]
  }
];
