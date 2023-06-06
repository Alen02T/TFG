import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverStandingsService {



  constructor(private _http:HttpClient) { }

  getStandingsFrom2023():Observable<any>{
    return this._http.get<any>("https://ergast.com/api/f1/2010/driverStandings.json").pipe(
      map((response)=>{
    let listaStandings=response?.MRData?.StandingsTable?.StandingsLists || []
    listaStandings.forEach((element:any) => {
      let resultados = element.DriverStandings || [];
    });
   })


    )}
}
