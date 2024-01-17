import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceDetailleAnnuelComponent } from './balance-detaille-annuel.component';

describe('BalanceDetailleAnnuelComponent', () => {
  let component: BalanceDetailleAnnuelComponent;
  let fixture: ComponentFixture<BalanceDetailleAnnuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceDetailleAnnuelComponent]
    });
    fixture = TestBed.createComponent(BalanceDetailleAnnuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
