export interface buyInput {
    stock: string;
    principle: number;    
    price: number;
    date: string;
}

export interface sellInput {
    stock: string;
    price: number;
    date: string;
}

export interface stockInput {
    stock: string;
}

export interface subscribeInput {
    email: string;
    symbol: string;
}

export enum SYMBOL {
    AAPL = "AAPL",
    MSFT = "MSFT",
    GOOGL = "GOOGL",
    AMZN = "AMZN",
    TSLA = "TSLA",
    META = "META",
    NVDA = "NVDA",
    BRK_A = "BRK_A",
    AVGO = "AVGO"
}

export interface HistoryResponse {
    data: PriceRecord;
    buy_points: PriceRecord;
    sell_points: PriceRecord;
    trading_queue_compound_gain: number[],
    trading_queue: string[][]
}

export interface PriceRecord {
    Date: string[];
    Open: string[];
}

export interface PlotlyData {
    x: string[],
    y: string[],
    type?: string;
    mode?: string;
    name?: string;
    marker?: PlotlyDataMarker
}

export interface PlotlyDataMarker {
    color?: string;
    size?: number;
    symbol: string;
}