import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRadarChartComponent } from './admin-radar-chart.component';

describe('AdminRadarChartComponent', () => {
  let component: AdminRadarChartComponent;
  let fixture: ComponentFixture<AdminRadarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRadarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRadarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
