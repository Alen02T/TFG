import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { Team } from 'src/app/models/team.model';
import { DriverService } from 'src/app/services/driver.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-selected-team',
  templateUrl: './selected-team.component.html',
  styleUrls: ['./selected-team.component.css']
})
export class SelectedTeamComponent implements OnInit {
  idTeam:number;
  team:Team | null;

  drivers:Driver [] | null;


  constructor(private activatedRoute:ActivatedRoute,private _teamService:TeamService,
    private _driverService:DriverService
    ) {
    this.idTeam=0;
    this.team=null;
    this.drivers=null;
   }

  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.idTeam = parameters.get('id');
    });

    this._teamService.getTeamById(this.idTeam).subscribe(apiTeam => this.team = apiTeam);
    this._driverService.getDriversByEscuderia(this.idTeam).subscribe(apiTeam => this.drivers = apiTeam);
  }



}
