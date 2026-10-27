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
  Lock,
  Award,
  Printer,
  RotateCcw,
  UserCheck,
  AlertCircle,
  Play
} from 'lucide-react';

type GamePart = 'part-a' | 'part-b' | 'part-c';

interface MatchCard {
  id: string;
  pairId: string;
  text: string;
  subtext: string;
  type: 'L' | 'mL';
}

interface FillQuestion {
  id: string;
  questionText: string;
  blankUnit: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface MisconceptionItem {
  id: string;
  statement: string;
  isCorrect: boolean;
  correctionText: string;
  explanation: string;
}

export const Game: React.FC = () => {
  // Name requirement state
  const [hasStartedGame, setHasStartedGame] = useState<boolean>(false);
  const [pupilNameInput, setPupilNameInput] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);

  const [activePart, setActivePart] = useState<GamePart>('part-a');

  // Progression & Score State
  const [partAPassed, setPartAPassed] = useState<boolean>(false);
  const [partBPassed, setPartBPassed] = useState<boolean>(false);
  const [partCPassed, setPartCPassed] = useState<boolean>(false);

  const [partAScore, setPartAScore] = useState<number | null>(null); // Percentage
  const [partBScore, setPartBScore] = useState<number | null>(null); // Percentage
  const [partCScore, setPartCScore] = useState<number | null>(null); // Percentage

  const [partACorrectCount, setPartACorrectCount] = useState<number>(0);
  const [partBCorrectCount, setPartBCorrectCount] = useState<number>(0);
  const [partCCorrectCount, setPartCCorrectCount] = useState<number>(0);

