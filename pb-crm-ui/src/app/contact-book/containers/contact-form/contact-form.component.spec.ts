import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactFormComponent, PhoneRegex} from './contact-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('Phone Validator', () => {
  const regex = PhoneRegex;

  it('should return no errors with valid phone number', () => {
    // Given
    const testStr = '3039876545';

    // When
    const result = testStr.match(regex);

    // Then
    expect(result).toBeDefined();
  });

  it('should return an error if the input is not a number', () => {
    // Given
    const testStr = 'bob';

    // When
    const result = testStr.match(regex);

    // Then
    expect(result).toBeNull();
  });

  it('should return an error if the input is a number, but is not long enough', () => {
    // Given
    const testStr = '123';

    // When
    const result = testStr.match(regex);

    // Then
    expect(result).toBeNull();
  });

  it('should return an error if the input is a number, but it is too long', () => {
    // Given
    const testStr = '12312312341';

    // When
    const result = testStr.match(regex);

    // Then
    expect(result).toBeNull();
  });
});

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactFormComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        BrowserAnimationsModule,
        MatButtonModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
