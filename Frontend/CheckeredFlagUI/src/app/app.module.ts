import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamService } from './services/team.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieHandlerService } from './services/AuthServices/cookie-handler.service';
import { AdminComponent } from './components/admin/admin.component';
import { DirectorService } from './services/AuthServices/director.service';
import { TokenHandlerService } from './services/AuthServices/token-handler.service';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { DriverService } from './services/driver.service';
import { CardsComponent } from './components/cards/cards.component';
import { AbilityService } from './services/ability.service';
import { DriversComponent } from './components/drivers/drivers.component';
import { driverInfoService } from './services/driverInfo.service';
import { SelectedDriverComponent } from './components/selected-driver/selected-driver.component';
import { StatService } from './services/stat.service';
import { SelectedTeamComponent } from './components/selected-team/selected-team.component';
import { SelectedCircuitComponent } from './components/selected-circuit/selected-circuit.component';
import { CircuitService } from './services/circuit.service';
import { SponsorService } from './services/sponsor.service';
import { GrandPrixService } from './services/grandPrix.service';
import { CreateQualyComponent } from './components/create-qualy/create-qualy.component';
import { QualyService } from './services/qualy.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SeeRaceComponent } from './components/see-race/see-race.component';
import { RaceResultService } from './services/raceresult.service';
import {MatTabsModule} from '@angular/material/tabs';
import { QualyResultService } from './services/qualyresult.service';
import { HomeLeagueComponent } from './components/home-league/home-league.component';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { LigaService } from './services/liga.service';
import { AdminCardsComponent } from './components/admin-cards/admin-cards.component';
import { CommonModule } from '@angular/common';
import { AdminDriversComponent } from './components/admin-drivers/admin-drivers.component';
import { AdminTeamsComponent } from './components/admin-teams/admin-teams.component';
import {MatSelectModule} from '@angular/material/select';
import { AdminAddDriverComponent } from './components/admin-add-driver/admin-add-driver.component';
import { AdminSelectedDriverComponent } from './components/admin-selected-driver/admin-selected-driver.component';
import {MatSliderModule} from '@angular/material/slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdminSelectedTeamComponent } from './components/admin-selected-team/admin-selected-team.component';
import { AdminAddRacesComponent } from './components/admin-add-races/admin-add-races.component';
import { RaceService } from './services/race.service';

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    LoginComponent,
    AdminComponent,
    RegisterComponent,
    AdminHeaderComponent,
    HomeComponent,
    HeaderComponent,
    CardsComponent,
    DriversComponent,
    SelectedDriverComponent,
    SelectedTeamComponent,
    SelectedCircuitComponent,
    CreateQualyComponent,
    SeeRaceComponent,
    HomeLeagueComponent,
    HeaderHomeComponent,
    AdminCardsComponent,
    AdminDriversComponent,
    AdminTeamsComponent,
    AdminAddDriverComponent,
    AdminSelectedDriverComponent,
    AdminSelectedTeamComponent,
    AdminAddRacesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSidenavModule,
    DragDropModule,
    MatTabsModule,
    MatSelectModule,
    MatSliderModule
  ],
  providers: [TeamService,CookieHandlerService,DirectorService,TokenHandlerService,
    DriverService,AbilityService,driverInfoService,StatService,CircuitService
  ,SponsorService,GrandPrixService,QualyService,RaceResultService,QualyResultService
,LigaService,RaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
