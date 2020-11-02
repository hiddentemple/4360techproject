import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCardDeckComponent } from './contact-card-deck.component';

describe('ContactCardDeckComponent', () => {
  let component: ContactCardDeckComponent;
  let fixture: ComponentFixture<ContactCardDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactCardDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCardDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
