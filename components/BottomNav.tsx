
import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home' },
    { id: 'wallets', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', label: 'Wallets' },
    { id: 'send', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8', label: 'Send' },
    { id: 'cards', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Cards' },
    { id: 'business', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Engine' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-t border-[#B7CC16]/20 px-6 py-4 pb-10 flex items-center justify-between shadow-[0_-10px_50px_rgba(0,0,0,0.8)]">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          onClick={() => setActiveTab(tab.id as any)}
          className={`flex flex-col items-center gap-1 transition-all relative ${activeTab === tab.id ? 'text-[#B7CC16] scale-110' : 'text-white/20 hover:text-white/40'}`}
        >
          <svg className={`w-6 h-6 ${activeTab === tab.id ? 'neon-text' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === tab.id ? 3 : 2} d={tab.icon} />
          </svg>
          <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
          {activeTab === tab.id && (
            <div className="absolute -top-1 w-8 h-8 bg-[#B7CC16]/10 blur-xl rounded-full"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
