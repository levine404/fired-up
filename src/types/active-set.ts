export interface ActiveSetInterface {
  setIndex: number;
  timeCompleted: number;
  weight: number;
  reps: number;
  percentage: number;
  platesStart: number[];
  platesRemovedIndex: number;
  platesAddedIndex: number;
  platesEnd: number[];
  isExcessive: boolean;
  isTarget: boolean;
}
