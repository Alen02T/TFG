import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthServices/auth.service';
import { CookieHandlerService } from 'src/app/services/AuthServices/cookie-handler.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user = new User();

  constructor(private authService: AuthService,private router:Router,private _cookieService:CookieHandlerService) {}


  register(user: User) {
    this.authService.register(user).subscribe();
  }

  login(user: User) {
    this.authService.login(user).subscribe((token: string) => {
      //localStorage.setItem('authToken', token);
      this._cookieService.setCookie(token);
      this.router.navigateByUrl('/admin');
    });
  }


  ngOnInit(): void {


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

}
