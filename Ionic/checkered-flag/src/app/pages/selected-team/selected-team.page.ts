import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { Team } from 'src/app/models/team.model';
import { DriverService } from 'src/app/services/driver.service';
import { TeamService } from 'src/app/services/team.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-selected-team',
  templateUrl: './selected-team.page.html',
  styleUrls: ['./selected-team.page.scss'],
})
export class SelectedTeamPage implements OnInit {
  drivers:Driver[] = []
  team:Team=new Team()
  teamId:number=0;
  constructor(private _teamService:TeamService,
    private activatedRoute:ActivatedRoute,private _driverService:DriverService
    ) {

   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((parameters:any)=>{
      this.teamId=parameters.get("id")
    })
    this._driverService.getDriversByEscuderia(this.teamId).subscribe(apiDatos=>this.drivers=apiDatos)
    this._teamService.getTeamById(environment.LEAGUEID,this.teamId).subscribe(apiTeam=>this.team=apiTeam)
  }

}
