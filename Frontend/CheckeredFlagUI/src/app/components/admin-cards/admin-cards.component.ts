import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-admin-cards',
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.css']
})
export class AdminCardsComponent implements OnInit {

  drivers:Driver[] | null;

  contadorDrivers:number;
  progressDrivers:number;

  constructor(private _driverService:DriverService) {
    this.drivers=null;


    this.contadorDrivers=0;

    this.progressDrivers=0;
   }

  ngOnInit(): void {
    this._driverService.getDriverData().subscribe(apiDrivers=>{
      this.drivers=apiDrivers

      this.contadorDrivers=this.drivers.length
      this.getDriversProgressBar()
    });
  }





  getDriversProgressBar(){
    this._driverService.getDriverData().subscribe(apiDrivers=>{
      this.drivers=apiDrivers

      this.contadorDrivers=this.drivers.length


      var maxDrivers = 20;
      var getPx=this.contadorDrivers*100/maxDrivers
      this.progressDrivers=getPx;
      console.log(this.progressDrivers)

    });
  }

}
