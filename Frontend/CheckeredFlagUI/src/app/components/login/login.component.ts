import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthServices/auth.service';
import { CookieHandlerService } from 'src/app/services/AuthServices/cookie-handler.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class LoginComponent implements OnInit {
  @ViewChild('sectionElement') sectionElement!: ElementRef;
  backgroundImages: string[] = [
    '/assets/img/F1-cars.jpg',
    '/assets/img/f1-indian-gp-2013-sebastian-ve.jpg',
    '/assets/img/kimi.jpg',
    '/assets/img/16802477725347.jpg',
    '/assets/img/i.jpg'
  ];
  currentImageIndex = 0;
submitted = false;
loginError = false;

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
        this.router.navigateByUrl('/admin');
      },
      (error) => {
        // El inicio de sesión falló, se produjo un error
        this.loginError = true;
      }
    );
  }

  preloadImages(): Promise<any> {
    const promises: Promise<any>[] = [];
    this.backgroundImages.forEach((imageUrl: string) => {
      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Continuar incluso si hay errores de carga
        img.src = imageUrl;
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  }

  changeBackground(): void {
    this.currentImageIndex++;
    if (this.currentImageIndex === this.backgroundImages.length) {
      this.currentImageIndex = 0;
    }
    this.sectionElement.nativeElement.style.backgroundImage = `url('${this.backgroundImages[this.currentImageIndex]}')`;
  }

  cambiar(){
    const imgs=[];

    imgs[0]='/assets/img/alfaromeo.svg';
    imgs[1]='/assets/img/mclaren.svg'
    imgs[2]='/assets/img/alfatauri.svg'
    imgs[3]='/assets/img/mercedes.svg'
    imgs[4]='/assets/img/redbull.svg'
    imgs[5]='/assets/img/williams.svg'
    imgs[6]='/assets/img/alpine.svg'



    const random = Math.floor(Math.random()*imgs.length)


    let variable = imgs[random];




    //console.log(variable)

    const box = document.getElementById('prueba') as HTMLDivElement | null;




    box?.setAttribute("style","background-image:url("+variable+")");



    window.onload = function(){

      const imgs=[];

      imgs[0]='/assets/img/alfaromeo.svg';
      imgs[1]='/assets/img/mclaren.svg'
      imgs[2]='/assets/img/alfatauri.svg'
      imgs[3]='/assets/img/mercedes.svg'
      imgs[4]='/assets/img/redbull.svg'
      imgs[5]='/assets/img/williams.svg'
      imgs[6]='/assets/img/alpine.svg'



      const random = Math.floor(Math.random()*imgs.length)


      let variable = imgs[random];




      //console.log(variable)

      const box = document.getElementById('prueba') as HTMLDivElement | null;




      box?.setAttribute("style","background-image:url("+variable+")");


    };
  }
  ngOnInit(): void {
    this.preloadImages().then(() => {
      setInterval(() => {
        this.changeBackground();
      }, 5000);
    });
  }

}
