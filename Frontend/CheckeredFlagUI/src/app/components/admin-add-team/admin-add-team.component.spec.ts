import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddTeamComponent } from './admin-add-team.component';

describe('AdminAddTeamComponent', () => {
  let component: AdminAddTeamComponent;
  let fixture: ComponentFixture<AdminAddTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
