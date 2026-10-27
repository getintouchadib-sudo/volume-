import React, { useState } from 'react';
import { Mascot } from './Mascot';
import {
  FlaskConical,
  RotateCcw,
  Sparkles,
  Info,
  Layers
} from 'lucide-react';

export const Explore: React.FC = () => {
  // 10 glasses state: true = full (100 mL), false = empty (0 mL)
  // Prompt specifies initial state: 10 empty glasses and empty jug.
  const [glasses, setGlasses] = useState<boolean[]>(Array(10).fill(false));
  const [jugVolume, setJugVolume] = useState<number>(0); // in mL
  const [pouringGlassIndex, setPouringGlassIndex] = useState<number | null>(null);
  const [showConversionModal, setShowConversionModal] = useState<boolean>(false);

  const JUG_CAPACITY = 1000; // mL

  // Fill a single empty glass
  const fillGlass = (index: number) => {
    if (glasses[index]) return;
    const newGlasses = [...glasses];
    newGlasses[index] = true;
    setGlasses(newGlasses);
  };

  // Fill all 10 glasses
  const fillAllGlasses = () => {
    setGlasses(Array(10).fill(true));
  };

  // Pour water from a full glass into the jug
  const pourGlass = (index: number) => {
    if (!glasses[index]) return;
    if (jugVolume >= JUG_CAPACITY) return;

    setPouringGlassIndex(index);

    setTimeout(() => {
      const newGlasses = [...glasses];
      newGlasses[index] = false;
      setGlasses(newGlasses);
      setJugVolume(prev => Math.min(JUG_CAPACITY, prev + 100));
      setPouringGlassIndex(null);
    }, 600);
  };

  // Pour first available full glass
  const pourFirstFullGlass = () => {
    const idx = glasses.findIndex(g => g === true);
    if (idx !== -1 && jugVolume < JUG_CAPACITY) {
      pourGlass(idx);
    }
  };

  // Reset experiment
  const resetExperiment = () => {
    setGlasses(Array(10).fill(false));
    setJugVolume(0);
    setPouringGlassIndex(null);
  };

  // Conversions
  const litreValue = (jugVolume / 1000).toFixed(1);
  const fractionText = () => {
    if (jugVolume === 0) return '0 L';
    if (jugVolume === 100) return '1/10 L';
    if (jugVolume === 200) return '1/5 L';
    if (jugVolume === 250) return '1/4 L';
    if (jugVolume === 300) return '3/10 L';
    if (jugVolume === 400) return '2/5 L';
    if (jugVolume === 500) return '1/2 L';
    if (jugVolume === 600) return '3/5 L';
    if (jugVolume === 700) return '7/10 L';
    if (jugVolume === 750) return '3/4 L';
    if (jugVolume === 800) return '4/5 L';
    if (jugVolume === 900) return '9/10 L';
    if (jugVolume === 1000) return '1 L';
    return `${jugVolume}/1,000 L`;
  };

  const fullGlassesCount = glasses.filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <FlaskConical className="w-4 h-4 text-amber-300" />
            Hands-On Digital Simulation
          </div>
          <h2 className="text-3xl md:text-4xl font-black">
            EXPLORE: Water Jug & 10 Glasses Lab
          </h2>
          <p className="text-emerald-100 text-sm md:text-base max-w-xl">
            Fill the 100 mL glasses and pour them into the measuring jug. Watch the liquid level rise and observe live unit conversions!
          </p>
        </div>

        <Mascot
          message="Each glass holds 100 mL (0.1 L)! Fill a glass first, then click it to pour water into the jug!"
          mood="cheering"
          size="md"
        />
      </div>

      {/* Main Simulation Board */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-8">

        {/* Live Conversion Display Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 p-6 rounded-2xl text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4 border border-cyan-800">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Live Synchronised Volume Reading
            </span>
            <div className="text-3xl md:text-4xl font-black text-cyan-300 tracking-tight flex items-center justify-center md:justify-start gap-3">
              <span>{jugVolume} mL</span>
              <span className="text-slate-400 text-2xl">=</span>
              <span className="text-emerald-400">{litreValue} L</span>
              <span className="text-slate-400 text-2xl">=</span>
              <span className="text-amber-400">{fractionText()}</span>
            </div>
          </div>

          <button
            onClick={() => setShowConversionModal(true)}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Show Conversion Breakdown</span>
          </button>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={pourFirstFullGlass}
              disabled={fullGlassesCount === 0 || jugVolume >= JUG_CAPACITY}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Pour Water (+100 mL)</span>
            </button>

            <button
              onClick={fillAllGlasses}
              disabled={fullGlassesCount === 10}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Fill All 10 Glasses</span>
            </button>
          </div>

          <button
            onClick={resetExperiment}
            className="px-4 py-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300 font-bold text-xs transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Experiment</span>
          </button>
        </div>

        {/* Interactive Scene: Jug + 10 Glasses */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50/80 p-6 md:p-10 rounded-3xl border-2 border-slate-200">

          {/* Transparent Measuring Jug Graphic */}
          <div className="md:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-64 h-80 flex items-end justify-center">

              {/* SVG Jug */}
              <svg viewBox="0 0 200 250" className="w-full h-full drop-shadow-xl z-10">
                {/* Jug Base & Outline */}
                <path
                  d="M 40,20 L 160,20 L 150,220 C 150,230 140,235 130,235 L 70,235 C 60,235 50,230 50,220 Z"
                  fill="rgba(255, 255, 255, 0.4)"
                  stroke="#0284c7"
                  strokeWidth="5"
                  className="glass-reflection"
                />

                {/* Handle */}
                <path
                  d="M 155,40 C 190,40 190,180 150,195"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Liquid fill inside jug */}
                <g clipPath="url(#jugClip)">
                  <rect
                    x="40"
                    y={220 - (jugVolume / 1000) * 190}
                    width="120"
                    height={(jugVolume / 1000) * 190}
                    fill="#38bdf8"
                    opacity="0.85"
                    className="transition-all duration-500 ease-out"
                  />
                  {/* Wave surface line */}
                  {jugVolume > 0 && (
                    <line
                      x1="40"
                      y1={220 - (jugVolume / 1000) * 190}
                      x2="160"
                      y2={220 - (jugVolume / 1000) * 190}
                      stroke="#0284c7"
                      strokeWidth="3"
                    />
                  )}
                </g>

                {/* Jug Clip Path */}
                <clipPath id="jugClip">
                  <path d="M 42,22 L 158,22 L 148,218 C 148,228 138,233 128,233 L 72,233 C 62,233 52,228 52,218 Z" />
                </clipPath>

                {/* Measuring Scale Tick Marks & Labels */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const mLVal = i * 100;
                  const lVal = (mLVal / 1000).toFixed(1);
                  const yPos = 220 - (i / 10) * 190;
                  const isMajor = i % 5 === 0 || i === 10;

                  return (
                    <g key={i}>
                      <line
                        x1="50"
                        y1={yPos}
                        x2={isMajor ? "70" : "60"}
                        y2={yPos}
                        stroke="#0369a1"
                        strokeWidth={isMajor ? "2.5" : "1.5"}
                      />
                      {isMajor && (
                        <text
                          x="75"
                          y={yPos + 4}
                          fontSize="10"
                          fontWeight="bold"
                          fill="#0369a1"
                        >
                          {lVal} L ({mLVal} mL)
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Pouring Water Stream Animation */}
              {pouringGlassIndex !== null && (
                <div className="absolute top-0 right-10 w-2 h-44 bg-cyan-400 rounded-full animate-pulse z-20" />
              )}
            </div>

            <div className="text-center space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                1.0 Litre Measuring Jug
              </span>
              <p className="text-sm font-bold text-cyan-800">
                Current Level: {jugVolume} mL / 1,000 mL ({litreValue} L)
              </p>
            </div>
          </div>

          {/* 10 Small Glasses Grid */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-800 text-base">
                10 Small Glasses (100 mL Each)
              </h4>
              <span className="text-xs font-bold text-slate-500">
                {fullGlassesCount} / 10 Full
              </span>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {glasses.map((isFull, idx) => {
                const isPouring = pouringGlassIndex === idx;

                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center space-y-2 bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-xs hover:border-cyan-300 transition-all"
                  >
                    {/* Glass Graphic */}
                    <div
                      onClick={() => (isFull ? pourGlass(idx) : fillGlass(idx))}
                      className={`relative w-12 h-16 cursor-pointer transform hover:scale-110 transition-transform ${
                        isPouring ? 'animate-bounce' : ''
                      }`}
                      title={isFull ? "Click to Pour into Jug" : "Click to Fill Glass"}
                    >
                      <svg viewBox="0 0 50 70" className="w-full h-full drop-shadow-sm">
                        {/* Glass Body */}
                        <path
                          d="M 10,10 L 40,10 L 35,60 C 35,63 32,65 28,65 L 22,65 C 18,65 15,63 15,60 Z"
                          fill="rgba(255, 255, 255, 0.6)"
                          stroke="#0284c7"
                          strokeWidth="2.5"
                        />
                        {/* Water fill */}
                        {isFull && (
                          <path
                            d="M 11,20 L 39,20 L 35,59 C 35,61 32,63 28,63 L 22,63 C 18,63 15,61 15,59 Z"
                            fill="#38bdf8"
                            opacity="0.9"
                          />
                        )}
                      </svg>
                    </div>

                    {/* Button per Glass */}
                    {isFull ? (
                      <button
                        onClick={() => pourGlass(idx)}
                        disabled={jugVolume >= JUG_CAPACITY}
                        className="w-full py-1 px-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] transition-colors"
                      >
                        Pour
                      </button>
                    ) : (
                      <button
                        onClick={() => fillGlass(idx)}
                        className="w-full py-1 px-1 rounded-lg bg-cyan-100 hover:bg-cyan-200 text-cyan-800 font-bold text-[10px] border border-cyan-300 transition-colors"
                      >
                        Fill
                      </button>
                    )}

                    <span className="text-[10px] font-bold text-slate-500">
                      #{idx + 1} (100 mL)
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-500 italic text-center md:text-left">
              * Click any empty glass to fill it with 100 mL, or click any full glass to pour its water into the jug!
            </p>
          </div>

        </div>

        {/* Modal / Popup for Show Conversion Breakdown */}
        {showConversionModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border-2 border-slate-100 space-y-6 animate-scaleUp">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-cyan-700">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-black text-slate-900">
                    Conversion Breakdown
                  </h3>
                </div>
                <button
                  onClick={() => setShowConversionModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Here is how the current jug reading converts across units:
                </p>

                <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-800 border-b border-slate-200 pb-2">
                    <span>Millilitre Value (mL):</span>
                    <span className="text-cyan-700 text-base">{jugVolume} mL</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-slate-800 border-b border-slate-200 pb-2">
                    <span>Decimal Litre Value (L):</span>
                    <span className="text-emerald-700 text-base">{litreValue} L</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                    <span>Fractional Litre Value (L):</span>
                    <span className="text-amber-700 text-base">{fractionText()}</span>
                  </div>
                </div>

                <div className="bg-cyan-50 p-4 rounded-xl text-xs text-cyan-900 space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <Info className="w-4 h-4 text-cyan-600" />
                    Remember:
                  </p>
                  <p>100 mL = 0.1 L = 1/10 L</p>
                  <p>500 mL = 0.5 L = 1/2 L</p>
                  <p>1,000 mL = 1.0 L = 1 L</p>
                </div>
              </div>

              <button
                onClick={() => setShowConversionModal(false)}
                className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm transition-colors"
              >
                Close & Return to Simulation
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
