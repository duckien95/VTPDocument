import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPriceUpdateComponent } from './offer-price-update.component';

describe('OfferPriceUpdateComponent', () => {
  let component: OfferPriceUpdateComponent;
  let fixture: ComponentFixture<OfferPriceUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferPriceUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPriceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
