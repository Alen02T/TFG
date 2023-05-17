import { Component, OnInit } from '@angular/core';
import { GrandPrix } from 'src/app/models/grandprix.model';
import { GrandPrixService } from 'src/app/services/grandPrix.service';

@Component({
  selector: 'app-admin-races-management',
  templateUrl: './admin-races-management.component.html',
  styleUrls: ['./admin-races-management.component.css']
})
export class AdminRacesManagementComponent implements OnInit {

  grandPrixes:GrandPrix[] | null;
  currentGrandPrix:GrandPrix | null;

  constructor(private _grandPrixService:GrandPrixService) {
    this.grandPrixes=null
    this.currentGrandPrix=null
   }

  ngOnInit(): void {

    this._grandPrixService.getGrandPrixRacesByLeagueIdOrderedByRound(2).subscribe(apiGrandPrix=>this.grandPrixes=apiGrandPrix)
    this._grandPrixService.getGrandPrixByRound(1).subscribe(apiGrandPrix=>this.currentGrandPrix=apiGrandPrix)



  }

}
