import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Circuit } from 'src/app/models/circuit.model';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { GrandPrix } from 'src/app/models/grandprix.model';
import { Liga } from 'src/app/models/liga.model';
import { qualyresult } from 'src/app/models/qualyresult.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthServices/auth.service';
import { CookieHandlerService } from 'src/app/services/AuthServices/cookie-handler.service';
import { DirectorService } from 'src/app/services/AuthServices/director.service';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { DriverService } from 'src/app/services/driver.service';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { LigaService } from 'src/app/services/liga.service';
import { QualyResultService } from 'src/app/services/qualyresult.service';
import { RaceResultService } from 'src/app/services/raceresult.service';
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

  bestDriversOrderedByPrice:driverInfo[] = [];
  ligaGetNumberCircuitos:Liga = new Liga();
  driversOrderedByPoints:driverInfo[] | null;
  driversInfoNormal:driverInfo[] | null;
  driversCount:Driver[] | null = [];
  teams:Team[] | null;
  circuits:Circuit[] = []
  raceResults:raceResult[] =[];
  textoExplicativo:string="";

  currentRound:number=0;
  grandPrix:GrandPrix | null;
  winner:Driver | null

  qualyResults:qualyresult[] =[]

  constructor(private authService:AuthService,private _directorService:DirectorService,private router : Router,
    private _token:TokenHandlerService, private route: ActivatedRoute,private _cookie:CookieHandlerService,
    private _teamService:TeamService,private _driverService:DriverService,private _ligaService:LigaService,
    private formBuilder: FormBuilder,private _driverInfoService:driverInfoService,
    private _raceResultService:RaceResultService,private _grandPrixService:GrandPrixService,private _qualyResultsService:QualyResultService
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

    this.grandPrix=null;
    this.ligaObj=null;

      this.winner=null;
      this.teams=null;
      this.driversOrderedByPoints=null
      this.driversInfoNormal=null

  }


  getMejorPilotoValorado(id:number){
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByPrice(id).subscribe(apiDatos=>this.driversOrderedByPoints=apiDatos)
  }



  ngOnInit(): void {
    this.getDirector();

  }

  getTeams(id:number){
    this._teamService.getTeamsByLeagueOrdererByPoints(id).subscribe(apiDatos=>this.teams=apiDatos)
  }

  logout(){
    this.authService.logout()
  }

  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

  getRaceResult(leagueId:number,currentRound:number){
    this._raceResultService.getRaceResultByRound(leagueId,currentRound).subscribe(apiDatos=>{
      this.raceResults=apiDatos
    })
  }

  getQualyResult(id:number,currentRound:number){
    this._qualyResultsService.getQualyResultByRoundId(id,currentRound).subscribe(apiDatos=>{
      this.qualyResults=apiDatos
    })
  }

getWinnerRace(raceId:number){
  this._driverService.getWinnerDriverByRaceId(raceId).subscribe(apiDriver=>this.winner=apiDriver)
}

getGrandPrix(leagueId:number,currentRound:number){
  this._grandPrixService.getGrandPrixByRound(leagueId,currentRound).subscribe(apiDatos=>{
    this.grandPrix=apiDatos
    console.log(this.grandPrix)

    // this.getWinnerRace(this.grandPrix.raceId)
  })
}

 getDirectores(){
   this._directorService.getDirectorData().subscribe(apiEscuderia => this.directores=apiEscuderia);
 }

getDriversOrderedByPrice(leagueId:number){
  this._driverInfoService.getdriverInfoDataByLeagueOrderedByPrice(leagueId).subscribe(apiDrivers=>{
    this.driversInfoNormal=apiDrivers
    this.textoExplicativo="Los 3 pilotos mas valorados del mundial"

  })
}

getDriversOrderedByPoints(leagueId:number){
  this._driverInfoService.getdriverInfoDataByLeagueOrderedByPoints(leagueId).subscribe(apiDrivers=>{
    this.driversInfoNormal=apiDrivers
    this.textoExplicativo="Los 3 pilotos lideres del mundial"

  })
}

getDriversOrderedByRating(leagueId:number){
  this._driverInfoService.getdriverInfoDataByLeagueOrderedByRating(leagueId).subscribe(apiDrivers=>{
    this.driversInfoNormal=apiDrivers
    this.textoExplicativo="Los 3 pilotos lideres con mas habilidad"

  })
}

 getAllDrivers(id:number){
    this._driverService.getDriversByLeagueId(id).subscribe(apiDrivers=>this.driversCount=apiDrivers)
    // this._driverService.getDriverData().subscribe(apiEscuderia=>this.drivers=apiEscuderia);
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

onSelectChange(event:Event) {
  const selectedOption = (event.target as HTMLSelectElement).value;

  if (selectedOption === 'points') {
    this.getDriversOrderedByPoints(this.director!.leagueId)
  } else if (selectedOption === 'valued') {
    this.getDriversOrderedByPrice(this.director!.leagueId)
  } else if (selectedOption === 'rating') {
    this.getDriversOrderedByRating(this.director!.leagueId)
  }

}




 loadData() {

  // Saving field values for checking if there are changes
  if (this.director != null) {

    this.nombre = this.director.name;
    this.email = this.director.email;
    this.teamId = this.director.leagueId;


    this._ligaService.getLigaWithCircuits(this.director.leagueId).subscribe(apiLiga=>{
      this.ligaGetNumberCircuitos=apiLiga
      this.circuits=[...apiLiga.circuits]
      console.log(this.circuits.length)
      console.log(this.ligaGetNumberCircuitos.currentRound)
    })

    this._ligaService.getLiga(this.director.leagueId).subscribe(apiDirector=>{
      this.ligaObj=apiDirector

      this.getGrandPrix(this.ligaObj.id, this.ligaObj.currentRound)
      this.getRaceResult(this.ligaObj.id,this.ligaObj.currentRound)
      this.getQualyResult(this.ligaObj.id,this.ligaObj.currentRound)


      this.fechaInicial=this.ligaObj.fechaInicio
      this.fechaFinal=this.ligaObj.fechaFin
      //this.getRestaTiempo(this.fechaInicial,this.fechaFinal)
    });

    this.getAllDrivers(this.director.leagueId);
    this.getTeams(this.director.leagueId);
    this.getMejorPilotoValorado(this.director.leagueId)
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
