import { ActiveSetInterface } from './active-set';

export interface SavedWarmupInterface {
  name: string;
  targetWeight: number;
  targetUnit: 'kg' | 'lb';
  setName: string;
  templateName: string;
  time: number;
  timeEnd: number;
  sets: ActiveSetInterface[];
}
