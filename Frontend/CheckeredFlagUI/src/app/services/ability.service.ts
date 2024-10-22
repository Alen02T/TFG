import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ability } from '../models/ability.model';


@Injectable()
export class AbilityService {
  constructor(private http: HttpClient) {}

  getAllAbilities() : Observable<Ability[]> {
    return this.http.get<Ability[]>(environment.API_URL + '/Ability');
  }

  getDriverAbility(id : number) : Observable<Ability>{
    return this.http.get<Ability>(environment.API_URL + '/Ability/driver/'+id);
  }

  postAbilityData(body: Ability): Observable<Ability> {
    return this.http.post<Ability>(environment.API_URL + '/Ability/', body);
  }


  deleteAbilityByDriverId(driverId :number) {
    this.http.delete(environment.API_URL +'/Ability/driver/'+driverId).subscribe(data => {
      console.log(data);
    });
  }

  updateAbility(updatedAbility: Ability,driverId:number): Observable<Ability> {
    return this.http.put<Ability>(environment.API_URL +'/Ability/driver/'+driverId, updatedAbility);
  }

  // postAbilityData(body: any, driverId: number): Observable<Ability> {
  //   let bodyData = new Ability(body,driverId);
  //   return this.http.post<Ability>(environment.API_URL + '/Drivers', bodyData).pipe(
  //     catchError((error) => {
  //       console.error('error caught in component', error);
  //       return of(null);
  //     })
  //   );
  // }

}
