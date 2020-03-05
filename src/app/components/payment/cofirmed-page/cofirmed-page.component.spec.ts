import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CofirmedPageComponent } from './cofirmed-page.component';

describe('CofirmedPageComponent', () => {
  let component: CofirmedPageComponent;
  let fixture: ComponentFixture<CofirmedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CofirmedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofirmedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
