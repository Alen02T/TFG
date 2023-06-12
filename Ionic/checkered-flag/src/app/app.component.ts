import { Component } from '@angular/core';
import { DriverService } from './services/driver.service';
import { driverInfoService } from './services/driverInfo.service';
import { Driver } from './models/driver.model';
import { driverInfo } from './models/driverinfo.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    { title: 'Driver', url: '/drivers', icon: 'people' },
    { title: 'Teams', url: '/teams', icon: 'heart' },
  ];

  drivers:driverInfo[] =[]
  driversMoney:driverInfo[] = []
  ratedDrivers:driverInfo[] = []

  constructor(private _driverInfoService:driverInfoService) {

  }

  ngOnInit(){
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByPrice(environment.LEAGUEID).subscribe(apiDatos=>this.driversMoney=apiDatos)
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByPoints(environment.LEAGUEID).subscribe(apiDatos=>this.drivers=apiDatos)
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByRating(environment.LEAGUEID).subscribe(apiDatos=>this.ratedDrivers=apiDatos)
  }
}
