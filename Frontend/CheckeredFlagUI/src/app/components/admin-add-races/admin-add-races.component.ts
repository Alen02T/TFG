import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Circuit } from 'src/app/models/circuit.model';
import { Liga } from 'src/app/models/liga.model';
import { CircuitService } from 'src/app/services/circuit.service';
import { LigaService } from 'src/app/services/liga.service';
import { RaceService } from 'src/app/services/race.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-add-races',
  templateUrl: './admin-add-races.component.html',
  styleUrls: ['./admin-add-races.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AdminAddRacesComponent implements OnInit {
  Allcircuits:Circuit[] | null;
  circuits:Circuit[] | null;
  ligas:Liga[] | null;
  liga:Liga| null;
  circuitosSeleccionados:Circuit[] | null;

  tieneElementos=false
  selectedCircuit:Circuit | null;
  selectedCircuitImage: string | null ;
  selectedCircuitMap: string | null ;
  showMessage = false;
   constructor(private _raceService:RaceService,
    private _circuitService:CircuitService,
    private _ligaService:LigaService,) {

      this.selectedCircuit=null;
      this.selectedCircuitImage=null
      this.selectedCircuitMap=null
      this.Allcircuits=null
      this.circuits=null
      this.ligas=null;
      this.liga=null;
      this.circuitosSeleccionados=null;
    }

    selectedCircuits: Circuit[] = [];

    toggleSelected(circuit: Circuit, spanElement:any |  HTMLElement) {
      const index = this.selectedCircuits.findIndex(c => c.circuitId === circuit.circuitId);
      if (index === -1) {
        this.selectedCircuits.push(circuit);
        this.selectedCircuit=circuit
        this.selectedCircuitImage = circuit.imageCircuit;
        this.selectedCircuitMap = circuit.imageMap;
      } else {
        this.selectedCircuits.splice(index, 1);
      }
      spanElement.classList.toggle('grayscale');
      console.log(this.selectedCircuits)
    }

    isSelected(circuit: Circuit) {
      return this.selectedCircuits.findIndex(c => c.circuitId === circuit.circuitId) !== -1;
    }

    drop(event:  CdkDragDrop<string[]>| any) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        console.log(event.container.data)
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }

    submitCircuitos(){
      // this.selectedCircuits
      this._ligaService.añadirCircuitosAlaLiga(2, [1,2,5,8]).subscribe(
        () => {
          console.log("Circuitos añadidos correctamente");
          this.selectedCircuits = [];
        },
        error => {
          console.error("Error al añadir circuitos:", error);
        }
      );

      // if(this.selectedCircuits.length<4){
      //   this.showMessage = true;
      //   this.delay(3000).then(() => {
      //     console.log('Han pasado 3 segundos');
      //     this.showMessage = false;
      //   });
      // }else{
      //   console.log("le he dado click")
      //   console.log(this.selectedCircuits)

      //   const arrayIds = this.selectedCircuits.map(c => c.circuitId);
      //   console.log(arrayIds)


      // }

    }

    delay(ms:any) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }




    removeSelectedCircuit(index: number) {
      this.selectedCircuits.splice(index, 1);
      console.log(this.selectedCircuits)
    }



      getLigaWithCircuits(): void {
    //Esta funcion te devuelve los circuitos al pasarle la id de la liga en la que pertenecen
        this._ligaService.getLigaWithCircuits(2).subscribe(response => {
          this.liga = response;
          this.circuits = response.circuits;

          console.log(this.circuits)

          if (this.circuits && this.circuits.length !== 0) {
            // Si el array circuits existe y tiene al menos un elemento, retorna true
            console.log("Tiene elementos")
            this.tieneElementos=true

          }else{
            console.log("No tiene elementos")
            this.tieneElementos=false
          }
        });


      }



    ngOnInit(): void {
      //Cargo todos los circuitos
      this._circuitService.getCircuitData().subscribe(apiCircuits=>this.Allcircuits=apiCircuits)
      this.getLigaWithCircuits()


    }

}
