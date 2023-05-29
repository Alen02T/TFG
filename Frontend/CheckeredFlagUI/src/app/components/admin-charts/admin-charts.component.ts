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

  raceResults:raceResult[]=[];
  drivers:Driver[] =[]

  driver:Driver = new Driver()

  constructor(private _raceResultService:RaceResultService,
    private _raceService:RaceService,
    private _driverService:DriverService,
    private _resultService:ResultService,
    private _statService:StatService){

  }


  createAreaChart():void{
    const areaCanvas = <HTMLCanvasElement>document.getElementById('area-chart');

    this.areaChart != new Chart(areaCanvas, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Sales',
            data: [120, 150, 180, 130, 200, 160],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            fill: 'origin'
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


  createPieChart(): void {
    const pieCanvas = <HTMLCanvasElement>document.getElementById('pie-chart');
    this.pieChart != new Chart(pieCanvas, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            data: [10, 20, 15],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true
      }
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

  buclePilotos(myLineChart:Chart){
    this._driverService.getDriversByLeagueId(2).subscribe((x) => {
      x.forEach((element) => {
        this._driverService.getDriverById(element.driverId).subscribe(apiDriver => this.driver=apiDriver);
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
    this.createAreaChart()
    this.crearGraficaDeTodos()
    // this.createBarChart()
    this.crearBarChartPuntosPilotos()

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
createBarChart(): void {
  const barCanvas = <HTMLCanvasElement>document.getElementById('bar-chart');
  this.barChart = new Chart(barCanvas, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
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



crearBarChartPuntosPilotos(){
  const labels: string[] = ['F1'];
  let label = "persona"

  const data = {
    labels: labels,
    datasets: []
  };

  var grafica = <HTMLCanvasElement> document.getElementById("bar-chart");

  const config = {
    type: 'bar',
    data: data,
    options: {},
  };


    const myLineChart = new Chart(grafica, config as any);

    this.buclePilotos(myLineChart)
    myLineChart.update();
}

}
