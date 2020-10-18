import { TestBed } from '@angular/core/testing';

import { CategoryFormService } from './category-form.service';

describe('CategoryFormService', () => {
  let service: CategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
