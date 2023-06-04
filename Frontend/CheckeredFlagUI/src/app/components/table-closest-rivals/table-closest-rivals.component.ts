import { Component, Input, OnInit } from '@angular/core';
import { Director } from 'src/app/models/director.model';
import { Driver } from 'src/app/models/driver.model';
import { driverInfo } from 'src/app/models/driverinfo.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { DriverService } from 'src/app/services/driver.service';
import { driverInfoService } from 'src/app/services/driverInfo.service';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-table-closest-rivals',
  templateUrl: './table-closest-rivals.component.html',
  styleUrls: ['./table-closest-rivals.component.css']
})
export class TableClosestRivalsComponent implements OnInit {
 @Input() driverId:number| null;

  director:Director = new Director()
  drivers:driverInfo[] = []
  drivers2:driverInfo[] = []
  arrayPilotos:any[]=[]
  arrayPilotosWins:any[]=[]
  arrayPilotosPodios:any[]=[]
 constructor(private _driverService:DriverService,
  private _statService:StatService,private _token:TokenHandlerService,
  private _driverInfoService:driverInfoService) {
  this.driverId=null
 }

 getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

 loadData(){
  if(this.director!=null){
    this._driverInfoService.getdriverInfoDataByLeagueOrderedByPoints(this.director.leagueId).subscribe(apiDatos=>{
      this.drivers=apiDatos
      this.getArrayPoints(this.drivers)
    })

    this._driverInfoService.getdriverInfoDataByLeague(this.director.leagueId).subscribe(apiDatos=>{
      this.drivers2=apiDatos
      this.getArrayWins(this.drivers)
      this.getArrayPodios(this.drivers)
    })

  }

 }


 getArrayPoints(array:driverInfo[]){
    for(let i =0 ;i<array.length;i++){
        if(this.drivers[i].driverId==this.driverId){

        const pilotoAnterior = this.drivers[i-1];
        const pilotoActual = this.drivers[i];
        const pilotoSiguiente = this.drivers[i+1];

        if (pilotoAnterior) {
          this.arrayPilotos.push({ numero: i, driverName: pilotoAnterior.driverName, driverPoints: pilotoAnterior.driverPoints, driverId:pilotoAnterior.driverId });
        }

        this.arrayPilotos.push({ numero: i+1, driverName: pilotoActual.driverName, driverPoints: pilotoActual.driverPoints, driverId:pilotoActual.driverId });

        if (pilotoSiguiente) {
          this.arrayPilotos.push({ numero: i+2, driverName: pilotoSiguiente.driverName, driverPoints: pilotoSiguiente.driverPoints , driverId:pilotoSiguiente.driverId});
        }
        break
      }

    }
 }


 getArrayWins(array:driverInfo[]){

  for(let i =0 ;i<array.length;i++){
      if(this.drivers[i].driverId==this.driverId){

      const pilotoAnterior = this.drivers[i-1];
      const pilotoActual = this.drivers[i];
      const pilotoSiguiente = this.drivers[i+1];


      if (pilotoAnterior) {
        this.arrayPilotosWins.push({ numero: i, driverName: pilotoAnterior.driverName, driverWins: pilotoAnterior.driverWins, driverId:pilotoAnterior.driverId });
      }

      this.arrayPilotosWins.push({ numero: i+1, driverName: pilotoActual.driverName, driverWins: pilotoActual.driverWins, driverId:pilotoActual.driverId });

      if (pilotoSiguiente) {
        this.arrayPilotosWins.push({ numero: i+2, driverName: pilotoSiguiente.driverName, driverWins: pilotoSiguiente.driverWins , driverId:pilotoSiguiente.driverId});
      }
      break
    }


  }
  this.arrayPilotosWins.sort((a, b) => b.wins - a.wins);
}

getArrayPodios(array:driverInfo[]){

  for(let i =0 ;i<array.length;i++){
      if(this.drivers[i].driverId==this.driverId){

      const pilotoAnterior = this.drivers[i-1];
      const pilotoActual = this.drivers[i];
      const pilotoSiguiente = this.drivers[i+1];


      if (pilotoAnterior) {
        this.arrayPilotosPodios.push({ numero: i, driverName: pilotoAnterior.driverName, driverPodiums: pilotoAnterior.driverPodiums, driverId:pilotoAnterior.driverId });
      }

      this.arrayPilotosPodios.push({ numero: i+1, driverName: pilotoActual.driverName, driverPodiums: pilotoActual.driverPodiums, driverId:pilotoActual.driverId });

      if (pilotoSiguiente) {
        this.arrayPilotosPodios.push({ numero: i+2, driverName: pilotoSiguiente.driverName, driverPodiums: pilotoSiguiente.driverPodiums , driverId:pilotoSiguiente.driverId});
      }
      break
    }


  }
  this.arrayPilotosPodios.sort((a, b) => b.driverPodiums - a.driverPodiums);
}




  ngOnInit(): void {
    this.getDirector()
  }

}
