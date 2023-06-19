import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result.model';

@Injectable()
export class ResultService {
  constructor(private http: HttpClient) {}
  getResultData() : Observable<Result[]> {
    return this.http.get<Result[]>(environment.API_URL + '/Results');
  }

  getResultById(id : number) : Observable<Result>{
    return this.http.get<Result>(environment.API_URL + '/Results/'+id);
  }

  getResultOfDriverId(driverId : number) : Observable<Result[]>{
    return this.http.get<Result[]>(environment.API_URL + '/Result/driver/'+driverId);
  }

   getResultsOfRaceByData(id : number) : Observable<Result[]>{
    return this.http.get<Result[]>(environment.API_URL + '/Results/race/'+id);
  }

  getWinnerOfRaceByRaceId(id:number):Observable<Result>{
    return this.http.get<Result>(environment.API_URL + '/Results/winner/race/'+id);
  }


  postResultData(body : any,teamId:number,points:number) : Result {
    let bodyData =new Result();
    bodyData.driverId=body.driverId;
    bodyData.teamId=teamId;
    bodyData.points=points;
    bodyData.position=body.position;
    bodyData.raceId=body.raceId;
    bodyData.grid=body.grid;
    bodyData.fastestLap=body.fastestLap;

    let result =new Result();
    this.http.post<Result>(environment.API_URL + '/Results',bodyData)
    .subscribe(
      (response) => {
        console.log('response received')
        result = response;
      },
      (error) => {
        console.error('error caught in component')
      }
    )
    return result;
  }


  postResultData3(body: Result): Observable<Result> {
    let bodyData = new Result();
    bodyData.driverId = body.driverId;
    bodyData.teamId = body.teamId;
    bodyData.points = body.points;
    bodyData.position = body.position;
    bodyData.raceId = body.raceId;
    bodyData.grid = body.grid;
    bodyData.fastestLap = body.fastestLap;

    return this.http.post<Result>(environment.API_URL + '/Result', bodyData);
  }


  postResultData2(body: Result): Observable<Result> {
    const bodyData = new Result();
    bodyData.driverId = body.driverId;
    bodyData.teamId = body.teamId;
    bodyData.points = body.points;
    bodyData.position = body.position;
    bodyData.raceId = body.raceId;
    bodyData.grid = body.grid;
    bodyData.fastestLap = body.fastestLap;

    return this.http.post<Result>(environment.API_URL + '/Result', bodyData);
  }

  deleteResultsByRaceId(raceId: number): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/Result/race/${raceId}`);
  }
}

