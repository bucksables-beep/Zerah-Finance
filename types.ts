
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  NGN = 'NGN'
}

export interface Wallet {
  id: string;
  currency: Currency;
  balance: number;
  symbol: string;
}

export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing' | 'conversion';
  amount: number;
  currency: Currency;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  recipientName?: string;
  bankName?: string;
  accountNumber?: string;
  purpose?: string;
  fee?: number;
  exchangeRate?: number;
}

export interface VirtualCard {
  id: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  type: 'VISA' | 'MASTERCARD';
  isActive: boolean;
  currency: Currency;
  limit: number;
}

export interface AppState {
  user: {
    name: string;
    isPremium: boolean;
    businessMode: boolean;
  };
  wallets: Wallet[];
  transactions: Transaction[];
  cards: VirtualCard[];
}
