
import React from 'react';

interface BusinessViewProps {
  isBusinessMode: boolean;
  setIsBusinessMode: (val: boolean) => void;
}

const BusinessView: React.FC<BusinessViewProps> = ({ isBusinessMode, setIsBusinessMode }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-[#01203F] p-8 rounded-[2rem] border-2 border-[#B7CC16] text-center space-y-6">
        <div className="w-20 h-20 bg-[#B7CC16] rounded-3xl mx-auto flex items-center justify-center neon-glow">
          <svg className="w-12 h-12 text-[#052826]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </div>
        <h2 className="text-2xl font-bold">Scale Globally with Zerah Business</h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Open an SME account to unlock multi-currency invoicing, payroll for global staff, and FX hedging.
        </p>
        <button 
          onClick={() => setIsBusinessMode(!isBusinessMode)}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${isBusinessMode ? 'bg-[#052826] text-white border border-[#B7CC16]' : 'bg-[#B7CC16] text-[#052826]'}`}
        >
          {isBusinessMode ? 'Return to Personal' : 'Activate Business Mode'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#01203F] p-6 rounded-3xl border border-white/5 space-y-2">
          <div className="w-10 h-10 bg-lavender/20 rounded-xl flex items-center justify-center text-lavender mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <h4 className="font-bold text-sm">Smart Invoicing</h4>
          <p className="text-[10px] text-white/40">Bill clients in USD, GBP or EUR easily.</p>
        </div>
        <div className="bg-[#01203F] p-6 rounded-3xl border border-white/5 space-y-2">
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500 mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h4 className="font-bold text-sm">Team Payroll</h4>
          <p className="text-[10px] text-white/40">Pay remote staff across borders in seconds.</p>
        </div>
      </div>

      <div className="bg-[#B7CC16]/5 border border-[#B7CC16]/20 p-6 rounded-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold">FX Hedging</h3>
            <p className="text-xs text-white/60">Protect your business from Naira volatility.</p>
          </div>
          <span className="bg-[#B7CC16] text-[#052826] text-[10px] font-bold px-2 py-1 rounded">PREMIUM</span>
        </div>
        <button className="w-full py-2 bg-[#052826] text-[#B7CC16] border border-[#B7CC16]/30 rounded-xl text-xs font-bold">Learn More</button>
      </div>
    </div>
  );
};

export default BusinessView;
