import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liga } from '../models/liga.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LigaService {
  constructor(private http: HttpClient) { }

  // Obtener todas las ligas
  getLigas(): Observable<Liga[]> {
    return this.http.get<Liga[]>(environment.API_URL + '/Liga');
  }

  // Obtener una liga por ID
  getLiga(id: number): Observable<Liga> {
    const url = `${environment.API_URL + '/Liga'}/${id}`;
    return this.http.get<Liga>(url);
  }

  getLigaByDirector(id: number): Observable<Liga> {
    return this.http.get<Liga>(environment.API_URL + '/Liga/Director/'+id);
  }

  // Crear una nueva liga
  addLiga(liga: Liga): Observable<Liga> {
    return this.http.post<Liga>(environment.API_URL + '/Liga/', liga);
  }


}
