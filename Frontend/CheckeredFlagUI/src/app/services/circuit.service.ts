import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Circuit } from '../models/circuit.model';

@Injectable()
export class CircuitService {
  constructor(private http: HttpClient) {}
  getCircuitData() : Observable<Circuit[]> {
    return this.http.get<Circuit[]>(environment.API_URL + '/Circuit');
  }

  getCircuitById(id : number) : Observable<Circuit>{
    return this.http.get<Circuit>(environment.API_URL + '/Circuit/'+id);
  }

}
