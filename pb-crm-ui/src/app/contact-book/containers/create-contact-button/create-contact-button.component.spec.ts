import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactButtonComponent } from './create-contact-button.component';

describe('CreateContactButtonComponent', () => {
  let component: CreateContactButtonComponent;
  let fixture: ComponentFixture<CreateContactButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContactButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContactButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
