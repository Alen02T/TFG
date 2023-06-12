import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedDriverPageRoutingModule } from './selected-driver-routing.module';

import { SelectedDriverPage } from './selected-driver.page';
import { RaceResultService } from 'src/app/services/raceresult.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedDriverPageRoutingModule
  ],
  providers:[
    RaceResultService
  ],
  declarations: [SelectedDriverPage]
})
export class SelectedDriverPageModule {}
