import React, { useState } from 'react';
import { BookOpen, Tv, FlaskConical, Gamepad2, ArrowRight, Award, Sparkles, ArrowRightLeft, Calculator } from 'lucide-react';
import type { TabType } from './Header';
import { Mascot } from './Mascot';

interface HomeProps {
  setActiveTab: (tab: TabType) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  // Interactive "Try an Example" state
  const [inputValue, setInputValue] = useState<string>('0.5');
  const [conversionDirection, setConversionDirection] = useState<'LtoML' | 'MLtoL'>('LtoML');

  const numVal = parseFloat(inputValue);
  const isValidNum = !isNaN(numVal) && numVal >= 0;

  let calculatedResult = '';
  let calculationSteps = '';

  if (isValidNum) {
    if (conversionDirection === 'LtoML') {
      const res = numVal * 1000;
      calculatedResult = `${res.toLocaleString()} mL`;
      calculationSteps = `${numVal} L × 1,000 = ${res.toLocaleString()} mL`;
    } else {
      const res = numVal / 1000;
      calculatedResult = `${res} L`;
      calculationSteps = `${numVal.toLocaleString()} mL ÷ 1,000 = ${res} L`;
    }
  }

  const cards = [
    {
      id: 'learn' as TabType,
      title: 'LEARN',
      subtitle: 'Understand the concept',
      description: 'Step-by-step textbook lessons explaining litres and millilitres conversion with fractions and decimals.',
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-500',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
      btnColor: 'bg-blue-600 hover:bg-blue-700 text-white',
      illustration: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md">
          {/* Measuring Jug Graphic */}
          <path d="M 25,20 L 75,20 L 70,85 C 70,90 65,92 60,92 L 40,92 C 35,92 30,90 30,85 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
          <path d="M 72,30 C 85,30 85,60 70,65" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
          {/* Water level */}
          <path d="M 31,50 Q 50,47 69,50 L 68,84 C 68,88 64,90 60,90 L 40,90 C 36,90 32,88 32,84 Z" fill="#38bdf8" opacity="0.8" />
          {/* Scale lines */}
          <line x1="32" y1="35" x2="42" y2="35" stroke="#0369a1" strokeWidth="2" />
          <line x1="32" y1="50" x2="40" y2="50" stroke="#0369a1" strokeWidth="2" />
          <line x1="32" y1="65" x2="42" y2="65" stroke="#0369a1" strokeWidth="2" />
          <text x="46" y="38" fontSize="8" fontWeight="bold" fill="#0369a1">1.0 L</text>
          <text x="44" y="53" fontSize="8" fontWeight="bold" fill="#0369a1">500 mL</text>
        </svg>
      )
    },
    {
      id: 'watch' as TabType,
      title: 'WATCH',
      subtitle: 'Learn through a video',
      description: 'Watch an engaging educational video showing real-life measuring cups, litres and millilitres in action.',
      icon: Tv,
      gradient: 'from-rose-500 to-red-500',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
      btnColor: 'bg-red-600 hover:bg-red-700 text-white',
      illustration: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md">
          <rect x="15" y="20" width="70" height="50" rx="8" fill="#fecdd3" stroke="#e11d48" strokeWidth="3" />
          <polygon points="42,32 64,45 42,58" fill="#e11d48" />
          <path d="M 30,75 L 30,88 C 30,90 35,90 35,90 L 45,90 C 45,90 50,90 50,88 L 50,75 Z" fill="#38bdf8" />
          <rect x="36" y="71" width="8" height="4" fill="#0284c7" />
        </svg>
      )
    },
    {
      id: 'explore' as TabType,
      title: 'EXPLORE',
      subtitle: 'Experiment with liquid measurements',
      description: 'Interactive simulation: Fill and pour 10 containers (10 mL to 100 mL) into a measuring jug with a live calculation panel!',
      icon: FlaskConical,
      gradient: 'from-emerald-500 to-teal-500',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      illustration: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md">
          <path d="M 15,25 L 35,25 L 32,55 C 32,58 28,60 25,60 L 25,60 C 22,60 18,58 18,55 Z" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
          <path d="M 18,35 L 32,35 L 30,53 C 30,55 27,56 25,56 C 23,56 20,55 20,53 Z" fill="#34d399" />
          <path d="M 32,45 C 45,45 50,55 55,65" stroke="#38bdf8" strokeWidth="4" strokeDasharray="3 3" fill="none" />
          <rect x="50" y="50" width="35" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
          <rect x="52" y="65" width="31" height="23" rx="2" fill="#38bdf8" />
        </svg>
      )
    },
    {
      id: 'game' as TabType,
      title: 'GAME',
      subtitle: 'Challenge your mathematical skills',
      description: 'Play 3 fun game modes: Match Measurements, Fill in Missing Values, and Beat Common Misconceptions!',
      icon: Gamepad2,
      gradient: 'from-amber-500 to-orange-500',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white',
      illustration: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md">
          <path d="M 30,25 L 70,25 L 65,55 C 65,65 58,70 50,70 C 42,70 35,65 35,55 Z" fill="#fef08a" stroke="#d97706" strokeWidth="3" />
          <rect x="44" y="70" width="12" height="15" fill="#d97706" />
          <rect x="30" y="85" width="40" height="8" rx="2" fill="#b45309" />
          <path d="M 50,32 C 45,42 42,48 42,53 C 42,58 46,61 50,61 C 54,61 58,58 58,53 C 58,48 55,42 50,32 Z" fill="#38bdf8" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-cyan-500 via-sky-500 to-blue-600 text-white p-8 md:p-12 shadow-xl shadow-cyan-200/60">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs md:text-sm font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Year 5 Mathematics Educational Innovation
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-md">
            Discover Litres and Millilitres!
          </h1>

          <p className="text-lg md:text-2xl text-cyan-100 font-medium max-w-2xl mx-auto leading-relaxed">
            Learn, watch, explore and play your way to understanding liquid measurement.
          </p>

          <div className="pt-4 flex justify-center">
            <Mascot
              message="Hello Year 5 Explorer! I'm Sploshy! Check out the conversion rules below or pick any section to start learning."
              mood="happy"
              size="lg"
            />
          </div>

        </div>

        {/* Decorative Floating Water Droplet SVG Background */}
        <div className="absolute -top-10 -right-10 opacity-15 pointer-events-none">
          <svg width="300" height="300" viewBox="0 0 100 100">
            <path d="M50 10 C30 45 15 60 15 75 A35 35 0 0 0 85 75 C85 60 70 45 50 10 Z" fill="white" />
          </svg>
        </div>
        <div className="absolute -bottom-10 -left-10 opacity-15 pointer-events-none">
          <svg width="250" height="250" viewBox="0 0 100 100">
            <path d="M50 10 C30 45 15 60 15 75 A35 35 0 0 0 85 75 C85 60 70 45 50 10 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* PROMINENT LEARNING CARD: Lesson A — Understanding Litres and Millilitres */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-cyan-200 shadow-xl space-y-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-cyan-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-cyan-600">
                Textbook Conversion Rules
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                Lesson A: Understanding Litres and Millilitres
              </h2>
            </div>
          </div>

          <div className="bg-cyan-50 border border-cyan-200 px-4 py-2 rounded-2xl flex items-center gap-2 text-cyan-800 font-extrabold text-sm shrink-0">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Golden Rule: 1 L = 1,000 mL</span>
          </div>
        </div>

        {/* Side-by-side Formulas (Desktop) / Vertical Stack (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {/* Formula 1: L to mL */}
          <div className="bg-gradient-to-b from-sky-50 to-blue-50/80 border-2 border-sky-200 rounded-3xl p-6 space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-xs">
                  Formula 1: Litres to Millilitres
                </span>
                <span className="text-xl font-black text-blue-600">L → mL</span>
              </div>

              {/* Prominent Formula */}
              <div className="bg-white border-2 border-blue-300 p-4 rounded-2xl text-center shadow-sm">
                <span className="text-2xl md:text-3xl font-black text-blue-900 tracking-tight">
                  L <span className="text-amber-500 font-black text-3xl md:text-4xl px-1">× 1,000</span> = mL
                </span>
              </div>

              {/* Worked Example */}
              <div className="bg-white/80 p-3.5 rounded-xl border border-blue-200 text-xs md:text-sm font-mono space-y-1">
                <p className="font-bold text-slate-800">Example:</p>
                <p className="text-blue-900 font-bold">0.3 L = 0.3 × 1,000 mL</p>
                <p className="text-emerald-700 font-extrabold">0.3 L = 300 mL</p>
              </div>

              {/* Pupil Explanation */}
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                &ldquo;When converting litres to millilitres, multiply the number of litres by 1,000 because 1 litre is equal to 1,000 millilitres.&rdquo;
              </p>
            </div>

            {/* Visual Direction Arrow */}
            <div className="pt-2 flex items-center justify-center gap-2 text-blue-700 font-bold text-xs bg-white/60 p-2.5 rounded-xl border border-blue-100">
              <span>Large Unit (L)</span>
              <ArrowRight className="w-4 h-4 text-amber-500" />
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-black">Multiply by 1,000</span>
              <ArrowRight className="w-4 h-4 text-amber-500" />
              <span>Small Unit (mL)</span>
            </div>
          </div>

          {/* Formula 2: mL to L */}
          <div className="bg-gradient-to-b from-teal-50 to-emerald-50/80 border-2 border-teal-200 rounded-3xl p-6 space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs">
                  Formula 2: Millilitres to Litres
                </span>
                <span className="text-xl font-black text-emerald-600">mL → L</span>
              </div>

              {/* Prominent Formula */}
              <div className="bg-white border-2 border-emerald-300 p-4 rounded-2xl text-center shadow-sm">
                <span className="text-2xl md:text-3xl font-black text-emerald-900 tracking-tight">
                  mL <span className="text-purple-600 font-black text-3xl md:text-4xl px-1">÷ 1,000</span> = L
                </span>
              </div>

              {/* Worked Example */}
              <div className="bg-white/80 p-3.5 rounded-xl border border-teal-200 text-xs md:text-sm font-mono space-y-1">
                <p className="font-bold text-slate-800">Example:</p>
                <p className="text-emerald-900 font-bold">500 mL = 500 ÷ 1,000 L</p>
                <p className="text-emerald-700 font-extrabold">500 mL = 0.5 L</p>
              </div>

              {/* Pupil Explanation */}
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                &ldquo;When converting millilitres to litres, divide the number of millilitres by 1,000 because 1,000 millilitres make 1 litre.&rdquo;
              </p>
            </div>

            {/* Visual Direction Arrow */}
            <div className="pt-2 flex items-center justify-center gap-2 text-emerald-700 font-bold text-xs bg-white/60 p-2.5 rounded-xl border border-teal-100">
              <span>Small Unit (mL)</span>
              <ArrowRight className="w-4 h-4 text-purple-600" />
              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 font-black">Divide by 1,000</span>
              <ArrowRight className="w-4 h-4 text-purple-600" />
              <span>Large Unit (L)</span>
            </div>
          </div>

        </div>

        {/* Visual Illustrations & Equipment Reminder Bar */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="flex items-center gap-4">
            {/* Jug & Bottle SVG Illustration */}
            <svg viewBox="0 0 120 80" className="w-24 h-16 drop-shadow-xs">
              {/* Measuring Jug */}
              <path d="M 10,15 L 50,15 L 45,70 L 15,70 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <path d="M 15,35 L 45,35 L 43,68 L 17,68 Z" fill="#38bdf8" />
              <text x="18" y="52" fontSize="7" fontWeight="bold" fill="#0369a1">1,000 mL</text>
              {/* Bottle */}
              <rect x="70" y="25" width="20" height="45" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <rect x="75" y="18" width="10" height="7" fill="#0369a1" />
              <rect x="71" y="40" width="18" height="28" fill="#38bdf8" />
              <text x="73" y="55" fontSize="6" fontWeight="bold" fill="white">1 L</text>
            </svg>
            <div>
              <span className="font-black text-slate-800 text-base block">Liquid Measurement Tools</span>
              <span className="text-xs text-slate-500 font-semibold">1-Litre Measuring Jugs & Water Bottles</span>
            </div>
          </div>

          <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block">Unit Equivalence</span>
            <span className="text-2xl font-black text-slate-900">1 L = 1,000 mL</span>
          </div>
        </div>

        {/* Interactive "Try an Example" Conversion Widget */}
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-lg border border-cyan-800 space-y-6">
          <div className="flex items-center gap-2 text-cyan-300">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-black">
              Try an Example Interactive Converter
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

            {/* Input & Selector Controls */}
            <div className="md:col-span-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-cyan-200 block">
                  1. Choose Conversion Direction:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConversionDirection('LtoML')}
                    className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      conversionDirection === 'LtoML'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>Litres to mL (× 1,000)</span>
                  </button>
                  <button
                    onClick={() => setConversionDirection('MLtoL')}
                    className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      conversionDirection === 'MLtoL'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>mL to Litres (÷ 1,000)</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-cyan-200 block">
                  2. Enter Numerical Value ({conversionDirection === 'LtoML' ? 'L' : 'mL'}):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value..."
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 text-white font-mono font-bold text-lg border border-slate-700 focus:outline-none focus:border-cyan-400"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                    {conversionDirection === 'LtoML' ? 'L' : 'mL'}
                  </span>
                </div>
              </div>
            </div>

            {/* Real-time Result Box */}
            <div className="md:col-span-6 bg-slate-800/90 border border-slate-700 p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-300 uppercase">
                <span>Calculation Step:</span>
                <ArrowRightLeft className="w-4 h-4 text-amber-400" />
              </div>

              {isValidNum ? (
                <div className="space-y-2">
                  <div className="p-3 bg-slate-900 rounded-xl font-mono text-cyan-200 font-bold text-sm md:text-base border border-slate-700/60">
                    {calculationSteps}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-400 font-bold">Answer:</span>
                    <span className="text-2xl font-black text-amber-400">
                      {calculatedResult}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-rose-400 text-xs font-semibold">
                  Please enter a valid positive number above.
                </p>
              )}
            </div>

          </div>
        </div>

      </section>

      {/* Main 4 Interactive Navigation Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800">
            Choose Your Learning Pathway
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            You can access any section in any order — learn at your own pace!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="group relative bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-lg shadow-slate-100 hover:shadow-2xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-2xl bg-cyan-50/80 border border-cyan-100 group-hover:scale-110 transition-transform">
                      {card.illustration}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${card.badgeBg}`}>
                      100% Interactive
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-cyan-600" />
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-cyan-600 transition-colors">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-sm font-bold text-cyan-700">
                      {card.subtitle}
                    </p>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab(card.id)}
                  className={`w-full py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200 group-hover:shadow-lg ${card.btnColor}`}
                >
                  <span>Open {card.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Assessment Shortcut Banner */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-800/60 text-purple-200 text-xs font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            Educational Evaluation
          </div>
          <h3 className="text-2xl font-black text-white">
            Ready to Test Your Knowledge?
          </h3>
          <p className="text-purple-200 text-sm max-w-xl">
            Take our interactive Assessment quiz! Perform a Pre-Test before learning and a Post-Test after exploring to measure your improvement in converting L and mL!
          </p>
        </div>

        <button
          onClick={() => setActiveTab('assessment')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-black text-sm flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 shrink-0 transform hover:scale-105 transition-all"
        >
          <Award className="w-5 h-5 text-amber-300" />
          <span>Start Assessment Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
