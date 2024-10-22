import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stat } from '../models/stat.model';



@Injectable()
export class StatService {
  constructor(private http: HttpClient) {}

  getAllStats() : Observable<Stat[]> {
    return this.http.get<Stat[]>(environment.API_URL + '/Stat');
  }

  getDriverStats(id : number) : Observable<Stat>{
    return this.http.get<Stat>(environment.API_URL + '/Stat/driver/'+id);
  }

  postStatData(body: Stat): Observable<Stat> {
    return this.http.post<Stat>(environment.API_URL + '/Stat/', body);
  }

  deleteStatByDriverId(driverId :number) {
    this.http.delete(environment.API_URL +'/Stat/driver/'+driverId).subscribe(data => {
      console.log(data);
    });
  }

  updateStat(updatedStat: Stat,driverId:number): Observable<Stat> {
    return this.http.put<Stat>(environment.API_URL +'/Stat/driver/'+driverId, updatedStat);
  }


}
