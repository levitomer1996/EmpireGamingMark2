import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondPaymentComponent } from './second-payment.component';

describe('SecondPaymentComponent', () => {
  let component: SecondPaymentComponent;
  let fixture: ComponentFixture<SecondPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
