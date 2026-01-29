
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

      const updatedWallets = wallets.map(w => 
        w.currency === fromCurrency ? { ...w, balance: w.balance - parseFloat(amount) } : w
      );

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

      onComplete(tx, updatedWallets);
      setIsProcessing(false);
    }, 2000);
  };

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
            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
              <select 
                value={fromCurrency} 
                onChange={(e) => setFromCurrency(e.target.value as Currency)}
                className="bg-transparent text-xl font-black outline-none appearance-none cursor-pointer"
              >
                {Object.values(Currency).map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
              </select>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-transparent text-3xl font-black text-right flex-1 outline-none text-white placeholder-white/10"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 relative">
            <div className="absolute w-full h-px bg-white/5"></div>
            <div className="z-10 bg-[#B7CC16] text-black w-10 h-10 rounded-full flex items-center justify-center neon-glow shadow-xl">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
            </div>
            <p className="text-[9px] font-black uppercase text-[#B7CC16] tracking-tighter">Rate: 1 {fromCurrency} = {currentRate} {toCurrency}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] text-[#B7CC16] font-black uppercase tracking-widest">Expected Arrival</span>
            </div>
            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
              <select 
                value={toCurrency} 
                onChange={(e) => setToCurrency(e.target.value as Currency)}
                className="bg-transparent text-xl font-black outline-none appearance-none cursor-pointer"
              >
                {Object.values(Currency).map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
              </select>
              <div className="text-3xl font-black text-right flex-1 text-white/30">{result}</div>
            </div>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="bg-[#121212] rounded-[2rem] p-6 border border-white/5 space-y-5">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-black text-white/20 ml-1">Recipient Account Name</label>
              <input 
                type="text" 
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                placeholder="Beneficiary Full Name"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-[#B7CC16]/50 transition-all outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-black text-white/20 ml-1">Bank Name</label>
              <input 
                type="text" 
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. JPMorgan Chase"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-black text-white/20 ml-1">Account Number</label>
                <input 
                  type="text" 
                  value={accountNum}
                  onChange={(e) => setAccountNum(e.target.value)}
                  placeholder="000000000"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-black text-white/20 ml-1">Routing Number / IBAN</label>
                <input 
                  type="text" 
                  value={routingNum}
                  onChange={(e) => setRoutingNum(e.target.value)}
                  placeholder="Routing Number"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-black text-white/20 ml-1">Transfer Purpose</label>
              <select 
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none appearance-none"
              >
                <option value="Tuition">Tuition / Education</option>
                <option value="Family">Family Support</option>
                <option value="Travel">Travel / Tourism</option>
                <option value="Business">Business Payment</option>
                <option value="Remittance">Remittance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security / Fee Info */}
        <div className="p-5 bg-[#B7CC16]/5 border border-[#B7CC16]/20 rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 bg-[#B7CC16] rounded-xl flex items-center justify-center text-black shrink-0">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 2.944a11.955 11.955 0 018.618 3.04M12 2.944V12.5" /></svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black uppercase text-[#B7CC16]">Zerah Secure Transmission</h4>
            <p className="text-[9px] text-white/40 leading-tight">Funds are moved via encrypted ledger hooks. This avoids standard SWIFT delays. Transmission fee: ${fee.toFixed(2)} applied at source.</p>
          </div>
        </div>

        <button 
          onClick={handleSend}
          disabled={!amount || !beneficiary || isProcessing}
          className="w-full bg-[#B7CC16] disabled:opacity-20 text-black font-black py-5 rounded-[2rem] text-xl neon-glow shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
              <span>Authorizing Transaction...</span>
            </>
          ) : (
            'Transfer Money Now'
          )}
        </button>
      </div>
    </div>
  );
};

export default SendMoneyView;
