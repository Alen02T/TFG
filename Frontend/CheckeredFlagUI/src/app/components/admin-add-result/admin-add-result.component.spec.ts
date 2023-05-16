import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddResultComponent } from './admin-add-result.component';

describe('AdminAddResultComponent', () => {
  let component: AdminAddResultComponent;
  let fixture: ComponentFixture<AdminAddResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
