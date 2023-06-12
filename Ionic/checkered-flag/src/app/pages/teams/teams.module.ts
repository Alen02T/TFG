import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamsPageRoutingModule } from './teams-routing.module';

import { TeamsPage } from './teams.page';
import { HttpClientModule } from '@angular/common/http';
import { TeamService } from 'src/app/services/team.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamsPageRoutingModule,
    HttpClientModule
  ],providers:[
    TeamService
  ],
  declarations: [TeamsPage]
})
export class TeamsPageModule {}
