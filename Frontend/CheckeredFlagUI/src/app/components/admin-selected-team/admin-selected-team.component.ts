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

 loadData(){
  if(this.director!=null){
    this._teamService.getTeamById(this.director.leagueId,this.teamId).subscribe(apiTeam=>this.team=apiTeam);
    this._driverService.getDriversByEscuderia(this.teamId).subscribe(apiTeam=>{
      this.drivers=apiTeam

      this._driverInfoService.getdriverInfoDataByDriverId(this.director.leagueId,this.drivers[0].driverId).subscribe(apiDriverInfo=>this.firstDriverInfo=apiDriverInfo)
      this._driverInfoService.getdriverInfoDataByDriverId(this.director.leagueId,this.drivers[1].driverId).subscribe(apiDriverInfo=>this.secondDriverInfo=apiDriverInfo)


      this._teamService.getTeamsOrdererByPoints().subscribe(apiTeam=>this.orderedTeams=apiTeam);

    })
  }
 }

  ngOnInit(): void {
    this.getDirector()
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.teamId = parameters.get('id');
    });







  }

}
