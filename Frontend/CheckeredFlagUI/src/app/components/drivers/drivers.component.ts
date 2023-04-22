import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { DriverService } from 'src/app/services/driver.service';
import { driverInfoService } from 'src/app/services/driverInfo.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  driversInfo:driverInfo[] | null;

  constructor(private _driverService: driverInfoService) {
    this.driversInfo = null;

  }

  ngOnInit(): void {
    this._driverService.getdriverInfoData().subscribe(apiDrivers => this.driversInfo=apiDrivers);

   }
}
