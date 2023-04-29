import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { Liga } from 'src/app/models/liga.model';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthServices/auth.service';
import { CookieHandlerService } from 'src/app/services/AuthServices/cookie-handler.service';
import { DirectorService } from 'src/app/services/AuthServices/director.service';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { DriverService } from 'src/app/services/driver.service';
import { LigaService } from 'src/app/services/liga.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showFiller = true;
  user = new User();
  team = new Team();
  token = "";
  texto="";
  director:Director | null;
  directores:Director[] | null;
  notify="";

  drivers:Driver[] | null;
  nombre="";
  age=0;
  country="";
  teamId=0;
  lastname="";
  email="";
  liga: Liga = new Liga();
  ligaObj:Liga | null;

  fechaInicial:Date | null;
  fechaFinal:Date | null;

  constructor(private authService:AuthService,private _directorService:DirectorService,private router : Router,
    private _token:TokenHandlerService, private route: ActivatedRoute,private _cookie:CookieHandlerService,
    private _teamService:TeamService,private _driverService:DriverService,private _ligaService:LigaService,
    private formBuilder: FormBuilder
    ) {
      this.fechaInicial=null;
      this.fechaFinal=null;

    this.directores=null;
    this.director=null;
    this.drivers=null;

    this.nombre="";
    this.lastname="";
    this.age=0;
    this.country="";
    this.email="";
    this.teamId=0;

    this.ligaObj=null;

  }


  ngOnInit(): void {
    this.getDirector();
    this.getAllDrivers();
  }

  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }



 getDirectores(){
   this._directorService.getDirectorData().subscribe(apiEscuderia => this.directores=apiEscuderia);
 }

 getAllDrivers(){
    this._driverService.getDriverData().subscribe(apiEscuderia=>this.drivers=apiEscuderia);
 }


 taskForm = this.formBuilder.group({
  nombre: ['', Validators.required],
  descripcion: ['', Validators.required],
  ubicacion: ['', Validators.required],
  directorId: [0, Validators.required],

  //tareaWeb: ['', Validators.required],
  //tareaComentario: ['', Validators.required],
  //done: [false],

});

onSubmit() {
  this.getDirector();
  console.log(this.taskForm.value)
 this._ligaService.addLiga(this.taskForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  //window.location.href="/admin";
  //window.location.reload();
}


 loadData() {
  // Saving field values for checking if there are changes
  if (this.director != null) {
    this.nombre = this.director.name;
    this.email = this.director.email;
    this.teamId = this.director.leagueId;
    this._ligaService.getLigaByDirector(this.director?.leagueId).subscribe(apiDirector=>{
      this.ligaObj=apiDirector
      this.fechaInicial=this.ligaObj.fechaInicio
      this.fechaFinal=this.ligaObj.fechaFin
      //this.getRestaTiempo(this.fechaInicial,this.fechaFinal)
    });
  }

}


getRestaTiempo(dateInicial:any, dateFinal:any){
  const date1 = new Date(dateInicial);
  const date2 = new Date(dateFinal);
  console.log(date1.getTime().toLocaleString())
  console.log(date2.getTime())
  const diferenciaMs = date1.getTime() - date2.getTime();

  // Convertir la diferencia a días
  const diferenciaDias = Math.round(diferenciaMs / (1000 * 60 * 60 * 24));
  console.log(diferenciaDias)
}

}
