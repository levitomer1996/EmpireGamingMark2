import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingProdcutHolderComponent } from './shopping-prodcut-holder.component';

describe('ShoppingProdcutHolderComponent', () => {
  let component: ShoppingProdcutHolderComponent;
  let fixture: ComponentFixture<ShoppingProdcutHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingProdcutHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingProdcutHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
