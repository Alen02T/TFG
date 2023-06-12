import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedTeamPageRoutingModule } from './selected-team-routing.module';

import { SelectedTeamPage } from './selected-team.page';
import { DriverService } from 'src/app/services/driver.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedTeamPageRoutingModule
  ],
  declarations: [SelectedTeamPage],
  providers:[DriverService],
})
export class SelectedTeamPageModule {}
