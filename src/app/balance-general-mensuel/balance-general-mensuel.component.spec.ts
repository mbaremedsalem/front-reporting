import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceGeneralMensuelComponent } from './balance-general-mensuel.component';

describe('BalanceGeneralMensuelComponent', () => {
  let component: BalanceGeneralMensuelComponent;
  let fixture: ComponentFixture<BalanceGeneralMensuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceGeneralMensuelComponent]
    });
    fixture = TestBed.createComponent(BalanceGeneralMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
