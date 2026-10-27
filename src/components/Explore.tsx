import React, { useState } from 'react';
import { Mascot } from './Mascot';
import {
  FlaskConical,
  RotateCcw,
  Info,
  Calculator,
  Droplets,
  CheckCircle2
} from 'lucide-react';

interface ContainerData {
  id: number; // 1 to 10
  capacity: number; // 10 mL to 100 mL
}

export const Explore: React.FC = () => {
  // 10 containers with capacities 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 mL
  const containers: ContainerData[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    capacity: (i + 1) * 10
  }));

  const [jugVolume, setJugVolume] = useState<number>(0); // total mL in jug
  const [pouredHistory, setPouredHistory] = useState<number[]>([]); // list of poured amounts
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // multi-selected container IDs
  const [isPouring, setIsPouring] = useState<boolean>(false);

  const JUG_CAPACITY = 1000; // 1.0 L capacity

  // Toggle container selection
  const toggleSelectContainer = (id: number) => {
    if (isPouring) return;
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  // Calculate sum of currently selected volumes
  const selectedContainers = containers.filter(c => selectedIds.includes(c.id));
  const selectedTotalVolume = selectedContainers.reduce((sum, c) => sum + c.capacity, 0);

  // Pour all selected containers into the jug simultaneously
  const handlePourSelected = () => {
    if (selectedIds.length === 0 || isPouring || jugVolume >= JUG_CAPACITY) return;

    setIsPouring(true);

    const volumesToAdd = selectedContainers.map(c => c.capacity);

    setTimeout(() => {
      setJugVolume(prev => Math.min(JUG_CAPACITY, prev + selectedTotalVolume));
      setPouredHistory(prev => [...prev, ...volumesToAdd]);
      setSelectedIds([]);
      setIsPouring(false);
    }, 700);
  };

  // Reset experiment
  const resetExperiment = () => {
    setJugVolume(0);
    setPouredHistory([]);
    setSelectedIds([]);
    setIsPouring(false);
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
            Select multiple containers (10 mL to 100 mL) and click the full-width Fill button at the bottom to pour them into the jug simultaneously!
          </p>
        </div>

        <Mascot
          message="Click containers to select them, then press the Fill button at the bottom to pour water together into the jug!"
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

      {/* TOP ROW: Large Measuring Jug (Left) & Ten Measuring Glasses (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* TOP ROW LEFT: Large Transparent Measuring Jug */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6 flex flex-col items-center justify-between">
          <div className="text-center space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-600">
              1.0 Litre Capacity Jug
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Measuring Jug
            </h3>
          </div>

          <div className="relative w-60 h-80 flex items-end justify-center">
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
            {isPouring && (
              <div className="absolute top-0 right-10 w-3 h-52 bg-cyan-400 rounded-full animate-pulse z-20" />
            )}
          </div>

          <div className="text-center space-y-1 bg-cyan-50 p-3.5 rounded-2xl border border-cyan-200 w-full">
            <span className="text-xs font-bold text-cyan-800 uppercase block">
              Current Liquid Volume
            </span>
            <p className="text-2xl font-black text-slate-900">
              {jugVolume} mL / 1,000 mL ({formattedL})
            </p>
          </div>
        </div>

        {/* TOP ROW RIGHT: Ten Measuring Glasses & One Full-Width Fill Button at Bottom */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Ten Measuring Glasses
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Click containers to select/deselect them for pouring together.
                </p>
              </div>
              <span className="text-xs font-extrabold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 shrink-0">
                {selectedIds.length} Selected ({selectedTotalVolume} mL)
              </span>
            </div>

            {/* 10 Glasses Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {containers.map((c) => {
                const isSelected = selectedIds.includes(c.id);

                return (
                  <div
                    key={c.id}
                    onClick={() => toggleSelectContainer(c.id)}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between space-y-2 relative ${
                      isSelected
                        ? 'bg-cyan-100/80 border-cyan-500 shadow-md ring-2 ring-cyan-400 scale-102'
                        : 'bg-slate-50/80 border-slate-200 hover:border-cyan-300'
                    }`}
                  >
                    {/* Visual Checked Badge */}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 text-cyan-700">
                        <CheckCircle2 className="w-4 h-4 fill-cyan-500 text-white" />
                      </div>
                    )}

                    <span className="text-[10px] font-black uppercase text-slate-500">
                      #{c.id}
                    </span>

                    {/* SVG Glass Container */}
                    <div className={`relative w-8 h-16 flex items-end justify-center ${isPouring && isSelected ? 'animate-bounce' : ''}`}>
                      <svg viewBox="0 0 40 80" className="w-full h-full drop-shadow-xs">
                        <path
                          d="M 5,10 L 35,10 L 32,72 C 32,75 29,77 25,77 L 15,77 C 11,77 8,75 8,72 Z"
                          fill="rgba(255, 255, 255, 0.7)"
                          stroke="#0284c7"
                          strokeWidth="2"
                        />
                        <line x1="8" y1={75 - (c.capacity / 100) * 60} x2="18" y2={75 - (c.capacity / 100) * 60} stroke="#0369a1" strokeWidth="2" />
                        <path
                          d={`M 6,${75 - (c.capacity / 100) * 60} L 34,${75 - (c.capacity / 100) * 60} L 31,71 C 31,73 28,75 24,75 L 16,75 C 12,75 9,73 9,71 Z`}
                          fill="#38bdf8"
                          opacity={isSelected ? "0.95" : "0.6"}
                        />
                      </svg>
                    </div>

                    <div className="text-center w-full">
                      <span className="text-xs font-black text-slate-800 block">
                        {c.capacity} mL
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ONE FULL-WIDTH FILL BUTTON AT VERY BOTTOM OF CONTAINER AREA */}
          <div className="pt-2">
            <button
              onClick={handlePourSelected}
              disabled={selectedIds.length === 0 || isPouring || jugVolume >= JUG_CAPACITY}
              className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-3 ${
                selectedIds.length > 0 && !isPouring && jugVolume < JUG_CAPACITY
                  ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white hover:shadow-cyan-500/25 active:scale-99'
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
              }`}
            >
              <Droplets className={`w-5 h-5 ${isPouring ? 'animate-spin' : ''}`} />
              <span>
                {isPouring
                  ? 'Pouring Water into Jug...'
                  : jugVolume >= JUG_CAPACITY
                  ? 'Jug is Full (1,000 mL Max Capacity)'
                  : selectedIds.length === 0
                  ? 'Select Containers Above to Pour'
                  : `Fill & Pour ${selectedIds.length} Selected Container${selectedIds.length > 1 ? 's' : ''} (${selectedTotalVolume} mL) into Jug`}
              </span>
            </button>
          </div>

        </div>

      </div>

      {/* BOTTOM ROW: Automatic Calculation Panel (Spans Full Available Width) */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-cyan-800 space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-800 pb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl md:text-2xl font-black text-white">
              AUTOMATIC CALCULATION PANEL
            </h3>
          </div>
          <span className="px-3 py-1 bg-cyan-900 text-cyan-300 rounded-full text-xs font-bold border border-cyan-700 shrink-0">
            Live Synchronized Conversion
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Total Volume in mL */}
          <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl space-y-2 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase text-cyan-300 block">
              1. Total Volume in Millilitres (mL):
            </span>
            <p className="font-mono text-base md:text-lg font-bold text-white bg-slate-900 p-3 rounded-xl border border-slate-700 break-all">
              {additionString}
            </p>
          </div>

          {/* 2. Conversion Operation */}
          <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl space-y-2 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase text-emerald-300 block">
              2. Conversion Operation (mL ÷ 1,000 = L):
            </span>
            <p className="font-mono text-base md:text-lg font-bold text-emerald-300 bg-slate-900 p-3 rounded-xl border border-slate-700">
              {divisionString}
            </p>
          </div>

          {/* 3. Final Result */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 rounded-2xl text-slate-950 space-y-1 shadow-md flex flex-col justify-between">
            <span className="text-xs font-black uppercase tracking-wider block opacity-90">
              3. Final Statement:
            </span>
            <p className="text-2xl md:text-3xl font-black">
              {finalStatement}
            </p>
          </div>
        </div>

        {/* Educational Note */}
        <div className="bg-cyan-950/80 border border-cyan-800 p-4 rounded-2xl text-cyan-200 text-xs md:text-sm font-medium flex items-center gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            Notice how pouring water automatically accumulates millilitres and converts directly into litres using <strong>mL ÷ 1,000 = L</strong>!
          </span>
        </div>

      </div>
    </div>
  );
};
