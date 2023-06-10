import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 @ViewChild('flexContainer', { static: true }) flexContainerRef!: ElementRef;
  flexContainers!: HTMLCollectionOf<Element>;

  ngOnInit() {
    this.flexContainers = document.getElementsByClassName('flex__container') as HTMLCollectionOf<Element>;
  }

  click(event: Event) {
    event.preventDefault();

    const clickedElement = event.target as HTMLElement;
    const currentActive = document.querySelector('.flex--active');
    const currentActiveSlide = currentActive?.getAttribute('data-slide');
    const nextSlide = clickedElement.getAttribute('data-slide');

    if (currentActiveSlide !== nextSlide) {
      const sliderWrapper = document.querySelector('.slider__warpper');
      const nextSlideElement = sliderWrapper?.querySelector(`.flex__container[data-slide="${nextSlide}"]`);

      if (nextSlideElement && currentActive) {
        const allSlides = sliderWrapper?.querySelectorAll('.flex__container');

        allSlides?.forEach(slide => {
          slide.classList.remove('flex--preStart');
        });

        nextSlideElement.classList.add('flex--preStart');
        nextSlideElement.classList.add('animate--start');

        currentActive.classList.add('animate--end');
        currentActive.classList.remove('flex--active');

        setTimeout(() => {
          nextSlideElement.classList.remove('animate--start', 'flex--preStart');
          nextSlideElement.classList.add('flex--active');
          currentActive.classList.add('animate--start');
          currentActive.classList.remove('animate--end', 'flex--active');
        }, 300);
      }
    }
  }


}
