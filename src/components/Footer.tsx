import React from 'react';
import { Droplets, Sparkles, BookOpen } from 'lucide-react';
import type { TabType } from './Header';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-white">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white">Liquid Measure Lab</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              An educational Mathematics innovation designed for Year 5 primary school pupils in Malaysia.
              Master converting liquid volume between litres (L) and millilitres (mL) with ease!
            </p>
          </div>

          {/* DSKP Curriculum Alignment */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Curriculum Standard
            </h4>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-cyan-300">DSKP Standard Pembelajaran 5.3.1:</p>
              <p className="italic">
                &ldquo;Convert units of liquid volume involving millilitres and litres in fractions and decimals.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-700/50 flex items-center gap-2 text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>100% English medium • Accurate Textbook Alignment</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base">Quick Sections</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('learn')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  LEARN — Textbook Lessons A to E
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('watch')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  WATCH — Interactive Video
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  EXPLORE — 10 Glasses & Jug Simulation
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('game')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  GAME — Match, Missing Value, Misconception
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('assessment')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  ASSESSMENT — Pre & Post Test
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          Liquid Measure Lab • Created for Primary School Mathematics PB Project • Year 5
        </div>
      </div>
    </footer>
  );
};
