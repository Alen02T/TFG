import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamService } from './services/team.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { CookieHandlerService } from './services/AuthServices/cookie-handler.service';
import { AdminComponent } from './components/admin/admin.component';
import { DirectorService } from './services/AuthServices/director.service';
import { TokenHandlerService } from './services/AuthServices/token-handler.service';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    LoginComponent,
    AdminComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TeamService,CookieHandlerService,DirectorService,TokenHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
