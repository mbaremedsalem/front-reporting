import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceGeneralAnnuelComponent } from './balance-general-annuel.component';

describe('BalanceComponent', () => {
  let component: BalanceGeneralAnnuelComponent;
  let fixture: ComponentFixture<BalanceGeneralAnnuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceGeneralAnnuelComponent]
    });
    fixture = TestBed.createComponent(BalanceGeneralAnnuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
