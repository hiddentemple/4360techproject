import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactHomeSidenavComponent } from './contact-home-sidenav.component';

describe('ContactHomeSidenavComponent', () => {
  let component: ContactHomeSidenavComponent;
  let fixture: ComponentFixture<ContactHomeSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactHomeSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactHomeSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
