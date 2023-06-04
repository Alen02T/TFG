import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './components/teams/teams.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CardsComponent } from './components/cards/cards.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { SelectedDriverComponent } from './components/selected-driver/selected-driver.component';
import { SelectedTeamComponent } from './components/selected-team/selected-team.component';
import { SelectedCircuitComponent } from './components/selected-circuit/selected-circuit.component';
import { CreateQualyComponent } from './components/create-qualy/create-qualy.component';
import { SeeRaceComponent } from './components/see-race/see-race.component';
import { HomeLeagueComponent } from './components/home-league/home-league.component';
import { AdminDriversComponent } from './components/admin-drivers/admin-drivers.component';
import { AdminTeamsComponent } from './components/admin-teams/admin-teams.component';
import { AdminAddDriverComponent } from './components/admin-add-driver/admin-add-driver.component';
import { AdminSelectedDriverComponent } from './components/admin-selected-driver/admin-selected-driver.component';
import { AdminSelectedTeamComponent } from './components/admin-selected-team/admin-selected-team.component';
import { AdminAddRacesComponent } from './components/admin-add-races/admin-add-races.component';
import { AdminAddResultComponent } from './components/admin-add-result/admin-add-result.component';
import { AdminRacesManagementComponent } from './components/admin-races-management/admin-races-management.component';
import { AdminRadarChartComponent } from './components/admin-radar-chart/admin-radar-chart.component';
import { AdminChartsComponent } from './components/admin-charts/admin-charts.component';
import { AdminAddTeamComponent } from './components/admin-add-team/admin-add-team.component';
import { AddLigaComponent } from './components/add-liga/add-liga.component';

const routes: Routes = [

  {
    path:'addLiga',
    component:AddLigaComponent
  },
 {
    path: 'teams',
    component: TeamsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'admin/drivers',
    component: AdminDriversComponent,
  },
  {
    path: 'admin/drivers/:id',
    component: AdminSelectedDriverComponent,
  },
  {
    path: 'admin/teams/:id',
    component: AdminSelectedTeamComponent,
  },
  {
    path: 'admin/addDriver',
    component: AdminAddDriverComponent,
  },
  {
    path: 'admin/addRaces',
    component: AdminAddRacesComponent,
  },
  {
    path: 'admin/addTeam',
    component: AdminAddTeamComponent,
  },
  {
    path: 'admin/races-management/addResults/:id',
    component: AdminAddResultComponent,
  },
  {
    path: 'admin/teams',
    component: AdminTeamsComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'cards',
    component: CardsComponent,
  },
  {
    path: '',
    component:HomeComponent,
  },
  {
    path: 'Teams',
    component:TeamsComponent,
  },
  {
    path: 'Teams/:id',
    component:SelectedTeamComponent,
  },
  {
    path: 'Drivers',
    component:DriversComponent,
  },
  {
    path: 'Drivers/:id',
    component:SelectedDriverComponent,
  },
  {
    path: 'Circuits/:id',
    component:SelectedCircuitComponent,
  },
  // {
  //   path: 'Qualy',
  //   component:CreateQualyComponent,
  // },
  {
    path: 'Qualy/:id',
    component:CreateQualyComponent,
  },
  {
    path: 'admin/races-management',
    component:AdminRacesManagementComponent,
  },
  {
    path: 'GrandPrix/:id',
    component: SeeRaceComponent,
  },
  {
    path: 'MyLeague',
    component: HomeLeagueComponent,
  },
  {
    path:'radar',
    component:AdminRadarChartComponent
  },
  {
    path:'admin/charts',
    component:AdminChartsComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
