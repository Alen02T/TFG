import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQualyComponent } from './create-qualy.component';

describe('CreateQualyComponent', () => {
  let component: CreateQualyComponent;
  let fixture: ComponentFixture<CreateQualyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQualyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQualyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
