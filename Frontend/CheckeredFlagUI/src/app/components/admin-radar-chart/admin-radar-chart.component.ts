import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Ability } from 'src/app/models/ability.model';
import { Driver } from 'src/app/models/driver.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { Stat } from 'src/app/models/stat.model';
import { AbilityService } from 'src/app/services/ability.service';
import { DriverService } from 'src/app/services/driver.service';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { RaceService } from 'src/app/services/race.service';
import { RaceResultService } from 'src/app/services/raceresult.service';
import { StatService } from 'src/app/services/stat.service';



@Component({
  selector: 'app-admin-radar-chart',
  templateUrl: './admin-radar-chart.component.html',
  styleUrls: ['./admin-radar-chart.component.css']
})
export class AdminRadarChartComponent implements OnInit {
  //Recibe datos del piloto

  @Input() abilityParameter:number| null;

  driver2:Driver=new Driver()
  stat:Stat | null
  ability:Ability | null
  driver:driverInfo | null


  constructor(private _statService:StatService,private _abilityService:AbilityService,
    private _driverService:DriverService,private _driverInfoService:driverInfoService,
    private _raceService:RaceService ){
    this.stat=null;
    this.ability=null;
    this.abilityParameter=null
    this.driver=null;
  }

   hexToRgba(hex: string, alpha: number): string {
    const hexValue = hex.replace('#', '');
    const r = parseInt(hexValue.substr(0, 2), 16);
    const g = parseInt(hexValue.substr(2, 2), 16);
    const b = parseInt(hexValue.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  addDataSet(myLineChart: Chart, driverName: string, driverId: number) {
    this._abilityService.getDriverAbility(driverId).subscribe(data => {
      this._driverInfoService.getdriverInfoDataByDriverId(driverId).subscribe(apiDriverInfo=>this.driver=apiDriverInfo)
      this.ability = data;

      let overtaking = this.ability.overtaking;
      let pace = this.ability.pace;
      let defending = this.ability.defending;
      let consistency = this.ability.consistency;
      let tireManagement = this.ability.tireManagement;
      let experience = this.ability.experience;
      const datos: number[] = [overtaking, defending, tireManagement, consistency, pace, experience];

      const newDataset = {
        label: driverName,
        data: datos,
        backgroundColor:this.hexToRgba(""+this.driver?.teamColor, 0.5),
        borderColor:""+this.driver?.teamColor,
      };
      myLineChart.data.datasets.push(newDataset);
      myLineChart.update();
    });
  }

  cargarPosicionDeGridPosicionFinal(){
    const graph = document.querySelector("#posicion");
    const data = {
      datasets: [
        {
          label: 'Posición de llegada vs Posición de salida',
          data: [
            { x: 3, y: 5 },
            { x: 1, y: 2 },
            { x: 4, y: 6 },
            // Otros puntos de datos
          ],
        },
      ],
    };

    const config = {
      type: 'scatter',
      data: data,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Posición de salida',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Posición de llegada',
            },
          },
        },
      },
    };

    new Chart(graph as any, config as any);

  }

  cargarRadar(id:number){
    this._driverInfoService.getdriverInfoDataByDriverId(id).subscribe(apiDriver=>{
      this.driver=apiDriver


      const labels: string[] = ['Adelantamiento','Defensa','Gestion Neumatico','Consistencia','Ritmo','Experiencia'];
      const data = {
        labels: labels,
        datasets: []
      };

      var radar = <HTMLCanvasElement> document.getElementById("grafica");



      const config = {
        type: 'radar',
        data: data,
        options: {
          scales: {
            r:{
              suggestedMin: 0,
              suggestedMax: 100
            }
        },
          elements: {
            line: {
              borderWidth: 3
            }
          }
        },
    };


    const myLineChart = new Chart(radar, config as any);

    this.addDataSet(myLineChart,this.driver.driverName!,this.driver.driverId)

    })

  }

  cargarPuntosObtenidosvsExperiencia(){
    const data = {
      datasets: [
        {
          label: 'Pilotos',
          data: [
            { x: 740, y: 130, r: 10, label: 'Lewis Hamilton' },
            { x: 670, y: 140, r: 8, label: 'Max Verstappen' },
            { x: 610, y: 120, r: 6, label: 'Valtteri Bottas' },
            { x: 680, y: 110, r: 5, label: 'Sergio Perez' },
            { x: 620, y: 100, r: 4, label: 'Lando Norris' },
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
        },
      ],
    };

    const canvas = <HTMLCanvasElement>document.getElementById("experiencia");

    const config = {
      type: 'bubble',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Puntuación de Pilotos de Fórmula 1',
          },
          tooltip: {
            callbacks: {
              label: (context:any) => {
                const dataPoint = data.datasets[context.datasetIndex].data[context.dataIndex];
                return `${dataPoint.label}: Puntos: ${dataPoint.x}, Posición en el Campeonato: ${dataPoint.y}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Puntos',
            },
            min: 500,
            max: 800,
          },
          y: {
            title: {
              display: true,
              text: 'Posición en el Campeonato',
            },
            min: 90,
            max: 150,
          },
        },
      },
    };

    const bubbleChart = new Chart(canvas, config as any);


  }


  cargarLineChart(){
    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril']

    const graph = document.querySelector("#linear");

    const data = {
      labels: labels,
      datasets: [{
        label:"Ejemplo 1",
        data: [1, 2, 3, 4],
        backgroundColor: 'rgba(9, 129, 176, 0.2)'
      }]
    };

    const config = {
      type: 'line',
      data: data,
      };



    new Chart(graph as any, config as any);

  }
buclePilotos(myLineChart:Chart){
    this._driverService.getDriversByLeagueId(2).subscribe((x) => {
      x.forEach((element) => {
        this._driverService.getDriverById(element.driverId).subscribe(apiDriver => this.driver2=apiDriver);
        let combinado = element.name //+ ' | ' + element.number
        this.addDataSet(myLineChart,combinado!,element.driverId)
      });
    });

  }

 crearGraficaDeTodos(){
    const image = new Image();
    image.src = '/assets/img/F1.svg';

    this._raceService.getRaceData().subscribe((x) => {

      x.forEach((element) => {
        const nombreCircuito:string = element.name as string
        labels.push(nombreCircuito)
      });
    });

  const labels: string[] = ['F1'];
  let label = "persona"

  const data = {
    labels: labels,
    datasets: []
  };

  var grafica = <HTMLCanvasElement> document.getElementById("grafica2");

  const config = {
    type: 'line',
    data: data,
    options: {},
  };


    const myLineChart = new Chart(grafica, config as any);

    this.buclePilotos(myLineChart)
    myLineChart.update();


}

  ngOnInit(): void {
   this.cargarRadar(this.abilityParameter!)
  //  this.crearGraficaDeTodos()
  // this.cargarLineChart()
  // this.cargarPosicionDeGridPosicionFinal()
  // this.cargarPuntosObtenidosvsExperiencia()
  }


}
