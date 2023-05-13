import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { Team } from 'src/app/models/team.model';
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


  firstDriverInfo:driverInfo | null;
  secondDriverInfo:driverInfo | null;

  constructor(private activatedRoute:ActivatedRoute,
    private _teamService:TeamService,private _driverService:DriverService,
    private _statService:StatService,private _driverInfoService:driverInfoService) {
    this.teamId=0;
    this.team=null;
    this.drivers=null;

    this.orderedTeams=null;
    this.firstDriverInfo=null
    this.secondDriverInfo=null
   }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.teamId = parameters.get('id');
    });

    this._teamService.getTeamById(this.teamId).subscribe(apiTeam=>this.team=apiTeam);
    this._driverService.getDriversByEscuderia(this.teamId).subscribe(apiTeam=>{
      this.drivers=apiTeam

      this._driverInfoService.getdriverInfoDataByDriverId(this.drivers[0].driverId).subscribe(apiDriverInfo=>this.firstDriverInfo=apiDriverInfo)
      this._driverInfoService.getdriverInfoDataByDriverId(this.drivers[1].driverId).subscribe(apiDriverInfo=>this.secondDriverInfo=apiDriverInfo)


      this._teamService.getTeamsOrdererByPoints().subscribe(apiTeam=>this.orderedTeams=apiTeam);

    })





  }

}
