import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrandPrix } from '../models/grandprix.model';

@Injectable()
export class GrandPrixService {
  constructor(private http: HttpClient) {}
  getGrandPrixData() : Observable<GrandPrix[]> {
    return this.http.get<GrandPrix[]>(environment.API_URL + '/GrandPrix');
  }

  getGrandPrixByRound(roundId : number) : Observable<GrandPrix>{
    return this.http.get<GrandPrix>(environment.API_URL + '/GrandPrix/round/'+roundId);
  }

  getGrandPrixRacesByLeagueIdOrderedByRound(leagueId : number) : Observable<GrandPrix[]>{
    return this.http.get<GrandPrix[]>(environment.API_URL + '/GrandPrix/league/'+leagueId);
  }


}
