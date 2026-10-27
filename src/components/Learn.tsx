import React, { useState } from 'react';
import { Mascot } from './Mascot';
import {
  BookOpen,
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LessonData {
  id: string;
  title: string;
  subtitle: string;
  ruleBadge?: string;
  ruleText?: string;
  content: React.ReactNode;
  practiceQuestions: PracticeQuestion[];
}

export const Learn: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState<string>('lesson-a');
  const [revealedSteps, setRevealedSteps] = useState<Record<string, boolean>>({});
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});

  const toggleStep = (stepKey: string) => {
    setRevealedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
    // reset submission state for this question when changing selection
    setSubmittedAnswers(prev => ({ ...prev, [questionId]: false }));
  };

  const handleCheckAnswer = (questionId: string) => {
    if (userAnswers[questionId] !== undefined) {
      setSubmittedAnswers(prev => ({ ...prev, [questionId]: true }));
    }
  };

  // Lessons Data
  const lessons: LessonData[] = [
    {
      id: 'lesson-a',
      title: 'Lesson A: Understanding Litres and Millilitres',
      subtitle: 'Fundamental units of liquid volume and key conversion formulas',
      ruleBadge: 'KEY RELATIONSHIP',
      ruleText: '1 Litre (L) = 1,000 Millilitres (mL)',
      content: (
        <div className="space-y-8">
          <p className="text-slate-700 leading-relaxed text-base md:text-lg">
            Litres (<strong className="text-blue-600 font-bold">L</strong>) and millilitres (
            <strong className="text-cyan-600 font-bold">mL</strong>) are standard units used in Mathematics to measure the volume or capacity of liquids.
          </p>

          {/* Golden Rule Relationship Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-3xl text-white shadow-lg text-center space-y-2">
            <span className="text-xs font-black tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full">
              Golden Relationship
            </span>
            <div className="text-3xl md:text-5xl font-black tracking-tight">
              1 L = 1,000 mL
            </div>
            <p className="text-cyan-100 text-sm md:text-base font-medium">
              One full litre always contains exactly one thousand millilitres!
            </p>
          </div>

          {/* Section: Formulas Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Converting Litres to Millilitres */}
            <div className="bg-gradient-to-b from-sky-50 to-blue-50/80 border-2 border-sky-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-xs">
                  Converting Litres to Millilitres
                </span>
                <span className="text-lg font-black text-blue-600">L → mL</span>
              </div>

              <div className="bg-white border-2 border-blue-300 p-4 rounded-2xl text-center shadow-xs">
                <span className="text-2xl md:text-3xl font-black text-blue-900 tracking-tight">
                  L <span className="text-amber-500 font-black text-3xl md:text-4xl px-1">× 1,000</span> = mL
                </span>
              </div>

              <div className="bg-white/90 p-3.5 rounded-xl border border-blue-200 text-xs md:text-sm font-mono space-y-1">
                <p className="font-bold text-slate-800">Example:</p>
                <p className="text-blue-900 font-bold">0.3 L = 0.3 × 1,000 mL = 300 mL</p>
              </div>

              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                &ldquo;When converting litres to millilitres, multiply by 1,000 because one litre is equal to 1,000 millilitres.&rdquo;
              </p>
            </div>

            {/* Converting Millilitres to Litres */}
            <div className="bg-gradient-to-b from-teal-50 to-emerald-50/80 border-2 border-teal-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs">
                  Converting Millilitres to Litres
                </span>
                <span className="text-lg font-black text-emerald-600">mL → L</span>
              </div>

              <div className="bg-white border-2 border-emerald-300 p-4 rounded-2xl text-center shadow-xs">
                <span className="text-2xl md:text-3xl font-black text-emerald-900 tracking-tight">
                  mL <span className="text-purple-600 font-black text-3xl md:text-4xl px-1">÷ 1,000</span> = L
                </span>
              </div>

              <div className="bg-white/90 p-3.5 rounded-xl border border-teal-200 text-xs md:text-sm font-mono space-y-1">
                <p className="font-bold text-slate-800">Example:</p>
                <p className="text-emerald-900 font-bold">500 mL = 500 ÷ 1,000 L = 0.5 L</p>
              </div>

              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                &ldquo;When converting millilitres to litres, divide by 1,000 because 1,000 millilitres make one litre.&rdquo;
              </p>
            </div>

          </div>

          {/* Visual Jug capacity comparison */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-slate-800 text-base md:text-lg text-center">
              Visual Capacity Comparison
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end justify-items-center">
              {/* 1 L Jug */}
              <div className="flex flex-col items-center space-y-2">
                <svg viewBox="0 0 100 120" className="w-28 h-36 drop-shadow-md">
                  <path d="M 20,20 L 80,20 L 75,110 L 25,110 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
                  <path d="M 77,30 C 92,30 92,70 75,75" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
                  {/* Water fill 100% */}
                  <rect x="25" y="25" width="50" height="83" fill="#0284c7" opacity="0.8" />
                  <line x1="25" y1="25" x2="35" y2="25" stroke="white" strokeWidth="2" />
                  <text x="38" y="28" fontSize="8" fontWeight="bold" fill="white">1,000 mL</text>
                </svg>
                <div className="text-center">
                  <span className="block font-black text-blue-700 text-lg">1.0 L</span>
                  <span className="text-xs font-semibold text-slate-500">1,000 mL (Full Jug)</span>
                </div>
              </div>

              {/* 500 mL Jug */}
              <div className="flex flex-col items-center space-y-2">
                <svg viewBox="0 0 100 120" className="w-28 h-36 drop-shadow-md">
                  <path d="M 20,20 L 80,20 L 75,110 L 25,110 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
                  <path d="M 77,30 C 92,30 92,70 75,75" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
                  {/* Water fill 50% */}
                  <rect x="25" y="66" width="50" height="42" fill="#38bdf8" opacity="0.85" />
                  <line x1="25" y1="66" x2="35" y2="66" stroke="#0369a1" strokeWidth="2" />
                  <text x="38" y="69" fontSize="8" fontWeight="bold" fill="#0369a1">500 mL</text>
                </svg>
                <div className="text-center">
                  <span className="block font-black text-cyan-600 text-lg">0.5 L (1/2 L)</span>
                  <span className="text-xs font-semibold text-slate-500">500 mL (Half Jug)</span>
                </div>
              </div>

              {/* 250 mL Jug */}
              <div className="flex flex-col items-center space-y-2">
                <svg viewBox="0 0 100 120" className="w-28 h-36 drop-shadow-md">
                  <path d="M 20,20 L 80,20 L 75,110 L 25,110 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
                  <path d="M 77,30 C 92,30 92,70 75,75" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
                  {/* Water fill 25% */}
                  <rect x="25" y="88" width="50" height="20" fill="#7dd3fc" opacity="0.9" />
                  <line x1="25" y1="88" x2="35" y2="88" stroke="#0369a1" strokeWidth="2" />
                  <text x="38" y="91" fontSize="8" fontWeight="bold" fill="#0369a1">250 mL</text>
                </svg>
                <div className="text-center">
                  <span className="block font-black text-teal-600 text-lg">0.25 L (1/4 L)</span>
                  <span className="text-xs font-semibold text-slate-500">250 mL (Quarter Jug)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      practiceQuestions: [
        {
          id: 'q-a1',
          question: 'How many millilitres (mL) are equivalent to 1 litre (L)?',
          options: ['10 mL', '100 mL', '1,000 mL', '10,000 mL'],
          correctIndex: 2,
          explanation: 'Remember the golden rule: 1 Litre always equals 1,000 millilitres (1 L = 1,000 mL).'
        },
        {
          id: 'q-a2',
          question: 'If a measuring jug contains 500 mL of water, what fraction of 1 litre is in the jug?',
          options: ['1/4 L', '1/2 L', '3/4 L', '1 L'],
          correctIndex: 1,
          explanation: '500 mL is half of 1,000 mL (500/1,000 = 1/2). Therefore, 500 mL = 1/2 L.'
        }
      ]
    },

    {
      id: 'lesson-b',
      title: 'Lesson B: Litres to Millilitres (Decimals)',
      subtitle: 'Converting decimal litres to millilitres',
      ruleBadge: 'CONVERSION RULE',
      ruleText: 'To convert litres (L) to millilitres (mL), multiply the numerical value by 1,000.',
      content: (
        <div className="space-y-6">
          <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-2xl flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-400 text-slate-900 font-bold text-xs uppercase">
              Rule
            </span>
            <p className="text-slate-800 font-semibold text-sm md:text-base">
              To convert litres (L) to millilitres (mL) → <span className="text-amber-700 font-black">Multiply by 1,000</span> (Move decimal point 3 places to the right).
            </p>
          </div>

          {/* Worked Example 1 */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                Worked Example 1
              </span>
              <span className="text-xs font-bold text-slate-400">Convert 0.3 L to mL</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <p className="text-base font-bold text-slate-800">
                  Convert <span className="text-blue-600">0.3 L</span> to millilitres (mL).
                </p>

                <button
                  onClick={() => toggleStep('ex-b1')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>{revealedSteps['ex-b1'] ? 'Hide Steps' : 'Show Steps'}</span>
                </button>

                {revealedSteps['ex-b1'] && (
                  <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 space-y-2 text-sm text-slate-700 animate-fadeIn">
                    <p><strong className="text-cyan-800">Step 1:</strong> Write the conversion statement.</p>
                    <p className="font-mono bg-white p-2 rounded-lg border border-cyan-200 text-cyan-900 font-bold">
                      0.3 L = 0.3 × 1,000 mL
                    </p>
                    <p><strong className="text-cyan-800">Step 2:</strong> Calculate by moving the decimal point 3 places right.</p>
                    <p className="font-mono bg-white p-2 rounded-lg border border-cyan-200 text-cyan-900 font-bold">
                      0.3 × 1,000 = 300 mL
                    </p>
                    <p className="text-emerald-700 font-black text-base pt-1">
                      Answer: 0.3 L = 300 mL
                    </p>
                  </div>
                )}
              </div>

              {/* Jug Illustration showing 300 mL */}
              <div className="flex flex-col items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <svg viewBox="0 0 100 120" className="w-24 h-32 drop-shadow-md">
                  <path d="M 20,20 L 80,20 L 75,110 L 25,110 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
                  <path d="M 77,30 C 92,30 92,70 75,75" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
                  {/* Water fill 30% */}
                  <rect x="25" y="83" width="50" height="25" fill="#38bdf8" opacity="0.85" />
                  <line x1="25" y1="83" x2="35" y2="83" stroke="#0369a1" strokeWidth="2" />
                  <text x="38" y="86" fontSize="8" fontWeight="bold" fill="#0369a1">300 mL (0.3 L)</text>
                </svg>
                <span className="text-xs font-bold text-slate-600 mt-2">Visual Jug: 300 mL level</span>
              </div>
            </div>
          </div>

          {/* Worked Example 2 */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                Worked Example 2
              </span>
              <span className="text-xs font-bold text-slate-400">Convert 1.25 L to mL</span>
            </div>

            <div className="space-y-3">
              <p className="text-base font-bold text-slate-800">
                Convert <span className="text-blue-600">1.25 L</span> to millilitres (mL).
              </p>

              <button
                onClick={() => toggleStep('ex-b2')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{revealedSteps['ex-b2'] ? 'Hide Steps' : 'Show Steps'}</span>
              </button>

              {revealedSteps['ex-b2'] && (
                <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 space-y-2 text-sm text-slate-700">
                  <p><strong className="text-cyan-800">Step 1:</strong> Multiply 1.25 by 1,000.</p>
                  <p className="font-mono bg-white p-2 rounded-lg border border-cyan-200 text-cyan-900 font-bold">
                    1.25 L = 1.25 × 1,000 mL
                  </p>
                  <p><strong className="text-cyan-800">Step 2:</strong> 1.25 × 1,000 = 1,250</p>
                  <p className="text-emerald-700 font-black text-base pt-1">
                    Answer: 1.25 L = 1,250 mL
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      practiceQuestions: [
        {
          id: 'q-b1',
          question: 'Convert 0.7 L to millilitres (mL).',
          options: ['7 mL', '70 mL', '700 mL', '7,000 mL'],
          correctIndex: 2,
          explanation: 'To convert litres to millilitres, multiply by 1,000: 0.7 × 1,000 = 700 mL.'
        },
        {
          id: 'q-b2',
          question: 'Convert 2.5 L to millilitres (mL).',
          options: ['250 mL', '2,500 mL', '25,000 mL', '25 mL'],
          correctIndex: 1,
          explanation: 'Multiply 2.5 by 1,000: 2.5 × 1,000 = 2,500 mL.'
        }
      ]
    },

    {
      id: 'lesson-c',
      title: 'Lesson C: Litres to Millilitres (Fractions)',
      subtitle: 'Converting fractional litres to millilitres',
      ruleBadge: 'FRACTION CONVERSION',
      ruleText: 'Multiply the fraction by 1,000 mL (e.g. 1/2 × 1,000 = 500 mL)',
      content: (
        <div className="space-y-6">
          <p className="text-slate-700 leading-relaxed text-base">
            The same conversion relationship (1 L = 1,000 mL) applies when working with fractions of a litre.
          </p>

          {/* Worked Example 1 */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                Worked Example 1
              </span>
              <span className="text-xs font-bold text-slate-400">Convert 1/2 L to mL</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <p className="text-base font-bold text-slate-800">
                  Convert <span className="text-purple-600 font-extrabold">1/2 L</span> to millilitres (mL).
                </p>

                <button
                  onClick={() => toggleStep('ex-c1')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>{revealedSteps['ex-c1'] ? 'Hide Steps' : 'Show Steps'}</span>
                </button>

                {revealedSteps['ex-c1'] && (
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-2 text-sm text-slate-700">
                    <p><strong className="text-purple-900">Step 1:</strong> Multiply fraction by 1,000 mL.</p>
                    <p className="font-mono bg-white p-2 rounded-lg border border-purple-200 text-purple-900 font-bold">
                      1/2 L = 1/2 × 1,000 mL
                    </p>
                    <p><strong className="text-purple-900">Step 2:</strong> 1,000 ÷ 2 = 500 mL</p>
                    <p className="text-emerald-700 font-black text-base pt-1">
                      Answer: 1/2 L = 500 mL
                    </p>
                  </div>
                )}
              </div>

              {/* Visual Fraction Bar */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-600 block text-center">Visual Fraction Bar (1 L = 1,000 mL)</span>
                <div className="h-10 w-full bg-slate-200 rounded-xl overflow-hidden flex border border-slate-300">
                  <div className="w-1/2 bg-purple-500 text-white text-xs font-bold flex items-center justify-center border-r border-white">
                    1/2 L (500 mL)
                  </div>
                  <div className="w-1/2 bg-slate-300 text-slate-600 text-xs font-medium flex items-center justify-center">
                    500 mL
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Worked Example 2 */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                Worked Example 2
              </span>
              <span className="text-xs font-bold text-slate-400">Convert 3/4 L to mL</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <p className="text-base font-bold text-slate-800">
                  Convert <span className="text-purple-600 font-extrabold">3/4 L</span> to millilitres (mL).
                </p>

                <button
                  onClick={() => toggleStep('ex-c2')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>{revealedSteps['ex-c2'] ? 'Hide Steps' : 'Show Steps'}</span>
                </button>

                {revealedSteps['ex-c2'] && (
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-2 text-sm text-slate-700">
                    <p><strong className="text-purple-900">Step 1:</strong> Multiply 3/4 by 1,000 mL.</p>
                    <p className="font-mono bg-white p-2 rounded-lg border border-purple-200 text-purple-900 font-bold">
                      3/4 L = 3/4 × 1,000 mL
                    </p>
                    <p><strong className="text-purple-900">Step 2:</strong> (3 × 1,000) ÷ 4 = 3,000 ÷ 4 = 750 mL</p>
                    <p className="text-emerald-700 font-black text-base pt-1">
                      Answer: 3/4 L = 750 mL
                    </p>
                  </div>
                )}
              </div>

              {/* Visual Fraction Bar 3/4 */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-600 block text-center">Visual Fraction Bar (3/4 of 1,000 mL)</span>
                <div className="h-10 w-full bg-slate-200 rounded-xl overflow-hidden flex border border-slate-300">
                  <div className="w-3/4 bg-purple-600 text-white text-xs font-bold flex items-center justify-center border-r border-white">
                    3/4 L = 750 mL
                  </div>
                  <div className="w-1/4 bg-slate-300 text-slate-600 text-xs font-medium flex items-center justify-center">
                    250 mL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      practiceQuestions: [
        {
          id: 'q-c1',
          question: 'Convert 1/4 L to millilitres (mL).',
          options: ['100 mL', '250 mL', '400 mL', '500 mL'],
          correctIndex: 1,
          explanation: '1/4 L = 1/4 × 1,000 mL = 1,000 ÷ 4 = 250 mL.'
        },
        {
          id: 'q-c2',
          question: 'Convert 1 1/2 L to millilitres (mL).',
          options: ['1,200 mL', '1,500 mL', '1,750 mL', '2,000 mL'],
          correctIndex: 1,
          explanation: '1 L = 1,000 mL and 1/2 L = 500 mL. Total = 1,000 + 500 = 1,500 mL.'
        }
      ]
    },

    {
      id: 'lesson-d',
      title: 'Lesson D: Millilitres to Litres (Decimals)',
      subtitle: 'Converting millilitres to decimal litres',
      ruleBadge: 'CONVERSION RULE',
      ruleText: 'To convert millilitres (mL) to litres (L), divide the numerical value by 1,000.',
      content: (
        <div className="space-y-6">
          <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-2xl flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-500 text-white font-bold text-xs uppercase">
              Rule
            </span>
            <p className="text-slate-800 font-semibold text-sm md:text-base">
              To convert millilitres (mL) to litres (L) → <span className="text-emerald-700 font-black">Divide by 1,000</span> (Move decimal point 3 places to the left).
            </p>
          </div>

          {/* Worked Example 1 */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                Worked Example 1
              </span>
              <span className="text-xs font-bold text-slate-400">Convert 2,750 mL to L</span>
            </div>

            <div className="space-y-3">
              <p className="text-base font-bold text-slate-800">
                Convert <span className="text-emerald-600 font-extrabold">2,750 mL</span> to litres (L).
              </p>

              <button
                onClick={() => toggleStep('ex-d1')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{revealedSteps['ex-d1'] ? 'Hide Steps' : 'Show Steps'}</span>
              </button>

              {revealedSteps['ex-d1'] && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3 text-sm text-slate-700">
                  <p><strong className="text-emerald-900">Step 1:</strong> Divide 2,750 by 1,000.</p>
                  <p className="font-mono bg-white p-2 rounded-lg border border-emerald-200 text-emerald-900 font-bold">
                    2,750 mL = 2,750 ÷ 1,000 L
                  </p>
                  <p><strong className="text-emerald-900">Step 2:</strong> 2,750 ÷ 1,000 = 2.75 L</p>
                  <div className="p-3 bg-white rounded-xl border border-emerald-200 text-slate-700 text-xs font-medium space-y-1">
                    <p className="font-bold text-slate-900">Visual Breakdown:</p>
                    <p>2,750 mL = 2,000 mL + 750 mL</p>
                    <p>2,000 mL = 2 L and 750 mL = 0.75 L → Total = 2.75 L</p>
                  </div>
                  <p className="text-emerald-700 font-black text-base pt-1">
                    Answer: 2,750 mL = 2.75 L
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Worked Example 2 */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                Worked Example 2
              </span>
              <span className="text-xs font-bold text-slate-400">Convert 700 mL to L</span>
            </div>

            <div className="space-y-3">
              <p className="text-base font-bold text-slate-800">
                Convert <span className="text-emerald-600 font-extrabold">700 mL</span> to litres (L).
              </p>

              <button
                onClick={() => toggleStep('ex-d2')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{revealedSteps['ex-d2'] ? 'Hide Steps' : 'Show Steps'}</span>
              </button>

              {revealedSteps['ex-d2'] && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2 text-sm text-slate-700">
                  <p><strong className="text-emerald-900">Step 1:</strong> Divide 700 by 1,000.</p>
                  <p className="font-mono bg-white p-2 rounded-lg border border-emerald-200 text-emerald-900 font-bold">
                    700 mL ÷ 1,000 = 0.7 L
                  </p>
                  <p className="text-emerald-700 font-black text-base pt-1">
                    Answer: 700 mL = 0.7 L
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      practiceQuestions: [
        {
          id: 'q-d1',
          question: 'Convert 1,400 mL to litres in decimal form.',
          options: ['0.14 L', '1.4 L', '14 L', '140 L'],
          correctIndex: 1,
          explanation: 'Divide by 1,000: 1,400 ÷ 1,000 = 1.4 L.'
        },
        {
          id: 'q-d2',
          question: 'Convert 80 mL to litres in decimal form.',
          options: ['0.08 L', '0.8 L', '8.0 L', '80.0 L'],
          correctIndex: 0,
          explanation: 'Divide by 1,000: 80 ÷ 1,000 = 0.08 L.'
        }
      ]
    },

    {
      id: 'lesson-e',
      title: 'Lesson E: Millilitres to Litres (Fractions)',
      subtitle: 'Expressing millilitres as fractions of a litre',
      ruleBadge: 'FRACTION REDUCTION',
      ruleText: 'Write mL over 1,000 (mL/1,000) and simplify to lowest terms.',
      content: (
        <div className="space-y-6">
          <p className="text-slate-700 leading-relaxed text-base">
            To express a millilitre quantity as a fraction of a litre, write the millilitre value over 1,000 (since 1 L = 1,000 mL) and simplify the fraction.
          </p>

          {/* Worked Example 1 */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
                Worked Example 1
              </span>
              <span className="text-xs font-bold text-slate-400">Convert 750 mL to fraction L</span>
            </div>

            <div className="space-y-3">
              <p className="text-base font-bold text-slate-800">
                Convert <span className="text-amber-600 font-extrabold">750 mL</span> to a fraction of a litre.
              </p>

              <button
                onClick={() => toggleStep('ex-e1')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{revealedSteps['ex-e1'] ? 'Hide Steps' : 'Show Steps'}</span>
              </button>

              {revealedSteps['ex-e1'] && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2 text-sm text-slate-700">
                  <p><strong className="text-amber-900">Step 1:</strong> Write as a fraction over 1,000.</p>
                  <p className="font-mono bg-white p-2 rounded-lg border border-amber-200 text-amber-900 font-bold">
                    750/1,000 L
                  </p>
                  <p><strong className="text-amber-900">Step 2:</strong> Simplify by dividing top and bottom by 250.</p>
                  <p className="font-mono bg-white p-2 rounded-lg border border-amber-200 text-amber-900 font-bold">
                    (750 ÷ 250) / (1,000 ÷ 250) = 3/4 L
                  </p>
                  <p className="text-emerald-700 font-black text-base pt-1">
                    Answer: 750 mL = 3/4 L
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Worked Example 2 */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
                Worked Example 2
              </span>
              <span className="text-xs font-bold text-slate-400">Convert 250 mL to fraction L</span>
            </div>

            <div className="space-y-3">
              <p className="text-base font-bold text-slate-800">
                Convert <span className="text-amber-600 font-extrabold">250 mL</span> to a fraction of a litre.
              </p>

              <button
                onClick={() => toggleStep('ex-e2')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{revealedSteps['ex-e2'] ? 'Hide Steps' : 'Show Steps'}</span>
              </button>

              {revealedSteps['ex-e2'] && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2 text-sm text-slate-700">
                  <p><strong className="text-amber-900">Step 1:</strong> Write as fraction 250/1,000 L.</p>
                  <p><strong className="text-amber-900">Step 2:</strong> Simplify by dividing by 250.</p>
                  <p className="font-mono bg-white p-2 rounded-lg border border-amber-200 text-amber-900 font-bold">
                    250/1,000 = 1/4 L
                  </p>
                  <p className="text-emerald-700 font-black text-base pt-1">
                    Answer: 250 mL = 1/4 L
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      practiceQuestions: [
        {
          id: 'q-e1',
          question: 'Convert 500 mL to a simplified fraction of a litre.',
          options: ['1/5 L', '1/4 L', '1/2 L', '3/5 L'],
          correctIndex: 2,
          explanation: '500/1,000 simplified by dividing both numerator and denominator by 500 gives 1/2 L.'
        },
        {
          id: 'q-e2',
          question: 'Convert 200 mL to a simplified fraction of a litre.',
          options: ['1/5 L', '2/5 L', '1/4 L', '1/10 L'],
          correctIndex: 0,
          explanation: '200/1,000 simplified by dividing numerator and denominator by 200 gives 1/5 L.'
        }
      ]
    }
  ];

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-300" />
            Textbook Module • DSKP 5.3.1
          </div>
          <h2 className="text-3xl md:text-4xl font-black">
            LEARN: Liquid Measurement
          </h2>
          <p className="text-cyan-100 text-sm md:text-base max-w-xl">
            Explore step-by-step textbook lessons with clear worked examples, visual jug scales, and interactive mini-quizzes!
          </p>
        </div>

        <Mascot
          message="Pick a lesson from the menu on the left or top to begin! I'm here to help you every step of the way!"
          mood="explaining"
          size="md"
        />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar (Lessons A to E) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase px-2">
            Select Lesson
          </h3>
          <div className="space-y-2">
            {lessons.map(lesson => {
              const isActive = lesson.id === activeLessonId;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border-2 flex items-center justify-between ${
                    isActive
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-md scale-102 font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/50'
                  }`}
                >
                  <div>
                    <span className="block text-xs uppercase tracking-wide opacity-80 mb-0.5">
                      {lesson.title.split(':')[0]}
                    </span>
                    <span className="text-sm font-bold block">
                      {lesson.title.split(':')[1]}
                    </span>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Lesson Detail Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">

            {/* Lesson Title */}
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <h3 className="text-2xl font-black text-slate-900">
                {activeLesson.title}
              </h3>
              <p className="text-cyan-700 font-semibold text-sm">
                {activeLesson.subtitle}
              </p>
            </div>

            {/* Lesson Dynamic Content */}
            {activeLesson.content}

            {/* Interactive Practice Section */}
            <div className="mt-8 pt-8 border-t-2 border-slate-100 space-y-6">
              <div className="flex items-center gap-2 text-cyan-800">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h4 className="text-xl font-extrabold">
                  Interactive Practice: &ldquo;Try It!&rdquo;
                </h4>
              </div>

              <div className="space-y-6">
                {activeLesson.practiceQuestions.map((q, idx) => {
                  const selectedOpt = userAnswers[q.id];
                  const isSubmitted = submittedAnswers[q.id];
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-cyan-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="font-bold text-slate-800 text-base">
                          {q.question}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-10">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedOpt === optIdx;
                          let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-cyan-400';
                          if (isSelected) {
                            btnStyle = 'bg-cyan-100 border-cyan-500 text-cyan-900 font-bold';
                          }
                          if (isSubmitted && optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                          } else if (isSubmitted && isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`p-3 rounded-xl border-2 text-sm text-left transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isSubmitted && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              )}
                              {isSubmitted && isSelected && !isCorrect && (
                                <XCircle className="w-4 h-4 text-rose-600" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Action & Explanation */}
                      <div className="pl-10 flex flex-col space-y-3">
                        {!isSubmitted ? (
                          <button
                            disabled={selectedOpt === undefined}
                            onClick={() => handleCheckAnswer(q.id)}
                            className="self-start px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 disabled:hover:bg-cyan-600 text-white font-bold text-xs shadow-sm transition-all"
                          >
                            Check Answer
                          </button>
                        ) : (
                          <div
                            className={`p-4 rounded-xl border-2 space-y-2 text-sm ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                : 'bg-rose-50 border-rose-200 text-rose-900'
                            }`}
                          >
                            <div className="flex items-center gap-2 font-black">
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                  <span>Great Job! That is Correct!</span>
                                </>
                              ) : (
                                <>
                                  <HelpCircle className="w-5 h-5 text-rose-600" />
                                  <span>Let&apos;s Review the Explanation:</span>
                                </>
                              )}
                            </div>
                            <p className="leading-relaxed font-medium">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
