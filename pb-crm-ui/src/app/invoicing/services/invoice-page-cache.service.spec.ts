import { TestBed } from '@angular/core/testing';

import { InvoicePageCacheService } from './invoice-page-cache.service';

describe('InvoicePageCacheService', () => {
  let service: InvoicePageCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicePageCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
