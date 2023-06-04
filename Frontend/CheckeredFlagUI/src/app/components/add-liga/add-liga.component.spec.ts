import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLigaComponent } from './add-liga.component';

describe('AddLigaComponent', () => {
  let component: AddLigaComponent;
  let fixture: ComponentFixture<AddLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
