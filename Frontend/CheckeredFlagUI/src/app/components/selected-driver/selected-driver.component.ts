import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ability } from 'src/app/models/ability.model';
import { Driver } from 'src/app/models/driver.model';
import { Stat } from 'src/app/models/stat.model';
import { Team } from 'src/app/models/team.model';
import { AbilityService } from 'src/app/services/ability.service';
import { DriverService } from 'src/app/services/driver.service';
import { StatService } from 'src/app/services/stat.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-selected-driver',
  templateUrl: './selected-driver.component.html',
  styleUrls: ['./selected-driver.component.css']
})
export class SelectedDriverComponent implements OnInit {

  driverId:number;
  driver:Driver |null;
  ability:Ability | null;
  stat:Stat | null;
  team:Team | null;
  teamId:number;


  constructor(private activatedRoute : ActivatedRoute,
    private _driverService:DriverService,private _abilityService:AbilityService,
    private _teamService:TeamService,private _statService:StatService
    ) {
      this.driverId=0
      this.driver=null;
      this.ability=null;
      this.team=null;
      this.stat=null;
      this.teamId=0;
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.driverId = parameters.get('id');


      this._driverService.getDriverById(this.driverId).subscribe(apiDriver => {
        this.driver = apiDriver;
        this._teamService.getTeamById(this.driver.team).subscribe(apiDriver => this.team=apiDriver);
      });


      this._abilityService.getDriverAbility(this.driverId).subscribe(apiDriver => this.ability = apiDriver);
      this._statService.getDriverStats(this.driverId).subscribe(apiDriver=>this.stat=apiDriver );

      //Faltan estadisticas


  });
}
}
