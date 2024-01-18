import { TestBed } from '@angular/core/testing';

import { BalanceGeneralService } from './balance-general.service';

describe('BalanceGeneralService', () => {
  let service: BalanceGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
