# Liquid Measure Lab 🧪💧
## Interactive Mathematics Learning Innovation for Year 5 Primary School Pupils

**Liquid Measure Lab** is an interactive, responsive educational website designed for Year 5 primary school pupils in Malaysia. Created as a Mathematics PB educational innovation, its primary mission is to help pupils master converting liquid volume units between litres (**L**) and millilitres (**mL**), particularly when dealing with fractions and decimals.

---

### 📚 Curriculum Standard Alignment
- **DSKP Standard Pembelajaran 5.3.1:**
  > *"Convert units of liquid volume involving millilitres and litres in fractions and decimals."*
- **Language:** 100% English medium across all lessons, navigation, games, and feedback.
- **Focus:** Strictly unit conversions in fractions and decimals. (Arithmetic operations like addition/subtraction are intentionally excluded as they belong to separate standards).

---

### 🚀 Quick Start Guide (Local Setup)

#### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn / pnpm / bun

#### Installation & Execution Steps
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for Production:**
   ```bash
   npm run build
   ```

---

### 📹 How to Change the WATCH Section YouTube Video

The YouTube video config is stored in a single, dedicated configuration file:

📁 **`src/config/videoConfig.ts`**

To replace or update the embedded video:
1. Open `src/config/videoConfig.ts`.
2. Modify the `YOUTUBE_VIDEO_ID` variable:
   ```typescript
   export const YOUTUBE_VIDEO_CONFIG = {
     YOUTUBE_VIDEO_ID: "P1c0B9_aOlo", // Change this ID
     YOUTUBE_VIDEO_URL: "https://www.youtube.com/watch?v=P1c0B9_aOlo",
     TITLE: "Watch and Learn: Converting Litres and Millilitres",
     DESCRIPTION: "Observe how litres (L) and millilitres (mL) relate..."
   };
   ```
3. Save the file. The website player and fallback watch links update automatically!

---

### 📁 Website Architecture & File Structure

```text
app/
├── src/
│   ├── components/
│   │   ├── Header.tsx        # Responsive navigation header
│   │   ├── Footer.tsx        # Footer with DSKP alignment notes & links
│   │   ├── Home.tsx          # Homepage with hero title & 4 navigation cards
│   │   ├── Mascot.tsx        # Animated Sploshy water droplet mascot
│   │   ├── Learn.tsx         # Textbook module (Lessons A to E & Try It practice)
│   │   ├── Watch.tsx         # Responsive YouTube video viewer
│   │   ├── Explore.tsx       # Interactive 1.0 L jug & 10 glasses (100 mL each) simulation
│   │   ├── Game.tsx          # 3 Game modes: Match, Fill Missing Value, Beat Misconception
│   │   └── Assessment.tsx    # Pre-test and Post-test quiz & evaluation breakdown
│   ├── config/
│   │   └── videoConfig.ts    # Single editable YouTube video configuration file
│   ├── App.tsx               # Main application layout and tab router
│   ├── index.css             # Tailwind v4 imports and custom water animations
│   └── main.tsx              # React entry point
├── package.json
├── vite.config.ts
└── README.md
```

---

### ✨ Implemented Features

1. **Homepage & Shell:**
   - Website Title: *Liquid Measure Lab*
   - Main Heading: *Discover Litres and Millilitres!*
   - Subtitle: *Learn, watch, explore and play your way to understanding liquid measurement.*
   - 4 Interactive pathway cards with hover effects & SVG illustrations.
   - Independent non-linear access (access any section anytime).
   - Animated water droplet mascot (*Sploshy*) offering tips and encouragement.

2. **LEARN (Textbook-Style Teaching Module):**
   - **Lesson A:** Understanding Litres & Millilitres (1 L = 1,000 mL) with visual capacity jugs (1 L, 500 mL, 250 mL).
   - **Lesson B:** Converting Litres to Millilitres using Decimals (Multiply by 1,000; worked examples 0.3 L = 300 mL, 1.25 L = 1,250 mL).
   - **Lesson C:** Converting Litres to Millilitres using Fractions (1/2 L = 500 mL, 3/4 L = 750 mL with visual fraction bars).
   - **Lesson D:** Converting Millilitres to Litres using Decimals (Divide by 1,000; worked example 2,750 mL = 2.75 L).
   - **Lesson E:** Converting Millilitres to Litres using Fractions (750 mL = 3/4 L, 250 mL = 1/4 L with fraction simplification steps).
   - "Show Steps" progressive reveal buttons & "Try It" mini-practice with detailed explanatory feedback.

3. **WATCH (YouTube Video Module):**
   - Single configuration file `src/config/videoConfig.ts`.
   - Large responsive video player with observation guidelines for pupils.
   - Fallback watch links & placeholder instructions if video ID is modified or empty.

4. **EXPLORE (Interactive Jug & 10 Glasses Simulation):**
   - Transparent 1.0 L measuring jug with scale ticks and liquid surface animation.
   - 10 small transparent glasses (100 mL each).
   - Click to fill glasses or pour water into jug (+100 mL).
   - Live synchronised conversion display (`mL`, decimal `L`, fraction `L`).
   - "Show Conversion Breakdown" popup modal.

5. **GAME (Interactive Mathematics Games):**
   - **Game A: Match the Measurement** (card pair matching for L and mL).
   - **Game B: Fill in the Missing Value** (conversion quizzes with step explanations).
   - **Game C: Beat the Misconception** (spot false conversions like 0.5 L = 50 mL vs 500 mL).
   - Scoring, streak counter, and confetti celebrations (`canvas-confetti`).

6. **ASSESSMENT (Pre/Post-Test Module):**
   - 5-question test covering L to mL, mL to L, decimals, fractions, and visual jug reading.
   - Pre-Test vs Post-Test comparison scorecard to measure learning growth.
   - Detailed answer breakdown with explanations for incorrect responses.

---

### ✅ Tested Interactions
- [x] TypeScript compilation (`tsc -b`) & Vite production bundling (`npm run build`).
- [x] Independent navigation across all 6 main tabs.
- [x] Progressive "Show Steps" toggling in textbook lessons.
- [x] Interactive glass filling and pouring into the 1 L jug simulation.
- [x] Real-time synchronised liquid height and numerical conversion updates.
- [x] Game matching, quiz selection, misconception true/false checking, and score incrementing.
- [x] Pre-test and Post-test score calculation and improvement percentage comparison.

---

### 📌 Remaining Limitations & Future Work
- The YouTube embed requires an internet connection to stream videos from YouTube's servers.
- Additional pupil profile saving or cloud database integration could be added in future versions for longitudinal research.
