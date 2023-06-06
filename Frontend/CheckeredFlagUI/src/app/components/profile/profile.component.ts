import { Component, OnInit } from '@angular/core';
import { Circuit } from 'src/app/models/circuit.model';
import { Director } from 'src/app/models/director.model';
import { Liga } from 'src/app/models/liga.model';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { LigaService } from 'src/app/services/liga.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  director:Director=new Director()
  liga:Liga = new Liga()
  circuits:Circuit[] = []
  constructor(private _token:TokenHandlerService,
    private _ligaService:LigaService) { }

  getDirector(){
    this._token
     .getDirector()
     .subscribe((x) => (this.director = x) && this.loadData());
 }

 loadData(){
  if(this.director!=null){
    this._ligaService.getLiga(this.director.leagueId).subscribe(apiDatos=>{
      this.liga=apiDatos
      this.circuits=[...apiDatos.circuits]
    })
  }
 }

 ngOnInit(): void {
  this.getDirector()
  }
}
