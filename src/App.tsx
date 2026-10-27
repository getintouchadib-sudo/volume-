import { useState } from 'react';
import { Header } from './components/Header';
import type { TabType } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Learn } from './components/Learn';
import { Watch } from './components/Watch';
import { Explore } from './components/Explore';
import { Game } from './components/Game';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'learn' && <Learn />}

        {/* Persistent Watch module container to preserve YouTube iframe instance across tab navigation */}
        <div style={{ display: activeTab === 'watch' ? 'block' : 'none' }}>
          <Watch />
        </div>

        {activeTab === 'explore' && <Explore />}
        {activeTab === 'game' && <Game />}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
