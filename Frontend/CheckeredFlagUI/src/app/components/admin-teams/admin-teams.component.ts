import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { Team } from 'src/app/models/team.model';
import { DriverService } from 'src/app/services/driver.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.css']
})
export class AdminTeamsComponent implements OnInit {

  teams:Team[] | null;
  drivers:Driver[] | null;

  constructor(private _teamService:TeamService,private _driverService:DriverService) {
    this.teams=null;
    this.drivers=null;
  }

  ngOnInit(): void {
    this._teamService.getTeamsByLeagueOrdererByPoints(1).subscribe(apiTeam=>{
      this.teams=apiTeam

      // this.teams.forEach((dato,indice)=>{
      //   this._driverService.getDriversByEscuderia(dato.teamId).subscribe(apiDrivers=>this.drivers=apiDrivers)
      // })



    })
  }

}
