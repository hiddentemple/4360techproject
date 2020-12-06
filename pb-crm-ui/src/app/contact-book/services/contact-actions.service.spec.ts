import {TestBed} from '@angular/core/testing';

import {ContactActionsService} from './contact-actions.service';

describe('ContactActionsService', () => {
  let service: ContactActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
