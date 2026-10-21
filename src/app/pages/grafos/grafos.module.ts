import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { GrafosPageRoutingModule } from './grafos-routing.module';

import { GrafosPage } from './grafos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrafosPageRoutingModule
  ],
  declarations: [GrafosPage]
})
export class GrafosPageModule {}
