import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { qualyResult } from '../models/qualyResult.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class QualyResultService {
  constructor(private http: HttpClient) {}
  getQualyResultData() : Observable<qualyResult[]> {
    return this.http.get<qualyResult[]>(environment.API_URL + '/QualyResult');
  }

  getQualyResultById(id : number) : Observable<qualyResult>{
    return this.http.get<qualyResult>(environment.API_URL + '/QualyResult/'+id);
  }

  getQualyResultByGrandPrix(id : number) : Observable<qualyResult[]>{
    return this.http.get<qualyResult[]>(environment.API_URL + '/QualyResult/GrandPrix/'+id);
  }


}
