import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeRaceComponent } from './see-race.component';

describe('SeeRaceComponent', () => {
  let component: SeeRaceComponent;
  let fixture: ComponentFixture<SeeRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeRaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
