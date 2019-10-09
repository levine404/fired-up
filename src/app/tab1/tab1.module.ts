import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { TargetWeightComponent } from '../components/target-weight/target-weight.component';
import { ActiveSetComponent } from '../components/active-set/active-set.component';
import { PlateChartComponent } from '../components/plate-chart/plate-chart.component';
import { ComponentsModule } from '../components/components.module';
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ServicesModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [
    Tab1Page,
    TargetWeightComponent,
    ActiveSetComponent,
    PlateChartComponent
  ]
})
export class Tab1PageModule {}
