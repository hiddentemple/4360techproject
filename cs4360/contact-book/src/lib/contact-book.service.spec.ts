import { TestBed } from '@angular/core/testing';

import { ContactBookService } from './contact-book.service';

describe('ContactBookService', () => {
  let service: ContactBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
