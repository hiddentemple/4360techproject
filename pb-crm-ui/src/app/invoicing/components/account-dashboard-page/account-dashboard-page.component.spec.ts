import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDashboardPageComponent } from './account-dashboard-page.component';

describe('AccountDashboardPageComponent', () => {
  let component: AccountDashboardPageComponent;
  let fixture: ComponentFixture<AccountDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDashboardPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
