import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mascot } from './Mascot';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  FileCheck2,
  UserCheck,
  Printer
} from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  category: 'L to mL' | 'mL to L' | 'Decimals' | 'Fractions' | 'Visual Jug';
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  visualSvg?: React.ReactNode;
}

export const Assessment: React.FC = () => {
  const [pupilName, setPupilName] = useState<string>('');
  const [submittedName, setSubmittedName] = useState<string>('Year 5 Explorer');
  const [preScore, setPreScore] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const questions: AssessmentQuestion[] = [
    {
      id: 'q1',
      category: 'L to mL',
      questionText: 'Convert 1.8 L to millilitres (mL).',
      options: ['18 mL', '180 mL', '1,800 mL', '18,000 mL'],
      correctIndex: 2,
      explanation: 'Multiply by 1,000: 1.8 × 1,000 = 1,800 mL.'
    },
    {
      id: 'q2',
      category: 'mL to L',
      questionText: 'Convert 3,250 mL to litres (L) in decimal form.',
      options: ['3.25 L', '32.5 L', '0.325 L', '325 L'],
      correctIndex: 0,
      explanation: 'Divide by 1,000: 3,250 ÷ 1,000 = 3.25 L.'
    },
    {
      id: 'q3',
      category: 'Fractions',
      questionText: 'Which fraction of a litre is equivalent to 750 mL?',
      options: ['1/4 L', '1/2 L', '3/4 L', '2/5 L'],
      correctIndex: 2,
      explanation: '750/1,000 simplified by dividing numerator and denominator by 250 gives 3/4 L.'
    },
    {
      id: 'q4',
      category: 'Decimals',
      questionText: 'Convert 0.05 L to millilitres (mL).',
      options: ['5 mL', '50 mL', '500 mL', '5,000 mL'],
      correctIndex: 1,
      explanation: '0.05 × 1,000 = 50 mL. Be careful with decimal places!'
    },
    {
      id: 'q5',
      category: 'Visual Jug',
      questionText: 'Look at the measuring jug below. What is the liquid volume in both mL and L?',
      options: ['400 mL (0.4 L)', '600 mL (0.6 L)', '60 mL (0.06 L)', '6,000 mL (6 L)'],
      correctIndex: 1,
      explanation: 'The water level reaches 600 mL, which equals 0.6 L (600 ÷ 1,000 = 0.6 L).',
      visualSvg: (
        <svg viewBox="0 0 100 120" className="w-28 h-36 mx-auto drop-shadow-md">
          <path d="M 20,20 L 80,20 L 75,110 L 25,110 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
          <path d="M 77,30 C 92,30 92,70 75,75" fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
          {/* Water fill 60% */}
          <rect x="25" y="56" width="50" height="52" fill="#38bdf8" opacity="0.85" />
          <line x1="25" y1="56" x2="35" y2="56" stroke="#0369a1" strokeWidth="2" />
          <text x="38" y="59" fontSize="8" fontWeight="bold" fill="#0369a1">600 mL</text>
        </svg>
      )
    }
  ];

  const handleSelectOption = (qId: string, optIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleFinishAssessment = () => {
    let scoreCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        scoreCount += 1;
      }
    });

    setCorrectCount(scoreCount);
    const calculatedPercentage = Math.round((scoreCount / questions.length) * 100);
    setPreScore(calculatedPercentage);

    if (pupilName.trim()) {
      setSubmittedName(pupilName.trim());
    }

    setIsFinished(true);
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setUserAnswers({});
    setIsFinished(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const currentQ = questions[currentIdx];
  const totalQuestions = questions.length;
  const isAllAnswered = Object.keys(userAnswers).length === totalQuestions;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-800 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-300" />
            Educational Evaluation Standard
          </div>
          <h2 className="text-3xl md:text-4xl font-black">
            Assessment & Learning Evaluation
          </h2>
          <p className="text-purple-100 text-sm md:text-base max-w-xl">
            Evaluate pupil performance before and after using Liquid Measure Lab. Compare Pre-Test and Post-Test score growth!
          </p>
        </div>

        <Mascot
          message="Complete the 5-question test to evaluate your understanding of converting L and mL!"
          mood="happy"
          size="md"
        />
      </div>

      {/* Pupil Name Input Banner */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2 justify-center sm:justify-start">
            <UserCheck className="w-5 h-5 text-purple-600" />
            Pupil Name for Certificate
          </h3>
          <p className="text-xs font-semibold text-slate-500">
            Enter your name below so it appears on your Certificate of Achievement!
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <input
            type="text"
            value={pupilName}
            onChange={(e) => setPupilName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full sm:w-64 py-2.5 px-4 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-800 font-bold text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Main Quiz Area */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-8">

        {!isFinished ? (
          <>
            {/* Question Progress Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase">
                  PRE-TEST ASSESSMENT • Category: {currentQ.category}
                </span>
                <h3 className="text-lg font-bold text-slate-800">
                  Question {currentIdx + 1} of {totalQuestions}
                </h3>
              </div>

              <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                <FileCheck2 className="w-4 h-4 text-purple-600" />
                <span>{Object.keys(userAnswers).length} / {totalQuestions} Answered</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">

              <div className="space-y-4 text-center md:text-left">
                <p className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
                  {currentQ.questionText}
                </p>

                {currentQ.visualSvg && (
                  <div className="py-2">
                    {currentQ.visualSvg}
                  </div>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      className={`p-5 rounded-2xl border-2 text-base font-bold text-left transition-all ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-102'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-700 font-bold text-xs transition-colors"
                >
                  ← Previous
                </button>

                {currentIdx < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((i) => Math.min(totalQuestions - 1, i + 1))}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    disabled={!isAllAnswered}
                    onClick={handleFinishAssessment}
                    className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-black text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Submit PRE-TEST Assessment</span>
                  </button>
                )}
              </div>

            </div>
          </>
        ) : (
          /* Results & Certificate Display Page */
          <div className="space-y-8">

            {/* Score Summary Box */}
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-8 rounded-3xl text-white text-center space-y-4 shadow-xl">
              <Sparkles className="w-12 h-12 text-amber-300 mx-auto" />
              <h3 className="text-3xl font-black">
                PRE-TEST ASSESSMENT COMPLETED!
              </h3>
              <p className="text-purple-200 text-base">
                Score: <span className="text-amber-300 font-black text-4xl ml-2">{preScore}%</span>
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm font-bold pt-2">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Correct Answers: {correctCount} / {totalQuestions}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Incorrect Answers: {totalQuestions - correctCount} / {totalQuestions}
                </span>
              </div>
            </div>

            {/* PRINTABLE CERTIFICATE CARD */}
            <div
              id="printable-certificate"
              className="bg-gradient-to-b from-amber-50/80 via-white to-cyan-50/80 rounded-3xl p-8 md:p-12 border-8 border-amber-400 shadow-2xl text-center space-y-6 relative overflow-hidden"
            >
              {/* Decorative Corner Seals */}
              <div className="absolute top-4 left-4 w-12 h-12 rounded-full border-2 border-amber-400/60 flex items-center justify-center text-amber-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-amber-400/60 flex items-center justify-center text-amber-500">
                <Award className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-4 py-1 rounded-full">
                  Liquid Measure Lab • Mathematics Year 5 DSKP 5.3.1
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight pt-2">
                  Certificate of Achievement
                </h2>
                <p className="text-slate-600 font-semibold text-sm">
                  This certificate confirms the completion of the Pre-Test Assessment
                </p>
              </div>

              {/* Recipient Name */}
              <div className="py-4 border-y-2 border-amber-200 max-w-xl mx-auto space-y-1">
                <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                  PROUDLY PRESENTED TO
                </span>
                <p className="text-3xl md:text-4xl font-black text-cyan-800 underline decoration-amber-400 decoration-wavy">
                  {submittedName}
                </p>
              </div>

              <p className="text-slate-700 text-sm md:text-base max-w-lg mx-auto font-medium leading-relaxed">
                For successfully taking the <strong>Liquid Measure Lab — Pre-Test Assessment</strong> and demonstrating knowledge in converting liquid volume units between litres and millilitres.
              </p>

              {/* Score Badges */}
              <div className="flex justify-center items-center gap-6 py-2">
                <div className="bg-white border-2 border-amber-300 px-6 py-3 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Final Percentage</span>
                  <span className="text-3xl font-black text-amber-600">{preScore}%</span>
                </div>
                <div className="bg-white border-2 border-cyan-300 px-6 py-3 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Correct Questions</span>
                  <span className="text-3xl font-black text-cyan-600">{correctCount} / {totalQuestions}</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-bold pt-2">
                Completion Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={handlePrintCertificate}
                className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Printer className="w-5 h-5" />
                <span>Download / Print Certificate</span>
              </button>

              <button
                onClick={resetQuiz}
                className="px-8 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Pre-Test</span>
              </button>
            </div>

            {/* Answer Explanations Breakdown */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h4 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-purple-600" />
                Detailed Questions Breakdown
              </h4>

              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const userChoice = userAnswers[q.id];
                  const isCorrect = userChoice === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border-2 space-y-3 ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-rose-50 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Question {idx + 1} • {q.category}
                          </span>
                          <p className="font-bold text-slate-900 text-base">
                            {q.questionText}
                          </p>
                        </div>

                        {isCorrect ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-1 shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Correct
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-rose-200 text-rose-900 text-xs font-bold flex items-center gap-1 shrink-0">
                            <XCircle className="w-4 h-4 text-rose-700" /> Incorrect
                          </span>
                        )}
                      </div>

                      <div className="text-xs md:text-sm space-y-1 font-medium text-slate-700 border-t border-slate-200/60 pt-2">
                        <p>
                          <strong>Your Answer:</strong> {userChoice !== undefined ? q.options[userChoice] : 'Not answered'}
                        </p>
                        <p className="text-emerald-800 font-bold">
                          <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                        </p>
                        <p className="text-slate-600 italic pt-1">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
