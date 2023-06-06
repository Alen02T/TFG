import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Driver } from 'src/app/models/driver.model';
import { raceResult } from 'src/app/models/raceresult.model';
import { DriverService } from 'src/app/services/driver.service';
import { RaceService } from 'src/app/services/race.service';
import { RaceResultService } from 'src/app/services/raceresult.service';
import { ResultService } from 'src/app/services/result.service';
import 'chartjs-plugin-labels';
import { StatService } from 'src/app/services/stat.service';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { Director } from 'src/app/models/director.model';
import { Stat } from 'src/app/models/stat.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.css']
})
export class AdminChartsComponent implements OnInit {

  lineChart: Chart | undefined;
  barChart: Chart | undefined;
  pieChart: Chart | undefined;
  areaChart:Chart | undefined

  customizedChart:Chart | undefined

  stat:Stat = new Stat()

  raceResults:raceResult[]=[];
  drivers:Driver[] =[]

  driver:Driver = new Driver()
  director:Director = new Director()
  constructor(private _raceResultService:RaceResultService,
    private _raceService:RaceService,
    private _driverService:DriverService,
    private _resultService:ResultService,
    private _statService:StatService,
    private _token:TokenHandlerService){

  }


  createAreaChart():void{
    const areaCanvas = <HTMLCanvasElement>document.getElementById('area-chart');

    this.areaChart != new Chart(areaCanvas, {
      type: 'pie',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Sales',
            data: [120, 150, 180, 130, 200, 160],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,

          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }


  createLineChart(): void {
    const lineCanvas = <HTMLCanvasElement>document.getElementById('line-chart');
    this.lineChart = new Chart(lineCanvas, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Sales',
            data: [120, 150, 180, 130, 200, 160],
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  createPieChart(leagueId:number): void {
    const graph: any = document.querySelector("#pie-chart");

    const arrayPuntos: number[] = [];
    const nombreArray: string[] = [];
    const colorAleatorios:string[]=[]

    this._driverService.getDriversByLeagueId(leagueId).subscribe(apiDrivers => {
      this.drivers = apiDrivers;

      // Crear un array de observables para las solicitudes de estadísticas
      const observables = this.drivers.map(driver =>
        this._statService.getDriverStats(driver.driverId)
      );

      // Combinar las solicitudes usando forkJoin
      forkJoin(observables).subscribe((apiDatos: any[]) => {
        apiDatos.forEach(stat => {
          arrayPuntos.push(stat.points);
        });

        this.drivers.forEach(driver => {
          nombreArray.push(driver.name);
          colorAleatorios.push(this.generarColorAleatorio())
        });

        console.log(arrayPuntos);
        console.log(nombreArray);

        const data = {
          labels: nombreArray,
          datasets: [{
            label: "Puntos",
            data: arrayPuntos,
            backgroundColor: colorAleatorios
          }]
        };


        const config: any = {
          type: 'pie',
          data: data,
        };

        new Chart(graph, config);
      });
    });
  }


  createPieChartWins(leagueId:number): void {
    const graph: any = document.querySelector("#pie-chart-wins");

    const arrayPuntos: number[] = [];
    const nombreArray: string[] = [];
    const colorAleatorios:string[]=[]

    this._driverService.getDriversByLeagueId(leagueId).subscribe(apiDrivers => {
      this.drivers = apiDrivers;

      // Crear un array de observables para las solicitudes de estadísticas
      const observables = this.drivers.map(driver =>
        this._statService.getDriverStats(driver.driverId)
      );

      // Combinar las solicitudes usando forkJoin
      forkJoin(observables).subscribe((apiDatos: any[]) => {
        apiDatos.forEach(stat => {
          arrayPuntos.push(stat.wins);
        });

        this.drivers.forEach(driver => {
          nombreArray.push(driver.name);
          colorAleatorios.push(this.generarColorAleatorio())
        });

        console.log(arrayPuntos);
        console.log(nombreArray);

        const data = {
          labels: nombreArray,
          datasets: [{
            label: "Puntos",
            data: arrayPuntos,
            backgroundColor: colorAleatorios
          }]
        };


        const config: any = {
          type: 'doughnut',
          data: data,
        };

        new Chart(graph, config);
      });
    });
  }

  generarColorAleatorio(): string {
    const letrasHex = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letrasHex[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  //Se añade un dataset
  addDataSet(myLineChart:Chart,driverName:string,driverId:number){

    const puntosSumadosPiloto:number[]=[0];
    const puntosPiloto:number[] = [0];
    let sumaPiloto=0

    this._raceResultService.getRaceResultByDriver(driverId).subscribe((x) => {

      x.forEach((element) => {
        puntosPiloto.push(element.resultPoints);
      });
      //Se suman todos los puntos
      for (let i = 1; i < puntosPiloto.length; i++){
        sumaPiloto+=puntosPiloto[i]
        puntosSumadosPiloto.push(sumaPiloto)
      }

      let color = this.generarColorAleatorio()


    const newDataset={
      label:driverName,
      data:puntosSumadosPiloto,
      borderColor: color,
      backgroundColor: color,

    };
      myLineChart.data.datasets.push(newDataset)
      myLineChart.update();
    });
  }



  addData(myLineChart:Chart, label: string, data:number) {
    myLineChart.data.labels!.push(label);
    myLineChart.data.datasets.forEach((dataset) => {
        dataset.data.forEach(()=>{
          dataset.data.push(data);
        })
    });


    myLineChart.update();
  }

  buclePilotos(myLineChart:Chart,id:number){
    this._driverService.getDriversByLeagueId(id).subscribe((x) => {
      x.forEach((element) => {
        this._driverService.getDriverById(element.driverId).subscribe(apiDriver => this.driver=apiDriver);
        let combinado = element.name //+ ' | ' + element.number
        this.addDataSet(myLineChart,combinado!,element.driverId)
      });
    });

  }




crearGraficaDeTodos(leagueId:number){
    const image = new Image();
    image.src = '/assets/img/F1.svg';

    this._raceService.getRacesByLeagueId(leagueId).subscribe((x) => {

      x.forEach((element:any) => {
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

    this.buclePilotos(myLineChart,leagueId)
    myLineChart.update();


}

getDirector(){
  this._token
   .getDirector()
   .subscribe((x) => (this.director = x) && this.loadData());
}

loadData(){
  if(this.director!=null){
    this.createPieChartWins(this.director.leagueId)
    this.crearGraficaDeTodos(this.director.leagueId)
    this.crearBarChart(this.director.leagueId)
    this.crearBarChartMoney(this.director.leagueId)
    this.createPieChart(this.director.leagueId)
  }
}

  ngOnInit(): void {
    this.getDirector()
  }

  createChart() {
    const myChart = <HTMLCanvasElement>document.getElementById('myChart');

    const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];
    const data = [10, 20, 15, 25, 18];

    const options = {
      plugins: {
        labels: {
          render: 'image',
          images: [
            { src: 'taiwan.png', width: 32, height: 22 },
            { src: 'japan.png', width: 32, height: 22 },
            { src: 'usa.png', width: 32, height: 22 }
          ]
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Eje X'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Eje Y'
          }
        }
      }
    };

    const dataConfig = {
      labels: labels,
      datasets: [
        {
          label: 'Dataset',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };

    this.customizedChart = new Chart(myChart, {
      type: 'line',
      data: dataConfig,
      // options: options
    });
  }


//Crear barra graficos | Para los pilotos
// createBarChart(): void {
//   const barCanvas = <HTMLCanvasElement>document.getElementById('bar-chart');
//   this.barChart = new Chart(barCanvas, {
//     type: 'bar',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [
//         {
//           label: '# of Votes',
//           data: [12, 19, 3, 5, 2, 3],
//           backgroundColor: 'rgba(255, 99, 132, 0.5)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1
//         }
//       ]
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });
// }



crearBarChart(idLeague:number) {
  const graph: any = document.querySelector("#bar-chart");

  const arrayPuntos: number[] = [];
  const nombreArray: string[] = [];

  this._driverService.getDriversByLeagueId(idLeague).subscribe(apiDrivers => {
    this.drivers = apiDrivers;

    // Crear un array de observables para las solicitudes de estadísticas
    const observables = this.drivers.map(driver =>
      this._statService.getDriverStats(driver.driverId)
    );

    // Combinar las solicitudes usando forkJoin
    forkJoin(observables).subscribe((apiDatos: any[]) => {
      apiDatos.forEach(stat => {
        arrayPuntos.push(stat.points);
      });

      this.drivers.forEach(driver => {
        nombreArray.push(driver.name);
      });

      console.log(arrayPuntos);
      console.log(nombreArray);

      const data = {
        labels: nombreArray,
        datasets: [{
          label: "Puntos",
          data: arrayPuntos,
          backgroundColor: this.generarColorAleatorio()
        }]
      };

      const config: any = {
        type: 'bar',
        data: data,
      };

      new Chart(graph, config);
    });
  });
}


crearBarChartMoney(idLeague:number) {
  const graph: any = document.querySelector("#bar-chart-money");

  const arrayDinero: number[] = [];
  const nombreArray: string[] = [];

  this._driverService.getDriversOrderedByMoney(idLeague).subscribe(apiDrivers => {
    this.drivers = apiDrivers;




      this.drivers.forEach(driver => {

        nombreArray.push(driver.name);
        arrayDinero.push(driver.currentPrice)
      });

      console.log(arrayDinero);
      console.log(nombreArray);

      const data = {
        labels: nombreArray,
        datasets: [{
          label: "Precio",
          data: arrayDinero,
          backgroundColor: 'rgba(9, 222, 32, 0.2)'
        }]
      };

      const config: any = {
        type: 'bar',
        data: data,
      };

      new Chart(graph, config);

  });
}









}
