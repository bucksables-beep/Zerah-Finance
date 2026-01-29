
import React, { useState, useEffect } from 'react';
import { Wallet, Transaction, VirtualCard, Currency } from './types';
import { INITIAL_WALLETS, INITIAL_TRANSACTIONS, INITIAL_CARDS } from './constants';
import Dashboard from './components/Dashboard';
import WalletsView from './components/WalletsView';
import CardsView from './components/CardsView';
import TransferView from './components/TransferView';
import SendMoneyView from './components/InternationalTransferView'; // Reusing the same file for logical SendMoneyView
import BusinessView from './components/BusinessView';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import AiAssistant from './components/AiAssistant';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'wallets' | 'send' | 'convert' | 'cards' | 'business'>('home');
  const [wallets, setWallets] = useState<Wallet[]>(INITIAL_WALLETS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [cards, setCards] = useState<VirtualCard[]>(INITIAL_CARDS);
  const [isBusinessMode, setIsBusinessMode] = useState(false);
  const [showAi, setShowAi] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleTransaction = (tx: Transaction, updatedWallets: Wallet[]) => {
    setWallets(updatedWallets);
    setTransactions(prev => [tx, ...prev]);
    setActiveTab('home');
  };

  const handleAddFunds = (currency: Currency, amount: number) => {
    setWallets(prev => prev.map(w => w.currency === currency ? { ...w, balance: w.balance + amount } : w));
    const newTx: Transaction = {
      id: `topup-${Date.now()}`,
      type: 'incoming',
      amount: amount,
      currency: currency,
      description: `Wallet Top-up via Zerah Direct`,
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard wallets={wallets} transactions={transactions} onAction={(tab) => setActiveTab(tab as any)} />;
      case 'wallets':
        return <WalletsView wallets={wallets} transactions={transactions} onAddFunds={handleAddFunds} />;
      case 'send':
        return <SendMoneyView wallets={wallets} onComplete={handleTransaction} />;
      case 'convert':
        return <TransferView wallets={wallets} onTransfer={(from, to, fAmt, tAmt) => {
          const updated = wallets.map(w => {
            if (w.currency === from) return { ...w, balance: w.balance - fAmt };
            if (w.currency === to) return { ...w, balance: w.balance + tAmt };
            return w;
          });
          const tx: Transaction = {
            id: `t-${Date.now()}`,
            type: 'conversion',
            amount: fAmt,
            currency: from,
            description: `Exchanged ${from} to ${to}`,
            date: new Date().toISOString().split('T')[0],
            status: 'completed'
          };
          handleTransaction(tx, updated);
        }} />;
      case 'cards':
        return <CardsView cards={cards} />;
      case 'business':
        return <BusinessView isBusinessMode={isBusinessMode} setIsBusinessMode={setIsBusinessMode} />;
      default:
        return <Dashboard wallets={wallets} transactions={transactions} onAction={(tab) => setActiveTab(tab as any)} />;
    }
  };

  if (isInitializing) {
    return <SplashScreen onFinish={() => setIsInitializing(false)} />;
  }

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-[#000000] text-white animate-fadeIn">
      <Header 
        isBusinessMode={isBusinessMode} 
        onToggleAi={() => setShowAi(!showAi)} 
      />
      
      <main className="flex-1 px-4 py-6 overflow-y-auto">
        {renderContent()}
      </main>

      {showAi && <AiAssistant onClose={() => setShowAi(false)} transactions={transactions} />}

      <BottomNav activeTab={activeTab === 'send' || activeTab === 'convert' ? 'transfer' : activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
