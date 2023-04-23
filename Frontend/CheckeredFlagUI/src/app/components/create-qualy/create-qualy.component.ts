import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { Qualy } from 'src/app/models/qualy.model';
import { DriverService } from 'src/app/services/driver.service';
import { QualyService } from 'src/app/services/qualy.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { concatMap, from } from 'rxjs';
@Component({
  selector: 'app-create-qualy',
  templateUrl: './create-qualy.component.html',
  styleUrls: ['./create-qualy.component.css']
})
export class CreateQualyComponent implements OnInit {
  qualies2:Qualy[] | null;
  qualies:Qualy[] | null;

  drivers:any[] = [];
  driversFinishedQualy:any[] = [];
  qualyArray:Qualy[] = [];


  datos = [
    { nombre: 'Juan', edad: 30 },
    { nombre: 'María', edad: 25 },
    { nombre: 'Pedro', edad: 40 }
  ];

  allMoved:boolean
  http: any;

  constructor(private _qualyService:QualyService,private _driverService:DriverService) {

    this.qualies2=null;
    this.qualies=null;
    this.allMoved=false;
   }

  ngOnInit(): void {
    this._driverService.getDriverData().subscribe(apiDrivers => {
      this.drivers=apiDrivers
    });
    this._qualyService.getAllQualys().subscribe(apiQualy=>this.qualies=apiQualy);
  }

  enviar() {
    from(this.datos).pipe(
      concatMap((dato:any) => this.http.post('/api/datos', dato))
    ).subscribe(
      () => console.log('Petición completada'),
      (error) => console.error(error),
      () => console.log('Todas las peticiones han sido completadas')
    );
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



  checkAllMoved() {
    if (this.drivers.length === 0) {
      this.allMoved = true;
      let contador=1;

      this.driversFinishedQualy.forEach(item => {
        console.log(item.driverId)

        if(contador==1){
          //Modelo qualy con FastestLap
          let qualy: Qualy = {
            id:0,
            raceId: 1,
            time: '1:20:000',
            grid:contador,
            driverId:item.driverId,
            fastestLap:true,
          };
          this.qualyArray.push(qualy)

          //console.log("Modelo: " , qualy)
        }else{
          //Modelo sin fastest lap y sin tiempo
          let qualy: Qualy = {
            id:0,
            raceId: 1,
            time: null,
            grid:contador,
            driverId:item.driverId,
            fastestLap:false,
          };
          this.qualyArray.push(qualy)
        }


        //console.log("Contador " , contador)
        contador++;


      });

      this.qualyArray.forEach(item => {
        console.log(item)

      });

    } else {
       this.allMoved = false;
    }
  }





onAddQualys(){
  this._qualyService.addQualys(this.qualyArray).subscribe(apiQualy=>this.qualies2=apiQualy);
}


}
