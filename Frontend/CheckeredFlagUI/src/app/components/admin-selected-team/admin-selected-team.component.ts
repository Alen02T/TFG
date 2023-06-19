import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { Team } from 'src/app/models/team.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { DriverService } from 'src/app/services/driver.service';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { StatService } from 'src/app/services/stat.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin-selected-team',
  templateUrl: './admin-selected-team.component.html',
  styleUrls: ['./admin-selected-team.component.css']
})
export class AdminSelectedTeamComponent implements OnInit {
  teamId:number;
  team:Team | null
  drivers:Driver[] | null;
  orderedTeams:Team[] | null;

  director:Director = new Director()
  noPilotos:boolean=false
  firstDriverInfo:driverInfo | null;
  secondDriverInfo:driverInfo | null;

  constructor(private activatedRoute:ActivatedRoute,
    private _teamService:TeamService,private _driverService:DriverService,private _token:TokenHandlerService,
    private _statService:StatService,private _driverInfoService:driverInfoService) {
    this.teamId=0;
    this.team=null;
    this.drivers=null;

    this.orderedTeams=null;
    this.firstDriverInfo=null
    this.secondDriverInfo=null
   }

   getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

 loadData() {
  if (this.director != null) {
    this._teamService.getTeamById(this.director.leagueId, this.teamId).subscribe(apiTeam => {
      this.team = apiTeam;

      this._driverService.getDriversByEscuderia(this.teamId).subscribe(apiTeam => {
        this.drivers = apiTeam;

        if (this.drivers.length == 2) {
          this._driverInfoService.getdriverInfoDataByDriverId(this.director.leagueId, this.drivers[0].driverId).subscribe(apiDriverInfo => {
            this.firstDriverInfo = apiDriverInfo;
            // Aquí puedes realizar acciones adicionales con la información del primer conductor
          });

          this._driverInfoService.getdriverInfoDataByDriverId(this.director.leagueId, this.drivers[1].driverId).subscribe(apiDriverInfo => {
            this.secondDriverInfo = apiDriverInfo;
            // Aquí puedes realizar acciones adicionales con la información del segundo conductor
          });
        }else if(this.drivers.length==1){
          this._driverInfoService.getdriverInfoDataByDriverId(this.director.leagueId, this.drivers[0].driverId).subscribe(apiDriverInfo => {
            this.firstDriverInfo = apiDriverInfo;
            // Aquí puedes realizar acciones adicionales con la información del primer conductor
          });
        }else{
          this.noPilotos=true
        }

        this._teamService.getTeamsOrdererByPoints().subscribe(apiTeam => {
          this.orderedTeams = apiTeam;
          // Aquí puedes realizar acciones adicionales con los equipos ordenados por puntos
        });
      });
    });
  }
}

  ngOnInit(): void {
    this.getDirector()
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.teamId = parameters.get('id');
    });







  }

}
