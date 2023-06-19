import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Circuit } from 'src/app/models/circuit.model';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { Liga } from 'src/app/models/liga.model';
import { Race } from 'src/app/models/race.model';
import { Team } from 'src/app/models/team.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { AbilityService } from 'src/app/services/ability.service';
import { DriverService } from 'src/app/services/driver.service';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { LigaService } from 'src/app/services/liga.service';
import { QualyService } from 'src/app/services/qualy.service';
import { RaceService } from 'src/app/services/race.service';
import { ResultService } from 'src/app/services/result.service';
import { StatService } from 'src/app/services/stat.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  drivers:Driver[] = []
  races:Race[] = []
  teams:Team[] = []
  director:Director=new Director()
  liga:Liga = new Liga()
  circuits:Circuit[] = []
  arrayRacesId:number[]=[]
  constructor(private _token:TokenHandlerService,private _raceService:RaceService,private _router:Router,
    private _teamService:TeamService,private _driverService:DriverService,private _ligaService:LigaService,
    private formBuilder: FormBuilder,private _driverInfoService:driverInfoService,private _statService:StatService,private _abilityService:AbilityService,
    private _resultService:ResultService,private _qualyService:QualyService) { }

  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

 loadData(){
  if(this.director!=null){
    this._ligaService.getLiga(this.director.leagueId).subscribe(apiDatos=>{
      this.liga=apiDatos
      this.circuits=[...apiDatos.circuits]
    })
  }
 }


onDeleteDriver(driver:Driver) {
  this._driverService.deleteDriver(driver.driverId)
  this._statService.deleteStatByDriverId(driver.driverId)
  this._abilityService.deleteAbilityByDriverId(driver.driverId)

}

  borrarLiga(){
    this._ligaService.deleteLiga(this.director.leagueId).subscribe(
      () => {
        console.log('Liga deleted successfully.');
        this._router.navigateByUrl("/addLiga")
        // Realizar acciones adicionales después de eliminar la liga
      },
      (error:any) => {
        console.error('Error deleting Liga:', error);
        // Manejar el error de eliminación de la liga
      }
    );

  }

  borrarDatosLiga(){
    //Esto borra los drivers y los stats y habilidades de estos
    this._driverService.getDriversByLeagueId(this.director!.leagueId).subscribe(apiBorrado=>{
      this.drivers=apiBorrado
      this.drivers.forEach((driver,index) => {
        this.onDeleteDriver(driver)
      });

    })

    //Esto borra los equipos
    this._teamService.deleteTeamsByLeague(this.director!.leagueId).subscribe(apiTeams=>this.teams=apiTeams)



    //Esto borra todos los resultados y clasificaciones de los pilotos
    this._raceService.getRacesByLeagueId(this.director.leagueId).subscribe(apiRaces=>{
      this.races = apiRaces;
      this.races.forEach(element => {
        this.borrarResultado(element.id)
        this.borrarQualy(element.id)
      });
    })

    //Esto borra las carreras
    this._raceService.deleteRacesByLeague(this.director.leagueId).subscribe(apiRaces=>this.races=apiRaces)
    //Esto los circuitos
    this._ligaService.deleteCircuitos(this.director!.leagueId).subscribe(apiLiga=>this.liga=apiLiga)

    //Se hace un update de liga para establecerlo en la ronda 1
    this._ligaService.updateCurrentRound(this.director.leagueId,1).subscribe(apiDatos=>this.liga=apiDatos)
    this._router.navigate(['admin']);

  }


  borrarResultado(raceId:number){
    this._resultService.deleteResultsByRaceId(raceId).subscribe(() => {
      console.log('Results deleted successfully.');
    }, error => {
      console.error('Error deleting Results:', error);
    });
  }

  borrarQualy(raceId:number){
    this._qualyService.deleteQualysByRaceId(raceId).subscribe(() => {
      console.log('Results deleted successfully.');
    }, error => {
      console.error('Error deleting Results:', error);
    });
  }


 ngOnInit(): void {
  this.getDirector()
  }
}
