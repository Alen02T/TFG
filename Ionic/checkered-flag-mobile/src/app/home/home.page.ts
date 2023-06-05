import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { DriverService } from '../services/driver.service';
import { RaceResultService } from '../services/race-result.service';

register()

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  swiperModules = [IonicSlides];
 @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  logActiveIndex() {
    console.log(this.swiperRef?.nativeElement.swiper.activeIndex);
  }


  drivers:any[]=[]
  raceResults:any[]=[]

  constructor(private _driverService:DriverService,
    private _raceResultService:RaceResultService) {
  }

  getDrivers(){
    this._driverService.getAllDrivers().subscribe(data =>{
      this.drivers = data
      console.log(this.drivers)
    }
    );
  }

  getRaceResults(){
    this._raceResultService.getLatestRaceResultDriversANDCircuit().subscribe(apiDatos=>{
      this.raceResults=apiDatos
      console.log(this.raceResults)
    })
  }

  ngOnInit() {
    this.getDrivers()
    this.getRaceResults()
  }

}
