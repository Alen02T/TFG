import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCircuitComponent } from './selected-circuit.component';

describe('SelectedCircuitComponent', () => {
  let component: SelectedCircuitComponent;
  let fixture: ComponentFixture<SelectedCircuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCircuitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
