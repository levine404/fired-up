import { WarmupTemplateInterface } from '../../types/warmup-template';

export const defaultWarmupTemplates: WarmupTemplateInterface[] = [
  {
    id: 'Standard',
    name: 'Standard',
    sets: [
      {
        percentage: 10,
        reps: 1,
      },
      {
        percentage: 20,
        reps: 2,
      },
      {
        percentage: 50,
        reps: 40
      },
      {
        percentage: 50,
        reps: 40
      },
      {
        percentage: 90,
        reps: 30
      },
      {
        percentage: 100,
        reps: 20
      }
    ]
  },
  {
    id: 'Quick',
    name: 'Quick',
    sets: [
      {
        percentage: 1,
        reps: 15
      },
      {
        percentage: 40,
        reps: 30
      }
    ]
  }
];
