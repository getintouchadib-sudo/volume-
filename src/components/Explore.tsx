import React, { useState } from 'react';
import { Mascot } from './Mascot';
import {
  FlaskConical,
  RotateCcw,
  Sparkles,
  Info,
  Calculator,
  Droplets,
  ArrowRight
} from 'lucide-react';

interface ContainerData {
  id: number; // 1 to 10
  capacity: number; // 10 mL to 100 mL
  isFull: boolean;
}

export const Explore: React.FC = () => {
  // 10 containers with capacities 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 mL
  // Initial state: all containers empty (isFull: false)
  const initialContainers: ContainerData[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    capacity: (i + 1) * 10,
    isFull: false
  }));

  const [containers, setContainers] = useState<ContainerData[]>(initialContainers);
  const [jugVolume, setJugVolume] = useState<number>(0); // total mL in jug
  const [pouredHistory, setPouredHistory] = useState<number[]>([]); // list of poured amounts
  const [selectedContainerId, setSelectedContainerId] = useState<number | null>(1);
  const [pouringContainerId, setPouringContainerId] = useState<number | null>(null);

  const JUG_CAPACITY = 1000; // 1.0 L capacity

  // Fill a selected container to its full capacity
  const fillContainer = (id: number) => {
    setContainers(prev =>
      prev.map(c => (c.id === id ? { ...c, isFull: true } : c))
    );
  };

  // Pour water from a full container into the jug
  const pourContainer = (id: number) => {
    const container = containers.find(c => c.id === id);
    if (!container || !container.isFull) return;
    if (jugVolume >= JUG_CAPACITY) return;

    setPouringContainerId(id);

    setTimeout(() => {
      setContainers(prev =>
        prev.map(c => (c.id === id ? { ...c, isFull: false } : c))
      );
      const addedAmount = container.capacity;
      setJugVolume(prev => Math.min(JUG_CAPACITY, prev + addedAmount));
      setPouredHistory(prev => [...prev, addedAmount]);
      setPouringContainerId(null);
    }, 600);
  };

  // Reset experiment
  const resetExperiment = () => {
    setContainers(initialContainers);
    setJugVolume(0);
    setPouredHistory([]);
    setSelectedContainerId(1);
    setPouringContainerId(null);
  };

  // Litre conversion calculation
  const totalL = (jugVolume / 1000).toFixed(2).replace(/\.?0+$/, '');
  const formattedL = jugVolume === 0 ? '0 L' : `${totalL} L`;

  // Dynamic Calculation Panel Strings
  const additionString = pouredHistory.length > 0
    ? `${pouredHistory.map(v => `${v} mL`).join(' + ')} = ${jugVolume} mL`
    : '0 mL';

  const divisionString = `${jugVolume} ÷ 1,000 = ${formattedL}`;
  const finalStatement = `${jugVolume} mL = ${formattedL}`;

  const selectedContainer = containers.find(c => c.id === selectedContainerId) || containers[0];

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
            EXPLORE: Measuring Jug & 10 Containers Lab
          </h2>
          <p className="text-emerald-100 text-sm md:text-base max-w-xl">
            Fill containers (10 mL to 100 mL) and pour them into the measuring jug. Watch the liquid level rise and inspect the live calculation panel!
          </p>
        </div>

        <Mascot
          message="Select any container (10 mL to 100 mL), fill it up, and pour its water into the jug to observe unit conversions!"
          mood="cheering"
          size="md"
        />
      </div>

      {/* Reset & Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl border-2 border-slate-100 shadow-sm">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-cyan-600" />
          <span className="font-extrabold text-slate-800 text-sm md:text-base">
            Measuring Experiment Status: {jugVolume} mL ({formattedL})
          </span>
        </div>

        <button
          onClick={resetExperiment}
          className="px-5 py-2.5 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs border border-rose-300 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Experiment</span>
        </button>
      </div>

      {/* Main Simulation Layout: Jug + Automatic Calculation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Transparent Measuring Jug */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6 flex flex-col items-center">
          <div className="text-center space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-600">
              1.0 Litre Capacity Transparent Jug
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Measuring Jug Level
            </h3>
          </div>

          <div className="relative w-64 h-84 flex items-end justify-center">
            {/* SVG Jug */}
            <svg viewBox="0 0 200 260" className="w-full h-full drop-shadow-xl z-10">
              {/* Jug Base & Outline */}
              <path
                d="M 40,20 L 160,20 L 150,230 C 150,240 140,245 130,245 L 70,245 C 60,245 50,240 50,230 Z"
                fill="rgba(255, 255, 255, 0.4)"
                stroke="#0284c7"
                strokeWidth="5"
                className="glass-reflection"
              />

              {/* Handle */}
              <path
                d="M 155,40 C 195,40 195,190 150,205"
                fill="none"
                stroke="#0284c7"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Liquid fill inside jug */}
              <g clipPath="url(#jugClipMain)">
                <rect
                  x="40"
                  y={230 - (jugVolume / 1000) * 200}
                  width="120"
                  height={(jugVolume / 1000) * 200}
                  fill="#38bdf8"
                  opacity="0.85"
                  className="transition-all duration-500 ease-out"
                />
                {/* Surface line */}
                {jugVolume > 0 && (
                  <line
                    x1="40"
                    y1={230 - (jugVolume / 1000) * 200}
                    x2="160"
                    y2={230 - (jugVolume / 1000) * 200}
                    stroke="#0284c7"
                    strokeWidth="3"
                  />
                )}
              </g>

              {/* Jug Clip Path */}
              <clipPath id="jugClipMain">
                <path d="M 42,22 L 158,22 L 148,228 C 148,238 138,243 128,243 L 72,243 C 62,243 52,238 52,228 Z" />
              </clipPath>

              {/* Scale Ticks & Labels (0 L to 1.0 L) */}
              {Array.from({ length: 11 }).map((_, i) => {
                const mLVal = i * 100;
                const lVal = (mLVal / 1000).toFixed(1);
                const yPos = 230 - (i / 10) * 200;
                const isMajor = i % 2 === 0;

                return (
                  <g key={i}>
                    <line
                      x1="50"
                      y1={yPos}
                      x2={isMajor ? "72" : "62"}
                      y2={yPos}
                      stroke="#0369a1"
                      strokeWidth={isMajor ? "2.5" : "1.5"}
                    />
                    {isMajor && (
                      <text
                        x="76"
                        y={yPos + 4}
                        fontSize="9"
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

            {/* Pouring Stream Animation */}
            {pouringContainerId !== null && (
              <div className="absolute top-0 right-10 w-2.5 h-48 bg-cyan-400 rounded-full animate-pulse z-20" />
            )}
          </div>

          <div className="text-center space-y-1 bg-cyan-50 p-4 rounded-2xl border border-cyan-200 w-full">
            <span className="text-xs font-bold text-cyan-800 uppercase block">
              Current Liquid Volume
            </span>
            <p className="text-2xl font-black text-slate-900">
              {jugVolume} mL / 1,000 mL ({formattedL})
            </p>
          </div>
        </div>

        {/* Right Column: Automatic Calculation Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-cyan-800 space-y-6">

            <div className="flex items-center justify-between border-b border-cyan-800 pb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-black text-white">
                  Automatic Calculation Panel
                </h3>
              </div>
              <span className="px-3 py-1 bg-cyan-900 text-cyan-300 rounded-full text-xs font-bold border border-cyan-700">
                Live Dynamic Updates
              </span>
            </div>

            {/* 1. Total Volume in mL */}
            <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase text-cyan-300 block">
                1. Total Volume in Millilitres (mL):
              </span>
              <p className="font-mono text-base md:text-lg font-bold text-white bg-slate-900 p-3 rounded-xl border border-slate-700">
                {additionString}
              </p>
            </div>

            {/* 2. Conversion Operation */}
            <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase text-emerald-300 block">
                2. Conversion Operation (mL ÷ 1,000 = L):
              </span>
              <p className="font-mono text-base md:text-lg font-bold text-emerald-300 bg-slate-900 p-3 rounded-xl border border-slate-700">
                {divisionString}
              </p>
            </div>

            {/* 3. Final Conversion Statement */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl text-slate-950 space-y-1 shadow-md">
              <span className="text-xs font-black uppercase tracking-wider block opacity-90">
                3. Final Result:
              </span>
              <p className="text-2xl font-black">
                {finalStatement}
              </p>
            </div>

            {/* Educational Encouragement Note */}
            {jugVolume > 0 && (
              <div className="bg-emerald-950/80 border border-emerald-500/40 p-4 rounded-2xl text-emerald-200 text-xs md:text-sm font-bold flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
                <span>Great! You have measured {formattedL} ({jugVolume} mL) of water in the jug!</span>
              </div>
            )}

          </div>

          {/* Quick Selected Container Action Box */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-800 text-base">
                Selected Container Action
              </h4>
              <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold">
                Container #{selectedContainer.id} ({selectedContainer.capacity} mL)
              </span>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-slate-500 block">Status</span>
                <span className={`px-3 py-1 rounded-lg text-xs font-black ${
                  selectedContainer.isFull ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {selectedContainer.isFull ? 'FULL (Water Loaded)' : 'EMPTY'}
                </span>
              </div>

              <div className="flex-1 flex gap-2">
                {!selectedContainer.isFull ? (
                  <button
                    onClick={() => fillContainer(selectedContainer.id)}
                    className="flex-1 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Droplets className="w-4 h-4" />
                    <span>Fill Container ({selectedContainer.capacity} mL)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => pourContainer(selectedContainer.id)}
                    disabled={jugVolume >= JUG_CAPACITY}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>Pour into Jug (+{selectedContainer.capacity} mL)</span>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* TEN DISTINCT MEASURING CONTAINERS GRID (10 mL to 100 mL) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              Ten Measuring Containers (10 mL to 100 mL)
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Click any container below to select, fill, and pour water into the measuring jug!
            </p>
          </div>
          <span className="text-xs font-extrabold text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-full border border-cyan-200">
            Exactly 10 Distinct Capacities
          </span>
        </div>

        {/* 10 Containers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3">
          {containers.map((c) => {
            const isSelected = selectedContainerId === c.id;
            const isPouring = pouringContainerId === c.id;

            return (
              <div
                key={c.id}
                onClick={() => setSelectedContainerId(c.id)}
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between space-y-2 ${
                  isSelected
                    ? 'bg-cyan-50 border-cyan-500 shadow-md scale-105'
                    : 'bg-slate-50/80 border-slate-200 hover:border-cyan-300'
                }`}
              >
                <span className="text-[10px] font-black uppercase text-slate-500">
                  #{c.id}
                </span>

                {/* Container Visual SVG with height scaled by capacity */}
                <div className={`relative w-10 h-20 flex items-end justify-center ${isPouring ? 'animate-bounce' : ''}`}>
                  <svg viewBox="0 0 40 80" className="w-full h-full drop-shadow-xs">
                    {/* Glass Container Outer Body */}
                    <path
                      d="M 5,10 L 35,10 L 32,72 C 32,75 29,77 25,77 L 15,77 C 11,77 8,75 8,72 Z"
                      fill="rgba(255, 255, 255, 0.7)"
                      stroke="#0284c7"
                      strokeWidth="2"
                    />

                    {/* Scale Markings depending on capacity */}
                    <line x1="8" y1={75 - (c.capacity / 100) * 60} x2="18" y2={75 - (c.capacity / 100) * 60} stroke="#0369a1" strokeWidth="2" />

                    {/* Water Fill */}
                    {c.isFull && (
                      <path
                        d={`M 6,${75 - (c.capacity / 100) * 60} L 34,${75 - (c.capacity / 100) * 60} L 31,71 C 31,73 28,75 24,75 L 16,75 C 12,75 9,73 9,71 Z`}
                        fill="#38bdf8"
                        opacity="0.9"
                      />
                    )}
                  </svg>
                </div>

                <div className="text-center space-y-0.5 w-full">
                  <span className="text-xs font-black text-slate-800 block">
                    {c.capacity} mL
                  </span>
                  <span className="text-[9px] font-extrabold text-slate-400 block">
                    ({(c.capacity / 1000).toFixed(2)} L)
                  </span>
                </div>

                {/* Individual Action Buttons */}
                {!c.isFull ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedContainerId(c.id);
                      fillContainer(c.id);
                    }}
                    className="w-full py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-black text-[10px] transition-colors"
                  >
                    Fill
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedContainerId(c.id);
                      pourContainer(c.id);
                    }}
                    disabled={jugVolume >= JUG_CAPACITY}
                    className="w-full py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] transition-colors disabled:opacity-40"
                  >
                    Pour
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-cyan-50 border border-cyan-200 p-4 rounded-2xl text-xs text-cyan-900 space-y-1">
          <p className="font-bold flex items-center gap-1">
            <Info className="w-4 h-4 text-cyan-600" />
            Educational Goal:
          </p>
          <p>
            Observe how different container amounts (e.g. 10 mL = 0.01 L, 50 mL = 0.05 L, 100 mL = 0.1 L) convert directly to decimal litres when poured into the jug!
          </p>
        </div>
      </div>
    </div>
  );
};
