import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { qualyresult } from '../models/qualyresult.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class QualyResultService {
  constructor(private http: HttpClient) {}
  getQualyResultData() : Observable<qualyresult[]> {
    return this.http.get<qualyresult[]>(environment.API_URL + '/QualyResult');
  }

  getQualyResultById(id : number) : Observable<qualyresult>{
    return this.http.get<qualyresult>(environment.API_URL + '/QualyResult/'+id);
  }

  getQualyResultByGrandPrix(id : number) : Observable<qualyresult[]>{
    return this.http.get<qualyresult[]>(environment.API_URL + '/QualyResult/race/'+id);
  }

  getQualyResultByRoundId(id : number) : Observable<qualyresult[]>{
    return this.http.get<qualyresult[]>(environment.API_URL + '/QualyResult/round/'+id);
  }

}
