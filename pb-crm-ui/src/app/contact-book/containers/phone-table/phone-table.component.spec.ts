import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PhoneTableComponent} from './phone-table.component';

describe('PhoneTableComponent', () => {
  let component: PhoneTableComponent;
  let fixture: ComponentFixture<PhoneTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
