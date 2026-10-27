import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mascot } from './Mascot';
import {
  Gamepad2,
  Trophy,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Shuffle,
  Star
} from 'lucide-react';

type GameMode = 'match' | 'fill' | 'misconception';

// Game A: Card Pair
interface MatchCard {
  id: string;
  pairId: string;
  text: string;
  subtext: string;
  type: 'L' | 'mL';
}

// Game B: Question
interface FillQuestion {
  id: string;
  questionText: string;
  blankUnit: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// Game C: Misconception Statement
interface MisconceptionItem {
  id: string;
  statement: string;
  isCorrect: boolean;
  correctionText: string;
  explanation: string;
}

export const Game: React.FC = () => {
  const [activeMode, setActiveMode] = useState<GameMode>('match');
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // --------------------------------------------------------------------------
  // GAME A: MATCH THE MEASUREMENT STATE & LOGIC
  // --------------------------------------------------------------------------
  const initialMatchPairs: { id: string; valA: string; valB: string; labelA: string; labelB: string }[] = [
    { id: 'm1', valA: '0.5 L', valB: '500 mL', labelA: '0.5 Litres', labelB: '500 Millilitres' },
    { id: 'm2', valA: '0.25 L', valB: '250 mL', labelA: '0.25 Litres', labelB: '250 Millilitres' },
    { id: 'm3', valA: '3/4 L', valB: '750 mL', labelA: '3/4 Litres', labelB: '750 Millilitres' },
    { id: 'm4', valA: '1.25 L', valB: '1,250 mL', labelA: '1.25 Litres', labelB: '1,250 Millilitres' },
    { id: 'm5', valA: '1/2 L', valB: '500 mL', labelA: '1/2 Litre', labelB: '500 Millilitres' },
    { id: 'm6', valA: '2.75 L', valB: '2,750 mL', labelA: '2.75 Litres', labelB: '2,750 Millilitres' },
  ];

  const generateShuffledCards = (): MatchCard[] => {
    const list: MatchCard[] = [];
    initialMatchPairs.forEach((pair) => {
      list.push({ id: `${pair.id}-a`, pairId: pair.id, text: pair.valA, subtext: pair.labelA, type: 'L' });
      list.push({ id: `${pair.id}-b`, pairId: pair.id, text: pair.valB, subtext: pair.labelB, type: 'mL' });
    });
    return list.sort(() => Math.random() - 0.5);
  };

  const [matchCards, setMatchCards] = useState<MatchCard[]>(generateShuffledCards);
  const [selectedMatchCards, setSelectedMatchCards] = useState<MatchCard[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);

  const handleMatchCardClick = (card: MatchCard) => {
    if (matchedPairIds.includes(card.pairId)) return;
    if (selectedMatchCards.some((c) => c.id === card.id)) return;

    if (selectedMatchCards.length === 0) {
      setSelectedMatchCards([card]);
    } else if (selectedMatchCards.length === 1) {
      const first = selectedMatchCards[0];
      setSelectedMatchCards([first, card]);

      if (first.pairId === card.pairId) {
        // Correct match!
        setMatchedPairIds((prev) => [...prev, card.pairId]);
        setScore((s) => s + 20);
        setStreak((st) => st + 1);
        triggerConfetti();
        setTimeout(() => setSelectedMatchCards([]), 600);
      } else {
        // Wrong match
        setStreak(0);
        setTimeout(() => setSelectedMatchCards([]), 1000);
      }
    }
  };

  const resetMatchGame = () => {
    setMatchCards(generateShuffledCards());
    setSelectedMatchCards([]);
    setMatchedPairIds([]);
  };

  // --------------------------------------------------------------------------
  // GAME B: FILL IN THE MISSING VALUE STATE & LOGIC
  // --------------------------------------------------------------------------
  const fillQuestions: FillQuestion[] = [
    {
      id: 'fb1',
      questionText: '0.3 L = _____ mL',
      blankUnit: 'mL',
      options: ['30 mL', '300 mL', '3,000 mL', '0.003 mL'],
      correctAnswer: '300 mL',
      explanation: 'Multiply litres by 1,000: 0.3 × 1,000 = 300 mL.'
    },
    {
      id: 'fb2',
      questionText: '700 mL = _____ L',
      blankUnit: 'L',
      options: ['0.07 L', '0.7 L', '7.0 L', '70 L'],
      correctAnswer: '0.7 L',
      explanation: 'Divide millilitres by 1,000: 700 ÷ 1,000 = 0.7 L.'
    },
    {
      id: 'fb3',
      questionText: '1/2 L = _____ mL',
      blankUnit: 'mL',
      options: ['250 mL', '500 mL', '750 mL', '100 mL'],
      correctAnswer: '500 mL',
      explanation: '1/2 of 1,000 mL = 1,000 ÷ 2 = 500 mL.'
    },
    {
      id: 'fb4',
      questionText: '2,750 mL = _____ L',
      blankUnit: 'L',
      options: ['2.75 L', '27.5 L', '0.275 L', '275 L'],
      correctAnswer: '2.75 L',
      explanation: '2,750 ÷ 1,000 = 2.75 L (2 L + 750 mL = 2.75 L).'
    },
    {
      id: 'fb5',
      questionText: '3/4 L = _____ mL',
      blankUnit: 'mL',
      options: ['500 mL', '600 mL', '750 mL', '800 mL'],
      correctAnswer: '750 mL',
      explanation: '3/4 × 1,000 mL = 3,000 ÷ 4 = 750 mL.'
    }
  ];

  const [currentFillIdx, setCurrentFillIdx] = useState<number>(0);
  const [fillSelectedOpt, setFillSelectedOpt] = useState<string | null>(null);
  const [fillSubmitted, setFillSubmitted] = useState<boolean>(false);

  const handleFillOptionSelect = (opt: string) => {
    if (fillSubmitted) return;
    setFillSelectedOpt(opt);
  };

  const handleFillSubmit = () => {
    if (!fillSelectedOpt) return;
    setFillSubmitted(true);
    const q = fillQuestions[currentFillIdx];
    if (fillSelectedOpt === q.correctAnswer) {
      setScore((s) => s + 15);
      setStreak((st) => st + 1);
      triggerConfetti();
    } else {
      setStreak(0);
    }
  };

  const nextFillQuestion = () => {
    setFillSelectedOpt(null);
    setFillSubmitted(false);
    setCurrentFillIdx((prev) => (prev + 1) % fillQuestions.length);
  };

  // --------------------------------------------------------------------------
  // GAME C: BEAT THE MISCONCEPTION STATE & LOGIC
  // --------------------------------------------------------------------------
  const misconceptionItems: MisconceptionItem[] = [
    {
      id: 'mc1',
      statement: '0.5 L = 50 mL',
      isCorrect: false,
      correctionText: '0.5 L = 500 mL',
      explanation: 'MISCONCEPTION! Pupils often forget a zero. Since 1 L = 1,000 mL, 0.5 × 1,000 = 500 mL, NOT 50 mL!'
    },
    {
      id: 'mc2',
      statement: '750 mL = 0.75 L',
      isCorrect: true,
      correctionText: '750 mL = 0.75 L (Correct!)',
      explanation: 'CORRECT! Dividing 750 by 1,000 gives 0.75 L, which is also equal to 3/4 L.'
    },
    {
      id: 'mc3',
      statement: '1/4 L = 250 mL',
      isCorrect: true,
      correctionText: '1/4 L = 250 mL (Correct!)',
      explanation: 'CORRECT! 1,000 mL ÷ 4 = 250 mL.'
    },
    {
      id: 'mc4',
      statement: '1.2 L = 120 mL',
      isCorrect: false,
      correctionText: '1.2 L = 1,200 mL',
      explanation: 'MISCONCEPTION! 1.2 × 1,000 = 1,200 mL. Remember 1 L alone is already 1,000 mL!'
    },
    {
      id: 'mc5',
      statement: '3,050 mL = 3.5 L',
      isCorrect: false,
      correctionText: '3,050 mL = 3.05 L',
      explanation: 'MISCONCEPTION! 3,050 ÷ 1,000 = 3.05 L. Do not confuse 50 mL with 500 mL!'
    }
  ];

  const [currentMcIdx, setCurrentMcIdx] = useState<number>(0);
  const [mcUserChoice, setMcUserChoice] = useState<boolean | null>(null);
  const [mcSubmitted, setMcSubmitted] = useState<boolean>(false);

  const handleMcAnswer = (choice: boolean) => {
    if (mcSubmitted) return;
    setMcUserChoice(choice);
    setMcSubmitted(true);

    const item = misconceptionItems[currentMcIdx];
    if (choice === item.isCorrect) {
      setScore((s) => s + 20);
      setStreak((st) => st + 1);
      triggerConfetti();
    } else {
      setStreak(0);
    }
  };

  const nextMcQuestion = () => {
    setMcUserChoice(null);
    setMcSubmitted(false);
    setCurrentMcIdx((prev) => (prev + 1) % misconceptionItems.length);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4 text-amber-200" />
            Interactive Mathematics Games
          </div>
          <h2 className="text-3xl md:text-4xl font-black">
            GAME: Liquid Measure Challenge
          </h2>
          <p className="text-amber-100 text-sm md:text-base max-w-xl">
            Test your knowledge, beat common misconceptions, and earn high scores converting litres and millilitres!
          </p>
        </div>

        {/* Score & Streak Counter Badge */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-6 shrink-0 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-200 block">Total Score</span>
            <div className="text-3xl font-black text-amber-300 flex items-center justify-center gap-1">
              <Trophy className="w-6 h-6 text-amber-300" />
              <span>{score}</span>
            </div>
          </div>
          <div className="border-l border-white/20 pl-6">
            <span className="text-[10px] uppercase font-bold text-amber-200 block">Streak</span>
            <div className="text-3xl font-black text-amber-300 flex items-center justify-center gap-1">
              <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
              <span>{streak}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Mode Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveMode('match')}
          className={`p-5 rounded-2xl border-2 font-black text-sm md:text-base transition-all text-left flex items-center justify-between ${
            activeMode === 'match'
              ? 'bg-amber-500 text-white border-amber-500 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
          }`}
        >
          <div>
            <span className="block text-xs uppercase opacity-80 font-bold">Game A</span>
            <span>Match the Measurement</span>
          </div>
          <Sparkles className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveMode('fill')}
          className={`p-5 rounded-2xl border-2 font-black text-sm md:text-base transition-all text-left flex items-center justify-between ${
            activeMode === 'fill'
              ? 'bg-orange-500 text-white border-orange-500 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
          }`}
        >
          <div>
            <span className="block text-xs uppercase opacity-80 font-bold">Game B</span>
            <span>Fill in the Missing Value</span>
          </div>
          <HelpCircle className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveMode('misconception')}
          className={`p-5 rounded-2xl border-2 font-black text-sm md:text-base transition-all text-left flex items-center justify-between ${
            activeMode === 'misconception'
              ? 'bg-red-500 text-white border-red-500 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:border-red-300'
          }`}
        >
          <div>
            <span className="block text-xs uppercase opacity-80 font-bold">Game C</span>
            <span>Beat the Misconception</span>
          </div>
          <Trophy className="w-5 h-5" />
        </button>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* GAME A: MATCH THE MEASUREMENT */}
      {/* -------------------------------------------------------------------- */}
      {activeMode === 'match' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Game A: Match Equivalent Measurements
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Click one Litre card and one Millilitre card to make a matching pair!
              </p>
            </div>

            <button
              onClick={resetMatchGame}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              <span>Shuffle / Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {matchCards.map((card) => {
              const isMatched = matchedPairIds.includes(card.pairId);
              const isSelected = selectedMatchCards.some((c) => c.id === card.id);

              let cardStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400';
              if (isSelected) {
                cardStyle = 'bg-amber-100 border-amber-500 text-amber-900 font-bold scale-105 shadow-md';
              } else if (isMatched) {
                cardStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 cursor-not-allowed';
              }

              return (
                <button
                  key={card.id}
                  disabled={isMatched}
                  onClick={() => handleMatchCardClick(card)}
                  className={`p-5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center space-y-1 ${cardStyle}`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {card.type === 'L' ? 'Litre (L)' : 'Millilitre (mL)'}
                  </span>
                  <span className="text-xl md:text-2xl font-black">{card.text}</span>
                  <span className="text-[10px] font-semibold text-slate-500">{card.subtext}</span>
                </button>
              );
            })}
          </div>

          {matchedPairIds.length === initialMatchPairs.length && (
            <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-2xl text-center space-y-3">
              <Sparkles className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-2xl font-black text-emerald-900">
                Outstanding! All Pairs Matched!
              </h4>
              <p className="text-emerald-700 text-sm font-semibold">
                You have earned +120 points!
              </p>
              <button
                onClick={resetMatchGame}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* GAME B: FILL IN THE MISSING VALUE */}
      {/* -------------------------------------------------------------------- */}
      {activeMode === 'fill' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Game B: Fill in the Missing Value
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Question {currentFillIdx + 1} of {fillQuestions.length}
              </p>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 p-8 rounded-2xl text-center space-y-6">
            <span className="text-xs font-black tracking-widest uppercase bg-orange-200 text-orange-900 px-3 py-1 rounded-full">
              Complete the Conversion
            </span>

            <div className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              {fillQuestions[currentFillIdx].questionText}
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-2">
              {fillQuestions[currentFillIdx].options.map((opt, idx) => {
                const isSelected = fillSelectedOpt === opt;
                let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-orange-400';
                if (isSelected) {
                  btnStyle = 'bg-orange-500 text-white font-black border-orange-500 shadow-md';
                }
                if (fillSubmitted && opt === fillQuestions[currentFillIdx].correctAnswer) {
                  btnStyle = 'bg-emerald-600 text-white font-black border-emerald-600';
                }

                return (
                  <button
                    key={idx}
                    disabled={fillSubmitted}
                    onClick={() => handleFillOptionSelect(opt)}
                    className={`p-4 rounded-xl border-2 text-base md:text-lg font-bold transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons & Explanations */}
            <div className="pt-4 flex flex-col items-center space-y-4">
              {!fillSubmitted ? (
                <button
                  disabled={!fillSelectedOpt}
                  onClick={handleFillSubmit}
                  className="px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white font-black text-sm shadow-md transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="space-y-4 max-w-xl mx-auto w-full">
                  <div
                    className={`p-4 rounded-2xl border-2 text-sm text-left space-y-2 ${
                      fillSelectedOpt === fillQuestions[currentFillIdx].correctAnswer
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-black text-base">
                      {fillSelectedOpt === fillQuestions[currentFillIdx].correctAnswer ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Correct! Great Conversion!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-600" />
                          <span>Incorrect choice.</span>
                        </>
                      )}
                    </div>
                    <p className="font-medium">
                      {fillQuestions[currentFillIdx].explanation}
                    </p>
                  </div>

                  <button
                    onClick={nextFillQuestion}
                    className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-md transition-all"
                  >
                    Next Question →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* GAME C: BEAT THE MISCONCEPTION */}
      {/* -------------------------------------------------------------------- */}
      {activeMode === 'misconception' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Game C: Beat the Misconception
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Statement {currentMcIdx + 1} of {misconceptionItems.length}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 p-8 rounded-2xl text-center space-y-6">
            <span className="text-xs font-black tracking-widest uppercase bg-red-200 text-red-900 px-3 py-1 rounded-full">
              Is this Conversion Correct or False?
            </span>

            <div className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              &ldquo;{misconceptionItems[currentMcIdx].statement}&rdquo;
            </div>

            {/* True / False Buttons */}
            {!mcSubmitted ? (
              <div className="flex justify-center gap-4 pt-2">
                <button
                  onClick={() => handleMcAnswer(true)}
                  className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>CORRECT</span>
                </button>

                <button
                  onClick={() => handleMcAnswer(false)}
                  className="px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-lg shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <XCircle className="w-6 h-6" />
                  <span>FALSE / INCORRECT</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-w-xl mx-auto text-left">
                <div
                  className={`p-5 rounded-2xl border-2 space-y-2 ${
                    mcUserChoice === misconceptionItems[currentMcIdx].isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-lg">
                    {mcUserChoice === misconceptionItems[currentMcIdx].isCorrect ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        <span>You Spotted it Correctly!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-rose-600" />
                        <span>Not quite right!</span>
                      </>
                    )}
                  </div>

                  <p className="font-bold text-base text-slate-900 pt-1">
                    Correct Conversion: {misconceptionItems[currentMcIdx].correctionText}
                  </p>

                  <p className="text-sm font-medium leading-relaxed">
                    {misconceptionItems[currentMcIdx].explanation}
                  </p>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={nextMcQuestion}
                    className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-md transition-all"
                  >
                    Next Statement →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mascot Encouragement */}
      <div className="flex justify-center">
        <Mascot
          message="Awesome effort! Keep practicing to beat your high score and become a Liquid Measurement Master!"
          mood="cheering"
          size="md"
        />
      </div>
    </div>
  );
};
