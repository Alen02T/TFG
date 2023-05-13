import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelectedTeamComponent } from './admin-selected-team.component';

describe('AdminSelectedTeamComponent', () => {
  let component: AdminSelectedTeamComponent;
  let fixture: ComponentFixture<AdminSelectedTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSelectedTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSelectedTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
