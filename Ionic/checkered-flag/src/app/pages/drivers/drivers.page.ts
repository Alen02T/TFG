import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {

  driversInfo:driverInfo[] | null;
  // director:Director = new Director
  constructor(private _driverService: driverInfoService
    // private _token:TokenHandlerService
    ) {
    this.driversInfo = null;

  }

//   getDirector(){
//     this._token
//      .getDirector()
//      .subscribe((x) => (this.director = x) && this.loadData());
//  }

//  loadData(){
//   if(this.director!=null){

//   }

//  }

  ngOnInit(): void {
    this._driverService.getdriverInfoDataByLeagueOrderedByPoints(environment.LEAGUEID).subscribe(apiDrivers => this.driversInfo=apiDrivers);
    // this.getDirector()
   }
}
