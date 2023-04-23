import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sponsor } from '../models/sponsor.model';

@Injectable()
export class SponsorService {
  constructor(private http: HttpClient) {}
  getSponsorData() : Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(environment.API_URL + '/Sponsor');
  }

  getSponsorById(id : number) : Observable<Sponsor>{
    return this.http.get<Sponsor>(environment.API_URL + '/Sponsor/'+id);
  }

  getSponsorsByTeam(id : number) : Observable<Sponsor[]>{
    return this.http.get<Sponsor[]>(environment.API_URL + '/Sponsor/team/'+id);
  }

}
