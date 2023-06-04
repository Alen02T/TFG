import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableClosestRivalsComponent } from './table-closest-rivals.component';

describe('TableClosestRivalsComponent', () => {
  let component: TableClosestRivalsComponent;
  let fixture: ComponentFixture<TableClosestRivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableClosestRivalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableClosestRivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
