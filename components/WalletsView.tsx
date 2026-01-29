
import React, { useState } from 'react';
import { Wallet, Currency, Transaction } from '../types';

interface WalletsViewProps {
  wallets: Wallet[];
  transactions: Transaction[];
  onAddFunds: (currency: Currency, amount: number) => void;
}

const WalletsView: React.FC<WalletsViewProps> = ({ wallets, transactions, onAddFunds }) => {
  const [historyWallet, setHistoryWallet] = useState<Wallet | null>(null);
  const [addFundsWallet, setAddFundsWallet] = useState<Wallet | null>(null);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isTopUpLoading, setIsTopUpLoading] = useState(false);

  const handleTopUp = () => {
    if (!addFundsWallet || !topUpAmount) return;
    setIsTopUpLoading(true);
    setTimeout(() => {
      onAddFunds(addFundsWallet.currency, parseFloat(topUpAmount));
      setIsTopUpLoading(false);
      setAddFundsWallet(null);
      setTopUpAmount('');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black neon-text uppercase tracking-tighter">Your Wallets</h2>
        <button className="w-12 h-12 rounded-2xl bg-[#B7CC16] text-[#000000] flex items-center justify-center font-black text-xl neon-glow shadow-lg">+</button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {wallets.map(wallet => (
          <div key={wallet.id} className="bg-[#121212] p-6 rounded-[2.5rem] border border-[#B7CC16]/20 relative overflow-hidden group transition-all hover:border-[#B7CC16]/40 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B7CC16]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[1.5rem] bg-[#B7CC16]/10 border border-[#B7CC16]/20 flex items-center justify-center text-[#B7CC16] font-black text-lg">
                  {wallet.currency}
                </div>
                <div>
                  <h4 className="font-black text-white uppercase tracking-tight">{wallet.currency} Global Asset</h4>
                  <p className="text-[10px] text-[#B7CC16]/60 font-black uppercase tracking-widest">Yield: 4.5% APY</p>
                </div>
              </div>
              <div className="bg-[#B7CC16]/20 text-[#B7CC16] text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">Active</div>
            </div>
            
            <div className="space-y-1">
              <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em]">Available Balance</p>
              <h3 className="text-4xl font-black tracking-tighter neon-text">
                {wallet.symbol}{wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
            </div>

            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => setHistoryWallet(wallet)}
                className="flex-1 py-4 rounded-2xl bg-[#1E1E1E] border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                View History
              </button>
              <button 
                onClick={() => setAddFundsWallet(wallet)}
                className="flex-1 py-4 rounded-2xl bg-[#B7CC16] text-[#000000] text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
              >
                Add Funds
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* History Modal */}
      {historyWallet && (
        <div className="fixed inset-0 z-[100] bg-[#000000] flex flex-col p-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#B7CC16] rounded-xl flex items-center justify-center text-black font-black">{historyWallet.currency}</div>
              <h2 className="text-xl font-black uppercase tracking-tighter">Wallet Activity</h2>
            </div>
            <button onClick={() => setHistoryWallet(null)} className="p-3 bg-white/5 rounded-full text-white/40 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pb-20">
            {transactions.filter(t => t.currency === historyWallet.currency).length > 0 ? (
              transactions.filter(t => t.currency === historyWallet.currency).map(tx => (
                <div key={tx.id} className="bg-[#121212] p-5 rounded-2xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'incoming' ? 'bg-[#B7CC16]/10 text-[#B7CC16]' : 'bg-white/5 text-white/30'}`}>
                      {tx.type === 'incoming' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">{tx.description}</p>
                      <p className="text-[10px] text-white/30 uppercase font-black">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-sm ${tx.type === 'incoming' ? 'text-[#B7CC16]' : 'text-white'}`}>
                      {tx.type === 'incoming' ? '+' : '-'}{tx.amount.toLocaleString()}
                    </p>
                    <p className="text-[8px] text-white/20 uppercase font-black">{tx.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 opacity-20">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <p className="text-sm font-black uppercase tracking-widest">No activity found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Funds Modal */}
      {addFundsWallet && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6 animate-fadeIn backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#121212] rounded-[3rem] border border-[#B7CC16]/30 p-8 space-y-8 shadow-[0_0_50px_rgba(183,204,22,0.15)]">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 bg-[#B7CC16]/10 border border-[#B7CC16]/30 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <svg className="w-10 h-10 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </div>
              <h3 className="text-[10px] text-[#B7CC16] font-black uppercase tracking-[0.4em]">Asset Infusion</h3>
              <p className="text-3xl font-black text-white tracking-tighter uppercase">{addFundsWallet.currency} Wallet</p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Global Direct Deposit</p>
            </div>

            <div className="space-y-4">
              <div className="bg-black/40 border border-[#B7CC16]/10 rounded-[2rem] px-6 py-6 flex items-center gap-3 overflow-hidden">
                <span className="text-3xl font-black text-[#B7CC16] shrink-0">{addFundsWallet.symbol}</span>
                <input 
                  type="number" 
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-4xl font-black text-right outline-none flex-1 text-white placeholder-white/5 min-w-0"
                  autoFocus
                />
              </div>

              <div className="p-5 bg-white/5 rounded-2xl space-y-3 border border-white/5">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="text-white/40">Transmission Fee</span>
                  <span className="text-[#B7CC16]">WAIVED (FREE)</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="text-white/40">Protocol</span>
                  <span className="text-white">Zerah Direct Node</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button 
                onClick={handleTopUp}
                disabled={!topUpAmount || isTopUpLoading}
                className="w-full bg-[#B7CC16] disabled:opacity-20 text-black font-black py-5 rounded-[2rem] text-xl neon-glow transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                {isTopUpLoading ? (
                  <>
                    <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
                    <span>Settling Ledger...</span>
                  </>
                ) : (
                  'Authorize Deposit'
                )}
              </button>
              <button 
                onClick={() => setAddFundsWallet(null)}
                className="w-full bg-transparent text-white/30 py-4 font-black uppercase tracking-widest text-[10px]"
              >
                Abort
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-8 rounded-[2.5rem] bg-gradient-to-br from-[#121212] to-[#000000] border border-[#B7CC16]/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-[#B7CC16]/5 rounded-full blur-2xl"></div>
        <h3 className="text-xl font-black neon-text uppercase tracking-tighter mb-4">Why Zerah Wallets?</h3>
        <ul className="space-y-4">
          <li className="flex gap-4 text-sm text-white/60 font-medium leading-relaxed">
            <div className="w-6 h-6 bg-[#B7CC16]/10 rounded-full flex items-center justify-center shrink-0">
               <svg className="w-4 h-4 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            Zero maintenance fees for multi-currency holding.
          </li>
          <li className="flex gap-4 text-sm text-white/60 font-medium leading-relaxed">
            <div className="w-6 h-6 bg-[#B7CC16]/10 rounded-full flex items-center justify-center shrink-0">
               <svg className="w-4 h-4 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            Real-time mid-market exchange hooks.
          </li>
          <li className="flex gap-4 text-sm text-white/60 font-medium leading-relaxed">
            <div className="w-6 h-6 bg-[#B7CC16]/10 rounded-full flex items-center justify-center shrink-0">
               <svg className="w-4 h-4 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            Compound interest paid monthly on USD & EUR.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WalletsView;
