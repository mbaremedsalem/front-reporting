import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceDetailleMensuelComponent } from './balance-detaille-mensuel.component';

describe('BalanceDetailleMensuelComponent', () => {
  let component: BalanceDetailleMensuelComponent;
  let fixture: ComponentFixture<BalanceDetailleMensuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceDetailleMensuelComponent]
    });
    fixture = TestBed.createComponent(BalanceDetailleMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
