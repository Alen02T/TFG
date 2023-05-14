import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRacesComponent } from './admin-add-races.component';

describe('AdminAddRacesComponent', () => {
  let component: AdminAddRacesComponent;
  let fixture: ComponentFixture<AdminAddRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddRacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
