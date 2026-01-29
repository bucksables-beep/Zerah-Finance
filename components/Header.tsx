
import React from 'react';
import Logo from './Logo';

interface HeaderProps {
  isBusinessMode: boolean;
  onToggleAi: () => void;
}

const Header: React.FC<HeaderProps> = ({ isBusinessMode, onToggleAi }) => {
  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md px-6 py-5 flex items-center justify-between border-b border-[#B7CC16]/20">
      <div className="flex items-center gap-3">
        <Logo size="sm" />
        <div>
          <h1 className="text-xl font-black tracking-tight text-white uppercase">Zerah</h1>
          <p className="text-[8px] text-[#B7CC16] uppercase tracking-[0.3em] font-black opacity-80">
            {isBusinessMode ? 'Business Engine' : 'Global Banking'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleAi}
          className="p-2.5 bg-[#121212] border border-[#B7CC16]/30 rounded-2xl hover:border-[#B7CC16] transition-colors group shadow-lg"
        >
          <svg className="w-5 h-5 text-[#B7CC16] group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
        <div className="w-11 h-11 bg-[#121212] rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden shadow-xl">
          <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
        </div>
      </div>
    </header>
  );
};

export default Header;
