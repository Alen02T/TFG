import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http:HttpClient) { }

  getAllTeams(): Observable<any> {
    return this.http.get<any>('https://ergast.com/api/f1/2023/constructors.json').pipe(
      map(response => response?.MRData?.ConstructorTable?.Constructors || [])
    );
  }

}
