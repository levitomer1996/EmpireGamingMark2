import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSideNavComponent } from './cart-side-nav.component';

describe('CartSideNavComponent', () => {
  let component: CartSideNavComponent;
  let fixture: ComponentFixture<CartSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
