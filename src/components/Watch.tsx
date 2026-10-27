import React, { useState } from 'react';
import { YOUTUBE_VIDEO_CONFIG } from '../config/videoConfig';
import { Mascot } from './Mascot';
import { Tv, ExternalLink, Info, Code, Play, CheckCircle2 } from 'lucide-react';

export const Watch: React.FC = () => {
  const [iframeError, setIframeError] = useState(false);
  const videoId = YOUTUBE_VIDEO_CONFIG.YOUTUBE_VIDEO_ID.trim();
  const videoUrl = YOUTUBE_VIDEO_CONFIG.YOUTUBE_VIDEO_URL.trim() || `https://www.youtube.com/watch?v=${videoId}`;

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
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 transition-colors shrink-0"
          >
            <ExternalLink className="w-4 h-4 text-red-600" />
            <span>Open on YouTube</span>
          </a>
        </div>

        {/* Player Box or Placeholder */}
        {videoId && !iframeError ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-inner border-2 border-slate-200">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0`}
              title="Educational Liquid Measurement Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => setIframeError(true)}
            />
          </div>
        ) : (
          /* Placeholder / Error instructions when video ID is missing or blocked */
          <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center space-y-6 border-2 border-slate-800 shadow-inner">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <Play className="w-10 h-10 ml-1" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h4 className="text-2xl font-black text-white">
                YouTube Video Player Placeholder
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                No YouTube Video ID is currently loaded, or embedded playback is restricted.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Code className="w-4 h-4" />
                <span>How to Add / Replace YouTube Video:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 font-mono">
                <li>Open <strong className="text-cyan-400">src/config/videoConfig.ts</strong></li>
                <li>Set <strong className="text-cyan-400">YOUTUBE_VIDEO_ID</strong> to your video ID</li>
                <li>Save file & player updates instantly!</li>
              </ol>
            </div>

            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Watch Video Directly on YouTube</span>
            </a>
          </div>
        )}

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
