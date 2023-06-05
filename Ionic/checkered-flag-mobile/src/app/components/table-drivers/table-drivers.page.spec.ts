import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableDriversPage } from './table-drivers.page';

describe('TableDriversPage', () => {
  let component: TableDriversPage;
  let fixture: ComponentFixture<TableDriversPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TableDriversPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
