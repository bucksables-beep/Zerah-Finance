
import React, { useState } from 'react';
import { Wallet, Transaction, Currency } from '../types';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardProps {
  wallets: Wallet[];
  transactions: Transaction[];
  onAction: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ wallets, transactions, onAction }) => {
  const [currentWalletIndex, setCurrentWalletIndex] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const activeWallet = wallets[currentWalletIndex];

  const handleNextWallet = () => {
    setCurrentWalletIndex((prev) => (prev + 1) % wallets.length);
  };

  const handlePrevWallet = () => {
    setCurrentWalletIndex((prev) => (prev - 1 + wallets.length) % wallets.length);
  };

  const handleShare = async (tx: Transaction) => {
    const shareData = {
      title: 'Zerah Finance Receipt',
      text: `Receipt for ${tx.description}: ${tx.amount} ${tx.currency}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      alert('Receipt link copied to clipboard!');
    }
  };

  // Mock data for spending chart
  const chartData = [
    { name: 'Mon', amount: 400 },
    { name: 'Tue', amount: 300 },
    { name: 'Wed', amount: 600 },
    { name: 'Thu', amount: 800 },
    { name: 'Fri', amount: 500 },
    { name: 'Sat', amount: 900 },
    { name: 'Sun', amount: 750 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Swappable Balance Card */}
      <div className="relative group">
        <div className="bg-[#121212] p-6 rounded-[2.5rem] border border-[#B7CC16]/20 relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B7CC16]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          <div className="flex justify-between items-start mb-1">
            <p className="text-[#B7CC16]/70 text-[10px] font-black uppercase tracking-widest">Total Asset Value</p>
            <div className="bg-[#B7CC16]/10 px-2 py-0.5 rounded text-[10px] font-bold text-[#B7CC16] border border-[#B7CC16]/20">
              {activeWallet.currency}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={handlePrevWallet}
              className="p-1 text-white/30 hover:text-[#B7CC16] transition-colors"
              aria-label="Previous currency"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            <h2 className="text-4xl font-black tracking-tighter text-center flex-1 animate-fadeIn neon-text" key={activeWallet.id}>
              {activeWallet.symbol}{activeWallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>

            <button 
              onClick={handleNextWallet}
              className="p-1 text-white/30 hover:text-[#B7CC16] transition-colors"
              aria-label="Next currency"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => onAction('send')}
              className="flex-1 bg-[#B7CC16] text-[#000000] font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity neon-glow shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              Send Money
            </button>
            <button 
              onClick={() => onAction('convert')}
              className="flex-1 bg-transparent text-white border border-[#B7CC16]/30 font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-2 hover:bg-[#B7CC16]/5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              Convert
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {wallets.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentWalletIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentWalletIndex ? 'w-6 bg-[#B7CC16] neon-glow' : 'w-1.5 bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B7CC16]">Activity Stream</h3>
          <button className="text-white/40 text-[10px] font-black uppercase tracking-widest">History</button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 5).map(tx => (
            <button 
              key={tx.id} 
              onClick={() => setSelectedTransaction(tx)}
              className="w-full bg-[#121212] p-4 rounded-2xl flex items-center justify-between border border-white/5 hover:border-[#B7CC16]/40 transition-all text-left active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tx.type === 'incoming' ? 'bg-[#B7CC16]/10 text-[#B7CC16]' : 'bg-white/5 text-white/40'}`}>
                  {tx.type === 'incoming' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  ) : tx.type === 'conversion' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight">{tx.description}</p>
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-tighter">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-black text-sm ${tx.type === 'incoming' ? 'text-[#B7CC16]' : 'text-white'}`}>
                  {tx.type === 'incoming' ? '+' : '-'}{tx.amount.toLocaleString()}
                </p>
                <p className="text-[8px] text-white/20 font-black tracking-widest">{tx.currency}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-[100] bg-[#000000] p-6 flex flex-col items-center justify-center animate-fadeIn">
          <div className="w-full max-w-sm bg-[#121212] rounded-[3rem] border border-[#B7CC16]/30 overflow-hidden shadow-2xl relative">
            <div className="absolute top-[50%] -left-3 w-6 h-6 bg-[#000000] rounded-full -translate-y-1/2 border-r border-[#B7CC16]/20"></div>
            <div className="absolute top-[50%] -right-3 w-6 h-6 bg-[#000000] rounded-full -translate-y-1/2 border-l border-[#B7CC16]/20"></div>
            
            <div className="p-10 space-y-8">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-[#B7CC16]/10 border border-[#B7CC16]/30 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-3">
                  <svg className="w-10 h-10 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-[10px] text-[#B7CC16] font-black uppercase tracking-[0.4em]">Transaction Verified</h3>
                <p className={`text-5xl font-black tracking-tighter ${selectedTransaction.type === 'incoming' ? 'text-[#B7CC16]' : 'text-white'}`}>
                  {selectedTransaction.type === 'incoming' ? '+' : '-'}{selectedTransaction.amount.toLocaleString()}
                  <span className="text-xl ml-1 text-white/20">{selectedTransaction.currency}</span>
                </p>
                <p className="text-xs text-white/40 uppercase font-black tracking-tight">{selectedTransaction.description}</p>
                <p className="text-[10px] text-white/20">{selectedTransaction.date}</p>
              </div>

              <div className="space-y-4 pt-6 border-t border-dashed border-white/10">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white/40 uppercase font-black tracking-widest">Type</span>
                  <span className="text-white font-bold uppercase">{selectedTransaction.type}</span>
                </div>
                {selectedTransaction.recipientName && (
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white/40 uppercase font-black tracking-widest">Recipient</span>
                    <span className="text-white font-bold">{selectedTransaction.recipientName}</span>
                  </div>
                )}
                {selectedTransaction.fee && (
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white/40 uppercase font-black tracking-widest">Service Fee</span>
                    <span className="text-[#B7CC16] font-bold">${selectedTransaction.fee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white/40 uppercase font-black tracking-widest">Network</span>
                  <span className="bg-[#B7CC16]/20 text-[#B7CC16] px-2 py-0.5 rounded text-[8px] font-black uppercase">Verified Completed</span>
                </div>
              </div>

              <div className="pt-8 text-center space-y-4">
                 <p className="text-[9px] text-white/20 leading-tight italic">Global Assets Secured by Zerah Ledger.</p>
                 <div className="text-[8px] font-mono text-white/5 tracking-widest">REF: {selectedTransaction.id.toUpperCase()}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full max-w-sm space-y-4">
            <button 
              onClick={() => handleShare(selectedTransaction)}
              className="w-full bg-[#B7CC16] text-[#000000] font-black py-5 rounded-[2rem] text-lg flex items-center justify-center gap-3 neon-glow shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              Share Digital Receipt
            </button>
            <button 
              onClick={() => setSelectedTransaction(null)}
              className="w-full bg-transparent text-white/30 font-black py-4 rounded-2xl text-sm uppercase tracking-widest"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* Spending Analytics */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B7CC16]">Asset Performance</h3>
          <span className="text-[#B7CC16] text-[10px] font-black uppercase tracking-widest">Live Feed</span>
        </div>
        <div className="h-32 w-full bg-[#121212] rounded-[2.5rem] p-4 border border-white/5 relative overflow-hidden shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B7CC16" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#B7CC16" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#B7CC16" 
                fillOpacity={1} 
                fill="url(#colorAmount)" 
                strokeWidth={3}
                animationDuration={2500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
