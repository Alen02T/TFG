import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Circuit } from 'src/app/models/circuit.model';
import { Liga } from 'src/app/models/liga.model';
import { Qualy } from 'src/app/models/qualy.model';
import { qualyresult } from 'src/app/models/qualyresult.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { Result } from 'src/app/models/result.model';
import { Stat } from 'src/app/models/stat.model';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { LigaService } from 'src/app/services/liga.service';
import { QualyService } from 'src/app/services/qualy.service';
import { QualyResultService } from 'src/app/services/qualyresult.service';
import { RaceService } from 'src/app/services/race.service';
import { ResultService } from 'src/app/services/result.service';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-admin-add-result',
  templateUrl: './admin-add-result.component.html',
  styleUrls: ['./admin-add-result.component.css']
})
export class AdminAddResultComponent implements OnInit {

  circuitosSeleccionados:Circuit[] = []
  raceId:number=0;
  liga:Liga | null
  driversFinishedRace:any[] = [];
  qualyResults:qualyresult [] | null
  selectedDriverIndex: number = -1;
  raceResults:raceResult[] | null;

  qualys:Qualy[] | null;

  stat:Stat | null;

  puntosPorPosicion = [
    25, // Posición 0
    18, // Posición 1
    15, // Posición 2
    12, // Posición 3
    10, // Posición 4
    8,  // Posición 5
    6,  // Posición 6
    4,  // Posición 7
    2,  // Posición 8
    1   // Posición 9
  ];


  constructor(private _raceResults:RaceService,
    private _ligaService:LigaService
    ,private _grandPrixService:GrandPrixService,
    private _activatedRoute:ActivatedRoute,
    private _qualyResultService:QualyResultService,
    private _qualyService:QualyService,private _router:Router,
    private _resultService:ResultService,
    private _statService:StatService) {

      this.qualyResults=null;
      this.liga=null;
      this.raceResults=null;
      this.stat=null;
      this.qualys=null;
     }





     drop2(event: CdkDragDrop<string[]> | any) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        console.log("Se mueve")

        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );


        // this.checkAllMoved();
      }
    }

    selectDriver(index: number) {
      this.selectedDriverIndex = index;

    }

    isCheckboxSelected(): boolean {
      return this.selectedDriverIndex !== -1;
    }


    guardarResultados(){
      if (!this.isCheckboxSelected()) {
        return; // Evitar que se envíen los datos si no hay ningún checkbox seleccionado
      }

      if (!this.qualyResults) {
        return; // Evitar errores si this.qualyResults es null o undefined
      }



      this.qualyResults?.forEach((dato,index)=>{

        //Accedo a la clase para poder updatearla despues
        this._statService.getDriverStats(dato.driverId).subscribe(apiDatos=>{
          this.stat=apiDatos


        let posicionActual = index + 1 ;
        // console.log(dato.driverName , " esta en el puesto " , posicionActual , " actualmente ")

        const newResult = new Result();

        newResult.raceId = dato.raceId
        newResult.teamId = dato.teamId
        newResult.driverId = dato.driverId;
        newResult.grid = dato.qualyGrid;
        newResult.position = posicionActual;

        //Stat

        if (posicionActual <= this.stat.highestGridPos) {
          this.stat.highestGridPos = posicionActual;
          this.stat.highestScoringTrack = posicionActual;
        }


        this.stat.beatTeamMateRate=this.stat.beatTeamMateRate+posicionActual;

        console.log(posicionActual)
        if (index >= 0 && index < this.puntosPorPosicion.length) {
          if(index==0){
            this.stat.wins++
            this.stat.podiums++
          }else if(index<3){
            this.stat.podiums++
          }
          newResult.points = this.puntosPorPosicion[index];
          this.stat.points = this.stat.points + this.puntosPorPosicion[index]
        } else {
          newResult.points = 0; // O cualquier otro valor predeterminado
        }

        if(this.selectedDriverIndex==index){
          newResult.fastestLap=true
          newResult.points=newResult.points+1
          this.stat.points = this.stat.points +1
          this.stat.fastestLaps = this.stat.fastestLaps +1;
        }

      this._statService.updateStat(this.stat,dato.driverId).subscribe(
        (response:any) => {
          console.log('response received', response);
          // Realiza cualquier lógica adicional con la respuesta aquí
        },
        (error:any) => {
          console.error('error caught in component', error);
          // Maneja el error aquí si es necesario
        }
       )

        this._resultService.postResultData2(newResult).subscribe(
          (response:any) => {
            console.log('response received', response);
            // Realiza cualquier lógica adicional con la respuesta aquí
          },
          (error:any) => {
            console.error('error caught in component', error);
            // Maneja el error aquí si es necesario
          }
        );

        this._router.navigate(['/admin']);
      })
    })
  }




  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((parameters: any) => {
      this.raceId = parameters.get('id');
  });



  this._ligaService.getLigaWithCircuits(2).subscribe(apiDatos => {
    this.liga = apiDatos;
    this.circuitosSeleccionados = [...apiDatos.circuits];

    this._qualyResultService.getQualyResultByRoundId(this.liga!.currentRound).subscribe(apiDatos=>this.qualyResults=apiDatos)
  });


  }

}
