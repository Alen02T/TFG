import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // click(){
  //   document.getElementById('.slide-nav')?.addEventListener('click', (e: Event) => {
  //     e.preventDefault();
  //     // Obtener la diapositiva actual
  //     const current: number | undefined = document.getElementById('.flex--active')?.dataset.slide
  //       ? parseInt(document.getElementById('.flex--active')!.dataset.slide!, 10)
  //       : undefined;
  //     // Obtener el número de diapositiva del botón
  //     const next: number | undefined = this.dataset.slide
  //       ? parseInt(this.dataset.slide, 10)
  //       : undefined;

  //     document.getElementById('.slide-nav')?.classList.remove('active');
  //     this.classList.add('active');

  //     if (current === next) {
  //       return false;
  //     } else {
  //       document
  //         .getElementById('.slider__warpper')
  //         ?.querySelector(`.flex__container[data-slide="${next}"]`)
  //         ?.classList.add('flex--preStart');
  //       document.getElementById('.flex--active')?.classList.add('animate--end');

  //       setTimeout(() => {
  //         document
  //           .getElementById('.flex--preStart')
  //           ?.classList.remove('animate--start', 'flex--preStart')
  //           ?.classList.add('flex--active');
  //         document
  //           .getElementById('.animate--end')
  //           ?.classList.add('animate--start')
  //           ?.classList.remove('animate--end', 'flex--active');
  //       }, 800);
  //     }
  //   });

  // }



}
