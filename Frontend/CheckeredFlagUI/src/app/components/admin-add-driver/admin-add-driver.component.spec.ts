import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddDriverComponent } from './admin-add-driver.component';

describe('AdminAddDriverComponent', () => {
  let component: AdminAddDriverComponent;
  let fixture: ComponentFixture<AdminAddDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
