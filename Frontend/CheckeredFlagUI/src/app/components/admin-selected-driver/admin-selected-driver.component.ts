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
  selector: 'app-admin-selected-driver',
  templateUrl: './admin-selected-driver.component.html',
  styleUrls: ['./admin-selected-driver.component.css']
})
export class AdminSelectedDriverComponent implements OnInit {

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


      this._abilityService.getDriverAbility(this.driverId).subscribe(
        apiDriver => {
          if (apiDriver) {
            this.ability = apiDriver;
          } else {
            console.log('No se encontró información de habilidades para el piloto');
          }
        },
        error => {
          console.error('Ocurrió un error al obtener la información de habilidades del piloto:', error);
        }
      );

      this._statService.getDriverStats(this.driverId).subscribe(
        apiDriver => {
          if (apiDriver) {
            this.stat = apiDriver;
          } else {
            console.log('No se encontró información de estadísticas para el piloto');
          }
        },
        error => {
          console.error('Ocurrió un error al obtener la información de estadísticas del piloto:', error);
        }
      );

      //Faltan estadisticas


  });
}

}
