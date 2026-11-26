import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { FichaPageRoutingModule } from './ficha-routing.module';

import { FichaPage } from './ficha.page';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, FichaPageRoutingModule],
  declarations: [FichaPage],
})
export class FichaPageModule {}
