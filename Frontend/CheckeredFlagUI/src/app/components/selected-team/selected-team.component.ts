import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { Sponsor } from 'src/app/models/sponsor.model';
import { Team } from 'src/app/models/team.model';
import { DriverService } from 'src/app/services/driver.service';
import { SponsorService } from 'src/app/services/sponsor.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-selected-team',
  templateUrl: './selected-team.component.html',
  styleUrls: ['./selected-team.component.css']
})
export class SelectedTeamComponent implements OnInit {
  idTeam:number;
  team:Team | null;
  sponsors:Sponsor[] | null;
  drivers:Driver [] | null;


  constructor(private activatedRoute:ActivatedRoute,private _teamService:TeamService,
    private _driverService:DriverService,private _sponsorService:SponsorService
    ) {
    this.idTeam=0;
    this.team=null;
    this.drivers=null;
    this.sponsors=null;
   }

  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.idTeam = parameters.get('id');
    });

    this._sponsorService.getSponsorsByTeam(this.idTeam).subscribe(apiTeam=>this.sponsors=apiTeam);
    this._teamService.getTeamById(this.idTeam).subscribe(apiTeam => this.team = apiTeam);
    this._driverService.getDriversByEscuderia(this.idTeam).subscribe(apiTeam => this.drivers = apiTeam);
  }



}
