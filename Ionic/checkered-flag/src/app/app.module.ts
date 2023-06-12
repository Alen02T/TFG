import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DriverService } from './services/driver.service';
import { driverInfoService } from './services/driverInfo.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DriversPageModule } from './pages/drivers/drivers.module';
import { TeamsPageModule } from './pages/teams/teams.module';
import { AuthInterceptor } from './services/AuthServices/auth.interceptor';
import { CookieHandlerService } from './services/AuthServices/cookie-handler.service';
import { TokenHandlerService } from './services/AuthServices/token-handler.service';
import { DirectorService } from './services/AuthServices/director.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageModule } from './pages/login/login.module';
import { SelectedDriverPageModule } from './pages/selected-driver/selected-driver.module';
import { FolderPageModule } from './folder/folder.module';
import { SelectedTeamPageModule } from './pages/selected-team/selected-team.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    DriversPageModule,TeamsPageModule,LoginPageModule,SelectedDriverPageModule,
    FolderPageModule,SelectedTeamPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CookieHandlerService,TokenHandlerService,DirectorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],

})
export class AppModule {}
