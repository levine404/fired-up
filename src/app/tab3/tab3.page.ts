import { Component } from '@angular/core';
import { WarmupService } from '../services.warmup-templates.service';
import { WarmupTemplateInterface } from 'src/types/warmup-template';
import { ExerciseSetInterface } from 'src/types/exercise-set';
import { ExerciseSetService } from '../services.exercise-set.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public itemOpen: string | null;

  constructor(
    public warmupService: WarmupService,
    public exSerivce: ExerciseSetService
  ) {
    this.itemOpen = null;
  }

  public openItem(item: string): void {
    if (item && item !== this.itemOpen) {
      this.itemOpen = item;
    } else {
      this.itemOpen = null;
    }
  }

  public percs(sets: Array<{ percentage: number | string, reps: number }>): string {
    return sets.map(set => set.percentage + '%').join(', ');
  }

  public plates(): string {
    return 'plates';
  }

  public identifyTemplate(index: number, template: WarmupTemplateInterface) {
    return template.id;
  }
  public identifySet(index: number) {
    return index;
  }

  identifyExSet(index: number, set: ExerciseSetInterface) {
    return set.id;
  }

}
