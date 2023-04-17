import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ability } from '../models/ability.model';


@Injectable()
export class AbilityService {
  constructor(private http: HttpClient) {}

  getAllAbilities() : Observable<Ability[]> {
    return this.http.get<Ability[]>(environment.API_URL + '/Ability/All');
  }

  getDriverAbility(id : number) : Observable<Ability>{
    return this.http.get<Ability>(environment.API_URL + '/Ability/'+id);
  }

}
