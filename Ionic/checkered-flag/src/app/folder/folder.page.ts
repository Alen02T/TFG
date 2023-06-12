import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { RaceResultService } from '../services/raceresult.service';
import { raceResult } from '../models/raceresult.model';
import { environment } from 'src/environments/environment';
import { GrandPrix } from '../models/grandprix.model';
import { GrandPrixService } from '../services/grandPrix.service';
import { driverInfo } from '../models/driverinfo.model';
import { driverInfoService } from '../services/driverInfo.service';

register();
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  raceResults:raceResult[] = []
  grandPrix:GrandPrix=new GrandPrix()
  driversInfo:driverInfo[] = []

  constructor(private _raceResultService:RaceResultService,private _grandPrixService:GrandPrixService
    ,private _driverInfoService:driverInfoService) {}

  ngOnInit() {
    this._grandPrixService.getGrandPrixByRound(environment.LEAGUEID,environment.RONDA).subscribe(apiDatos=>this.grandPrix=apiDatos)
    this._raceResultService.getRaceResultByRound(environment.LEAGUEID,environment.RONDA).subscribe(apiDatos=>this.raceResults=apiDatos)
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByPoints(environment.LEAGUEID).subscribe(apiDatos=>this.driversInfo=apiDatos)
  }
}
