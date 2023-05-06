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
  imagenElegida:string;




  constructor(private _driverService:DriverService,
    private _teamService:TeamService
    ,private formBuilder: FormBuilder) {
    this.driver=null;
    this.team=null;
      this.miElemento=ElementRef;

    this.imagenElegida="";
    this.nombre=""

    this.pilotForm = this.formBuilder.group({
      driverId: [0, Validators.required],
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      age: [0, Validators.required],
      country: ['España', Validators.required],
      flag: ['es', Validators.required],
      number: [0, Validators.required],
      imageDriver: ["", Validators.required],
      seasonStartPrice: [800000, Validators.required],
      currentPrice: [800000, Validators.required],
      seasonChange: [0, Validators.required],
      team: [0, Validators.required],
      leagueId: [0, Validators.required]
    });

    // this.abilityForm = this.formBuilder.group({
    //   driverId: [this, Validators.required],
    //   abilityId: [0, Validators.required],
    //   "overtaking": 99,
    //   "defending": 99,
    //   "tireManagement": 99,
    //   "consistency": 99,
    //   "experience": 99,
    //   "pace": 99,
    //   "overall": 99
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




  obtenerSrcImagen(string:any) {
    this.imagenElegida=string;
    console.log(this.imagenElegida)
    this.pilotForm.controls['imageDriver'].setValue(this.imagenElegida);
  }

//Esto Crea 2 pilotos
  // submitForm() {
  //   console.log(this.pilotForm.value);
  //   this._driverService.postDriverData(this.pilotForm.value, 1)
  //     .subscribe(
  //       (driver: Driver) => {
  //         console.log('Driver created successfully:', driver);
  //         console.log("DriverId" + driver.driverId)
  //         // Aquí puedes llamar a otros métodos del servicio para crear los objetos adicionales
  //       },
  //       (error: any) => {
  //         console.error('Error creating driver:', error);
  //       }
  //     );
  // }


  submitForm(){
    console.log(this.pilotForm.value)
    this._driverService.postDriverData(this.pilotForm.value,1);

  }


  ngOnInit() {

  }
}


