
import React from 'react';

interface ProfileViewProps {
  user: {
    name: string;
    email: string;
    tier: string;
    isPremium: boolean;
  };
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      {/* Profile Hero Section */}
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative">
          <div className="w-28 h-28 rounded-[2.5rem] bg-[#121212] border-2 border-[#B7CC16] p-1 shadow-[0_0_30px_rgba(183,204,22,0.2)] overflow-hidden">
            <img 
              src="https://picsum.photos/seed/user/200/200" 
              alt="Profile" 
              className="w-full h-full object-cover rounded-[2.2rem] grayscale"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#B7CC16] p-2 rounded-xl shadow-lg border-4 border-black">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 2.944a11.955 11.955 0 018.618 3.04M12 2.944V12.5" /></svg>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase">{user.name}</h2>
          <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">{user.email}</p>
        </div>
        <div className="px-4 py-1.5 bg-[#B7CC16]/10 border border-[#B7CC16]/30 rounded-full flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#B7CC16] rounded-full animate-pulse shadow-[0_0_5px_#B7CC16]"></div>
          <span className="text-[9px] font-black text-[#B7CC16] uppercase tracking-widest">{user.tier}</span>
        </div>
      </div>

      {/* Account Tier & Limits */}
      <div className="bg-[#121212] rounded-[2.5rem] p-8 border border-[#B7CC16]/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B7CC16]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-sm font-black text-[#B7CC16] uppercase tracking-[0.2em]">Transmission Limits</h3>
            <p className="text-[10px] text-white/30 uppercase font-black">Daily Asset Capacity</p>
          </div>
          <button className="text-[9px] font-black text-[#B7CC16] uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#B7CC16]/30 transition-colors">Upgrade</button>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Global Send</span>
            <span className="text-sm font-black text-white">$50,000 / day</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#B7CC16] w-1/5 rounded-full shadow-[0_0_8px_#B7CC16]"></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">ATM Withdrawal</span>
            <span className="text-sm font-black text-white">$5,000 / day</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#B7CC16] w-1/3 rounded-full shadow-[0_0_8px_#B7CC16]"></div>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B7CC16] ml-2">Security Engine</h4>
        <div className="bg-[#121212] rounded-[2rem] border border-white/5 divide-y divide-white/5 overflow-hidden">
          <div className="p-5 flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#B7CC16] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-tight">Two-Factor Auth</p>
                <p className="text-[9px] text-white/20 font-black uppercase">Active on +234 ••• ••• 88</p>
              </div>
            </div>
            <div className="w-10 h-6 bg-[#B7CC16] rounded-full p-1 flex items-center justify-end">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
          </div>

          <div className="p-5 flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#B7CC16] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-tight">FaceID Biometrics</p>
                <p className="text-[9px] text-white/20 font-black uppercase">Secure node access</p>
              </div>
            </div>
            <div className="w-10 h-6 bg-[#B7CC16] rounded-full p-1 flex items-center justify-end">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B7CC16] ml-2">Configuration</h4>
        <div className="bg-[#121212] rounded-[2rem] border border-white/5 divide-y divide-white/5 overflow-hidden">
          <div className="p-5 flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.547c.605-1.123 1.058-2.316 1.34-3.547h3.612m-9.577 9.547c.547-1.123 1.058-2.316 1.34-3.547m0 0a13.99 13.99 0 01-2.637-6.547M13.048 21.047a13.99 13.99 0 00-2.637-6.547m0 0c.324-1.123.51-2.316.547-3.547H3.048" /></svg>
              </div>
              <p className="text-sm font-black uppercase tracking-tight">Language hook</p>
            </div>
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">English (US)</span>
          </div>

          <div className="p-5 flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <p className="text-sm font-black uppercase tracking-tight">Notifications</p>
            </div>
            <span className="text-[10px] font-black text-[#B7CC16] uppercase tracking-widest">Critical Only</span>
          </div>
        </div>
      </div>

      {/* Logout Action */}
      <button 
        onClick={onLogout}
        className="w-full py-5 bg-red-500/10 border border-red-500/20 rounded-[2rem] text-red-500 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-red-500/20 transition-all active:scale-95"
      >
        Deauthorize Session (Logout)
      </button>

      <div className="text-center pt-4">
        <p className="text-[8px] font-mono text-white/10 tracking-[0.4em] uppercase">Zerah OS v1.0.4 • Blockchain Verified</p>
      </div>
    </div>
  );
};

export default ProfileView;
