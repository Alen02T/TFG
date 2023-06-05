import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  teams:any

  constructor(private _teamService:TeamService) { }

  getTeams(){
    this._teamService.getAllTeams().subscribe(apiTeams=>this.teams=apiTeams)
  }

  ngOnInit() {
    this.getTeams()
  }

}
