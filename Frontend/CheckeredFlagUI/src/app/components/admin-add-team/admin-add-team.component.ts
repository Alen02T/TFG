import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team.model';
import { DriverService } from 'src/app/services/driver.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin-add-team',
  templateUrl: './admin-add-team.component.html',
  styleUrls: ['./admin-add-team.component.css']
})
export class AdminAddTeamComponent implements OnInit {
  @ViewChild('owrap', {static: true}) miElemento: ElementRef | any;
  @ViewChild('owrap2', {static: true}) miElemento2: ElementRef | any;
  teamForm: FormGroup;
  teams:Team [] = [];
  imagenElegida:string="";
  availableTeams:Team[] = [];
  team:Team=new Team();
  disabled: boolean = true;
  constructor(private _driverService:DriverService,
    private _teamService:TeamService
    ,private formBuilder: FormBuilder,private router:Router) {
    this.miElemento=ElementRef;
    this.miElemento2=ElementRef



    this.teamForm = this.formBuilder.group({

      country: ["España"],
      flag: ["es"],
      color: [null,Validators.required],
      name: [null,Validators.required],
      director: [null,Validators.required],
      points: [0, Validators.required],
      homefactory: [null,Validators.required],
      engine: [null,Validators.required],
      chassis: [null,Validators.required],
      championships: [0],
      shieldImage: [null,Validators.required],
      vehicleImage: [null,Validators.required],
      leagueId: [1]
    });
  }

  obtenerSrcImagen(string:any) {
    this.imagenElegida=string;
    console.log(this.imagenElegida)
    this.teamForm.controls['vehicleImage'].setValue(this.imagenElegida);
  }

  obtenerSrcImagenEscuderia(string:any) {
    this.imagenElegida=string;
    console.log(this.imagenElegida)
    this.teamForm.controls['shieldImage'].setValue(this.imagenElegida);
  }


  submitForm() {
    console.log(this.teamForm.value);
    this._teamService.addTeam(this.teamForm.value).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/admin/']);
    });
  }


 reloadPage() {
    location.reload();
  }


  ngOnInit() {
    // this.calcularOverall()
    // this._teamService.getAvailableTeams(1).subscribe(apiTeams=>this.availableTeams=apiTeams)
    this._teamService.getTeamsByLeagueOrdererByPoints(1).subscribe(apiTeam=>this.teams=apiTeam);
  }

  getTeam(idDriver:number){
    this._teamService.getTeamById(idDriver).subscribe(apiEscuderia => {
      this.team=apiEscuderia
    });
  }



}

