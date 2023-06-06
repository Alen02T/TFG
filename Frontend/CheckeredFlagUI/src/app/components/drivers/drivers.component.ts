import { Component, OnInit } from '@angular/core';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { DriverService } from 'src/app/services/driver.service';
import { driverInfoService } from 'src/app/services/driverInfo.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  driversInfo:driverInfo[] | null;
  director:Director = new Director
  constructor(private _driverService: driverInfoService,private _token:TokenHandlerService) {
    this.driversInfo = null;

  }

  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

 loadData(){
  if(this.director!=null){
    this._driverService.getdriverInfoDataByLeagueOrderedByPoints(this.director.leagueId).subscribe(apiDrivers => this.driversInfo=apiDrivers);
  }

 }

  ngOnInit(): void {

    this.getDirector()
   }
}
