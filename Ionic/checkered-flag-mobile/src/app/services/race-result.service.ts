import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, race } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceResultService {



  constructor(private _http:HttpClient) {

   }

   getLatestRaceResultDriversANDCircuit():Observable<any>{
    return this._http.get<any>("http://ergast.com/api/f1/current/last/results.json").pipe(
      map((response:any)=>{
        let races = response?.MRData?.RaceTable?.Races || [];
        // const resultados: string[] = races.map((race:any)=>race.Results);
        const datosCarrera: any[] = [];
        const drivers : string[] = []

        races.forEach((race: any) => {
          const resultados = race.Results || [];
          const driversCarrera = resultados.map((resultado: any) => resultado.Driver);
          drivers.push(...driversCarrera);
          const circuito = race.Circuit;
          datosCarrera.push({ circuito, drivers: driversCarrera });

        });

        return datosCarrera;
      })
    )
   }
}
