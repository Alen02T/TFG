import { NgModule } from '@angular/core';
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

const routes: Routes = [

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
  {
    path: 'Qualy',
    component:CreateQualyComponent,
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
