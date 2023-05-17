import { Component, OnInit } from '@angular/core';
import { Circuit } from 'src/app/models/circuit.model';
import { GrandPrix } from 'src/app/models/grandprix.model';
import { CircuitService } from 'src/app/services/circuit.service';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-selected-circuit',
  templateUrl: './selected-circuit.component.html',
  styleUrls: ['./selected-circuit.component.css']
})
export class SelectedCircuitComponent implements OnInit {

  grandPrix:GrandPrix | null;
  circuit:Circuit | null;


  constructor(private _circuitService:CircuitService,private _grandPrixService:GrandPrixService,private _teamService:TeamService) {
    this.circuit=null;
    this.grandPrix=null;
    //this.teams=null;
   }


  ngOnInit(): void {
    this._grandPrixService.getGrandPrixByRound(1).subscribe(apiStandings=>{
      this.grandPrix=apiStandings
      console.log(this.grandPrix.circuitlength)
    });

  }

}
