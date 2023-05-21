import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Qualy } from '../models/qualy.model';




@Injectable()
export class QualyService {
  constructor(private http: HttpClient) {}

  getAllQualys() : Observable<Qualy[]> {
    return this.http.get<Qualy[]>(environment.API_URL + '/Qualy');
  }

  getDriverQualys(id : number) : Observable<Qualy>{
    return this.http.get<Qualy>(environment.API_URL + '/Qualy/'+id);
  }

  getQualysByRace(id : number) : Observable<Qualy[]>{
    return this.http.get<Qualy[]>(environment.API_URL + '/Qualy/races/'+id);
  }

  getSingularQualyByRaceId(id : number) : Observable<Qualy>{
    return this.http.get<Qualy>(environment.API_URL + '/Qualy/race/'+id);
  }

  addQualys(qualys: Qualy[]): Observable<Qualy[]> {
    return this.http.post<Qualy[]>(environment.API_URL_SPECIAL+'Qualys/', qualys);
  }


  // postQualysData(body : any, fecha_tarea : Date,doneTask:boolean,directorId:number): Task {
  //   let bodyData = new Qualy();

  //   // bodyData.titleTask=body.titleTask;
  //   // bodyData.descriptionTask=body.descriptionTask;
  //   // bodyData.driverIdAssigned=body.driverIdAssigned;
  //   // bodyData.category=body.category;
  //   // bodyData.date=fecha_tarea;
  //   // bodyData.done=doneTask;
  //   // bodyData.directorId=directorId;

  //   let result = new Task();
  //   this.http.post<Task>(environment.API_URL + '/Tasks', bodyData)
  //     .subscribe(
  //       (response) => {
  //         console.log('response received')
  //         result = response;
  //       },
  //       (error) => {
  //         console.error('error caught in component')
  //       }
  //     )
  //   return result;
  // }

}
