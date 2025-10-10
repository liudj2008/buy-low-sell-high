import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubscriptionComponent } from "./subscription/subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, SubscriptionComponent]
})
export class App {
  title = 'buy-low-sell-high';
}
