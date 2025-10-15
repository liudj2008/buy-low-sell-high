import { Component, OnInit } from '@angular/core';
import { HistoryResponse, PriceRecord, PlotlyData } from '../models';
import { InvestingService } from '../service/investing.service';
import { Observable } from 'rxjs';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { CommonModule } from '@angular/common';

// Initialize Plotly globally
(window as any).Plotly = PlotlyJS;

@Component({
  standalone: true,
  selector: 'app-trading-performance',
  imports: [CommonModule, PlotlyModule],
  templateUrl: './trading-performance.html',
  styleUrl: './trading-performance.scss'
})
export class TradingPerformance implements OnInit {
  tradingHistory$?: Observable<HistoryResponse> | null;
  stock = 'AVGO'
  period = '1y'
  gainThreshold = 5
  queueLimit = 4
  historyRecord?: PriceRecord;
  buyRecord?: PriceRecord;
  sellRecord?: PriceRecord;
  plotlyData?: PlotlyData;

  graph?: any;


  constructor(private _investingService: InvestingService) {}

  ngOnInit(): void {
    this.tradingHistory$ = this._investingService.getHistoryPerformance(this.stock, this.period, this.gainThreshold, this.queueLimit)
  }

  click() {
    this.tradingHistory$?.subscribe(
      (response) => {
        this.historyRecord = response.data;
        this.buyRecord = response.buy_points;
        this.sellRecord = response.sell_points;

        this.graph = {
    data: [
          {
            x: this.historyRecord?.Date,
            y: this.historyRecord?.Open,
            type: 'line',
          },
          {
            x: this.buyRecord?.Date,
            y: this.buyRecord?.Open,
            mode: 'markers',
            name: 'Buy',
            marker: {
              color: 'blue',
              size: 12,
              symbol: 'arrow-bar-up'  // or 'arrow-bar-up'
            }
          },
          {
            x: this.sellRecord?.Date,
            y: this.sellRecord?.Open,
            mode: 'markers',
            name: 'Sell',
            marker: {
              color: 'red',
              size: 12,
              symbol: 'arrow-bar-down' // Other good ones: 'triangle-up', 'arrow-up'
            }
          }  
        ],
    layout: {
        title: 'Stock Price with Buy Signals',
        showlegend: true,
        xaxis: { title: 'Date' },
        yaxis: { title: 'Price' }
    }
  }
      }
    );
  }

}
