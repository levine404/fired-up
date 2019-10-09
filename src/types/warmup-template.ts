export interface WarmupTemplateInterface {
  id: string;
  name: string;
  sets: Array<{
    percentage: number | 'bar';
    reps: number;
  }>;
}
