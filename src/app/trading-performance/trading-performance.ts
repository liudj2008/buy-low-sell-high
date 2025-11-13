import { Component, OnInit } from '@angular/core';
import { HistoryResponse, PriceRecord, PlotlyData } from '../models';
import { InvestingService } from '../service/investing.service';
import { Observable } from 'rxjs';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Initialize Plotly globally
(window as any).Plotly = PlotlyJS;

@Component({
  standalone: true,
  selector: 'app-trading-performance',
  imports: [
    CommonModule,
    PlotlyModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './trading-performance.html',
  styleUrl: './trading-performance.scss',
})
export class TradingPerformance {
  tradingHistory$?: Observable<HistoryResponse> | null;

  historyRecord?: PriceRecord;
  buyRecord?: PriceRecord;
  sellRecord?: PriceRecord;
  plotlyData?: PlotlyData;

  // --- Dropdown Options ---
  periodOptions = ['1mo', '3mo', '6mo', 'ytd', '1y', '3y', '5y'];
  queueSizeOptions = ['1', '2', '3', '4', '5', 'MAX'];
  gainThresholdOptions = [1, 2, 5, 10];

  // --- Selected Values ---
  stock = 'AVGO';
  period = '1y';
  gainThreshold = 5;
  queueSize = '4';

  queues: any[] = [];
  totalGain: number[] = [];

  graph?: any;
  showGraphSection = false;
  showGraph = false;

  displayedColumns = ['buyDate', 'sellDate', 'holdingDays', 'gainPct'];

  constructor(private _investingService: InvestingService) {}

  click() {
    this.showGraphSection = true;
    this.showGraph = false;
    const modifiedQueueSize = this.queueSize === 'MAX' ? 1000 : Number(this.queueSize);

    this._investingService
      .getHistoryPerformance(this.stock, this.period, this.gainThreshold, modifiedQueueSize)
      .subscribe((response) => {
        console.log(response.trading_queue_compound_gain);
        console.log(response.trading_queue);
        this.historyRecord = response.data;
        this.buyRecord = response.buy_points;
        this.sellRecord = response.sell_points;
        this.totalGain = response.trading_queue_compound_gain;
        this.showGraph = true;

        this.queues = response.trading_queue.map((queue, idx) => ({
          id: idx + 1,
          totalGain: this.totalGain[idx],
          trades: queue.map((trade) => ({
            buyDate: trade[0],
            sellDate: trade[1],
            holdingDays: trade[2],
            gainPct: trade[3],
          })),
        }));

        this.graph = {
          data: [
            {
              x: this.historyRecord?.Date,
              y: this.historyRecord?.Open,
              type: 'line',
              name: 'Stock Price',
            },
            // Buy Points
            {
              x: this.buyRecord?.Date,
              y: this.buyRecord?.Open,
              mode: 'markers',
              name: 'Buy',
              marker: {
                color: 'blue',
                size: 12,
                symbol: 'arrow-up',
              },
            },

            // Sell Points
            {
              x: this.sellRecord?.Date,
              y: this.sellRecord?.Open,
              mode: 'markers',
              name: 'Sell',
              marker: {
                color: 'red',
                size: 12,
                symbol: 'arrow-down',
              },
            },
          ],
          layout: {
            title: { text: `${this.stock} Price with Buy and Sell Signals`, x: 0.5 },
            legend: {
              orientation: 'h',
              yanchor: 'top',
              y: 0.2, // move below the chart
              xanchor: 'center',
              x: 0.9,
              font: { size: 12 },
            },
            xaxis: { title: 'Date', showgrid: true, zeroline: false },
            yaxis: { title: 'Price', showgrid: true, zeroline: false },
          },
        };
      });
  }
}
