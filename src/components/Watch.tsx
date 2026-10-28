import React from 'react';
import { YOUTUBE_VIDEO_CONFIG } from '../config/videoConfig';
import { Mascot } from './Mascot';
import { Tv, ExternalLink, Info, CheckCircle2 } from 'lucide-react';

export const Watch: React.FC = () => {
  const videoId = YOUTUBE_VIDEO_CONFIG.YOUTUBE_VIDEO_ID;
  const currentWatchUrl = YOUTUBE_VIDEO_CONFIG.YOUTUBE_VIDEO_URL;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <Tv className="w-4 h-4 text-amber-300" />
            Video Lesson
          </div>
          <h2 className="text-3xl md:text-4xl font-black">
            Watch and Learn
          </h2>
          <p className="text-rose-100 text-sm md:text-base max-w-xl">
            {YOUTUBE_VIDEO_CONFIG.DESCRIPTION}
          </p>
        </div>

        <Mascot
          message="Watching liquid measurement in action helps you visualize how 1,000 mL fills up a 1 L container!"
          mood="happy"
          size="md"
        />
      </div>

      {/* Main Responsive Video Container */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900">
              {YOUTUBE_VIDEO_CONFIG.TITLE}
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Target Standard: DSKP 5.3.1 Volume Unit Conversion
            </p>
          </div>

          <a
            href={currentWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 transition-colors shrink-0"
          >
            <ExternalLink className="w-4 h-4 text-red-600" />
            <span>Open on YouTube</span>
          </a>
        </div>

        {/* Embedded YouTube Responsive Player */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-inner border-2 border-slate-200">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
            title="Educational Liquid Measurement Video"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Observation Guide for Pupils */}
        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-6 space-y-3">
          <h4 className="font-bold text-cyan-900 text-base flex items-center gap-2">
            <Info className="w-5 h-5 text-cyan-600" />
            What Should You Observe While Watching?
          </h4>
          <ul className="space-y-2 text-xs md:text-sm text-cyan-950 font-medium">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <span>Notice how 1 full litre container holds 1,000 mL.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <span>Observe how half a jug (500 mL) equals 0.5 L or 1/2 L.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <span>See how measuring cups with mL markings convert directly into L units!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
