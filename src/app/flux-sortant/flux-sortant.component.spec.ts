import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxSortantComponent } from './flux-sortant.component';

describe('FluxSortantComponent', () => {
  let component: FluxSortantComponent;
  let fixture: ComponentFixture<FluxSortantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FluxSortantComponent]
    });
    fixture = TestBed.createComponent(FluxSortantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
