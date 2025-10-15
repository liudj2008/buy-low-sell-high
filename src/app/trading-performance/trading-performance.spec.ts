import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPerformance } from './trading-performance';

describe('TradingPerformance', () => {
  let component: TradingPerformance;
  let fixture: ComponentFixture<TradingPerformance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradingPerformance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradingPerformance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
