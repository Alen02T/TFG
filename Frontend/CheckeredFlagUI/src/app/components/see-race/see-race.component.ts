import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { GrandPrix } from 'src/app/models/grandprix.model';
import { Qualy } from 'src/app/models/qualy.model';
// import { qualyResult } from 'src/app/models/qualyResult.model';


import { Race } from 'src/app/models/race.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { QualyService } from 'src/app/services/qualy.service';
import { QualyResultService } from 'src/app/services/qualyresult.service';
import { RaceResultService } from 'src/app/services/raceresult.service';

@Component({
  selector: 'app-see-race',
  templateUrl: './see-race.component.html',
  styleUrls: ['./see-race.component.css']
})
export class SeeRaceComponent implements OnInit {
  //raceId:number;
  grandPrix:GrandPrix | null;
  //results:Result [] | null;
  //result:Result | null;
  //raceResult: raceResult | null;
  raceResults:raceResult[] | null;
  //driver:Driver | null;
  //race:Race|null;
  raceId:number;
  qualys:Qualy[] | null;
  // qualysResults:qualyResult[] | null;
  constructor(
    private _grandPrixService:GrandPrixService,
    private activatedRoute:ActivatedRoute,
    private _raceResultService:RaceResultService,
    private _qualyService:QualyService,
    private _qualyResultService:QualyResultService
  ) {
    this.raceId=0;
    this.grandPrix=null;
    this.raceResults=null;
    this.qualys=null
    // this.qualysResults=null;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.raceId = parameters.get('id');
    });

    this._qualyService.getQualysByRace(this.raceId).subscribe(apiEscuderia=>this.qualys=apiEscuderia);
    //this._raceService.getRaceById(this.raceId).subscribe(apiEscuderia => this.race=apiEscuderia);
    this._grandPrixService.getGrandPrixByRound(this.raceId).subscribe(apiEscuderia => this.grandPrix=apiEscuderia);
    //this._raceResultService.getRaceResultById(this.raceId).subscribe(apiEscuderia => this.raceResult=apiEscuderia);
    // this._qualyResultService.getQualyResultByGrandPrix(this.raceId).subscribe((x) => (this.qualysResults=x));
    this._raceResultService.getRaceResultByGrandPrix(this.raceId).subscribe((x) => (this.raceResults=x));
  }

}
