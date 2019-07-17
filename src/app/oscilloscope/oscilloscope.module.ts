import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OscilloscopePage } from './oscilloscope.page';

const routes: Routes = [
  {
    path: '',
    component: OscilloscopePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OscilloscopePage]
})
export class OscilloscopePageModule {}
