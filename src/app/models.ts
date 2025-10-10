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