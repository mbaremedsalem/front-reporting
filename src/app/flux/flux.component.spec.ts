import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxComponent } from './flux.component';

describe('FluxComponent', () => {
  let component: FluxComponent;
  let fixture: ComponentFixture<FluxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FluxComponent]
    });
    fixture = TestBed.createComponent(FluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
