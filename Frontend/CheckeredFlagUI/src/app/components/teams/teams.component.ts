import { Component, OnInit } from '@angular/core';

import { Team } from 'src/app/models/team.model';

import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  team:Team | null
  teams: Team[] | null;


  constructor(private teamService: TeamService) {
    this.teams = null;
    this.team=null;
    //this.drivers=null;
  }

  imgSlider(string:any){
      //alert(string)
      let number = string;

      // this.teamService.getTeamById(number).subscribe(apiEscuderia => this.team=apiEscuderia);
      //this.driverService.getDriversByEscuderia(number).subscribe(apiEscuderia => this.drivers=apiEscuderia);
      //let shield = this.team?.shieldImage
      //console.log(this.team?.shieldImage)
      const background = document.getElementById('all')
      background!.style.background = "url(shield)";
  }


  //const imgArray = string:[]=[];



  ngOnInit(): void {
     this.teamService.getTeamData().subscribe(apiEscuderia => this.teams=apiEscuderia);
    }

}