  const [partAFinished, setPartAFinished] = useState<boolean>(false);
  const [partBFinished, setPartBFinished] = useState<boolean>(false);
  const [partCFinished, setPartCFinished] = useState<boolean>(false);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleStartGame = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = pupilNameInput.trim();
    if (!trimmed) {
      setNameError('Please enter your name before starting the game.');
      return;
    }
    setNameError(null);
    setStudentName(trimmed);
    setHasStartedGame(true);
  };

  // --------------------------------------------------------------------------
  // PART A: MATCH THE MEASUREMENT LOGIC
  // --------------------------------------------------------------------------
  const initialMatchPairs = [
    { id: 'm1', valA: '4 L', valB: '4,000 mL', labelA: '4 Litres', labelB: '4,000 Millilitres' },
    { id: 'm2', valA: '9 L', valB: '9,000 mL', labelA: '9 Litres', labelB: '9,000 Millilitres' },
    { id: 'm3', valA: '15 L', valB: '15,000 mL', labelA: '15 Litres', labelB: '15,000 Millilitres' },
    { id: 'm4', valA: '2.5 L', valB: '2,500 mL', labelA: '2.5 Litres', labelB: '2,500 Millilitres' },
    { id: 'm5', valA: '11 L', valB: '11,000 mL', labelA: '11 Litres', labelB: '11,000 Millilitres' },
    { id: 'm6', valA: '14 L', valB: '14,000 mL', labelA: '14 Litres', labelB: '14,000 Millilitres' },
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
  const [matchMistakes, setMatchMistakes] = useState<number>(0);

  const handleMatchCardClick = (card: MatchCard) => {
    if (partAFinished) return;
    if (matchedPairIds.includes(card.pairId)) return;
    if (selectedMatchCards.some((c) => c.id === card.id)) return;

    if (selectedMatchCards.length === 0) {
      setSelectedMatchCards([card]);
    } else if (selectedMatchCards.length === 1) {
      const first = selectedMatchCards[0];
      setSelectedMatchCards([first, card]);

      if (first.pairId === card.pairId) {
        // Correct match!
        const newMatched = [...matchedPairIds, card.pairId];
        setMatchedPairIds(newMatched);
        setSelectedMatchCards([]);

        if (newMatched.length === initialMatchPairs.length) {
          // Finished Part A
          const totalAttempts = initialMatchPairs.length + matchMistakes;
          const correct = initialMatchPairs.length;
          const scorePct = Math.round((correct / totalAttempts) * 100);
          setPartAScore(scorePct);
          setPartACorrectCount(correct);
          setPartAFinished(true);

          if (scorePct >= 80) {
            setPartAPassed(true);
            triggerConfetti();
          }
        }
      } else {
        // Wrong match
        setMatchMistakes((m) => m + 1);
        setTimeout(() => setSelectedMatchCards([]), 800);
      }
    }
  };

  const resetPartA = () => {
    setMatchCards(generateShuffledCards());
    setSelectedMatchCards([]);
    setMatchedPairIds([]);
    setMatchMistakes(0);
    setPartAFinished(false);
  };

  // --------------------------------------------------------------------------
  // PART B: FILL IN THE MISSING VALUE LOGIC
  // --------------------------------------------------------------------------
  const fillQuestions: FillQuestion[] = [
    {
      id: 'fb1',
      questionText: '6 L = _____ mL',
      blankUnit: 'mL',
      options: ['600 mL', '6,000 mL', '60,000 mL', '60 mL'],
      correctAnswer: '6,000 mL',
      explanation: 'Multiply litres by 1,000: 6 × 1,000 = 6,000 mL.'
    },
    {
      id: 'fb2',
      questionText: '12,000 mL = _____ L',
      blankUnit: 'L',
      options: ['1.2 L', '12 L', '120 L', '0.12 L'],
      correctAnswer: '12 L',
      explanation: 'Divide millilitres by 1,000: 12,000 ÷ 1,000 = 12 L.'
    },
    {
      id: 'fb3',
      questionText: '_____ L = 8,000 mL',
      blankUnit: 'L',
      options: ['8 L', '80 L', '0.8 L', '800 L'],
      correctAnswer: '8 L',
      explanation: 'Divide millilitres by 1,000: 8,000 ÷ 1,000 = 8 L.'
    },
    {
      id: 'fb4',
      questionText: '15 L = _____ mL',
      blankUnit: 'mL',
      options: ['1,500 mL', '15,000 mL', '150,000 mL', '150 mL'],
      correctAnswer: '15,000 mL',
      explanation: 'Multiply litres by 1,000: 15 × 1,000 = 15,000 mL.'
    },
    {
      id: 'fb5',
      questionText: '10.5 L = _____ mL',
      blankUnit: 'mL',
      options: ['1,050 mL', '10,500 mL', '105,000 mL', '105 mL'],
      correctAnswer: '10,500 mL',
      explanation: 'Multiply litres by 1,000: 10.5 × 1,000 = 10,500 mL.'
    },
    {
      id: 'fb6',
      questionText: '13 L = _____ mL',
      blankUnit: 'mL',
      options: ['1,300 mL', '13,000 mL', '130,000 mL', '130 mL'],
      correctAnswer: '13,000 mL',
      explanation: 'Multiply litres by 1,000: 13 × 1,000 = 13,000 mL.'
    }
  ];

  const [currentFillIdx, setCurrentFillIdx] = useState<number>(0);
  const [fillSelectedOpt, setFillSelectedOpt] = useState<string | null>(null);
  const [fillAnswers, setFillAnswers] = useState<Record<string, string>>({});
  const [fillSubmitted, setFillSubmitted] = useState<boolean>(false);

  const handleFillOptionSelect = (opt: string) => {
    if (fillSubmitted) return;
    setFillSelectedOpt(opt);
  };

  const handleFillSubmit = () => {
    if (!fillSelectedOpt) return;
    const q = fillQuestions[currentFillIdx];
    const newAnswers = { ...fillAnswers, [q.id]: fillSelectedOpt };
    setFillAnswers(newAnswers);
    setFillSubmitted(true);

    if (currentFillIdx === fillQuestions.length - 1) {
      let correct = 0;
      fillQuestions.forEach((fq) => {
        if (newAnswers[fq.id] === fq.correctAnswer) {
          correct += 1;
        }
      });
      const scorePct = Math.round((correct / fillQuestions.length) * 100);
      setPartBScore(scorePct);
      setPartBCorrectCount(correct);
      setPartBFinished(true);

      if (scorePct >= 80) {
        setPartBPassed(true);
        triggerConfetti();
      }
    }
  };

  const nextFillQuestion = () => {
    setFillSelectedOpt(null);
    setFillSubmitted(false);
    setCurrentFillIdx((prev) => prev + 1);
  };

  const resetPartB = () => {
    setCurrentFillIdx(0);
    setFillSelectedOpt(null);
    setFillAnswers({});
    setFillSubmitted(false);
    setPartBFinished(false);
  };

  // --------------------------------------------------------------------------
  // PART C: BEAT THE MISCONCEPTION LOGIC
  // --------------------------------------------------------------------------
  const misconceptionItems: MisconceptionItem[] = [
    {
      id: 'mc1',
      statement: '5 L = 500 mL',
      isCorrect: false,
      correctionText: '5 L = 5,000 mL',
      explanation: 'MISCONCEPTION! Converting litres to millilitres requires multiplying by 1,000. 5 × 1,000 = 5,000 mL, NOT 500 mL!'
    },
    {
      id: 'mc2',
      statement: '11 L = 11,000 mL',
      isCorrect: true,
      correctionText: '11 L = 11,000 mL (Correct!)',
      explanation: 'CORRECT! Multiplying 11 litres by 1,000 gives 11,000 mL.'
    },
    {
      id: 'mc3',
      statement: '15,000 mL = 15 L',
      isCorrect: true,
      correctionText: '15,000 mL = 15 L (Correct!)',
      explanation: 'CORRECT! Converting millilitres to litres requires dividing by 1,000. 15,000 ÷ 1,000 = 15 L.'
    },
    {
      id: 'mc4',
      statement: '14 L = 1,400 mL',
      isCorrect: false,
      correctionText: '14 L = 14,000 mL',
      explanation: 'MISCONCEPTION! 14 × 1,000 = 14,000 mL. Do not forget that 1 L = 1,000 mL!'
    },
    {
      id: 'mc5',
      statement: '8.5 L = 8,500 mL',
      isCorrect: true,
      correctionText: '8.5 L = 8,500 mL (Correct!)',
      explanation: 'CORRECT! 8.5 × 1,000 = 8,500 mL.'
    },
    {
      id: 'mc6',
      statement: '13 L = 130 mL',
      isCorrect: false,
      correctionText: '13 L = 13,000 mL',
      explanation: 'MISCONCEPTION! 13 × 1,000 = 13,000 mL, NOT 130 mL.'
    }
  ];

  const [currentMcIdx, setCurrentMcIdx] = useState<number>(0);
  const [mcAnswers, setMcAnswers] = useState<Record<string, boolean>>({});
  const [mcUserChoice, setMcUserChoice] = useState<boolean | null>(null);
  const [mcSubmitted, setMcSubmitted] = useState<boolean>(false);

  const handleMcAnswer = (choice: boolean) => {
    if (mcSubmitted) return;
    const item = misconceptionItems[currentMcIdx];
    const newAnswers = { ...mcAnswers, [item.id]: choice };
    setMcAnswers(newAnswers);
    setMcUserChoice(choice);
    setMcSubmitted(true);

    if (currentMcIdx === misconceptionItems.length - 1) {
      let correct = 0;
      misconceptionItems.forEach((m) => {
        if (newAnswers[m.id] === m.isCorrect) {
          correct += 1;
        }
      });
      const scorePct = Math.round((correct / misconceptionItems.length) * 100);
      setPartCScore(scorePct);
      setPartCCorrectCount(correct);
      setPartCFinished(true);

      if (scorePct >= 80) {
        setPartCPassed(true);
        triggerConfetti();
      }
    }
  };

  const nextMcQuestion = () => {
    setMcUserChoice(null);
    setMcSubmitted(false);
    setCurrentMcIdx((prev) => prev + 1);
  };

  const resetPartC = () => {
    setCurrentMcIdx(0);
    setMcUserChoice(null);
    setMcAnswers({});
    setMcSubmitted(false);
    setPartCFinished(false);
  };

  // Overall Score Calculations
  const totalQuestionsAll = initialMatchPairs.length + fillQuestions.length + misconceptionItems.length;
  const totalCorrectAll = partACorrectCount + partBCorrectCount + partCCorrectCount;
  const overallPercentage = totalQuestionsAll > 0 ? Math.round((totalCorrectAll / totalQuestionsAll) * 100) : 0;

  const allPartsPassed = partAPassed && partBPassed && partCPassed;

  const handlePrintCertificate = () => {
    window.print();
  };

  // --------------------------------------------------------------------------
  // RENDER STUDENT NAME ENTRY SCREEN (IF GAME HAS NOT STARTED)
  // --------------------------------------------------------------------------
  if (!hasStartedGame) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4 text-amber-200" />
            3-Part Progressive Game Challenge
          </div>
          <h2 className="text-3xl md:text-4xl font-black">
            Welcome to Liquid Measure Challenge!
          </h2>
          <p className="text-amber-100 text-sm md:text-base max-w-xl mx-auto">
            Test your mathematics skills converting litres and millilitres across 3 exciting progressive levels!
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border-2 border-slate-100 shadow-xl space-y-6">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Enter Your Name to Begin
            </h3>
            <p className="text-sm font-semibold text-slate-500">
              Please enter your name before starting the game.
            </p>
          </div>

          <form onSubmit={handleStartGame} className="space-y-5">
            <div>
              <label htmlFor="student-name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Student Name
              </label>
              <input
                id="student-name-input"
                type="text"
                value={pupilNameInput}
                onChange={(e) => {
                  setPupilNameInput(e.target.value);
                  if (nameError) setNameError(null);
                }}
                placeholder="Type your full name here..."
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 font-bold text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>

            {nameError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-center gap-3 text-sm font-bold animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{nameError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-99 text-slate-950 font-black text-base shadow-lg shadow-amber-200 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>Start Game</span>
            </button>
          </form>
        </div>

        <div className="flex justify-center">
          <Mascot
            message="Type your name above and click Start Game to unlock your Year 5 Liquid Measurement Challenge!"
            mood="happy"
            size="md"
          />
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MAIN GAME INTERFACE (AFTER VALID NAME IS ENTERED)
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4 text-amber-200" />
            3-Part Progressive Game Challenge
          </div>
          <h2 className="text-3xl md:text-4xl font-black">
            GAME: Liquid Measure Challenge
          </h2>
          <p className="text-amber-100 text-sm md:text-base max-w-xl">
            Welcome, <strong className="text-white underline decoration-amber-300 font-extrabold">{studentName}</strong>! Pass Part A (≥ 80%) to unlock Part B, and Part B (≥ 80%) to unlock Part C to earn your Official Certificate of Achievement!
          </p>
        </div>

        <Mascot
          message={
            allPartsPassed
              ? `Outstanding job, ${studentName}! You passed all three parts and earned your Certificate!`
              : `Welcome ${studentName}! Complete each part with at least 80% to unlock the next level!`
          }
          mood={allPartsPassed ? "cheering" : "happy"}
          size="md"
        />
      </div>

      {/* Student Badge Bar */}
      <div className="bg-white p-4 px-6 rounded-3xl border-2 border-slate-100 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-black">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Active Student
            </span>
            <span className="text-lg font-black text-slate-900">
              {studentName}
            </span>
          </div>
        </div>

        <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-amber-100 text-amber-900">
          Year 5 • DSKP 5.3.1
        </span>
      </div>

      {/* Progressive Part Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Part A Tab */}
        <button
          onClick={() => setActivePart('part-a')}
          className={`p-5 rounded-2xl border-2 font-black text-sm md:text-base transition-all text-left flex items-center justify-between ${
            activePart === 'part-a'
              ? 'bg-amber-500 text-white border-amber-500 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="block text-xs uppercase opacity-80 font-bold">Part A</span>
              {partAPassed && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  Passed ({partAScore}%)
                </span>
              )}
            </div>
            <span>Match the Measurement</span>
          </div>
          <Sparkles className="w-5 h-5" />
        </button>

        {/* Part B Tab */}
        <button
          disabled={!partAPassed}
          onClick={() => setActivePart('part-b')}
          className={`p-5 rounded-2xl border-2 font-black text-sm md:text-base transition-all text-left flex items-center justify-between ${
            !partAPassed
              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-70'
              : activePart === 'part-b'
              ? 'bg-orange-500 text-white border-orange-500 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="block text-xs uppercase opacity-80 font-bold">Part B</span>
              {!partAPassed ? (
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              ) : partBPassed ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  Passed ({partBScore}%)
                </span>
              ) : null}
            </div>
            <span>Fill in the Missing Value</span>
          </div>
          {!partAPassed ? <Lock className="w-5 h-5 text-slate-400" /> : <HelpCircle className="w-5 h-5" />}
        </button>

        {/* Part C Tab */}
        <button
          disabled={!partBPassed}
          onClick={() => setActivePart('part-c')}
          className={`p-5 rounded-2xl border-2 font-black text-sm md:text-base transition-all text-left flex items-center justify-between ${
            !partBPassed
              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-70'
              : activePart === 'part-c'
              ? 'bg-red-500 text-white border-red-500 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:border-red-300'
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="block text-xs uppercase opacity-80 font-bold">Part C</span>
              {!partBPassed ? (
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              ) : partCPassed ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  Passed ({partCScore}%)
                </span>
              ) : null}
            </div>
            <span>Beat the Misconception</span>
          </div>
          {!partBPassed ? <Lock className="w-5 h-5 text-slate-400" /> : <Trophy className="w-5 h-5" />}
        </button>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* PART A INTERFACE */}
      {/* -------------------------------------------------------------------- */}
      {activePart === 'part-a' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Part A: Match Equivalent Measurements
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Click one Litre card and one Millilitre card to make a matching pair! (Passing score: ≥ 80%)
              </p>
            </div>

            <button
              onClick={resetPartA}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              <span>Restart Part A</span>
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
                  disabled={isMatched || partAFinished}
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

          {/* Part A Completion Card */}
          {partAFinished && (
            <div
              className={`p-6 rounded-2xl border-2 text-center space-y-4 ${
                partAPassed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {partAPassed ? (
                <>
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-2xl font-black">Part A Passed! Score: {partAScore}%</h4>
                  <p className="text-sm font-medium">
                    Awesome job, {studentName}! You have unlocked Part B — Fill in the Missing Value.
                  </p>
                  <button
                    onClick={() => setActivePart('part-b')}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                  >
                    Proceed to Part B →
                  </button>
                </>
              ) : (
                <>
                  <XCircle className="w-12 h-12 text-rose-600 mx-auto" />
                  <h4 className="text-2xl font-black">Score: {partAScore}% (Requires ≥ 80% to Pass)</h4>
                  <p className="text-sm font-medium">
                    You need at least 80% to unlock Part B. Try again to improve your score!
                  </p>
                  <button
                    onClick={resetPartA}
                    className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 mx-auto"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retry Part A</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* PART B INTERFACE */}
      {/* -------------------------------------------------------------------- */}
      {activePart === 'part-b' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
          {!partAPassed ? (
            <div className="p-8 text-center space-y-4 bg-slate-50 rounded-2xl border-2 border-slate-200">
              <Lock className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-xl font-bold text-slate-700">Part B is Locked!</h3>
              <p className="text-sm text-slate-500 font-medium">Pass Part A with at least 80% score to unlock Part B.</p>
              <button
                onClick={() => setActivePart('part-a')}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-sm hover:bg-amber-600 transition-all"
              >
                Go to Part A
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Part B: Fill in the Missing Value
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Question {Math.min(currentFillIdx + 1, fillQuestions.length)} of {fillQuestions.length} (Passing score: ≥ 80%)
                  </p>
                </div>

                <button
                  onClick={resetPartB}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Part B</span>
                </button>
              </div>

              {!partBFinished ? (
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

                        {currentFillIdx < fillQuestions.length - 1 && (
                          <button
                            onClick={nextFillQuestion}
                            className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-md transition-all"
                          >
                            Next Question →
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Part B Completion Card */
                <div
                  className={`p-6 rounded-2xl border-2 text-center space-y-4 ${
                    partBPassed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  {partBPassed ? (
                    <>
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                      <h4 className="text-2xl font-black">Part B Passed! Score: {partBScore}%</h4>
                      <p className="text-sm font-medium">
                        Great job, {studentName}! You have unlocked Part C — Beat the Misconception.
                      </p>
                      <button
                        onClick={() => setActivePart('part-c')}
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                      >
                        Proceed to Part C →
                      </button>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-12 h-12 text-rose-600 mx-auto" />
                      <h4 className="text-2xl font-black">Score: {partBScore}% (Requires ≥ 80% to Pass)</h4>
                      <p className="text-sm font-medium">
                        You need at least 80% to unlock Part C. Try again to improve your score!
                      </p>
                      <button
                        onClick={resetPartB}
                        className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 mx-auto"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Retry Part B</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* PART C INTERFACE */}
      {/* -------------------------------------------------------------------- */}
      {activePart === 'part-c' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
          {!partBPassed ? (
            <div className="p-8 text-center space-y-4 bg-slate-50 rounded-2xl border-2 border-slate-200">
              <Lock className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-xl font-bold text-slate-700">Part C is Locked!</h3>
              <p className="text-sm text-slate-500 font-medium">Pass Part B with at least 80% score to unlock Part C.</p>
              <button
                onClick={() => setActivePart('part-b')}
                className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs shadow-sm hover:bg-orange-600 transition-all"
              >
                Go to Part B
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Part C: Beat the Misconception
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Statement {Math.min(currentMcIdx + 1, misconceptionItems.length)} of {misconceptionItems.length} (Passing score: ≥ 80%)
                  </p>
                </div>

                <button
                  onClick={resetPartC}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Part C</span>
                </button>
              </div>

              {!partCFinished ? (
                <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 p-8 rounded-2xl text-center space-y-6">
                  <span className="text-xs font-black tracking-widest uppercase bg-red-200 text-red-900 px-3 py-1 rounded-full">
                    Is this Conversion Correct or False?
                  </span>

                  <div className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                    &ldquo;{misconceptionItems[currentMcIdx].statement}&rdquo;
                  </div>

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

                      {currentMcIdx < misconceptionItems.length - 1 && (
                        <div className="text-center pt-2">
                          <button
                            onClick={nextMcQuestion}
                            className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-md transition-all"
                          >
                            Next Statement →
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Part C Completion Card */
                <div
                  className={`p-6 rounded-2xl border-2 text-center space-y-4 ${
                    partCPassed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  {partCPassed ? (
                    <>
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                      <h4 className="text-2xl font-black">Part C Passed! Score: {partCScore}%</h4>
                      <p className="text-sm font-medium">
                        Fantastic achievement, {studentName}! You passed all three game parts and earned your Certificate!
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-12 h-12 text-rose-600 mx-auto" />
                      <h4 className="text-2xl font-black">Score: {partCScore}% (Requires ≥ 80% to Pass)</h4>
                      <p className="text-sm font-medium">
                        You need at least 80% on Part C to earn the Certificate. Try again!
                      </p>
                      <button
                        onClick={resetPartC}
                        className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 mx-auto"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Retry Part C</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* AWARD CERTIFICATE SECTION (SHOWN WHEN ALL 3 PARTS PASSED) */}
      {/* -------------------------------------------------------------------- */}
      {allPartsPassed && (
        <div className="space-y-6 pt-6 border-t-2 border-slate-100">
          <div
            id="printable-certificate"
            className="bg-gradient-to-b from-amber-50/80 via-white to-cyan-50/80 rounded-3xl p-8 md:p-12 border-8 border-amber-400 shadow-2xl text-center space-y-6 relative overflow-hidden"
          >
            {/* Decorative Seals */}
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
              <p className="text-slate-600 font-bold text-base">
                Liquid Measure Lab — Game Challenge
              </p>
            </div>

            <div className="py-4 border-y-2 border-amber-200 max-w-xl mx-auto space-y-1">
              <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                PROUDLY PRESENTED TO
              </span>
              <p className="text-3xl md:text-4xl font-black text-cyan-800 underline decoration-amber-400 decoration-wavy">
                {studentName}
              </p>
            </div>

            <p className="text-slate-700 text-sm md:text-base max-w-lg mx-auto font-medium leading-relaxed">
              For successfully completing all three progressive levels of the <strong>Liquid Measure Lab — Game Challenge</strong> and demonstrating mastery in converting liquid volume units between litres and millilitres!
            </p>

            {/* Individual & Overall Score Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto py-2">
              <div className="bg-white border-2 border-amber-300 p-3 rounded-2xl shadow-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Part A Score</span>
                <span className="text-xl font-black text-amber-600">{partAScore}%</span>
              </div>
              <div className="bg-white border-2 border-orange-300 p-3 rounded-2xl shadow-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Part B Score</span>
                <span className="text-xl font-black text-orange-600">{partBScore}%</span>
              </div>
              <div className="bg-white border-2 border-red-300 p-3 rounded-2xl shadow-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Part C Score</span>
                <span className="text-xl font-black text-red-600">{partCScore}%</span>
              </div>
              <div className="bg-white border-2 border-emerald-400 p-3 rounded-2xl shadow-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Overall Score</span>
                <span className="text-xl font-black text-emerald-600">{overallPercentage}%</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-bold">
              Total Correct: {totalCorrectAll} / {totalQuestionsAll} Questions Across All Three Parts
            </div>

            <div className="text-xs text-slate-400 font-bold pt-1">
              Completion Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handlePrintCertificate}
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Printer className="w-5 h-5" />
              <span>Download / Print Certificate</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
