import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageTableComponent } from './webpage-table.component';

describe('WebsiteTableComponent', () => {
  let component: WebpageTableComponent;
  let fixture: ComponentFixture<WebpageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebpageTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
