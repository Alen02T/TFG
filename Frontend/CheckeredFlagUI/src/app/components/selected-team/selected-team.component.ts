import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { Sponsor } from 'src/app/models/sponsor.model';
import { Team } from 'src/app/models/team.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
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
  director:Director = new Director()

  constructor(private activatedRoute:ActivatedRoute,private _teamService:TeamService,
    private _driverService:DriverService,private _sponsorService:SponsorService,private _token:TokenHandlerService
    ) {
    this.idTeam=0;
    this.team=null;
    this.drivers=null;
    this.sponsors=null;
   }

   getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

 loadData(){
  if(this.director!=null){
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.idTeam = parameters.get('id');
    });

    this._sponsorService.getSponsorsByTeam(this.idTeam).subscribe(apiTeam=>this.sponsors=apiTeam);
    this._teamService.getTeamById(this.director.leagueId,this.idTeam).subscribe(apiTeam => this.team = apiTeam);
    this._driverService.getDriversByEscuderia(this.idTeam).subscribe(apiTeam => this.drivers = apiTeam);
  }
 }

  ngOnInit(): void {
    this.getDirector()
  }



}
