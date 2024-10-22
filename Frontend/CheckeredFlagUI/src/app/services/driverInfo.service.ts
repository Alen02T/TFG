import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { driverInfo } from '../models/driverinfo.model';


@Injectable()
export class driverInfoService {
  constructor(private http: HttpClient) {}

  getdriverInfoDataByLeague(id : number) : Observable<driverInfo[]> {
    return this.http.get<driverInfo[]>(environment.API_URL + '/DriverInfo/league/'+id);
  }

  getdriverInfoDataByLeagueOrderedByPrice(id : number) : Observable<driverInfo[]> {
    return this.http.get<driverInfo[]>(environment.API_URL + '/DriverInfo/price/'+id);
  }

  getdriverInfoDataByLeagueOrderedByPoints(id : number) : Observable<driverInfo[]> {
    return this.http.get<driverInfo[]>(environment.API_URL + '/DriverInfo/points/'+id);
  }

  getdriverInfoDataByLeagueOrderedByRating(id : number) : Observable<driverInfo[]> {
    return this.http.get<driverInfo[]>(environment.API_URL + '/DriverInfo/rating/'+id);
  }

  getdriverInfoData() : Observable<driverInfo[]> {
    return this.http.get<driverInfo[]>(environment.API_URL + '/DriverInfo');
  }

  getdriverInfoDataByDriverId(leagueId:number,id : number) : Observable<driverInfo> {
    return this.http.get<driverInfo>(environment.API_URL + '/DriverInfo/'+leagueId+'/'+id);
  }


}
