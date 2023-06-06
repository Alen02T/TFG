import { Component, OnInit } from '@angular/core';
import { Director } from 'src/app/models/director.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { GrandPrix } from 'src/app/models/grandprix.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { Team } from 'src/app/models/team.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { DriverService } from 'src/app/services/driver.service';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { RaceResultService } from 'src/app/services/raceresult.service';
import { TeamService } from 'src/app/services/team.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-league',
  templateUrl: './home-league.component.html',
  styleUrls: ['./home-league.component.css']
})
export class HomeLeagueComponent implements OnInit {
  grandPrix:GrandPrix | null;
  raceResults:raceResult [] | null;
  teams:Team [] | null;
  orderedTeamsByPoints:Team [] | null;
  driversInfo:driverInfo [] | null;
  public antes = false;

  firstPosImage:string;
  firstTitle:string;
  firstText:string;

  secondTitle:string;
  secondText:string;

  thirdText:string;
  thirdTitle:string;

  lastText:string;
  lastTitle:string;

  mercedesImg:string;
  thirdPosImage:string;
  teamsImage:string;

  renaultImg:string;
  secondPosImage:string;
  redbullImg:string;


  director:Director=new Director()

  constructor(private _grandPrixService:GrandPrixService,
    private _driverService:DriverService,
    // private _resultService:ResultService,
    private _teamService:TeamService,
    private _driverinfoService:driverInfoService,
    private _raceResultService:RaceResultService,private _token:TokenHandlerService) {
    this.orderedTeamsByPoints=null;
    this.teams=null;
    this.grandPrix=null;
    this.raceResults=null;
    this.driversInfo=null;


    this.firstPosImage="/assets/img/firstPos.jpg"
    this.secondPosImage="/assets/img/secondPos.jpg"
    this.thirdPosImage="/assets/img/thirdPos.jpg"
    this.teamsImage="/assets/img/teamChamp.jpg"


    this.firstText="";
    this.firstTitle="";

    this.secondText="";
    this.secondTitle="";

    this.thirdText="";
    this.thirdTitle="";

    this.lastText="";
    this.lastTitle="";

    this.renaultImg="/assets/img/renaultWin.jpg"
    this.mercedesImg="/assets/img/secondPos.jpg"
    this.redbullImg="/assets/img/thirdPos.jpg"


  }

  getCurrentRace(){
    return (environment.CURRENTRACEID);
  }

  getLastRace(){
    return (environment.BEFORERACEID);
  }

  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

loadData(){
  if(this.director!=null){

        this._grandPrixService.getGrandPrixByRound(this.director.leagueId,2).subscribe(apiEscuderia => this.grandPrix=apiEscuderia);
        this._raceResultService.getRaceResultByGrandPrix(this.getLastRace()).subscribe((x) =>
        {(
          this.raceResults=x)
          if(this.raceResults.length==0){
            // this.antes = true;

            // this.firstPosImage="/assets/img/parrilla.jpg"
            // this.firstText="Los pilotos ya estan preparados"
            // this.firstTitle="Arranca la temporada!"

            // this.secondPosImage="/assets/img/possibleChamp.jpg"
            // this.secondTitle="Posible Campeon";
            // this.secondText="Los expertos apuntan a un piloto de la escuderia del cabalino rampante "

            // this.thirdText="A la espera de aprobar mas circuitos para el campeonato"
            // this.thirdTitle="Posibles Circuitos"
            // this.thirdPosImage="/assets/img/selectCircuits.jpg"

            // this.lastText="Los equipos estan terminando los ultimos preparativos"
            // this.lastTitle="Tension en las escuderias"

            // this.teamsImage="/assets/img/parrillaTeams.jpg"

          }
        });

        this._raceResultService.getRaceResultData().subscribe((x) =>
        {(
          this.raceResults=x)
          if(this.raceResults.length==0){

            this.antes = true;

            this.firstPosImage="/assets/img/parrilla.jpg"
            this.firstText="Los pilotos ya estan preparados"
            this.firstTitle="Arranca la temporada!"

            this.secondPosImage="/assets/img/possibleChamp.jpg"
            this.secondTitle="Regulacion de monoplazas similar";
            this.secondText="Cualquiera puede ser campeon..."

            this.thirdText="A la espera de aprobar mas circuitos para el campeonato"
            this.thirdTitle="Posibles Circuitos"
            this.thirdPosImage="/assets/img/selectCircuits.jpg"

            this.lastText="Los equipos estan terminando los ultimos preparativos"
            this.lastTitle="Tension en la s escuderias"

            this.teamsImage="/assets/img/parrillaTeams.jpg"

          }
        });

        this._teamService.getTeamsByLeagueOrdererByPoints(this.director.leagueId).subscribe(apiEscuderia=>{
          this.teams=apiEscuderia
        })




        this._teamService.getTeamsByLeagueOrdererByPoints(this.director.leagueId).subscribe(apiEscuderia =>{
          this.orderedTeamsByPoints=apiEscuderia
        });

        this._driverinfoService.getdriverInfoDataByLeagueOrderedByPoints(this.director.leagueId).subscribe(apiStandings=>{
          this.driversInfo=apiStandings

        });
        this._grandPrixService.getGrandPrixByRound(2,1).subscribe(apiStandings=>{
          this.grandPrix=apiStandings

        });
  }
}

  ngOnInit(): void {
    this.getDirector()
  }
}
