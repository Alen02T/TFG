import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { raceResult } from '../models/raceresult.model';

@Injectable()
export class RaceResultService {
  constructor(private http: HttpClient) {}
  getRaceResultData() : Observable<raceResult[]> {
    return this.http.get<raceResult[]>(environment.API_URL + '/RaceResult');
  }

  getRaceResultById(id : number) : Observable<raceResult>{
    return this.http.get<raceResult>(environment.API_URL + '/RaceResult/'+id);
  }

  getRaceResultByGrandPrix(id : number) : Observable<raceResult[]>{
    return this.http.get<raceResult[]>(environment.API_URL + '/RaceResult/GrandPrix/'+id);
  }

  getRaceResultByDriver(driverId : number) : Observable<raceResult[]>{
    return this.http.get<raceResult[]>(environment.API_URL + '/RaceResult/driver/'+driverId);
  }

  getRaceResultByRound(id : number) : Observable<raceResult[]>{
    return this.http.get<raceResult[]>(environment.API_URL + '/RaceResult/GrandPrix/round/'+id);
  }



}
