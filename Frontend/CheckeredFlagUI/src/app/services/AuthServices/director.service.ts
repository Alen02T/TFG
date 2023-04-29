import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Director } from 'src/app/models/director.model';

import { environment } from 'src/environments/environment';


@Injectable()
export class DirectorService {
  constructor(private http: HttpClient) {}

  getDirectorData(): Observable<any> {
    return this.http.get(environment.API_URL + '/Directores', {});
  }

  getUserDirectorData(email: string): Observable<Director> {
    return this.http.get<Director>(
      environment.API_URL + '/Directores/GetByEmail/' + email
    );
  }

  modifyDirectorData(datosFormAccount: any, id: number): Observable<Director> {
    return this.http.patch<Director>(
      environment.API_URL + '/Directores/update/' + id,
      datosFormAccount
    );
  }

  postDirectorData<T>(body: any): Observable<HttpResponse<T>> {
    let bodyData = new Director();
    bodyData.name = body.name;
    bodyData.email = body.email;
    bodyData.leagueId=body.leagueId;

    return this.http.post<T>(environment.API_URL + 'Directores', bodyData, {
      observe: 'response',
    });
  }
}
