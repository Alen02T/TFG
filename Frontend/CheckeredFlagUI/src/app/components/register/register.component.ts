import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Director } from 'src/app/models/director.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthServices/auth.service';
import { DirectorService } from 'src/app/services/AuthServices/director.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  director = new Director();

  // firstFormGroup: FormGroup;

  user = new User();
  userLogin:User = new User()
  formulario:FormGroup

  constructor(private _authService:AuthService,private formBuilder:FormBuilder,
    private _directorService:DirectorService,private _router:Router) {

    this.formulario = this.formBuilder.group({
    })


}

crearFormulario(){
  this.formulario = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

}





register(user: User) {

  this._authService.register(user).subscribe(
    () => {
      let director = new Director();
      director.email = user.email;
      director.name = user.name;
      director.leagueId = 0;
      this._directorService.postDirectorData(director).subscribe(() => {
        this._router.navigateByUrl('/addLiga');
      });
    },
    (error) => {
      // Error durante el registro
      console.error(error);
      // Mostrar mensaje de error al usuario
      // ...
    }
  );


}







ngOnInit() {
  this.crearFormulario();
}
}
