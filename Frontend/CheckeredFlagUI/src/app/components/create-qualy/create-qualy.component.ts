import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { Qualy } from 'src/app/models/qualy.model';
import { DriverService } from 'src/app/services/driver.service';
import { QualyService } from 'src/app/services/qualy.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { concatMap, from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { GrandPrix } from 'src/app/models/grandprix.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { Director } from 'src/app/models/director.model';
import { StatService } from 'src/app/services/stat.service';
import { Stat } from 'src/app/models/stat.model';

@Component({
  selector: 'app-create-qualy',
  templateUrl: './create-qualy.component.html',
  styleUrls: ['./create-qualy.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('500ms ease-in')),
      transition('visible => hidden', animate('500ms ease-out'))
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]

})
export class CreateQualyComponent implements OnInit {
  qualies2:Qualy[] | null;
  qualies:Qualy[] | null;

  drivers:any[] = [];
  driversFinishedQualy:any[] = [];
  qualyArray:Qualy[] = [];
  qualyArray2:Qualy[] = [];

  driverPoleMan:driverInfo | null
  public isButtonDisabled: boolean = true;

  allMoved:boolean
  http: any;
  showCard: boolean = false;
  stat:Stat = new Stat()

  polePiloto:number=0;

  raceId:number=0;
  director:Director = new Director()
  grandPrix:GrandPrix | null;

  constructor(private _qualyService:QualyService,private _driverService:DriverService,
    private _activatedRoute:ActivatedRoute,private _grandPrix:GrandPrixService,
    private _driverInfo:driverInfoService,private router:Router,
    private _token:TokenHandlerService,private _statService:StatService) {

    this.driverPoleMan=null
    this.qualies2=null;
    this.qualies=null;
    this.allMoved=false;

    this.grandPrix=null
   }


   getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

 loadData(){
  if(this.director!=null){
    this._grandPrix.getGrandPrixByRaceID(this.raceId).subscribe(apiGp=>this.grandPrix=apiGp)


    this._driverService.getDriversByLeagueId(this.director.leagueId).subscribe(apiDrivers => {
      this.drivers=apiDrivers
    });
    this._qualyService.getAllQualys().subscribe(apiQualy=>this.qualies=apiQualy);
  }
 }

  ngOnInit(): void {
  this._activatedRoute.paramMap.subscribe((parameters: any) => {
        this.raceId = parameters.get('id');
    });

    this.getDirector()
  }



 drop = (event: CdkDragDrop<{title: string; poster: string}[]>) => {
    moveItemInArray(this.drivers!, event.previousIndex, event.currentIndex);
    const draggedItemIndex = event.previousIndex;
    const droppedItemIndex = event.currentIndex;


    //Mas arriba 0 y mas abajo 20
    //console.log("Esta es la posicion de la que se trae" , draggedItemIndex)
    //console.log("Esta es la posicion en la que se queda" , droppedItemIndex)
  }


  drop2(event: CdkDragDrop<string[]>) {
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


      this.checkAllMoved();
    }
  }

  toggleCard() {
    this.showCard = !this.showCard;
  }

  checkAllMoved() {
    if (this.drivers.length === 0) {
      this.allMoved = true;
      let contador=1;
      console.log("Se han movido todos")

        this.isButtonDisabled = false; // Habilitar el botón


         // Deshabilitar el botón
      // this.driversFinishedQualy.forEach(item => {
      //   //console.log(item.driverId)

      //   if(contador==1){
      //     //Modelo qualy con FastestLap
      //     let qualy: Qualy = {
      //       id:0,
      //       raceId: 1,
      //       time: '1:20:000',
      //       grid:contador,
      //       driverId:item.driverId,
      //       teamId:item.team,
      //       fastestLap:true,
      //     };
      //     this.qualyArray.push(qualy)

      //     //console.log("Modelo: " , qualy)
      //   }else{
      //     //Modelo sin fastest lap y sin tiempo
      //     let qualy: Qualy = {
      //       id:0,
      //       raceId: 1,
      //       time: "",
      //       grid:contador,
      //       driverId:item.driverId,
      //       teamId:item.team,
      //       fastestLap:false,
      //     };
      //     this.qualyArray.push(qualy)
      //   }
      //   contador++;


      // });

    } else {
       this.allMoved = false;
       this.isButtonDisabled = true;
    }
  }

  public redirectToPage(): void {

    setTimeout(() => {
      this.router.navigate(['/admin/races-management']); // Cambia '/otra-pagina' con la ruta de la página a la que quieres redirigir
    }, 3000); // Espera 3000 milisegundos (3 segundos) antes de redirigir
  }

  //El array 3 funciona
  onAddQualys3(array:any){

    this.toggleCard()
  let contador=1
    array.forEach((item: any) => {
      //console.log(item)
      //console.log(contador)


      if(contador==1){
        this.polePiloto=item.driverId
        //Modelo qualy con FastestLap
        let qualy: Qualy = {
          id:0,
          raceId: this.raceId,
          time: '1:20:000',
          grid:contador,
          driverId:item.driverId,
          teamId:item.team,
          fastestLap:true,
        };
        this._statService.getDriverStats(item.driverId).subscribe(driverStats => {
          this.stat = driverStats;
          this.stat.poles++
          this._statService.updateStat(this.stat, qualy.driverId).subscribe(updatedStat => {
            this.stat = updatedStat;
            // Aquí puedes realizar otras acciones con el stat actualizado si es necesario
          });
        });


        this._driverInfo.getdriverInfoDataByDriverId(this.director.leagueId,this.polePiloto).subscribe(apiDatos=>this.driverPoleMan=apiDatos)
        this.qualyArray2.push(qualy)

        //console.log("Modelo: " , qualy)
      }else{
        //Modelo sin fastest lap y sin tiempo
        let qualy: Qualy = {
          id:0,
          raceId:  this.raceId,
          time: "",
          grid:contador,
          driverId:item.driverId,
          teamId:item.team,
          fastestLap:false,
        };
        this.qualyArray2.push(qualy)
      }

      contador++
    });

    this._qualyService.addQualys(this.qualyArray2).subscribe(
      apiQualy => {
        // Aquí se reciben los datos de la API y se almacenan en una variable
        this.qualies2 = apiQualy;
        console.log(this.qualies2)

      },
      error => {
        // Aquí se maneja cualquier error que pueda ocurrir en la petición
        console.error(error);
      }
    );

    this.redirectToPage()



  }


}
