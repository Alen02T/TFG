import { Component, OnInit } from '@angular/core';
import { Ability } from 'src/app/models/ability.model';
import { Driver } from 'src/app/models/driver.model';
import { AbilityService } from 'src/app/services/ability.service';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  driver:Driver | null
  drivers: Driver[] | null;
  abilities:Ability[] | null;
  //pilotSkills: PilotSkill[];

  constructor(private _driverService: DriverService,private _abilityService:AbilityService) {
    this.drivers = null;
    this.driver=null;
    //this.drivers=null;

    this.abilities=null;
  }

  ngOnInit(): void {

    this._driverService.getDriverData().subscribe(apiEscuderia => {
      this.drivers=apiEscuderia
      //this.combinacion();
    });


    this._abilityService.getAllAbilities().subscribe(apiEscuderia=>{
      this.abilities = apiEscuderia
     })

   }

   combineData() {
    if (this.drivers && this.abilities) {
      this.pilotSkills = [];
      for (const driver of this.drivers) {
        const skill = this.abilities.find((s) => s.driverId === driver.driverId);
        if (skill) {
          //this.pilotSkills.push(new PilotSkill(pilot, skill));
        }
      }
    }
  }
}
