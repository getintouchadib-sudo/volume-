import React from 'react';
import { Sparkles } from 'lucide-react';

interface MascotProps {
  message?: string;
  mood?: 'happy' | 'thinking' | 'cheering' | 'explaining';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  message,
  mood = 'happy',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-28 h-28 text-5xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Mascot Graphic Avatar */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-1 shadow-lg shadow-cyan-200 flex items-center justify-center text-white select-none animate-bounce-slow transform hover:scale-110 transition-transform`}
      >
        {/* Animated Water Droplet Mascot Graphic */}
        <div className="w-full h-full rounded-full bg-cyan-300/30 flex items-center justify-center relative overflow-hidden">
          {/* Eyes & Smile SVG SVG Graphic */}
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 drop-shadow-md">
            {/* Droplet Body */}
            <path
              d="M50 10 C30 45 15 60 15 75 A35 35 0 0 0 85 75 C85 60 70 45 50 10 Z"
              fill="url(#dropletGradient)"
            />
            {/* Shine */}
            <path
              d="M35 55 A15 15 0 0 1 50 42"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            {/* Eyes */}
            <circle cx="38" cy="65" r="4" fill="#0f172a" />
            <circle cx="62" cy="65" r="4" fill="#0f172a" />
            <circle cx="40" cy="63" r="1.5" fill="white" />
            <circle cx="64" cy="63" r="1.5" fill="white" />
            {/* Cheeks */}
            <circle cx="30" cy="72" r="3" fill="#f43f5e" opacity="0.6" />
            <circle cx="70" cy="72" r="3" fill="#f43f5e" opacity="0.6" />
            {/* Smile / Expression */}
            {mood === 'happy' || mood === 'cheering' ? (
              <path d="M42 74 Q50 82 58 74" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            ) : mood === 'thinking' ? (
              <circle cx="50" cy="76" r="3" fill="#0f172a" />
            ) : (
              <path d="M44 76 Q50 72 56 76" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            )}
            <defs>
              <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-white"></span>
        </span>
      </div>

      {/* Speech Bubble */}
      {message && (
        <div className="relative bg-white border-2 border-cyan-200 rounded-2xl p-3 shadow-md text-slate-700 text-sm md:text-base font-medium max-w-xs md:max-w-md">
          {/* Bubble Tail */}
          <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-cyan-200" />
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-y-6 border-y-transparent border-r-6 border-r-white" />
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
