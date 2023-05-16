import { Component, OnInit } from '@angular/core';
import { Circuit } from 'src/app/models/circuit.model';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { LigaService } from 'src/app/services/liga.service';
import { RaceService } from 'src/app/services/race.service';

@Component({
  selector: 'app-admin-add-result',
  templateUrl: './admin-add-result.component.html',
  styleUrls: ['./admin-add-result.component.css']
})
export class AdminAddResultComponent implements OnInit {

  circuitosSeleccionados:Circuit[] | any[] = []

  constructor(private _raceResults:RaceService,private _ligaService:LigaService
    ,private _grandPrixService:GrandPrixService) { }

  ngOnInit(): void {
    this._ligaService.getLigaWithCircuits(2).subscribe(apiDatos=>this.circuitosSeleccionados=apiDatos)
  }

}
