
import React, { useState } from 'react';
import { Wallet, Currency } from '../types';

interface TransferViewProps {
  wallets: Wallet[];
  onTransfer: (from: Currency, to: Currency, fromAmount: number, toAmount: number) => void;
}

const TransferView: React.FC<TransferViewProps> = ({ wallets, onTransfer }) => {
  const [fromCurrency, setFromCurrency] = useState<Currency>(Currency.NGN);
  const [toCurrency, setToCurrency] = useState<Currency>(Currency.USD);
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  
  // Zerah Service Fee: 0.5%
  const ZERAH_FEE_PERCENT = 0.005;

  // Exchange rates relative to USD as the base currency
  const ratesToUSD: Record<Currency, number> = {
    [Currency.USD]: 1,
    [Currency.NGN]: 1450,
    [Currency.GBP]: 0.73,
    [Currency.EUR]: 0.83,
  };

  const rateFrom = ratesToUSD[fromCurrency];
  const rateTo = ratesToUSD[toCurrency];
  const exchangeRate = rateTo / rateFrom;
  
  const numAmount = parseFloat(amount) || 0;
  const feeAmount = numAmount * ZERAH_FEE_PERCENT;
  const netAmount = numAmount - feeAmount;
  const result = (netAmount * exchangeRate).toFixed(2);

  const fromSymbol = wallets.find(w => w.currency === fromCurrency)?.symbol || '';
  const toSymbol = wallets.find(w => w.currency === toCurrency)?.symbol || '';

  const handleConfirm = () => {
    if (!numAmount) return;
    setIsProcessing(true);
    // Simulate a brief processing delay for premium feel
    setTimeout(() => {
      setIsProcessing(false);
      setShowReceipt(true);
    }, 1500);
  };

  const handleFinish = () => {
    onTransfer(fromCurrency, toCurrency, numAmount, parseFloat(result));
  };

  if (showReceipt) {
    return (
      <div className="fixed inset-0 z-[70] bg-[#000000] p-6 flex flex-col items-center justify-center animate-fadeIn">
        {/* Success Popup Notification (Top) */}
        <div className="absolute top-10 left-6 right-6 bg-[#B7CC16] text-[#000000] p-4 rounded-2xl flex items-center gap-3 shadow-[0_0_30px_rgba(183,204,22,0.4)] animate-slideDown">
          <div className="w-8 h-8 bg-[#000000] rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="font-black text-sm uppercase tracking-tight">Transaction Successful</p>
        </div>

        {/* The Receipt Card */}
        <div className="w-full max-w-sm bg-[#121212] rounded-[2.5rem] border border-[#B7CC16]/30 overflow-hidden shadow-2xl relative">
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#000000] rounded-full -translate-y-1/2 border-r border-[#B7CC16]/20"></div>
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#000000] rounded-full -translate-y-1/2 border-l border-[#B7CC16]/20"></div>
          
          <div className="p-8 space-y-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#B7CC16]/10 border border-[#B7CC16]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-[10px] text-[#B7CC16] font-black uppercase tracking-[0.3em]">Transaction Receipt</h3>
              <p className="text-3xl font-black tracking-tighter text-white">+{toSymbol}{result}</p>
              <p className="text-xs text-white/40">{new Date().toLocaleString()}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-dashed border-white/10">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase font-black tracking-widest">Sent Amount</span>
                <span className="text-white font-bold">{fromSymbol}{numAmount.toLocaleString()} {fromCurrency}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase font-black tracking-widest">Service Fee</span>
                <span className="text-white font-bold">{fromSymbol}{feeAmount.toFixed(2)} {fromCurrency}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase font-black tracking-widest">Exchange Rate</span>
                <span className="text-[#B7CC16] font-bold">1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-4 border-t border-white/5">
                <span className="text-white/40 uppercase font-black tracking-widest">Status</span>
                <span className="bg-[#B7CC16]/20 text-[#B7CC16] px-2 py-0.5 rounded text-[10px] font-black">COMPLETED</span>
              </div>
            </div>

            <div className="pt-8 text-center space-y-4">
               <p className="text-[9px] text-white/20 leading-tight">Thank you for choosing Zerah Finance.<br/>Global Freedom, Delivered.</p>
               <div className="text-[8px] font-mono text-white/10 tracking-widest">TXID: ZRH-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleFinish}
          className="mt-12 w-full max-w-sm bg-[#B7CC16] text-[#000000] font-black py-5 rounded-2xl text-xl neon-glow shadow-xl active:scale-[0.98] transition-all"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-black neon-text uppercase tracking-tighter">Exchange</h2>

      <div className="space-y-6">
        <div className="bg-[#121212] rounded-[2.5rem] p-8 border border-[#B7CC16]/20 space-y-6 relative shadow-2xl">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] text-[#B7CC16] font-black uppercase tracking-[0.2em]">Source Wallet</label>
              <span className="text-[10px] text-white/40">Balance: {fromSymbol}{wallets.find(w => w.currency === fromCurrency)?.balance.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4 overflow-hidden">
              <div className="shrink-0 bg-[#1E1E1E] px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                <select 
                  value={fromCurrency} 
                  onChange={(e) => setFromCurrency(e.target.value as Currency)}
                  className="bg-transparent text-xl font-bold outline-none appearance-none cursor-pointer"
                >
                  {Object.values(Currency).map(c => <option key={c} value={c} className="bg-[#000000]">{c}</option>)}
                </select>
                <svg className="w-4 h-4 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <input 
                type="number" 
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-3xl font-black text-right outline-none flex-1 text-white placeholder-white/10 min-w-0"
              />
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#B7CC16] rounded-full border-[6px] border-[#121212] flex items-center justify-center text-[#000000] z-10 shadow-[0_0_15px_rgba(183,204,22,0.6)] animate-pulse">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-3">
            <label className="text-[10px] text-[#B7CC16] font-black uppercase tracking-[0.2em]">Target Wallet</label>
            <div className="flex items-center justify-between gap-4 overflow-hidden">
              <div className="shrink-0 bg-[#1E1E1E] px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                <select 
                  value={toCurrency} 
                  onChange={(e) => setToCurrency(e.target.value as Currency)}
                  className="bg-transparent text-xl font-bold outline-none appearance-none cursor-pointer"
                >
                  {Object.values(Currency).map(c => <option key={c} value={c} className="bg-[#000000]">{c}</option>)}
                </select>
                <svg className="w-4 h-4 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="text-3xl font-black text-white/20 text-right flex-1 min-w-0 truncate">{result}</div>
            </div>
          </div>
        </div>

        {/* Breakdown Section */}
        <div className={`bg-[#121212]/50 rounded-3xl p-6 border border-white/5 space-y-3 transition-all duration-500 ${numAmount > 0 ? 'opacity-100' : 'opacity-40'}`}>
          <div className="flex justify-between items-center text-xs">
            <span className="text-white/40 uppercase font-black tracking-widest">Zerah Fee (0.5%)</span>
            <span className="text-[#B7CC16] font-black">-{fromSymbol}{feeAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-white/40 uppercase font-black tracking-widest">Rate Locked</span>
            <span className="text-white font-bold">1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</span>
          </div>
          <div className="pt-3 border-t border-white/5 flex justify-between items-center">
            <span className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">Asset Delivery</span>
            <span className="text-2xl font-black text-[#B7CC16]">{toSymbol}{result}</span>
          </div>
        </div>

        <button 
          onClick={handleConfirm}
          disabled={!numAmount || numAmount <= 0 || isProcessing}
          className="w-full bg-[#B7CC16] disabled:opacity-20 text-[#000000] font-black py-6 rounded-[2.5rem] text-xl neon-glow shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 overflow-hidden"
        >
          {isProcessing ? (
            <>
              <div className="w-6 h-6 border-4 border-[#000000]/20 border-t-[#000000] rounded-full animate-spin"></div>
              <span>Synchronizing Ledger...</span>
            </>
          ) : (
            'Exchange Assets'
          )}
        </button>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B7CC16] ml-1">Recent Nodes</h3>
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { name: 'Sarah', id: 1 },
            { name: 'Michael', id: 2 },
            { name: 'York Uni', id: 3 },
            { name: 'Netflix', id: 4 },
          ].map(person => (
            <div key={person.id} className="flex flex-col items-center gap-3 min-w-[80px]">
              <div className="w-16 h-16 rounded-2xl bg-[#121212] border border-[#B7CC16]/20 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer hover:border-[#B7CC16] hover:scale-105">
                <img src={`https://picsum.photos/seed/${person.name}/100/100`} alt={person.name} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[10px] text-white/40 font-black uppercase tracking-widest text-center truncate w-full">{person.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransferView;
