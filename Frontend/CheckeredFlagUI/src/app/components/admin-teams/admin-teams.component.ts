import { Component, OnInit } from '@angular/core';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { Team } from 'src/app/models/team.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { DriverService } from 'src/app/services/driver.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.css']
})
export class AdminTeamsComponent implements OnInit {

  teams:Team[] | null;
  drivers:Driver[] | null;
  director:Director=new Director()

  constructor(private _teamService:TeamService,private _driverService:DriverService,
    private _token:TokenHandlerService) {
    this.teams=null;
    this.drivers=null;
  }
  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x)  && this.loadData());


 }
 loadData() {

  // Saving field values for checking if there are changes
  if (this.director != null) {
    this.getOrderedTeamsByLeague(this.director.leagueId)

  }

}
getOrderedTeamsByLeague(id:number){
  this._teamService.getTeamsByLeagueOrdererByPoints(id).subscribe(apiTeam=>{
    this.teams=apiTeam

    // this.teams.forEach((dato,indice)=>{
    //   this._driverService.getDriversByEscuderia(dato.teamId).subscribe(apiDrivers=>this.drivers=apiDrivers)
    // })

  })
}


  ngOnInit(): void {
    this.getDirector()


  }

}
