import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelectedDriverComponent } from './admin-selected-driver.component';

describe('AdminSelectedDriverComponent', () => {
  let component: AdminSelectedDriverComponent;
  let fixture: ComponentFixture<AdminSelectedDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSelectedDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSelectedDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
