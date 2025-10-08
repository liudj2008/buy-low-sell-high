import { TestBed } from '@angular/core/testing';

import { InvestingService } from './investing.service';

describe('Investing', () => {
  let service: InvestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
