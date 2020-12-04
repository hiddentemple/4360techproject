import { TestBed } from '@angular/core/testing';

import { InvoicePageService } from './invoice-page.service';

describe('InvoicePageService', () => {
  let service: InvoicePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
