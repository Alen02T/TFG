import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedDriverPage } from './selected-driver.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedDriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedDriverPageRoutingModule {}
