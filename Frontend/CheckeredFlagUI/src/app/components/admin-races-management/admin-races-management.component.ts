import { Component, OnInit } from '@angular/core';
import { Circuit } from 'src/app/models/circuit.model';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { GrandPrix } from 'src/app/models/grandprix.model';
import { Liga } from 'src/app/models/liga.model';
import { Qualy } from 'src/app/models/qualy.model';
import { qualyresult } from 'src/app/models/qualyresult.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { Result } from 'src/app/models/result.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { DriverService } from 'src/app/services/driver.service';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { LigaService } from 'src/app/services/liga.service';
import { QualyService } from 'src/app/services/qualy.service';
import { QualyResultService } from 'src/app/services/qualyresult.service';
import { RaceResultService } from 'src/app/services/raceresult.service';
import { ResultService } from 'src/app/services/result.service';

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
  driversOrderedByPoints:driverInfo[] = []
  ligaGetNumberCircuitos:Liga | null;
  circuitos:Circuit[] = [];

  director:Director = new Director()
  driver:Driver | null;

  constructor(private _grandPrixService:GrandPrixService,
    private _qualyService:QualyService,private _ligaService:LigaService,private _driverInfoService:driverInfoService,
    private _qualyResultService:QualyResultService,private _raceResultService:RaceResultService,
    private _resultService:ResultService,private _driverService:DriverService,private _token:TokenHandlerService) {
    this.grandPrixes=null
    this.currentGrandPrix=null
    this.liga=null;
    this.qualys=null;
    this.ligaGetNumberCircuitos=null;
    this.raceResults=null
    this.driver=null
   }

   continuarMundial(){
    console.log("has hecho click")
    let nextRound = this.liga!.currentRound+1

    this._ligaService.updateCurrentRound(this.director.leagueId,nextRound).subscribe(
      () => {
        // Manejar la respuesta exitosa aquí
        console.log('Valor de currentRound actualizado correctamente');
      },
      (error) => {
        // Manejar el error aquí
        console.error('Error al actualizar el valor de currentRound:', error);
      }
    );
    window.location.reload()

   }

   getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
  }

  loadData(){
    if(this.director!=null){
      this._ligaService.getLigaWithCircuits(this.director.leagueId).subscribe(apiLiga=>{
        this.ligaGetNumberCircuitos=apiLiga
        this.circuitos=[...apiLiga.circuits]
      })

      this._ligaService.getLiga(this.director.leagueId).subscribe(apiLiga=>{
        this.liga=apiLiga
        console.log(this.liga.currentRound)
        // this._qualyService.getQualysByRace(15).subscribe(apiDatos=>this.qualys=apiDatos)
        this._qualyResultService.getQualyResultByRoundId(this.director.leagueId,this.liga.currentRound).subscribe(apiDatos=>this.qualysResults=apiDatos)
        this._raceResultService.getRaceResultByRound(this.director.leagueId,this.liga.currentRound).subscribe(apiDatos=>this.raceResults=apiDatos)
        this._driverInfoService.getdriverInfoDataByLeagueOrderedByPrice(this.director.leagueId).subscribe(apiDatos=>this.driversOrderedByPoints=apiDatos)


        this._grandPrixService.getGrandPrixByRound(this.director.leagueId,this.liga?.currentRound).subscribe(apiGrandPrix=>{
          this.currentGrandPrix=apiGrandPrix
          // this._driverService.getWinnerDriverByRaceId(this.currentGrandPrix.raceId).subscribe(apiWinner => {
          //   if (apiWinner) {
          //     this.driver = apiWinner;
          //   } else {
          //     // El objeto apiWinner es nulo, realizar acciones alternativas o asignar un valor predeterminado
          //   }
          // });

        })
      })




      this._grandPrixService.getGrandPrixRacesByLeagueIdOrderedByRound(this.director.leagueId).subscribe(apiGrandPrix=>this.grandPrixes=apiGrandPrix)


    }
  }


  ngOnInit(): void {

    this.getDirector()




  }

}
