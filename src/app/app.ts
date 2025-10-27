import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubscriptionComponent } from "./subscription/subscription";
import { TradingPerformance } from "./trading-performance/trading-performance";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, TradingPerformance]
})
export class App {
  title = 'buy-low-sell-high';
}
