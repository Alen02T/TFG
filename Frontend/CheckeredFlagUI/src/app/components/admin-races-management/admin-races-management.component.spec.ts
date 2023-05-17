import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRacesManagementComponent } from './admin-races-management.component';

describe('AdminRacesManagementComponent', () => {
  let component: AdminRacesManagementComponent;
  let fixture: ComponentFixture<AdminRacesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRacesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRacesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
