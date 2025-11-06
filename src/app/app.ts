import { Component } from '@angular/core';
import { SubscriptionComponent } from "./subscription/subscription";
import { TradingPerformance } from "./trading-performance/trading-performance";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [TradingPerformance]
})
export class App {
  title = 'buy-low-sell-high';
}
