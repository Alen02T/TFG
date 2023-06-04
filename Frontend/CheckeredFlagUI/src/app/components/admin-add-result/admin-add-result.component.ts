import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ability } from 'src/app/models/ability.model';
import { Circuit } from 'src/app/models/circuit.model';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { Liga } from 'src/app/models/liga.model';
import { Qualy } from 'src/app/models/qualy.model';
import { qualyresult } from 'src/app/models/qualyresult.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { Result } from 'src/app/models/result.model';
import { Stat } from 'src/app/models/stat.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { AbilityService } from 'src/app/services/ability.service';
import { DriverService } from 'src/app/services/driver.service';
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
  driver:Driver | null;
  stat:Stat | null;
  ability:Ability | null;


  director:Director = new Director()

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


 dineroPorPosicion = [
    1000000, // Posición 0
    750000,  // Posición 1
    500000,  // Posición 2
    400000,  // Posición 3
    300000,  // Posición 4
    250000,  // Posición 5
    200000,  // Posición 6
    150000,  // Posición 7
    100000,  // Posición 8
    50000    // Posición 9
  ];


  constructor(private _raceResults:RaceService,
    private _ligaService:LigaService
    ,private _grandPrixService:GrandPrixService,
    private _activatedRoute:ActivatedRoute,
    private _qualyResultService:QualyResultService,
    private _qualyService:QualyService,private _router:Router,
    private _resultService:ResultService,
    private _statService:StatService,private _abilityService:AbilityService,
    private _driverService:DriverService,private _token:TokenHandlerService) {

      this.qualyResults=null;
      this.liga=null;
      this.raceResults=null;
      this.stat=null;
      this.qualys=null;
      this.ability=null;
      this.driver=null;
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


    getDirector(){
      this._token
       .getDirector()
       .subscribe((x) => (this.director = x) && this.loadData());
   }


   loadData(){
    if(this.director!=null){
      this._ligaService.getLigaWithCircuits(this.director.leagueId).subscribe(apiDatos => {
        this.liga = apiDatos;
        this.circuitosSeleccionados = [...apiDatos.circuits];
        this._qualyResultService.getQualyResultByRoundId(this.director.leagueId,this.liga!.currentRound).subscribe(apiDatos=>this.qualyResults=apiDatos)
      });
    }
   }

  guardarResultados(){
      if (!this.isCheckboxSelected()) {
        return; // Evitar que se envíen los datos si no hay ningún checkbox seleccionado
      }

      if (!this.qualyResults) {
        return; // Evitar errores si this.qualyResults es null o undefined
      }


    //Dos arrays hay que hacer
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


        if (index >= 0 && index < this.puntosPorPosicion.length) {
          newResult.points = this.puntosPorPosicion[index];
          this.stat.points = this.stat.points + this.puntosPorPosicion[index]
          console.log(newResult.points + ' ' + newResult.driverId)
          //Si resulta Ganador
          if(index==0){
            this.stat.wins++
            this.stat.podiums++
          }else if(index>0 && index<3){
            this.stat.podiums++
          }

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
      })
    })

      this.modificarHabilidades()
      this.modificarPrecio()
  }

  modificarHabilidades(){
    if (!this.isCheckboxSelected()) {
      return; // Evitar que se envíen los datos si no hay ningún checkbox seleccionado
    }

    if (!this.qualyResults) {
      return; // Evitar errores si this.qualyResults es null o undefined
    }


  //Dos arrays hay que hacer
    this.qualyResults?.forEach((dato,index)=>{
      this._abilityService.getDriverAbility(dato.driverId).subscribe(apiAbility=>{
        this.ability=apiAbility
        // console.log(this.ability)


      let posicionActual = index + 1 ;
      // console.log(dato.driverName , " esta en el puesto " , posicionActual , " actualmente ")


      if (index >= 0 && index < this.puntosPorPosicion.length) {
        //Si resulta Ganador
        if(index==0){
          for(let i=0;i<13;i++){
            let x = Math.floor((Math.random() * 6) + 1);
            switch(x){
              case 1:
                this.ability!.overtaking ++
                break;
              case 2:
                this.ability!.defending++
                break;
              case 3:
                this.ability!.tireManagement++
                break;
              case 4:
                this.ability!.consistency++
                break;
              case 5:
                this.ability!.pace++
                break;
              case 6:
                this.ability!.experience++
                break;
            }
          }

        }else if(index>0 && index<3){
          for(let i=0;i<8;i++){
            let x = Math.floor((Math.random() * 6) + 1);
            switch(x){
              case 1:
                this.ability!.overtaking ++
                break;
              case 2:
                this.ability!.defending++
                break;
              case 3:
                this.ability!.tireManagement++
                break;
              case 4:
                this.ability!.consistency++
                break;
              case 5:
                this.ability!.pace++
                break;
              case 6:
                this.ability!.experience++
                break;
            }
          }
          console.log(this.ability)

        }else if(index>=3 && index<=7){

          let suma=0
          //Aqui van todos
          for(let i=0;i<4;i++){
            let x = Math.floor((Math.random() * 6) + 1);
            suma+=x
            switch(x){
              case 1:
                this.ability!.overtaking ++
                break;
              case 2:
                this.ability!.defending++
                break;
              case 3:
                this.ability!.tireManagement++
                break;
              case 4:
                this.ability!.consistency++
                break;
              case 5:
                this.ability!.pace++
                break;
              case 6:
                this.ability!.experience++
                break;
            }
          }
        }

      }


      // console.log(this.ability,dato.driverId)

      this._abilityService.updateAbility(this.ability,dato.driverId).subscribe(
        (response:any) => {
          console.log('response received', response);
          // Realiza cualquier lógica adicional con la respuesta aquí
        },
        (error:any) => {
          console.error('error caught in component', error);
          // Maneja el error aquí si es necesario
        }
       )
    })
    })
    this._router.navigate(['/admin']);
  }

  modificarPrecio(){

    const totalPilotos = this.qualyResults?.length;
    const mitadSuperior = Math.ceil(totalPilotos! / 2);
    const dineroMinimo = 50000; // Valor mínimo de dinero
    const dineroMaximo = 100000; // Valor máximo de dinero

    let array:number[]=[]

    let sumaPerdedores=0
    let sumaGanadores=0


    //Con este bucle sacamos el dinero total a repartir entre los perdedores y ganadores
    for (let i = 0; i < this.qualyResults?.length!; i++) {

      if (i < mitadSuperior) {
        sumaGanadores+=this.puntosPorPosicion[i]
      } else {
        sumaPerdedores+=this.puntosPorPosicion[i]
        array.push(this.puntosPorPosicion[i])
      }
    }


    let cantidadGanadores= Math.round(dineroMaximo/sumaGanadores)
    let cantidadPerdedores= Math.round(dineroMinimo/sumaPerdedores)

    //Este bloque de codigo es para reducir el numero de dinero perdido en funcion
    //de como haya quedado
    let contador2=-1
    for(let i = 0;i<this.qualyResults?.length!;i++){

      if (i < mitadSuperior) {
        let seasonChange = this.puntosPorPosicion[i] * cantidadGanadores
        let seasonChangeFloored=Math.floor(seasonChange / 1000) * 1000;

        this._driverService.getDriverById(this.qualyResults![i].driverId).subscribe(apiAbility=>{
          this.driver=apiAbility

          this.driver.seasonChange=this.driver.seasonChange+seasonChangeFloored
          this.driver.currentPrice=this.driver.currentPrice+ this.driver.seasonChange
          this._driverService.updateDriverBody(this.driver.driverId, this.driver).subscribe(
            (response: any) => {
              console.log('Piloto actualizado:', response);
              // Realiza acciones adicionales después de la actualización exitosa
            },
            (error: any) => {
              console.error('Error al actualizar el piloto:', error);
              // Maneja el error de actualización si es necesario
            }
          );
    })
      } else {
        //Perdedores
        contador2++
        // console.log(array[contador2])
        console.log((sumaPerdedores-array[contador2]))
        let seasonChange =(sumaPerdedores-array[contador2])* cantidadPerdedores  //
        let seasonChangeFloored=Math.floor(seasonChange / 1000) * 1000;

        this._driverService.getDriverById(this.qualyResults![i].driverId).subscribe(apiAbility=>{
          this.driver=apiAbility

          this.driver.seasonChange=this.driver.seasonChange-seasonChangeFloored
          this.driver.currentPrice=this.driver.currentPrice+ this.driver.seasonChange


          this._driverService.updateDriverBody(this.driver.driverId, this.driver).subscribe(
            (response: any) => {
              console.log('Piloto actualizado:', response);
              // Realiza acciones adicionales después de la actualización exitosa
            },
            (error: any) => {
              console.error('Error al actualizar el piloto:', error);
              // Maneja el error de actualización si es necesario
            }
          );
      })


      }


    }

    // this.qualyResults?.forEach((dato,index)=>{
    //   this._driverService.getDriverById(dato.driverId).subscribe(apiAbility=>{
    //     this.driver=apiAbility



    // })
    // })
  }


  onCheckboxChange(index: number) {
    console.log(index)
    let selectedDriver = this.qualyResults![index]
    console.log(selectedDriver)
    this.qualyResults?.splice(index, 1); // Elimina la fila del índice seleccionado
    this.qualyResults?.push(selectedDriver); // Agrega la fila al final del array
  }



  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((parameters: any) => {
      this.raceId = parameters.get('id');

      this.getDirector()
  });







  }

}
