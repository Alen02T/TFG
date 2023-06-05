import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableDriversPage } from './table-drivers.page';

const routes: Routes = [
  {
    path: '',
    component: TableDriversPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableDriversPageRoutingModule {}
