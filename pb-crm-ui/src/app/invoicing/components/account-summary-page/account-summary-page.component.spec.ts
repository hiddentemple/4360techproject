import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSummaryPageComponent } from './account-summary-page.component';

describe('AccountSummaryPageComponent', () => {
  let component: AccountSummaryPageComponent;
  let fixture: ComponentFixture<AccountSummaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSummaryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
