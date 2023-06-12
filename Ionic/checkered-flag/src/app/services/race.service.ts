import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Race } from '../models/race.model';

@Injectable()
export class RaceService {
  constructor(private http: HttpClient) {}
  getRaceData() : Observable<Race[]> {
    return this.http.get<Race[]>(environment.API_URL + '/Race');
  }

  getRaceById(id : number) : Observable<Race>{
    return this.http.get<Race>(environment.API_URL + '/Race/'+id);
  }

  getRacesByLeagueId(leagueId : number) : Observable<Race[]>{
    return this.http.get<Race[]>(environment.API_URL + '/Race/league/'+leagueId);
  }


  addRace(race: Race): Observable<Race> {
    return this.http.post<Race>(environment.API_URL + '/Race/', race);
  }
}
