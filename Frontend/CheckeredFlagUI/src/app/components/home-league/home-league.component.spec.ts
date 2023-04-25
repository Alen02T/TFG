import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLeagueComponent } from './home-league.component';

describe('HomeLeagueComponent', () => {
  let component: HomeLeagueComponent;
  let fixture: ComponentFixture<HomeLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLeagueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
