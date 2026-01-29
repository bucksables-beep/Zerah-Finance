
import React, { useState } from 'react';
import { Wallet, Currency, Transaction } from '../types';

interface SendMoneyViewProps {
  wallets: Wallet[];
  onComplete: (tx: Transaction, updatedWallets: Wallet[]) => void;
}

const SendMoneyView: React.FC<SendMoneyViewProps> = ({ wallets, onComplete }) => {
  const [fromCurrency, setFromCurrency] = useState<Currency>(Currency.USD);
  const [toCurrency, setToCurrency] = useState<Currency>(Currency.NGN);
  const [amount, setAmount] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNum, setAccountNum] = useState('');
  const [routingNum, setRoutingNum] = useState('');
  const [purpose, setPurpose] = useState('Tuition');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedTx, setCompletedTx] = useState<Transaction | null>(null);

  const rates: Record<string, number> = {
    'USD-NGN': 1510,
    'USD-EUR': 0.92,
    'USD-GBP': 0.78,
    'GBP-NGN': 1920,
    'EUR-NGN': 1640,
  };

  const currentRate = rates[`${fromCurrency}-${toCurrency}`] || (1 / (rates[`${toCurrency}-${fromCurrency}`] || 1));
  const result = (parseFloat(amount || '0') * currentRate).toFixed(2);
  const fee = 2.50; // Flat Zerah fee for global transfers

  const handleSend = () => {
    if (!amount || !beneficiary || !accountNum) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      const sourceWallet = wallets.find(w => w.currency === fromCurrency);
      if (!sourceWallet || sourceWallet.balance < parseFloat(amount)) {
        alert("Insufficient funds in source wallet.");
        setIsProcessing(false);
        return;
      }

      const tx: Transaction = {
        id: `GLB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        type: 'outgoing',
        amount: parseFloat(amount),
        currency: fromCurrency,
        description: `Transfer: ${purpose} to ${beneficiary}`,
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
        recipientName: beneficiary,
        bankName,
        accountNumber: accountNum,
        purpose,
        fee
      };

      setCompletedTx(tx);
      setShowReceipt(true);
      setIsProcessing(false);
    }, 2000);
  };

  const handleFinish = () => {
    if (completedTx) {
      const updatedWallets = wallets.map(w => 
        w.currency === fromCurrency ? { ...w, balance: w.balance - completedTx.amount } : w
      );
      onComplete(completedTx, updatedWallets);
    }
  };

  if (showReceipt && completedTx) {
    const fromSymbol = wallets.find(w => w.currency === fromCurrency)?.symbol || '';
    const toSymbol = wallets.find(w => w.currency === toCurrency)?.symbol || '';
    
    return (
      <div className="fixed inset-0 z-[70] bg-[#000000] p-6 flex flex-col items-center justify-center animate-fadeIn">
        <div className="absolute top-10 left-6 right-6 bg-[#B7CC16] text-[#000000] p-4 rounded-2xl flex items-center gap-3 shadow-[0_0_30px_rgba(183,204,22,0.4)] animate-slideDown">
          <div className="w-8 h-8 bg-[#000000] rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="font-black text-sm uppercase tracking-tight">Transmission Successful</p>
        </div>

        <div className="w-full max-w-sm bg-[#121212] rounded-[2.5rem] border border-[#B7CC16]/30 overflow-hidden shadow-2xl relative">
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#000000] rounded-full -translate-y-1/2 border-r border-[#B7CC16]/20"></div>
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#000000] rounded-full -translate-y-1/2 border-l border-[#B7CC16]/20"></div>
          
          <div className="p-8 space-y-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#B7CC16]/10 border border-[#B7CC16]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-[10px] text-[#B7CC16] font-black uppercase tracking-[0.3em]">Official Receipt</h3>
              <p className="text-3xl font-black tracking-tighter text-white">Sent {fromSymbol}{completedTx.amount.toLocaleString()}</p>
              <p className="text-[10px] text-white/40 uppercase font-black">{completedTx.date}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-dashed border-white/10">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase font-black tracking-widest">Recipient</span>
                <span className="text-white font-bold">{completedTx.recipientName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase font-black tracking-widest">Bank Node</span>
                <span className="text-white font-bold">{bankName || 'Zerah Network'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase font-black tracking-widest">Expected Arrival</span>
                <span className="text-[#B7CC16] font-bold">~{toSymbol}{result}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase font-black tracking-widest">Network Fee</span>
                <span className="text-white font-bold">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-4 border-t border-white/5">
                <span className="text-white/40 uppercase font-black tracking-widest">Settlement</span>
                <span className="bg-[#B7CC16]/20 text-[#B7CC16] px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter">Verified Node</span>
              </div>
            </div>

            <div className="pt-8 text-center space-y-4">
               <p className="text-[9px] text-white/20 leading-tight uppercase font-black">Transmission Authenticated • Secure Zerah Protocol</p>
               <div className="text-[8px] font-mono text-white/10 tracking-widest uppercase">TXID: {completedTx.id}</div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleFinish}
          className="mt-12 w-full max-w-sm bg-[#B7CC16] text-[#000000] font-black py-5 rounded-2xl text-xl neon-glow shadow-xl active:scale-[0.98] transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-black neon-text uppercase tracking-tighter">Send Money</h2>
        <p className="text-[10px] text-[#B7CC16]/60 font-bold uppercase tracking-widest">Global Asset Transmission • Instant Ledger Settlement</p>
      </div>

      <div className="space-y-6">
        {/* Transfer Calculator */}
        <div className="bg-[#121212] rounded-[2.5rem] p-8 border border-[#B7CC16]/20 relative shadow-2xl space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] text-[#B7CC16] font-black uppercase tracking-widest">Source Wallet</span>
              <span className="text-[10px] text-white/30">Balance: {wallets.find(w => w.currency === fromCurrency)?.symbol}{wallets.find(w => w.currency === fromCurrency)?.balance.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-4 bg-black/40 p-5 rounded-3xl border border-white/5 overflow-hidden">
              <div className="shrink-0 bg-white/5 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                <select 
                  value={fromCurrency} 
                  onChange={(e) => setFromCurrency(e.target.value as Currency)}
                  className="bg-transparent text-xl font-black outline-none appearance-none cursor-pointer"
                >
                  {Object.values(Currency).map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                </select>
                <svg className="w-4 h-4 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-transparent text-3xl font-black text-right flex-1 outline-none text-white placeholder-white/5 min-w-0"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 relative">
            <div className="absolute w-full h-px bg-white/10"></div>
            <div className="z-10 bg-[#B7CC16] text-black w-12 h-12 rounded-full flex items-center justify-center neon-glow shadow-xl border-[6px] border-[#121212]">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
            </div>
            <p className="text-[9px] font-black uppercase text-[#B7CC16] tracking-widest bg-[#121212] px-3 z-10">Rate: 1 {fromCurrency} = {currentRate} {toCurrency}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] text-[#B7CC16] font-black uppercase tracking-widest">Expected Arrival</span>
            </div>
            <div className="flex items-center gap-4 bg-black/40 p-5 rounded-3xl border border-white/5 overflow-hidden">
              <div className="shrink-0 bg-white/5 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                <select 
                  value={toCurrency} 
                  onChange={(e) => setToCurrency(e.target.value as Currency)}
                  className="bg-transparent text-xl font-black outline-none appearance-none cursor-pointer"
                >
                  {Object.values(Currency).map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                </select>
                <svg className="w-4 h-4 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="text-3xl font-black text-right flex-1 text-white/20 min-w-0 truncate">{result}</div>
            </div>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="bg-[#121212] rounded-[2.5rem] p-8 border border-white/5 space-y-6 shadow-xl">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-1">Recipient Account Name</label>
              <input 
                type="text" 
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                placeholder="Beneficiary Full Name"
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold focus:border-[#B7CC16]/50 transition-all outline-none text-white placeholder-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-1">Bank Name</label>
              <input 
                type="text" 
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. JPMorgan Chase"
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold focus:border-[#B7CC16]/50 transition-all outline-none text-white placeholder-white/10"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-1">Account No.</label>
                <input 
                  type="text" 
                  value={accountNum}
                  onChange={(e) => setAccountNum(e.target.value)}
                  placeholder="000000000"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold focus:border-[#B7CC16]/50 transition-all outline-none text-white placeholder-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-1">Routing / IBAN</label>
                <input 
                  type="text" 
                  value={routingNum}
                  onChange={(e) => setRoutingNum(e.target.value)}
                  placeholder="SWIFT/Routing"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold focus:border-[#B7CC16]/50 transition-all outline-none text-white placeholder-white/10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-white/30 tracking-widest ml-1">Transfer Purpose</label>
              <div className="relative">
                <select 
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold outline-none appearance-none text-white"
                >
                  <option value="Tuition">Tuition / Education</option>
                  <option value="Family">Family Support</option>
                  <option value="Travel">Travel / Tourism</option>
                  <option value="Business">Business Payment</option>
                  <option value="Remittance">Remittance</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#B7CC16]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security / Fee Info */}
        <div className="p-6 bg-[#B7CC16]/5 border border-[#B7CC16]/20 rounded-[2rem] flex items-center gap-5">
          <div className="w-12 h-12 bg-[#B7CC16] rounded-2xl flex items-center justify-center text-black shrink-0 shadow-[0_0_15px_rgba(183,204,22,0.2)]">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 2.944a11.955 11.955 0 018.618 3.04M12 2.944V12.5" /></svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-black uppercase text-[#B7CC16] tracking-widest">Zerah Secure Node</h4>
            <p className="text-[9px] text-white/40 leading-tight uppercase font-black tracking-tighter">Transmission fee: ${fee.toFixed(2)} • Instant Settlement • End-to-End Encryption</p>
          </div>
        </div>

        <button 
          onClick={handleSend}
          disabled={!amount || !beneficiary || isProcessing}
          className="w-full bg-[#B7CC16] disabled:opacity-10 text-black font-black py-6 rounded-[2.5rem] text-xl neon-glow shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <>
              <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
              <span>Authorizing Transmission...</span>
            </>
          ) : (
            'Authorize Transfer'
          )}
        </button>
      </div>
    </div>
  );
};

export default SendMoneyView;
