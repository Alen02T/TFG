import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Driver } from 'src/app/models/driver.model';
import { Team } from 'src/app/models/team.model';
import { DriverService } from 'src/app/services/driver.service';
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

  // abilityForm: FormGroup;

  overall:number;

  teams:Team [] | null;
  availableTeams:Team[] | null;

  selectedTeam:number;



  imagenElegida:string;
  isLinear = false;


  constructor(private _driverService:DriverService,
    private _teamService:TeamService
    ,private formBuilder: FormBuilder) {
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
      name: [null, Validators.required],
      lastname: [null, Validators.required],
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



    // this.abilityForm = this.formBuilder.group({
    //   driverId: [0, Validators.required],
    //   abilityId: [0, Validators.required],
    //   overtaking: [0, Validators.required],
    //   defending: [0, Validators.required],
    //   tireManagement: [0, Validators.required],
    //   consistency: [0, Validators.required],
    //   experience: [0, Validators.required],
    //   pace: [0, Validators.required],
    //   overall: [0, Validators.required],
    // });

    // this.statForm = this.formBuilder.group({
    //   driverId: [0, Validators.required],
    //   name: [null, Validators.required],
    //   lastname: [null, Validators.required],
    //   age: [0, Validators.required],
    //   country: ['España', Validators.required],
    //   flag: ['es', Validators.required],
    //   number: [0, Validators.required],
    //   imageDriver: ["", Validators.required],
    //   seasonStartPrice: [800000, Validators.required],
    //   currentPrice: [800000, Validators.required],
    //   seasonChange: [0, Validators.required],
    //   team: [0, Validators.required],
    //   leagueId: [0, Validators.required]
    // });

  }


  // calcularOverall(){
  // this.abilityForm.valueChanges.subscribe(values => {
  //   const { overtaking, defending, tireManagement, consistency, experience, pace } = values;
  // const sum = [overtaking, defending, tireManagement, consistency, experience, pace].reduce((a, b) => a + Math.round(b), 0);
  // const average = Math.round(sum / 6);
  // this.overall = average;
  // });

  // }

  obtenerSrcImagen(string:any) {
    this.imagenElegida=string;
    console.log(this.imagenElegida)
    this.pilotForm.controls['imageDriver'].setValue(this.imagenElegida);
  }




  submitForm(){
    //console.log(this.pilotForm.value)
    this._driverService.postDriverData(this.pilotForm.value,1);

  }



  ngOnInit() {
    // this.calcularOverall()
    this._teamService.getAvailableTeams(1).subscribe(apiTeams=>this.availableTeams=apiTeams)
    this._teamService.getTeamData().subscribe(apiTeam=>this.teams=apiTeam);
  }

  getTeam(idDriver:number){
    this._teamService.getTeamById(idDriver).subscribe(apiEscuderia => {
      this.team=apiEscuderia
    });
  }





}
