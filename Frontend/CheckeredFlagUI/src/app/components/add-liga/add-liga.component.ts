import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Director } from 'src/app/models/director.model';
import { Liga } from 'src/app/models/liga.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthServices/auth.service';
import { DirectorService } from 'src/app/services/AuthServices/director.service';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';
import { LigaService } from 'src/app/services/liga.service';

@Component({
  selector: 'app-add-liga',
  templateUrl: './add-liga.component.html',
  styleUrls: ['./add-liga.component.css']
})
export class AddLigaComponent implements OnInit {

  director = new Director();

  // firstFormGroup: FormGroup;
  directorId:number = 0

  user = new User();

  formulario:FormGroup
  liga:Liga = new Liga()
  constructor(private _authService:AuthService,private formBuilder:FormBuilder,
    private _directorService:DirectorService,private _token:TokenHandlerService,private _router:Router,
    private _ligaService:LigaService) {

    this.formulario = this.formBuilder.group({
    })


}

getDirector(){
  this._token
   .getDirector()
   .subscribe((x) => (this.director = x) && this.loadData());
}

loadData() {
  // Saving field values for checking if there are changes
  console.log(this.director)
  if (this.director != null) {
    console.log(this.director)
    this.directorId=this.director.id
    this.crearFormulario()
  }

}




crearFormulario() {
  this.formulario = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(4)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    fechaInicio: [new Date()],
    fechaFin: [new Date()],
    ubicacion: ['', [Validators.required, Validators.minLength(4)]],
    directorId: [this.directorId],
    currentRound: [1],
    circuits: this.formBuilder.array([])
  });
}

submitForm() {
  console.log(this.formulario.value);
  this._ligaService.addLiga(this.formulario.value).subscribe(
    (response) => {
      console.log(response);
      const ligaId = response.id; // Obtener la ID de la liga creada desde la respuesta
      this.director.leagueId =ligaId; // Asignar la ID de la liga al campo leagueId del director
      console.log(ligaId)
      // Actualizar el director con la nueva ID de la liga
      this._directorService.updateDirector(this.directorId, this.director).subscribe(
        (response) => {
          console.log('Director actualizado correctamente', response);
          this._router.navigateByUrl('/admin')
        },
        (error) => {
          console.error('Error al actualizar el director', error);
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );


}

// getLigaByDirectorToUpdate(){
//   this._ligaService.getLigaByDirector(this.director.id).subscribe(apiLiga=>{
//     this.liga=apiLiga
//     this.director.leagueId=this.liga.id
//     this._directorService.updateDirector(this.directorId,this.director).subscribe(
//       response => {
//         // Manejar la respuesta exitosa aquí
//         console.log('Director actualizado correctamente', response);
//       },
//       error => {
//         // Manejar el error aquí
//         console.error('Error al actualizar el director', error);
//       }
//     )
//     }
//   )


// }

ngOnInit(): void {
  this.crearFormulario()
    this.getDirector()


}

}
