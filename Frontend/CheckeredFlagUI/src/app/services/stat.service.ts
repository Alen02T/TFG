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
    return this.http.get<Stat>(environment.API_URL + '/Stat/'+id);
  }

}
