import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedTeamPage } from './selected-team.page';

describe('SelectedTeamPage', () => {
  let component: SelectedTeamPage;
  let fixture: ComponentFixture<SelectedTeamPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectedTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
