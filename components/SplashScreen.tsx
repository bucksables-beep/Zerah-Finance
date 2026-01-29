
import React, { useEffect, useState } from 'react';
import Logo from './Logo';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onFinish, 600); // Wait for fade out animation
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#052826] flex flex-col items-center justify-center transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="relative">
        {/* Pulsating background glow */}
        <div className="absolute inset-0 bg-[#B7CC16]/20 blur-3xl rounded-full animate-pulse scale-150"></div>
        
        {/* Animated Logo */}
        <div className="animate-bounce">
          <Logo size="xl" />
        </div>
      </div>

      <div className="mt-12 text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter neon-text">
          ZERAH <span className="text-[#B7CC16]/50">FINANCE</span>
        </h1>
        <p className="text-[#B7CC16]/60 text-xs uppercase tracking-[0.4em] font-medium animate-pulse">
          Global Freedom
        </p>
      </div>

      {/* Loading Progress Bar */}
      <div className="absolute bottom-20 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-[#B7CC16] shadow-[0_0_10px_#B7CC16] animate-loadingBar"></div>
      </div>

      <style>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loadingBar {
          animation: loadingBar 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
