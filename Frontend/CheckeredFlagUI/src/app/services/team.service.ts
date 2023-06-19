import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team.model';

@Injectable()
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeamsByLeagueOrdererByPoints(id : number) : Observable<Team[]> {
    return this.http.get<Team[]>(environment.API_URL + '/Team/points/'+id);
  }

  getTeamData() : Observable<Team[]> {
    return this.http.get<Team[]>(environment.API_URL + '/team');
  }

  getAvailableTeams(id : number) : Observable<Team[]>{
    return this.http.get<Team[]>(environment.API_URL + '/Team/teams-available/league/'+id);
  }

  getTeamById(leagueId:number,id : number) : Observable<Team>{
    return this.http.get<Team>(environment.API_URL + '/team/'+leagueId+'/'+id);
  }

  getTeamsOrdererByPoints() : Observable<Team[]> {
    return this.http.get<Team[]>(environment.API_URL + '/team/points');
  }


  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(environment.API_URL + '/Team/' , team);
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

  updateTeamObject(teamData: Team,teamId:number): Observable<any> {
    return this.http.put<any>(environment.API_URL + '/Team/'+teamId, teamData);
  }

  updateTeamPoints(teamId: number, points: number): Observable<any> {
    const bodyData = points ;
    return this.http.put<any>(`${environment.API_URL}/Team/${teamId}`, bodyData);
  }
  deleteTeamsByLeague(leagueId: number): Observable<any> {

    return this.http.delete<any>(`${environment.API_URL}/Team/league/${leagueId}`);

  }



}
