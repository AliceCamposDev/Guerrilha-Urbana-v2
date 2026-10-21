import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrafosPage } from './grafos.page';

const routes: Routes = [
  {
    path: '',
    component: GrafosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrafosPageRoutingModule {}
