import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableDriversPageRoutingModule } from './table-drivers-routing.module';

import { TableDriversPage } from './table-drivers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableDriversPageRoutingModule
  ],
  declarations: [TableDriversPage]
})
export class TableDriversPageModule {}
