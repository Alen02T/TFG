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
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSidenavModule
  ],
  providers: [TeamService,CookieHandlerService,DirectorService,TokenHandlerService,DriverService,AbilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
