import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { Director } from 'src/app/models/director.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthServices/auth.service';
import { CookieHandlerService } from 'src/app/services/AuthServices/cookie-handler.service';
import { DirectorService } from 'src/app/services/AuthServices/director.service';
import { TokenHandlerService } from 'src/app/services/AuthServices/token-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  director = new Director();

  // firstFormGroup: FormGroup;
  loginError=false;
  user = new User();
  userLogin:User = new User()
  formulario:FormGroup

  constructor(private _authService:AuthService,private formBuilder:FormBuilder,private _tokenService:TokenHandlerService,private _cookieService:CookieHandlerService,
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

      const loginCredentials = {
        email: user.email,
        password: user.password
      };
      this._directorService.postDirectorData(director).subscribe(() => {
        this._authService.login(user).subscribe(
          (token: string) => {
            // El inicio de sesión fue exitoso
            this._cookieService.setCookie(token);
            this._router.navigateByUrl('/addLiga');
          },
          (error:any) => {
            // El inicio de sesión falló, se produjo un error
            this.loginError = true;
          }
        );

      });
    },
    (error) => {
      // Error durante el registro
      console.error(error);
      this.loginError = true;
      // Mostrar mensaje de error al usuario
      // ...
    }
  );


}







ngOnInit() {
  this.crearFormulario();
}
}
