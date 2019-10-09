import { BarSetInterface } from './bar-set';

export interface ExerciseSetInterface {
  id: string;
  name: string;
  type: 'bar' | 'dumbbell';
  unit: 'kg'| 'lb';
  set: BarSetInterface;
}
