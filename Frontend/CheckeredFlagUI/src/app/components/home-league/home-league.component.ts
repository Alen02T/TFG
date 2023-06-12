import { Component, OnInit } from '@angular/core';
import { Director } from 'src/app/models/director.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { GrandPrix } from 'src/app/models/grandprix.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { Team } from 'src/app/models/team.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { CircuitService } from 'src/app/services/circuit.service';
import { DriverService } from 'src/app/services/driver.service';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { RaceService } from 'src/app/services/race.service';
import { RaceResultService } from 'src/app/services/raceresult.service';
import { TeamService } from 'src/app/services/team.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-league',
  templateUrl: './home-league.component.html',
  styleUrls: ['./home-league.component.css']
})
export class HomeLeagueComponent implements OnInit {



  director:Director=new Director()

  grandprixes: GrandPrix[] |null;

constructor(private _grandPrixService: GrandPrixService,
  private _circuitService: CircuitService,private _token:TokenHandlerService,
  private _raceService: RaceService ) {

    this.grandprixes = null;

  }




  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

loadData(){
  if(this.director!=null){

    this._grandPrixService.getGrandPrixRacesByLeagueIdOrderedByRound(this.director.leagueId).subscribe(apiGrandPrix => this.grandprixes=apiGrandPrix );




  }
}

  ngOnInit(): void {
    this.getDirector()
  }
}
