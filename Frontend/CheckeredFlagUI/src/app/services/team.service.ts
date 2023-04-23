import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team.model';

@Injectable()
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeamData() : Observable<Team[]> {
    return this.http.get<Team[]>(environment.API_URL + '/team');
  }

  getTeamById(id : number) : Observable<Team>{
    return this.http.get<Team>(environment.API_URL + '/team/'+id);
  }

  getTeamsOrdererByPoints() : Observable<Team[]> {
    return this.http.get<Team[]>(environment.API_URL + '/team/points');
  }

  updateTeam(teamId:number,country:string,flag:string,color:string,name:string,director:string,points:number,engine:string,shieldImage:string,vehicleImage:string): Observable<any> {
    let bodyData =new Team();
    bodyData.teamId=teamId;
    bodyData.country=country;
    bodyData.flag=flag;
    bodyData.color=color;
    bodyData.name=name;
    bodyData.director=director;
    bodyData.points=points;
    bodyData.engine=engine;
    bodyData.shieldImage=shieldImage;
    bodyData.vehicleImage=vehicleImage;
    return this.http.put<any>(environment.API_URL + '/Team/'+teamId, bodyData);
  }



}
