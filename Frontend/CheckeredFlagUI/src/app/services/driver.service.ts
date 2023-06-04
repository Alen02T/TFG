import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Driver } from '../models/driver.model';
import { Team } from '../models/team.model';


@Injectable()
export class DriverService {
  constructor(private http: HttpClient) {}

  getDriverData() : Observable<Driver[]> {
    return this.http.get<Driver[]>(environment.API_URL + '/Drivers');
  }

  getDriverById(id : number) : Observable<Driver>{
    return this.http.get<Driver>(environment.API_URL + '/Drivers/'+id);
  }

  getDriversByEscuderia(id : number) : Observable<Driver[]>{
    return this.http.get<Driver[]>(environment.API_URL + '/Drivers/team/'+id);
  }

  getDriversOrderedByMoney(leagueId:number): Observable<Driver[]>{
    return this.http.get<Driver[]>(environment.API_URL + '/Drivers/price/'+leagueId);
  }

  getDriversByLeagueId(leagueId : number) : Observable<Driver[]>{
    return this.http.get<Driver[]>(environment.API_URL + '/Drivers/league/'+leagueId);
  }

  getWinnerDriverByRaceId(raceId:number):Observable<Driver>{
    return this.http.get<Driver>(environment.API_URL + '/Drivers/winner/race/'+raceId);
  }


  updateDriver(driverId :number , name : string, lastname :string,wins:number,country:string,flag:string,number:number,points:number,podiums:number,imageDriver:string,team:number): Observable<any> {
    let bodyData =new Driver();
    bodyData.driverId=driverId;
    bodyData.name=name;
    bodyData.lastname=lastname;
    // bodyData.wins=wins;
    bodyData.country=country;
    bodyData.flag=flag;
    bodyData.number=number;
    // bodyData.points=points;
    // bodyData.podiums=podiums;
    bodyData.imageDriver=imageDriver;
    bodyData.team=team;
    return this.http.put<any>(environment.API_URL + '/Drivers/'+driverId, bodyData);
  }


  updateDriverBody(driverId: number, bodyData: Driver): Observable<any> {
    return this.http.put<any>(environment.API_URL + '/Drivers/' + driverId, bodyData);
  }


  updateDriverTeam(driverId: number, team: number): Observable<any> {
    return this.http.put<any>(environment.API_URL + '/Drivers/' + driverId + '/team', team);
  }


  deleteDriver(driver :number) {
    this.http.delete(environment.API_URL +'/Drivers/'+driver).subscribe(data => {
      console.log(data);
    });
  }




  // postDriverData(body : any):Observable<Driver> {
  //   let bodyData = new Driver();

  //   bodyData.name=body.name;
  //   bodyData.lastname=body.lastname;
  //   bodyData.age=body.age;
  //   bodyData.imageDriver=body.imageDriver;
  //   bodyData.number=body.number;
  //   bodyData.currentPrice=body.currentPrice;
  //   bodyData.seasonChange=body.seasonChange;
  //   bodyData.seasonStartPrice=body.seasonStartPrice;

  //   bodyData.country=body.country;
  //   bodyData.flag=body.flag;


  //   bodyData.leagueId=body.leagueId;
  //   bodyData.team=body.team;

  //   let result = new Driver();
  //   this.http.post<Driver>(environment.API_URL + '/Drivers', bodyData)
  //     .subscribe(
  //       (response) => {
  //         console.log('response received')
  //         result = response;
  //       },
  //       (error) => {
  //         console.error('error caught in component')
  //       }
  //     )
  //     return this.http.post<Driver>(environment.API_URL + '/Drivers', bodyData);
  // }

  postDriverData(body: Driver): Observable<Driver> {
    let bodyData = new Driver();
    bodyData.name=body.name;
    bodyData.lastname=body.lastname;
    bodyData.age=body.age;
    bodyData.imageDriver=body.imageDriver;
    bodyData.number=body.number;
    bodyData.currentPrice=body.currentPrice;
    bodyData.seasonChange=body.seasonChange;
    bodyData.seasonStartPrice=body.seasonStartPrice;

    bodyData.country=body.country;
    bodyData.flag=body.flag;


    bodyData.leagueId=body.leagueId;
    bodyData.team=body.team;

    return this.http.post<Driver>(environment.API_URL + '/Drivers', bodyData);
  }


}
