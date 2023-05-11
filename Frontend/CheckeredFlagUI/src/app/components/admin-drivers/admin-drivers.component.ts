import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { AbilityService } from 'src/app/services/ability.service';
import { DriverService } from 'src/app/services/driver.service';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-admin-drivers',
  templateUrl: './admin-drivers.component.html',
  styleUrls: ['./admin-drivers.component.css']
})
export class AdminDriversComponent implements OnInit {


  driversInfoOrderedByPrice:driverInfo[] | null;
  driversInfoByLeague:driverInfo[] | null;
  driversInfoByRating:driverInfo[] | null;

  drivers:Driver[] | null;

  color:string | null;
  colors:any[] | null;
  suma:number;



  panelDrivers = new FormControl('red');

  constructor(private _driverInfoService:driverInfoService,
    private _driverService:DriverService,private _statService:StatService,
    private _abilityService:AbilityService,private router:Router) {
    this.driversInfoOrderedByPrice=null;
    this.driversInfoByLeague=null;
    this.color=null;
    this.colors=null;
    this.driversInfoByRating=null;
    this.suma=0;
    this.drivers=null;
  }

  ngOnInit(): void {
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByPrice(1).subscribe(apiDriverInfo=>this.driversInfoOrderedByPrice=apiDriverInfo);
    this.getPoints()
    this.getTopRatedDrivers()
    this._driverService.getDriversByLeagueId(1).subscribe(apiDriver=>this.drivers=apiDriver);
  }


  getTopRatedDrivers(){
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByRating(1).subscribe(apiDriversInfo=>this.driversInfoByRating=apiDriversInfo)
  }

  onDeleteDriver(driver:Driver) {
    this._driverService.deleteDriver(driver.driverId)
    this._statService.deleteStatByDriverId(driver.driverId)
    this._abilityService.deleteAbilityByDriverId(driver.driverId)
    // this.router.navigate(['admin']);
    this.reloadPage();

  }

  reloadPage() {
    location.reload();
  }


  getPoints(){
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByPoints(1).subscribe(apiDriverInfo => {
      this.driversInfoByLeague=apiDriverInfo

      const colors: any[] | null = [];


      this.driversInfoByLeague.forEach((dato,index)=>{

        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        const color= `rgb(${red}, ${green}, ${blue})`;
        colors[index] = color;

        this.suma+=dato.driverPoints

      })
      this.colors = colors;

    })
  }



}
