import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseSetService } from '../services.exercise-set.service';
import { StatusService } from '../services.status.service';
import { WarmupService } from '../services.warmup-templates.service';
import { ExpandableComponent } from '../components/expandable/expandable.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ExpandableComponent
  ],
  exports: [
    ExpandableComponent
  ],
  providers: [
    ExerciseSetService,
    StatusService,
    WarmupService
  ]
})
export class ServicesModule {}
