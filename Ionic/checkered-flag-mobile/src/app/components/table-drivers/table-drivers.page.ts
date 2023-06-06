import { Component, OnInit } from '@angular/core';
import { DriverStandingsService } from 'src/app/services/driverStandings/driver-standings.service';

@Component({
  selector: 'app-table-drivers',
  templateUrl: './table-drivers.page.html',
  styleUrls: ['./table-drivers.page.scss'],
})
export class TableDriversPage implements OnInit {

  standings:any

  constructor(private _standingsService:DriverStandingsService) { }

  ngOnInit() {
    this._standingsService.getStandingsFrom2023().subscribe(apiDatos=>{
      this.standings=apiDatos
      console.log(this.standings)
    })
  }

}
