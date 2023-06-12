import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriversPageRoutingModule } from './drivers-routing.module';

import { DriversPage } from './drivers.page';
import { HttpClientModule } from '@angular/common/http';
import { driverInfoService } from 'src/app/services/driverInfo.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriversPageRoutingModule,
    HttpClientModule
  ],
  providers:[
    driverInfoService
  ],
  declarations: [DriversPage]
})
export class DriversPageModule {}
