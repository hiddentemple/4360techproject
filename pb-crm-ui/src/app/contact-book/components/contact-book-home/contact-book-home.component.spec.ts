import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContactBookHomeComponent} from './contact-book-home.component';

describe('ContactBookHomeComponent', () => {
  let component: ContactBookHomeComponent;
  let fixture: ComponentFixture<ContactBookHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactBookHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactBookHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
