import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthServices/auth.service';
import { CookieHandlerService } from 'src/app/services/AuthServices/cookie-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  submitted = false;
  loginError = false;
  public errorMessage: string="";
  user = new User();
  formGroup: FormGroup;
  constructor(private authService: AuthService,private fb:FormBuilder,
    private router:Router,private _cookieService:CookieHandlerService) {
      this.formGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        // ...
      });
    }



  // Crea el formulario y añade las validaciones
  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // Obtiene una referencia a los controles para mostrar los mensajes de error
  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  register(user: User) {
    this.authService.register(user).subscribe(() => {
      // window.location.reload();
      // this.router.navigateByUrl('/login');
    });
  }


  login(user: User) {
    this.submitted = true;
    this.authService.login(user).subscribe(
      (token: string) => {
        // El inicio de sesión fue exitoso
        this._cookieService.setCookie(token);
        this.router.navigateByUrl('/home/Inbox');
      },
      (error) => {
        // El inicio de sesión falló, se produjo un error
        this.loginError = true;
      }
    );
  }


   ngOnInit() {

  }



}
