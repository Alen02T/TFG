import { Component, OnInit } from '@angular/core';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { driverInfoService } from 'src/app/services/driverInfo.service';

@Component({
  selector: 'app-admin-drivers',
  templateUrl: './admin-drivers.component.html',
  styleUrls: ['./admin-drivers.component.css']
})
export class AdminDriversComponent implements OnInit {


  driversInfo:driverInfo[] | null;

  constructor(private _driverInfoService:driverInfoService) {
    this.driversInfo=null;
  }

  ngOnInit(): void {
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByPrice(1).subscribe(apiDriverInfo=>this.driversInfo=apiDriverInfo)
  }


  getPoints(){

  }


}
