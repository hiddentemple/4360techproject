import { TestBed } from '@angular/core/testing';

import { CategoryCacheService } from './category-cache.service';

describe('CategoryCacheService', () => {
  let service: CategoryCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
