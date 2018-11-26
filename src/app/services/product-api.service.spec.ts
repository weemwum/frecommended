import { TestBed } from '@angular/core/testing';

import { ProductAPIService } from './product-api.service';

describe('ProductAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductAPIService = TestBed.get(ProductAPIService);
    expect(service).toBeTruthy();
  });
});
