import { Component, OnInit } from '@angular/core';
import { Circuit } from 'src/app/models/circuit.model';
import { GrandPrix } from 'src/app/models/grandprix.model';
import { Liga } from 'src/app/models/liga.model';
import { Qualy } from 'src/app/models/qualy.model';
import { qualyresult } from 'src/app/models/qualyresult.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { LigaService } from 'src/app/services/liga.service';
import { QualyService } from 'src/app/services/qualy.service';
import { QualyResultService } from 'src/app/services/qualyresult.service';
import { RaceResultService } from 'src/app/services/raceresult.service';

@Component({
  selector: 'app-admin-races-management',
  templateUrl: './admin-races-management.component.html',
  styleUrls: ['./admin-races-management.component.css']
})
export class AdminRacesManagementComponent implements OnInit {

  grandPrixes:GrandPrix[] | null;
  currentGrandPrix:GrandPrix | null;
  liga:Liga | null;
  qualys:Qualy[] | null;
  qualysResults:qualyresult[] = [];
  raceResults:raceResult[] | null;

  ligaGetNumberCircuitos:Liga | null;
  circuitos:Circuit[] = [];

  constructor(private _grandPrixService:GrandPrixService,
    private _qualyService:QualyService,private _ligaService:LigaService,
    private _qualyResultService:QualyResultService,private _raceResultService:RaceResultService) {
    this.grandPrixes=null
    this.currentGrandPrix=null
    this.liga=null;
    this.qualys=null;

    this.ligaGetNumberCircuitos=null;
    this.raceResults=null
   }



  ngOnInit(): void {

    this._ligaService.getLigaWithCircuits(2).subscribe(apiLiga=>{
      this.ligaGetNumberCircuitos=apiLiga
      this.circuitos=[...apiLiga.circuits]
    })

    this._ligaService.getLiga(2).subscribe(apiLiga=>{
      this.liga=apiLiga
      console.log(this.liga.currentRound)
      // this._qualyService.getQualysByRace(15).subscribe(apiDatos=>this.qualys=apiDatos)
      this._qualyResultService.getQualyResultByRoundId(this.liga.currentRound).subscribe(apiDatos=>this.qualysResults=apiDatos)
      this._raceResultService.getRaceResultByRound(this.liga.currentRound).subscribe(apiDatos=>this.raceResults=apiDatos)



      this._grandPrixService.getGrandPrixByRound(this.liga?.currentRound).subscribe(apiGrandPrix=>this.currentGrandPrix=apiGrandPrix)
    })



    this._grandPrixService.getGrandPrixRacesByLeagueIdOrderedByRound(2).subscribe(apiGrandPrix=>this.grandPrixes=apiGrandPrix)




  }

}
