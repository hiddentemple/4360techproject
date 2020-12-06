import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WebpageFormComponent} from './webpage-form.component';

describe('WebpageFormComponent', () => {
  let component: WebpageFormComponent;
  let fixture: ComponentFixture<WebpageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebpageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
