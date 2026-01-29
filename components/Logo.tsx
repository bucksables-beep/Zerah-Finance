
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-24 h-24 text-5xl',
    xl: 'w-36 h-36 text-7xl'
  };

  return (
    <div className={`bg-[#B7CC16] rounded-[1.2rem] flex items-center justify-center neon-glow shadow-2xl ${sizeClasses[size]} ${className} transform rotate-3`}>
      <span className="text-black font-black tracking-tighter select-none transform -rotate-3">Z</span>
    </div>
  );
};

export default Logo;
