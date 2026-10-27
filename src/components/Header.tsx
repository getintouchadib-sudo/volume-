import React from 'react';
import { BookOpen, Tv, FlaskConical, Gamepad2, Home, Droplets } from 'lucide-react';

export type TabType = 'home' | 'learn' | 'watch' | 'explore' | 'game';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, color: 'hover:text-cyan-600' },
    { id: 'learn', label: 'LEARN', icon: BookOpen, color: 'hover:text-blue-600' },
    { id: 'watch', label: 'WATCH', icon: Tv, color: 'hover:text-red-500' },
    { id: 'explore', label: 'EXPLORE', icon: FlaskConical, color: 'hover:text-emerald-600' },
    { id: 'game', label: 'GAME', icon: Gamepad2, color: 'hover:text-amber-500' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-cyan-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand Title */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-200 group-hover:scale-105 transition-transform">
              <Droplets className="w-7 h-7" />
            </div>
            <div>
              <span className="block text-2xl font-black tracking-tight text-slate-800 group-hover:text-cyan-600 transition-colors">
                Liquid Measure Lab
              </span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-cyan-600">
                Mathematics Year 5 • DSKP 5.3.1
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-cyan-700 shadow-sm shadow-slate-200 scale-102'
                      : `text-slate-600 ${item.color} hover:bg-white/60`
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-600' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden border-t border-slate-100 bg-white py-2 px-2 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-semibold ${
                isActive ? 'text-cyan-600 bg-cyan-50 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
