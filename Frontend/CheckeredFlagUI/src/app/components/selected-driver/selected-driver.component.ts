import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ability } from 'src/app/models/ability.model';
import { Driver } from 'src/app/models/driver.model';
import { Stat } from 'src/app/models/stat.model';
import { Team } from 'src/app/models/team.model';
import { AbilityService } from 'src/app/services/ability.service';
import { DriverService } from 'src/app/services/driver.service';
import { StatService } from 'src/app/services/stat.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-selected-driver',
  templateUrl: './selected-driver.component.html',
  styleUrls: ['./selected-driver.component.css']
})
export class SelectedDriverComponent implements OnInit {


  driver:Driver | null;
  driverId:number;
  team : Team | null;
  ability:Ability | null;
  teamId:number;
  Teams:Team[] | null;
  drivers:Driver[] | null;
  numeroTeam?:number;
  abilityId:number;

  color:string | null;


  numeroInicial:number;
  restoOvertaking:number;
  restoDefending:number;
  restoTire:number;
  restoPace:number;
  restoConsistency:number;
  positivo:boolean;
  // color:string | null;


  texto:string;
  texto2:string;
  constructor(private activatedRoute: ActivatedRoute,
    private _Driverservice:DriverService,
    private _Teamservice:TeamService,private _abilityService:AbilityService) {
    this.driver = null;
    this.drivers=[];
    this.driverId=0;
    this.team = null;
    this.teamId=0;
    this.Teams=[];
    this.numeroTeam=0;
    this.ability=null;
    this.abilityId=0;
    this.color=null;
    // this.color="C70039";

    this.numeroInicial=60;
    this.restoOvertaking=0;
    this.restoDefending=0;
    this.restoConsistency=0;
    this.restoPace=0;
    this.restoTire=0;
    this.positivo=false;

    this.texto="";
    this.texto2="";
  }



// getCurrentRace(){
//   return (environment.CURRENTRACEID);
// }

// graficoConFechas(titulo:string,cantidad:any,tipo:any,encabezado:any,id:any) {

//   var ctx = document.getElementById(id)?.getContext('2d');
//   if (this.myChart) {
//       this.myChart.destroy();
//   }
//   this.myChart= new Chart(ctx, {};
// }

//Funcion Magica
// addData(chart:any, label:any, data:any) {
//   chart.data.labels.push(label);
//   chart.data.datasets.forEach((dataset:any) => {
//       dataset.data.push(data);
//   });
//   chart.update();
// }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.driverId = parameters.get('id');
    });


    // const image = new Image();
    // this._Driverservice.getDriverDataByPoints().subscribe(x =>{
    //   this.drivers=x
    //   let contador=1;
    //   x.forEach((element:any) => {
    //     //console.log(this.driverId)
    //     if(contador==1){
    //       this.texto2=element.name + " va liderando el mundial con " + element.points + " puntos"
    //     }
    //     if(element.driverId==this.driverId){
    //         this.texto=""+contador;
    //     }
    //     contador++;
    //     const nombrePilotos:string = element.name as string
    //     const pilotosPoints:number = element.points as number
    //     //const pilotosWins:number = element.wins as number
    //     this.addData(myLineChart,nombrePilotos,pilotosPoints)
    //   });
    // });
    // image.src ="/assets/img/F1.svg"

    // const graph:any = document.querySelector("#grafica");

    // const data = {
    //   datasets: [
    //   {
    //     label:"Puntos",
    //     data: [],
    //     backgroundColor: 'rgba(180, 180, 176, 0.2)'
    //   },
    // ]
    // };

    // let delayed:any;
    // const plugin = {
    //   id: 'customCanvasBackgroundImage',
    //   beforeDraw: (chart:any) => {
    //     if (image.complete) {
    //       const ctx = chart.ctx;
    //       const {top, left, width, height} = chart.chartArea;
    //       const x = left + width / 2 - image.width / 2;
    //       const y = top + height / 2 - image.height / 2;
    //       ctx.drawImage(image, x, y);
    //     } else {
    //       image.onload = () => chart.draw();
    //     }
    //   }
    // };
    // const config:any = {
    //   type: 'bar',
    //   data: data,
    //   plugins: [plugin],
    //   options: {
    //     indexAxis: 'y',
    //     elements: {
    //       bar: {
    //         borderWidth: 2,
    //       }
    //     },
    //     responsive: true,
    //     plugins:{
    //       legend: {
    //         position: 'right',
    //       },
    //       title: {
    //         display: true,
    //         text: 'F1 World Championship Drivers Points'

    //       },

    //     }


    //   },
    //   animation: {
    //     onComplete: () => {
    //       delayed= true;
    //     },
    //     delay: (context:any) => {
    //       let delay = 0;
    //       if (context.type === 'data' && context.mode === 'default' && !delayed) {
    //         delay = context.dataIndex * 300 + context.datasetIndex * 100;
    //       }
    //       return delay;
    //     },
    //   },
    // };

    // const myLineChart = new Chart(graph, config);


    this._Driverservice.getDriverById(this.driverId).subscribe(
      apiPilotos => {
        this.driver=apiPilotos;
        this.teamId=this.driver?.team;

        this._abilityService.getDriverAbility(this.driverId).subscribe((apiPilotos) =>
        {
          this.ability = apiPilotos,
          this.restoConsistency=  this.ability.consistency-this.numeroInicial,
          this.restoDefending=  this.ability.defending-this.numeroInicial,
          this.restoPace=  this.ability.pace-this.numeroInicial,
          this.restoTire=  this.ability.tireManagement-this.numeroInicial,
          this.restoOvertaking=  this.ability.overtaking-this.numeroInicial
        });
        this._Teamservice.getTeamById(this.teamId).subscribe((
          apiPilotos) => {
            this.team = apiPilotos
            // this.color!=this.team.color;
            // console.log(this.color)


      });
});

}
}
