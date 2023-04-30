import { Component, OnInit } from '@angular/core';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { driverInfoService } from 'src/app/services/driverInfo.service';

@Component({
  selector: 'app-admin-drivers',
  templateUrl: './admin-drivers.component.html',
  styleUrls: ['./admin-drivers.component.css']
})
export class AdminDriversComponent implements OnInit {


  driversInfoOrderedByPrice:driverInfo[] | null;
  driversInfoByLeague:driverInfo[] | null;
  driversInfoByRating:driverInfo[] | null;

  color:string | null;
  colors:any[] | null;
  suma:number;

  constructor(private _driverInfoService:driverInfoService) {
    this.driversInfoOrderedByPrice=null;
    this.driversInfoByLeague=null;
    this.color=null;
    this.colors=null;
    this.driversInfoByRating=null;
    this.suma=0;
  }

  ngOnInit(): void {
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByPrice(1).subscribe(apiDriverInfo=>this.driversInfoOrderedByPrice=apiDriverInfo);
    this.getPoints()
    this.getTopRatedDrivers()
  }


  getTopRatedDrivers(){
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByRating(1).subscribe(apiDriversInfo=>this.driversInfoByRating=apiDriversInfo)
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
