import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Circuit } from 'src/app/models/circuit.model';
import { Liga } from 'src/app/models/liga.model';
import { CircuitService } from 'src/app/services/circuit.service';
import { LigaService } from 'src/app/services/liga.service';
import { RaceService } from 'src/app/services/race.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Race } from 'src/app/models/race.model';
import { GrandPrixService } from 'src/app/services/grandPrix.service';
import { GrandPrix } from 'src/app/models/grandprix.model';
import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from 'src/app/models/sponsor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { Director } from 'src/app/models/director.model';

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

  grandPrixes:GrandPrix[] | null;

  idSponsor:number=0;

  sponsor:Sponsor | null;
  sponsors:Sponsor [] | null;

  race:Race | null;

  races:Race[] | null;
  tieneElementos=false
  selectedGp:GrandPrix | null;
  selectedCircuit:Circuit | null;
  selectedCircuitImage: string | null ;
  selectedCircuitMap: string | null ;

  director:Director = new Director()

  raceForm: FormGroup;
  showMessage = false;
   constructor(private _raceService:RaceService,
    private _circuitService:CircuitService,
    private _ligaService:LigaService,private _grandPrixService:GrandPrixService,
    private _sponsorService:SponsorService,private formBuilder:FormBuilder,private _token:TokenHandlerService
) {

      this.selectedGp=null;
      this.selectedCircuit=null;
      this.selectedCircuitImage=null
      this.selectedCircuitMap=null
      this.Allcircuits=null
      this.circuits=null
      this.ligas=null;
      this.liga=null;
      this.circuitosSeleccionados=null;
      this.races=null;
      this.sponsor=null;
      this.sponsors=null;
      this.race=null;
      this.grandPrixes=null;

      this.raceForm = this.formBuilder.group({
        raceId: [0],
        name: [""],
        date: [""],
        year: [0],
        round: [0],
        sponsor: [0],
        circuit: [0],
      });


    }

    selectedGPs:GrandPrix[]=[]
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

    crearCarreras(circuitoIds: Circuit[],arraySponsors:any,leagueId:number): void {

      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear().toString();
      let month = currentDate.getMonth() + 1;


  // Reemplaza "getCurrentRound" con el método correcto de obtención del valor inicial de "round" en tu Global Service


      circuitoIds.forEach((circuitoId,index)=>{

        month++

        if (month > 12) {
          month = 1;
        }

        const formattedDate = `${day}/${month}/${year}`;

        console.log(formattedDate); // Ejemplo de salida: "16/05/2023"


        const nuevaCarrera: Race = {
          raceId:0,
          name:"Gran Premio de " + circuitoId.country,
          date:formattedDate,
          year:new Date().getFullYear(),
          round: index+1,
          sponsor: arraySponsors[index],
          circuit: circuitoIds[index].circuitId,
          leagueId:leagueId
        };




        // Llama al método correspondiente de tu servicio para crear la carrera
        this._raceService.addRace(nuevaCarrera).subscribe(
          () => {
            console.log("Carrera creada correctamente");
          },
          (          error: any) => {
            console.error("Error al crear la carrera:", error);
          }
        );
      })

    }


    isSelected(circuit: Circuit) {
      return this.selectedCircuits.findIndex(c => c.circuitId === circuit.circuitId) !== -1;
    }

    isSelected2(grandPrix: GrandPrix) {
      return this.selectedCircuits.findIndex(c => c.circuitId === grandPrix.circuitId) !== -1;
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

    submitCircuitos(leagueId:number){
      const arraySponsors: number[] = []

      //Esto es para la API
      const circuitoIds = this.selectedCircuits.map(c => c.circuitId);

      //Esto es para el metodo carrera / para que puedan acceder a los campos con facilidad
      const circuitos = this.selectedCircuits.map(c => c);

      //Vamos a crear las carreras

      //Sponsors Listos para agregar
      for(let i=0;i<6;i++){
        const randomNumber = Math.floor(Math.random() * 17) + 1;
        arraySponsors.push(randomNumber)
      }
      console.log(arraySponsors)


      //Aqui empieza lo de circuitos
      if(this.selectedCircuits.length<4){
        this.showMessage = true;
        this.delay(3000).then(() => {
          console.log('Han pasado 3 segundos');
          this.showMessage = false;
        });
      }else{
        //Metodo para la liga
        this._ligaService.añadirCircuitosAlaLiga(leagueId, circuitoIds).subscribe(
          () => {
            console.log("Circuitos añadidos correctamente");
            this.selectedCircuits = [];
            this.crearCarreras(circuitos,arraySponsors,leagueId)
          },
          error => {
            console.error("Error al añadir circuitos:", error);
          }
        );
      }
    }

    delay(ms:any) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }


    removeSelectedCircuit(index: number) {
      this.selectedCircuits.splice(index, 1);
      console.log(this.selectedCircuits)
    }



      getLigaWithCircuits(leagueId:number): void {
    //Esta funcion te devuelve los circuitos al pasarle la id de la liga en la que pertenecen
        this._ligaService.getLigaWithCircuits(leagueId).subscribe(response => {
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

      loadData(){
        if(this.director!=null){
          console.log(this.director)
          // this._raceService.getRaceData().subscribe(apiRaces=>this.races=apiRaces)
          this._circuitService.getCircuitData().subscribe(apiCircuits=>this.Allcircuits=apiCircuits)


          this.getLigaWithCircuits(this.director.leagueId)
          this._grandPrixService.getGrandPrixRacesByLeagueIdOrderedByRound(this.director.leagueId).subscribe(apiGrandPrix=>this.grandPrixes=apiGrandPrix)

          this._sponsorService.getSponsorData().subscribe(apiSponsors=>this.sponsors=apiSponsors)
        }
      }

      getDirector(){
        this._token
         .getDirector()
         .subscribe((x) => (this.director = x) && this.loadData());
     }


    ngOnInit(): void {
      this.getDirector()
      //Cargo todos los circuitos
      // this._grandPrixService.getGrandPrixData().subscribe(apiGrandPrix=>this.grandPrixes=apiGrandPrix)

    }



    getSponsor(idSponsor:number){
      this._sponsorService.getSponsorById(idSponsor).subscribe(apiEscuderia => {
        this.sponsor=apiEscuderia
      });
    }


    toggleSelected2(grandPrix: GrandPrix, spanElement:any |  HTMLElement) {
      const index = this.selectedCircuits.findIndex(c => c.circuitId === grandPrix.circuitId);
      if (index === -1) {
        this.selectedGPs.push(grandPrix);
        this.selectedGp=grandPrix
        this.selectedCircuitImage = grandPrix.circuitImage;
        this.selectedCircuitMap = grandPrix.circuitImageMap;
      } else {
        this.selectedCircuits.splice(index, 1);
      }
      spanElement.classList.toggle('grayscale');
      console.log(this.selectedCircuits)
    }

}
