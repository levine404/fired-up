import { Component } from '@angular/core';
import format from 'format-duration';
import { StatusService } from '../services.status.service';
import { WarmupService } from '../services.warmup-templates.service';
import { ExerciseSetService } from '../services.exercise-set.service';
import { StatusState } from '../reducers/status.reducer';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  start: number;
  now: number;

  constructor(
    public statusService: StatusService,
    public warmupService: WarmupService,
    public exerciseSetService: ExerciseSetService
  ) {
    this.now = Date.now();
    setInterval(() => {
      this.statusService.getStatusState().subscribe((status: StatusState) => {
        this.start = status.start;
        this.now = Date.now();
      });
    }, 500);
  }

  public timerTime(): string {
    return format(this.now - this.start, { leading: true });
  }

  public identfy(index: number, obj: any): string {
    return obj.id;
  }

}
