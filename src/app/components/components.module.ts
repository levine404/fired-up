import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [HeaderComponent]
})
export class ComponentsModule { }
