import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { defaultWarmupTemplates } from './presets/default-warmup-templates';
import { defaultExerciseSets } from './presets/default-exercise-sets';
import { WarmupService } from './services.warmup-templates.service';
import { ExerciseSetService } from './services.exercise-set.service';
import { StatusService } from './services.status.service';
import { WarmupTemplateInterface } from 'src/types/warmup-template';
import { ExerciseSetInterface } from 'src/types/exercise-set';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private warmupService: WarmupService,
    private exerciseService: ExerciseSetService,
    private statusService: StatusService
  ) {
    this.initializeApp();
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.storage.get('status').then(status => {
      if (!status || !status.init) {
        Promise.all([
          this.storage.set('warmupTemplates', defaultWarmupTemplates),
          this.storage.set('exerciseSets', defaultExerciseSets)
        ]).then(() => {
          this.loadData();
          this.statusService.initApp();
        });
      } else {
        this.loadData();
        this.statusService.loadState(status);
      }

    });
  }

  loadData(): void {
    this.storage.get('warmupTemplates').then((warmupTemplates: WarmupTemplateInterface[]) => {
      this.warmupService.loadState({
        templates: warmupTemplates
      });
    });
    this.storage.get('exerciseSets').then((sets: ExerciseSetInterface[]) => {
      this.exerciseService.loadState({
        sets
      });
    });
  }
}
