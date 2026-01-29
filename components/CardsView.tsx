
import React, { useState } from 'react';
import { VirtualCard } from '../types';

interface CardsViewProps {
  cards: VirtualCard[];
}

const CardsView: React.FC<CardsViewProps> = ({ cards: initialCards }) => {
  const [cards, setCards] = useState<VirtualCard[]>(initialCards);
  const [isMasked, setIsMasked] = useState(true);
  const [editingLimitCard, setEditingLimitCard] = useState<VirtualCard | null>(null);
  const [newLimit, setNewLimit] = useState('');

  const toggleFreeze = (id: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const handleUpdateLimit = () => {
    if (!editingLimitCard || !newLimit) return;
    const limitVal = parseFloat(newLimit);
    setCards(prev => prev.map(c => c.id === editingLimitCard.id ? { ...c, limit: limitVal } : c));
    setEditingLimitCard(null);
    setNewLimit('');
  };

  const formatCardNumber = (number: string, masked: boolean) => {
    if (masked) {
      return `**** **** **** ${number.slice(-4)}`;
    }
    return number.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black neon-text uppercase tracking-tighter">Your Cards</h2>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">Multi-Currency Virtual Engine</p>
        </div>
        <button className="px-6 py-3 rounded-2xl bg-[#B7CC16] text-black font-black text-xs neon-glow shadow-xl active:scale-95 transition-all">+ New Card</button>
      </div>

      <div className="space-y-6">
        {cards.map(card => (
          <div key={card.id} className={`relative aspect-[1.6/1] w-full transition-all duration-500 ${!card.isActive ? 'grayscale opacity-60' : ''}`}>
            {/* Card Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#000000] to-[#B7CC16]/10 rounded-[2.5rem] border border-[#B7CC16]/30 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B7CC16]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              
              <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#B7CC16] font-black tracking-[0.3em] uppercase">Zerah Platinum</span>
                    <span className="text-2xl font-black italic tracking-tighter text-white/90">{card.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsMasked(!isMasked)}
                      className="p-2 bg-black/40 rounded-xl border border-[#B7CC16]/20 hover:border-[#B7CC16] transition-colors"
                    >
                      {isMasked ? (
                        <svg className="w-5 h-5 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="w-5 h-5 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                      )}
                    </button>
                    <div className="w-12 h-12 bg-[#B7CC16]/10 rounded-2xl flex items-center justify-center border border-[#B7CC16]/20">
                      <svg className="w-7 h-7 text-[#B7CC16]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className={`text-2xl font-mono tracking-[0.2em] transition-all duration-300 ${isMasked ? 'text-white/40' : 'text-white font-bold'}`}>
                    {formatCardNumber(card.cardNumber, isMasked)}
                  </p>
                  
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[8px] text-white/30 uppercase font-black tracking-widest">Card Holder</p>
                      <p className="text-xs font-black uppercase tracking-tight">Chukwudi Adebayo</p>
                    </div>
                    <div className="flex gap-8">
                      <div className="space-y-1">
                        <p className="text-[8px] text-white/30 uppercase font-black tracking-widest">Expires</p>
                        <p className="text-xs font-black">{isMasked ? '**/**' : card.expiry}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] text-white/30 uppercase font-black tracking-widest">CVV</p>
                        <p className="text-xs font-black">{isMasked ? '***' : card.cvv}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {!card.isActive && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-[2.5rem]">
                   <div className="px-6 py-2 bg-red-500/20 border border-red-500/50 rounded-full">
                      <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">Card Frozen</span>
                   </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#121212] rounded-[2.5rem] p-8 border border-white/5 space-y-6 shadow-2xl">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#B7CC16]">Card Security Controls</h3>
        <div className="space-y-5">
          {cards.map(card => (
            <div key={card.id} className="space-y-4 py-4 border-b border-white/5 last:border-0">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className={`p-3 rounded-xl transition-colors ${!card.isActive ? 'bg-red-500/10 text-red-500' : 'bg-[#B7CC16]/10 text-[#B7CC16]'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {card.isActive ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-tight">{card.isActive ? 'Freeze Card' : 'Unfreeze Card'}</p>
                    <p className="text-[9px] text-white/30 font-bold uppercase">Deactivate all transactions instantly</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleFreeze(card.id)}
                  className={`w-14 h-8 rounded-full p-1.5 transition-all duration-300 ${!card.isActive ? 'bg-red-500/20' : 'bg-[#B7CC16]/20'}`}
                >
                  <div className={`w-5 h-5 rounded-full shadow-lg transform transition-transform duration-300 ${!card.isActive ? 'bg-red-500 translate-x-0' : 'bg-[#B7CC16] translate-x-6'}`}></div>
                </button>
              </div>

              {/* Spending Limit Display */}
              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-[#B7CC16]/10 text-[#B7CC16] rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-tight">Daily Spending Limit</p>
                    <p className="text-[9px] text-white/30 font-bold uppercase">Max transmission: ${card.limit.toLocaleString()}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setEditingLimitCard(card);
                    setNewLimit(card.limit.toString());
                  }}
                  className="text-[#B7CC16] text-[10px] font-black uppercase tracking-widest border border-[#B7CC16]/30 px-3 py-1.5 rounded-lg hover:bg-[#B7CC16]/10 transition-colors"
                >
                  Edit
                </button>
              </div>
              
              {/* Limit Progress Bar (Visual only) */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-[#B7CC16] w-1/4 rounded-full shadow-[0_0_8px_#B7CC16]"></div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center py-4 border-b border-white/5">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-[#B7CC16]/10 text-[#B7CC16] rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 012.5 2.5v.5M12 22a10 10 0 100-20 10 10 0 000 20z" /></svg>
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-tight">International Usage</p>
                <p className="text-[9px] text-white/30 font-bold uppercase">Enable cross-border payments</p>
              </div>
            </div>
            <div className="w-14 h-8 bg-[#B7CC16]/20 rounded-full p-1.5 cursor-pointer">
              <div className="w-5 h-5 bg-[#B7CC16] rounded-full translate-x-6"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Limit Modal */}
      {editingLimitCard && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex flex-col items-center justify-center p-6 animate-fadeIn backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#121212] rounded-[3rem] border border-[#B7CC16]/30 p-8 space-y-8 shadow-[0_0_50px_rgba(183,204,22,0.15)]">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 bg-[#B7CC16]/10 border border-[#B7CC16]/30 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <svg className="w-10 h-10 text-[#B7CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-[10px] text-[#B7CC16] font-black uppercase tracking-[0.4em]">Spending Threshold</h3>
              <p className="text-2xl font-black text-white tracking-tighter">Set Daily Limit</p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Card ending in {editingLimitCard.cardNumber.slice(-4)}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-black/40 border border-white/5 rounded-2xl px-6 py-5 flex items-center justify-between">
                <span className="text-2xl font-black text-[#B7CC16]">$</span>
                <input 
                  type="number" 
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-3xl font-black text-right outline-none flex-1 text-white placeholder-white/5"
                  autoFocus
                />
              </div>
              <p className="text-[9px] text-white/20 text-center leading-relaxed">
                Setting a lower limit adds an extra layer of protection against unauthorized high-value transmissions.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <button 
                onClick={handleUpdateLimit}
                className="w-full bg-[#B7CC16] text-black font-black py-5 rounded-[2rem] text-xl neon-glow transition-all active:scale-95"
              >
                Update Limit
              </button>
              <button 
                onClick={() => setEditingLimitCard(null)}
                className="w-full bg-transparent text-white/30 py-4 font-black uppercase tracking-widest text-[10px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardsView;
