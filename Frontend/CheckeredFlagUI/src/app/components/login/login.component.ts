import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    '/assets/img/alonso.png',
    '/assets/img/checkeredFlag.png'
  ];
  currentImageIndex = 0;

  user = new User();

  constructor(private authService: AuthService,private router:Router,private _cookieService:CookieHandlerService) {}


  register(user: User) {
    this.authService.register(user).subscribe(() => {
      // window.location.reload();
      // this.router.navigateByUrl('/login');
    });
  }


  login(user: User) {
    this.authService.login(user).subscribe((token: string) => {
      //localStorage.setItem('authToken', token);
      this._cookieService.setCookie(token);
      this.router.navigateByUrl('/admin');
    });
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
