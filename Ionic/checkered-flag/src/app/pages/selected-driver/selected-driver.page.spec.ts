import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedDriverPage } from './selected-driver.page';

describe('SelectedDriverPage', () => {
  let component: SelectedDriverPage;
  let fixture: ComponentFixture<SelectedDriverPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectedDriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
