import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Director } from 'src/app/models/director.model';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthServices/auth.service';
import { CookieHandlerService } from 'src/app/services/AuthServices/cookie-handler.service';
import { DirectorService } from 'src/app/services/AuthServices/director.service';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user = new User();
  team = new Team();
  token = "";
  texto="";
  director:Director | null;
  directores:Director[] | null;
  notify="";

  nombre="";
  age=0;
  country="";
  teamId=0;
  lastname="";
  email="";

  constructor(private authService:AuthService,private _directorService:DirectorService,private router : Router,
    private _token:TokenHandlerService, private route: ActivatedRoute,private _cookie:CookieHandlerService,
    private _teamService:TeamService
    ) {

    this.directores=null;
    this.director=null;
    //this.drivers=null;

    this.nombre="";
    this.lastname="";
    this.age=0;
    this.country="";
    this.email="";
    this.teamId=0;

  }


  ngOnInit(): void {
    this.getDirector();
  }

  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

 getDirectores(){
   this._directorService.getDirectorData().subscribe(apiEscuderia => this.directores=apiEscuderia);
 }

 loadData() {
  // Saving field values for checking if there are changes
  if (this.director != null) {
    this.nombre = this.director.name;
    this.email = this.director.email;
    this.teamId = this.director.teamId;
    //this._teamService.getTeamById(this.teamId).subscribe(apiEscuderia => this.team=apiEscuderia);
    //this._driverService.getDriversByEscuderia(this.teamId).subscribe(apiEscuderia => this.drivers=apiEscuderia);
  }

}
}
