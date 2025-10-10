import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, SUBDOMAIN } from '../constants';
import { Observable } from 'rxjs';
import { buyInput, sellInput, subscribeInput } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InvestingService {
  constructor(private _http: HttpClient) { }

  subscribe(email: string, symbol: string) {
    const body: subscribeInput = { email: email, symbol: symbol };
    return this._http.post(`${API_BASE_URL}${SUBDOMAIN.SUBSCRIBE}`, body);
  }

  getStockPrice(stock: string) {
    return this._http.get(`${API_BASE_URL}${SUBDOMAIN.GET}${stock}`);
  }

  buyStock(stock: string, principle: number, price: number, date: string) {
    const body: buyInput = { stock: stock, principle: principle, price: price, date: date };
    return this._http.post(`${API_BASE_URL}${SUBDOMAIN.BUY}`, body);
  }

  sellStock(stock: string, price: number, date: string) {
    const body: sellInput = { stock: stock, price: price, date: date };
    return this._http.post(`${API_BASE_URL}${SUBDOMAIN.SELL}`, body);
  }  
}
