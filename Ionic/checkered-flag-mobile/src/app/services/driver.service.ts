import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http:HttpClient) {


   }
   getAllDrivers(): Observable<any> {
    return this.http.get<any>('https://ergast.com/api/f1/current/drivers.json').pipe(
      map(response => response?.MRData?.DriverTable?.Drivers || [])
    );
  }

}
