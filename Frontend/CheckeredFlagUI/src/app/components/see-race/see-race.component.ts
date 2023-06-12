import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { GrandPrix } from 'src/app/models/grandprix.model';
import { Qualy } from 'src/app/models/qualy.model';
import { qualyresult } from 'src/app/models/qualyresult.model';
// import { qualyResult } from 'src/app/models/qualyResult.model';


import { Race } from 'src/app/models/race.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { QualyService } from 'src/app/services/qualy.service';
import { QualyResultService } from 'src/app/services/qualyresult.service';
import { RaceService } from 'src/app/services/race.service';
import { RaceResultService } from 'src/app/services/raceresult.service';

@Component({
  selector: 'app-see-race',
  templateUrl: './see-race.component.html',
  styleUrls: ['./see-race.component.css']
})
export class SeeRaceComponent implements OnInit {
  //raceId:number;
  grandPrix:GrandPrix= new GrandPrix();
  //results:Result [] | null;
  //result:Result | null;
  //raceResult: raceResult | null;
  raceResults:raceResult[] | null;
  //driver:Driver | null;
  race:Race=new Race();
  raceId:number;
  qualys:Qualy[] | null;
  qualysResults:qualyresult[] | null;
  director:Director=new Director()
  constructor(
    private _grandPrixService:GrandPrixService,
    private activatedRoute:ActivatedRoute,
    private _raceResultService:RaceResultService,
    private _qualyService:QualyService,private _raceService:RaceService,
    private _qualyResultService:QualyResultService,private _token:TokenHandlerService
  ) {
    this.raceId=0;
    this.raceResults=null;
    this.qualys=null
    this.qualysResults=null;
  }

  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

 loadData(){
  if(this.director!=null){
    this._qualyService.getQualysByRace(this.raceId).subscribe(apiEscuderia=>this.qualys=apiEscuderia);
    this._raceService.getRaceById(this.raceId).subscribe(apiEscuderia => this.race=apiEscuderia);
    // this._grandPrixService.getGrandPrixByRound(this.director.leagueId,this.raceId).subscribe(apiEscuderia => this.grandPrix=apiEscuderia);
    this._grandPrixService.getGrandPrixByRaceID(this.raceId).subscribe(apiEscuderia => this.grandPrix=apiEscuderia);
    //this._raceResultService.getRaceResultById(this.raceId).subscribe(apiEscuderia => this.raceResult=apiEscuderia);
    this._qualyResultService.getQualyResultByGrandPrix(this.raceId).subscribe((x) => (this.qualysResults=x));
    this._raceResultService.getRaceResultByGrandPrix(this.raceId).subscribe((x) => (this.raceResults=x));
  }
 }

  ngOnInit(): void {
    this.getDirector()
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.raceId = parameters.get('id');
    });


  }

}
