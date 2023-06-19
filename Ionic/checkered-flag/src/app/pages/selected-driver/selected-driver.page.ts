import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { RaceResultService } from 'src/app/services/raceresult.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-selected-driver',
  templateUrl: './selected-driver.page.html',
  styleUrls: ['./selected-driver.page.scss'],
})
export class SelectedDriverPage implements OnInit {

  driverInfo:driverInfo=new driverInfo()
  driverId:number=0;
  raceResults:raceResult[] =[]
  constructor(private activatedRoute:ActivatedRoute,
    private driverInfoService:driverInfoService,private _raceResultsService:RaceResultService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((parameters:any)=>{
      this.driverId=parameters.get("id")
    })

    this._raceResultsService.getRaceResultByDriver(this.driverId).subscribe(apiDatos=>this.raceResults=apiDatos)
    this.driverInfoService.getdriverInfoDataByDriverId(environment.LEAGUEID,this.driverId).subscribe(apiDatos=>this.driverInfo=apiDatos)
  }

}
