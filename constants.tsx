
import React from 'react';
import { Currency, Wallet, Transaction, VirtualCard } from './types';

export const COLORS = {
  bg: '#000000',
  neon: '#B7CC16',
  surface: '#121212',
  surfaceLight: '#1E1E1E',
  textSecondary: '#888888',
};

export const INITIAL_WALLETS: Wallet[] = [
  { id: '1', currency: Currency.USD, balance: 12450.50, symbol: '$' },
  { id: '2', currency: Currency.EUR, balance: 3200.00, symbol: '€' },
  { id: '3', currency: Currency.GBP, balance: 850.75, symbol: '£' },
  { id: '4', currency: Currency.NGN, balance: 1250000.00, symbol: '₦' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'incoming', amount: 5000, currency: Currency.USD, description: 'Freelance Payment - Upwork', date: '2023-11-20', status: 'completed' },
  { id: 't2', type: 'outgoing', amount: 15.99, currency: Currency.USD, description: 'Netflix Subscription', date: '2023-11-19', status: 'completed' },
  { id: 't3', type: 'conversion', amount: 1200, currency: Currency.EUR, description: 'USD to EUR Conversion', date: '2023-11-18', status: 'completed' },
  { id: 't4', type: 'outgoing', amount: 450, currency: Currency.GBP, description: 'International Transfer - Tuition', date: '2023-11-15', status: 'completed' },
];

export const INITIAL_CARDS: VirtualCard[] = [
  { id: 'c1', cardNumber: '4582112233445566', expiry: '12/26', cvv: '123', type: 'VISA', isActive: true, currency: Currency.USD, limit: 5000 },
];
