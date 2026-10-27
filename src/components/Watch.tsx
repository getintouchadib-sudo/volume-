import React, { useState } from 'react';
import { YOUTUBE_VIDEO_CONFIG } from '../config/videoConfig';
import { Mascot } from './Mascot';
import { Tv, ExternalLink, Info, CheckCircle2, Play, AlertCircle, RefreshCw, Lock, KeyRound, X } from 'lucide-react';

/**
 * Helper to extract 11-character YouTube Video ID from various link formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - Or raw 11-character ID
 */
const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const trimmed = url.trim();
  const match = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (match && match[1]) {
    return match[1];
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
};

export const Watch: React.FC = () => {
  // Initial default video URL or ID from configuration
  const defaultUrl = YOUTUBE_VIDEO_CONFIG.YOUTUBE_VIDEO_URL ||
    (YOUTUBE_VIDEO_CONFIG.YOUTUBE_VIDEO_ID ? `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_CONFIG.YOUTUBE_VIDEO_ID}` : '');

  const [inputUrl, setInputUrl] = useState<string>('');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(
    extractYouTubeId(defaultUrl) || extractYouTubeId(YOUTUBE_VIDEO_CONFIG.YOUTUBE_VIDEO_ID)
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [iframeError, setIframeError] = useState<boolean>(false);

  // Teacher Access Protection State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [accessCodeInput, setAccessCodeInput] = useState<string>('');
  const [modalError, setModalError] = useState<string | null>(null);
  const [isFormUnlocked, setIsFormUnlocked] = useState<boolean>(false);

  const TEACHER_ACCESS_CODE = '1234';

  const handleVerifyCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (accessCodeInput.trim() === TEACHER_ACCESS_CODE) {
      setIsFormUnlocked(true);
      setIsModalOpen(false);
      setAccessCodeInput('');
      setModalError(null);
    } else {
      setModalError('Incorrect access code. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAccessCodeInput('');
    setModalError(null);
  };

  const handleLoadVideo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setIframeError(false);

    if (!inputUrl.trim()) {
      setErrorMessage('Please paste a valid YouTube video link in the box.');
      return;
    }

    const extractedId = extractYouTubeId(inputUrl);
    if (extractedId) {
      setActiveVideoId(extractedId);
      setErrorMessage(null);
      // Re-hide the replacement form after loading video successfully
      setIsFormUnlocked(false);
      setInputUrl('');
    } else {
      setErrorMessage('Invalid YouTube URL! Please check your link (e.g., https://www.youtube.com/watch?v=...)');
    }
  };

  const currentWatchUrl = activeVideoId
    ? `https://www.youtube.com/watch?v=${activeVideoId}`
    : 'https://www.youtube.com';

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

      {/* Change Video Action & Protected Form */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-4">
        {!isFormUnlocked ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <Tv className="w-5 h-5 text-red-600" />
                Educational Video Lesson
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                Watch the embedded YouTube video below. Teachers can click &ldquo;Change Video&rdquo; to update the video source.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-all shrink-0 flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Change Video</span>
            </button>
          </div>
        ) : (
          /* Unlocked URL Form */
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-red-600" />
                Change / Paste Educational YouTube Video
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                Paste any YouTube video link below and click &ldquo;Load Video&rdquo; to update the video player instantly!
              </p>
            </div>

            <form onSubmit={handleLoadVideo} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Paste YouTube Video Link (e.g. https://www.youtube.com/watch?v=...)"
                  className="w-full py-3 px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 font-medium text-sm focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md hover:shadow-red-500/20 transition-all shrink-0 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Load Video</span>
              </button>
            </form>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Teacher Access Code Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border-2 border-slate-200 shadow-2xl space-y-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <KeyRound className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Teacher Access
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  Enter access code to unlock video settings
                </p>
              </div>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase text-slate-700 block">
                  Enter Access Code:
                </label>
                <input
                  type="password"
                  value={accessCodeInput}
                  onChange={(e) => setAccessCodeInput(e.target.value)}
                  placeholder="Enter code..."
                  autoFocus
                  className="w-full py-3 px-4 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 font-mono text-center text-lg font-bold focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              {modalError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all"
                >
                  Verify Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

          {activeVideoId && (
            <a
              href={currentWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 transition-colors shrink-0"
            >
              <ExternalLink className="w-4 h-4 text-red-600" />
              <span>Open on YouTube</span>
            </a>
          )}
        </div>

        {/* Player Box or Helpful Placeholder */}
        {activeVideoId && !iframeError ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-inner border-2 border-slate-200">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=0&rel=0`}
              title="Educational Liquid Measurement Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => setIframeError(true)}
            />
          </div>
        ) : (
          <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center space-y-6 border-2 border-slate-800 shadow-inner">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <Play className="w-10 h-10 ml-1" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h4 className="text-2xl font-black text-white">
                Add a YouTube video to start learning!
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Paste any YouTube video URL into the box above and click &ldquo;Load Video&rdquo; to embed it here!
              </p>
            </div>
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
