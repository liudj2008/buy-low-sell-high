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