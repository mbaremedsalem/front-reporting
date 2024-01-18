import { TestBed } from '@angular/core/testing';

import { BalancedetailleService } from './balancedetaille.service';

describe('BalancedetailleService', () => {
  let service: BalancedetailleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalancedetailleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
