import { Component, OnInit } from '@angular/core';
import { Circuit } from 'src/app/models/circuit.model';
import { Liga } from 'src/app/models/liga.model';
import { CircuitService } from 'src/app/services/circuit.service';
import { LigaService } from 'src/app/services/liga.service';
import { RaceService } from 'src/app/services/race.service';

@Component({
  selector: 'app-admin-add-races',
  templateUrl: './admin-add-races.component.html',
  styleUrls: ['./admin-add-races.component.css']
})
export class AdminAddRacesComponent implements OnInit {

 circuits:Circuit[] | null;
  ligas:Liga[] | null;
  liga:Liga| null;
  circuitosSeleccionados:Circuit[] | null;

   constructor(private _raceService:RaceService,
    private _circuitService:CircuitService,
    private _ligaService:LigaService,) {

      this.circuits=null
      this.ligas=null;
      this.liga=null;
      this.circuitosSeleccionados=null;
    }
 getLigaWithCircuits(): void {
      this._ligaService.getLigaWithCircuits(2).subscribe(response => {
        this.liga = response;
        this.circuits = response.circuits;
      });
    }

  ngOnInit(): void {
    this.getLigaWithCircuits()
  }

}
