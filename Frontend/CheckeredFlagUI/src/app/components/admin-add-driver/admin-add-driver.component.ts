import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { Team } from 'src/app/models/team.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { AbilityService } from 'src/app/services/ability.service';
import { DriverService } from 'src/app/services/driver.service';
import { StatService } from 'src/app/services/stat.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin-add-driver',
  templateUrl: './admin-add-driver.component.html',
  styleUrls: ['./admin-add-driver.component.css']
})
export class AdminAddDriverComponent implements OnInit {
  @ViewChild('owrap', {static: true}) miElemento: ElementRef | any;

  driver:Driver | null;
  team:Team | null;
  nombre:string;

  pilotForm: FormGroup; // Define la variable del formulario
  // statForm: FormGroup;
  abilityForm:FormGroup
  statForm:FormGroup
  // abilityForm: FormGroup;

  overall:number;

  teams:Team [] | null;
  availableTeams:Team[] | null;

  selectedTeam:number;

  director:Director = new Director()
  imagenElegida:string;
  isLinear = false;


  constructor(private _driverService:DriverService,
    private _teamService:TeamService
    ,private formBuilder: FormBuilder,private _abilityService:AbilityService,private _statService:StatService,
    private router:Router,private _token:TokenHandlerService) {
    this.driver=null;

    this.team=null;
    this.availableTeams=null;

    this.miElemento=ElementRef;

    this.overall=0;
    this.imagenElegida="";
    this.nombre=""
    this.teams=null;
    this.selectedTeam=0;
    this.pilotForm = this.formBuilder.group({
      driverId: [0, Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: [0, Validators.required],
      country: ['España', Validators.required],
      flag: ['es', Validators.required],
      number: [0, Validators.required],
      imageDriver: ["", Validators.required],
      seasonStartPrice: [800000],
      currentPrice: [800000],
      seasonChange: [0],
      team: [0, Validators.required],
      leagueId: [0]
    });



    this.statForm = this.formBuilder.group({
      driverId: [0, Validators.required],
      points: [0, Validators.required],
      dnfs: [0, Validators.required],
      wins: [0, Validators.required],
      poles: [0, Validators.required],
      fastestLaps: [0, Validators.required],
      podiums: [0, Validators.required],
      highestGridPos: [0, Validators.required],
      beatTeamMateRate: [0, Validators.required],
      highestScoringTrack: [0, Validators.required]
    });

    this.abilityForm = this.formBuilder.group({
      driverId: [0, Validators.required],
      overtaking: [50, Validators.required],
      defending: [50, Validators.required],
      tireManagement: [50, Validators.required],
      consistency: [50, Validators.required],
      experience: [50, Validators.required],
      pace: [50, Validators.required],
      overall: [50, Validators.required],
    });

  }


  // calcularOverall(){
  // this.abilityForm.valueChanges.subscribe(values => {
  //   const { overtaking, defending, tireManagement, consistency, experience, pace } = values;
  // const sum = [overtaking, defending, tireManagement, consistency, experience, pace].reduce((a, b) => a + Math.round(b), 0);
  // const average = Math.round(sum / 6);
  // this.overall = average;
  // });

  // }

  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x)  && this.loadData());


 }
 loadData() {

  // Saving field values for checking if there are changes
  if (this.director != null) {
    this._teamService.getAvailableTeams(this.director.leagueId).subscribe(apiTeams=>{
      this.availableTeams=apiTeams
      console.log(this.availableTeams)
    })

  }

}

  obtenerSrcImagen(string:any) {
    this.imagenElegida=string;
    console.log(this.imagenElegida)
    this.pilotForm.controls['imageDriver'].setValue(this.imagenElegida);
  }



  submitForm() {
    this.pilotForm.get("leagueId")?.setValue(this.director.leagueId);
    console.log(this.pilotForm.value);

    this._driverService.postDriverData(this.pilotForm.value).subscribe(
      (response) => {
        // Obtener la ID generada del piloto
        const pilotoId = response.driverId;
        console.log("ID del piloto agregado:", pilotoId);

        // Asignar la ID al formulario
        this.abilityForm.get("driverId")?.setValue(pilotoId);
        this.statForm.get("driverId")?.setValue(pilotoId);

        // Continuar con las operaciones necesarias
        this._abilityService.postAbilityData(this.abilityForm.value).subscribe(
          (response) => {
            console.log('Respuesta recibida');
            // Manejar la respuesta del servicio como sea necesario
          },
          (error) => {
            console.error('Error capturado en el componente');
            // Manejar el error del servicio como sea necesario
          }
        );

        this._statService.postStatData(this.statForm.value).subscribe(
          (response) => {
            console.log('Respuesta recibida');
            // Manejar la respuesta del servicio como sea necesario
          },
          (error) => {
            console.error('Error capturado en el componente');
            // Manejar el error del servicio como sea necesario
          }
        );
      },
      (error) => {
        console.error("Error al agregar el piloto:", error);
      }
    );

    // Continuar con la navegación o las operaciones necesarias
    // this.router.navigate(['/admin/']);
  }


 reloadPage() {
    location.reload();
  }


  ngOnInit() {
    // this.calcularOverall()
    this.getDirector()

    // this._teamService.getTeamData().subscribe(apiTeam=>this.teams=apiTeam);
  }

  getTeam(idDriver:number){
    this._teamService.getTeamById(idDriver).subscribe(apiEscuderia => {
      this.team=apiEscuderia
    });
  }





}
