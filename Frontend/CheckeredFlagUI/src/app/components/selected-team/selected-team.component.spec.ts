import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTeamComponent } from './selected-team.component';

describe('SelectedTeamComponent', () => {
  let component: SelectedTeamComponent;
  let fixture: ComponentFixture<SelectedTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
