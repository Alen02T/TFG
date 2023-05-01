import { Component, OnInit } from '@angular/core';
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


  driver:Driver | null;
  team:Team | null;
  nombre:string;

  pilotForm: FormGroup; // Define la variable del formulario



  constructor(private _driverService:DriverService,
    private _teamService:TeamService
    ,private formBuilder: FormBuilder) {
    this.driver=null;
    this.team=null;

    this.nombre=""

    this.pilotForm = this.formBuilder.group({
      driverId: [null, Validators.required],
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      age: [null, Validators.required],
      country: [null, Validators.required],
      flag: ['es', Validators.required],
      number: [null, Validators.required],
      imageDriver: [null, Validators.required],
      seasonStartPrice: [800000, Validators.required],
      currentPrice: [800000, Validators.required],
      seasonChange: [0, Validators.required],
      team: [0, Validators.required]
    });

  }





  submitForm(){
    console.log("Se ha añadido")
  }

  ngOnInit(): void {

  }
}
