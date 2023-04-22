import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { driverInfo } from '../models/driverinfo.model';


@Injectable()
export class driverInfoService {
  constructor(private http: HttpClient) {}
  getdriverInfoData() : Observable<driverInfo[]> {
    return this.http.get<driverInfo[]>(environment.API_URL + '/DriverInfo');
  }




}
