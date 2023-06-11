import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { map } from 'rxjs';
import { Ability } from 'src/app/models/ability.model';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { Stat } from 'src/app/models/stat.model';
import { Team } from 'src/app/models/team.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { AbilityService } from 'src/app/services/ability.service';
import { DriverService } from 'src/app/services/driver.service';
import { RaceResultService } from 'src/app/services/raceresult.service';
import { StatService } from 'src/app/services/stat.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin-selected-driver',
  templateUrl: './admin-selected-driver.component.html',
  styleUrls: ['./admin-selected-driver.component.css']
})
export class AdminSelectedDriverComponent implements OnInit {
  ability:Ability | null;
//Le paso este dato al admin chart

  driverId:number;
  driver:Driver |null;

  stat:Stat | null;
  team:Team | null;
  teamId:number;
  statForm:FormGroup
  abilityForm:FormGroup
  selectedTeam:number;
  availableTeams:Team[] | null;
  teamForm:FormGroup;
  teamSelectedNumber:number;
  allAvailableTeams = [];
  chartData: Ability=new Ability;
  raceResults:raceResult[] =[]
  sumaTotal=0
  director:Director = new Director()
  posicionTotal=0
  podiumAverage=0

  constructor(private activatedRoute : ActivatedRoute,
    private _driverService:DriverService,private _abilityService:AbilityService,
    private _teamService:TeamService,private _statService:StatService,
    private formBuilder: FormBuilder,private _router:Router,
    private _raceResultService:RaceResultService,private _token:TokenHandlerService

    ) {
      this.availableTeams=null;
      this.driverId=0
      this.driver=null;
      this.ability=null;
      this.team=null;
      this.stat=null;
      this.teamId=0;
      this.teamSelectedNumber=0;
      this.selectedTeam=0;


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
      //Deberia ser driverForm
      this.teamForm = this.formBuilder.group({
        teamId: 0,
    });

   }

   onSelectionChange(team:Team) {
    // console.log(team)
    // console.log(team.teamId)
    // console.log(this.driver)
    this.teamSelectedNumber=team.teamId
    console.log(this.teamSelectedNumber)
  }

  updateDriver(){

    if (this.teamSelectedNumber === 0) {
      // mostrar mensaje de error
      return;
    }else{
    this._driverService.updateDriverTeam(this.driverId,this.teamSelectedNumber).subscribe(
      (response) => {
        console.log("Piloto traspasado a" + this.teamSelectedNumber + " actualizado correctamente:", response);
        // Actualiza el objeto Driver en tu componente con la respuesta del servicio
        this.driver = response;
      },
      (error) => {
        console.error("Error al actualizar el Driver:", error);
      }
    );
    this._router.navigate(['/drivers']);
    }



  }
  reloadPage() {
    location.reload();
  }




  cargarEstadisticas(){
    this.statForm.controls['driverId'].setValue(this.driverId);
    this._statService.postStatData(this.statForm.value).subscribe(
      (response) => {
        console.log('response received');
        // Manejar la respuesta del servicio como sea necesario
      },
      (error) => {
        console.error('error caught in component');
        // Manejar el error del servicio como sea necesario
      }
    );
    this.reloadPage()
  }

  addTagFn(name:string) {
    return { name: name ,tag: true};
}
  cargarAbilities(){
    this.abilityForm.controls['driverId'].setValue(this.driverId);
    this._abilityService.postAbilityData(this.abilityForm.value).subscribe(
      (response) => {
        console.log('response received');
        // Manejar la respuesta del servicio como sea necesario
      },
      (error) => {
        console.error('error caught in component');
        // Manejar el error del servicio como sea necesario
      }
    );
    this.reloadPage()

  }

  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x)  && this.loadData());


 }
 loadData() {

  // Saving field values for checking if there are changes
  if (this.director != null) {
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.driverId = parameters.get('id');

      this._statService.getDriverStats(this.driverId).subscribe(apiDatos=>this.stat=apiDatos)
      this._teamService.getAvailableTeams(this.director.leagueId).subscribe(apiTeams=>this.availableTeams=apiTeams)
      this._raceResultService.getRaceResultByDriver(this.driverId).subscribe(apiTeams=>{
        this.raceResults=apiTeams
        let length=this.raceResults.length


        this.raceResults.forEach(element => {
          this.sumaTotal+=element.resultPoints
          this.posicionTotal+=element.resultPosition
          if(element.resultPosition<=3){
            this.podiumAverage++
          }
        });
        this.sumaTotal=this.sumaTotal/length
        this.posicionTotal=this.posicionTotal/length
        this.podiumAverage=(this.podiumAverage/length)*100
      })

      this._driverService.getDriverById(this.director.leagueId,this.driverId).subscribe(apiDriver => {
        this.driver = apiDriver;
        this._teamService.getTeamById(this.director.leagueId,this.driver.team).subscribe(apiDriver => this.team=apiDriver);

      });

      this._abilityService.getDriverAbility(this.driverId).subscribe(
        apiDriver => {
          if (apiDriver) {
            this.ability = apiDriver;
            // Pasa los datos al componente app-admin-radar-chart aquí
            // Por ejemplo:
          } else {
            console.log('No se encontró información de habilidades para el piloto');
          }
        },
        error => {
          console.error('Ocurrió un error al obtener la información de habilidades del piloto:', error);
        }
      );
    }
  )


  }

}


  ngOnInit(): void {
    this.getDirector()
  }
}
